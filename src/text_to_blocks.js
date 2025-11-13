function BlockMirrorTextToBlocks(blockMirror) {
    this.blockMirror = blockMirror;
    this.hiddenImports = ["plt"];
    this.strictAnnotations = ['int', 'float', 'str', 'bool'];

    if (!BlockMirrorTextToBlocks.LOADED) {
      for (const blockElement of BlockMirrorTextToBlocks.BLOCKS) {
        blockElement.colour = blockMirror.configuration.convertColour(blockElement.type, blockElement.colour);

        if (blockElement.message0) {
          blockElement.message0 = blockMirror.configuration.translate(blockElement.message0)
        }
        if (blockElement.args0) {
          for (const arg of blockElement.args0) {
            if (arg.type === 'field_dropdown') {
              arg.options = arg.options.map(
                ([label, value]) => [blockMirror.configuration.translate(label), value]
              );
            }
          }
        }
      }
      Blockly.common.defineBlocksWithJsonArray(BlockMirrorTextToBlocks.BLOCKS);
      BlockMirrorTextToBlocks.LOADED = true;
    }
    this.imports = new TypeRegistry();
    this.variables = new TypesRegistry();
}

BlockMirrorTextToBlocks.xmlToString = function (xml) {
    return new XMLSerializer().serializeToString(xml);
};

BlockMirrorTextToBlocks.prototype.convertSourceToCodeBlock = function (python_source) {
    var xml = document.createElement("xml");
    xml.appendChild(BlockMirrorTextToBlocks.raw_block(python_source));
    return BlockMirrorTextToBlocks.xmlToString(xml);
};

/**
 * The main function for converting a string representation of Python
 * code to the Blockly XML representation.
 *
 * @param {string} filename - The filename being parsed.
 * @param {string} python_source - The string representation of Python
 *      code (e.g., "a = 0").
 * @returns {Object} An object which will either have the converted
 *      source code or an error message and the code as a code-block.
 */
BlockMirrorTextToBlocks.prototype.convertSource = function (filename, python_source) {
    let xml = document.createElement("xml");
    // Attempt parsing - might fail!
    let parse, ast = null, symbol_table, error;
    let badChunks = [];
    let originalSource = python_source;
    this.filename = filename
    this.source = python_source.split("\n");
    let previousLine = 1+this.source.length;
    let startLine = 1;
    while (ast === null) {
        if (python_source.trim() === "") {
            if (badChunks.length) {
                xml.appendChild(BlockMirrorTextToBlocks.raw_block(badChunks.join("\n"), startLine));
            }
            return {"xml": BlockMirrorTextToBlocks.xmlToString(xml),
                    "error": null,
                    rawXml: xml};
        }
        try {
            parse = Sk.parse(filename, python_source);
            ast = Sk.astFromParse(parse.cst, filename, parse.flags);
        } catch (e) {
            //console.error(e);
            error = e;
            // if (e.position && e.position.length && e.position[0].lineno &&
            //     e.position[0][0] < previousLine) {
            //     previousLine = e.position[0][0] - 1;
            if (e.lineno && e.lineno < previousLine) {
                previousLine = e.lineno - 1;
                badChunks = badChunks.concat(this.source.slice(previousLine));
                startLine += previousLine;
                this.source = this.source.slice(0, previousLine);
                python_source = this.source.join("\n");
            } else {
                //console.error(e);
                xml.appendChild(BlockMirrorTextToBlocks.raw_block(originalSource, startLine));
                return {"xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": error, "rawXml": xml};
            }
        }
    }
    this.comments = {};
    for (let commentLocation in parse.comments) {
        let lineColumn = commentLocation.split(",");
        let yLocation = parseInt(lineColumn[0], 10);
        var xLocation = parseInt(lineColumn[1], 10);
        this.comments[yLocation] = xLocation + "|" + parse.comments[commentLocation];
    }
    this.highestLineSeen = 0;
    this.levelIndex = 0;
    this.nextExpectedLine = 0;
    this.measureNode(ast);
    var converted = this.convert(ast);
    if (converted !== null) {
        for (var block = 0; block < converted.length; block += 1) {
            xml.appendChild(converted[block]);
        }
    }
    if (badChunks.length) {
        xml.appendChild(BlockMirrorTextToBlocks.raw_block(badChunks.join("\n"), startLine));
    }
    return {
        "xml": BlockMirrorTextToBlocks.xmlToString(xml),
        "error": null,
        "lineMap": this.lineMap,
        'comments': this.comments,
        "rawXml": xml
    };
};

BlockMirrorTextToBlocks.prototype.recursiveMeasure = function (node, nextBlockLine) {
    if (node === undefined) {
        return;
    }
    var myNext = nextBlockLine;
    if ("orelse" in node && node.orelse.length > 0) {
        if (node.orelse.length === 1 && node.orelse[0]._astname === "If") {
            myNext = node.orelse[0].lineno - 1;
        } else {
            myNext = node.orelse[0].lineno - 1 - 1;
        }
    }
    this.heights.push(nextBlockLine);
    if ("body" in node) {
        for (let i = 0; i < node.body.length; i++) {
            let next;
            if (i + 1 === node.body.length) {
                next = myNext;
            } else {
                next = node.body[i + 1].lineno - 1;
            }
            this.recursiveMeasure(node.body[i], next);
        }
    }
    if ("orelse" in node) {
        for (let i = 0; i < node.orelse.length; i++) {
            let next;
            if (i === node.orelse.length) {
                next = nextBlockLine;
            } else {
                next = 1 + (node.orelse[i].lineno - 1);
            }
            this.recursiveMeasure(node.orelse[i], next);
        }
    }
};

BlockMirrorTextToBlocks.prototype.measureNode = function (node) {
    this.heights = [];
    this.recursiveMeasure(node, this.source.length - 1);
    this.heights.shift();
};

BlockMirrorTextToBlocks.prototype.getSourceCode = function (frm, to) {
    var lines = this.source.slice(frm - 1, to);
    // Strip out any starting indentation.
    if (lines.length > 0) {
        var indentation = lines[0].search(/\S/);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].substring(indentation);
        }
    }
    return lines.join("\n");
};

BlockMirrorTextToBlocks.prototype.convertBody = function (node, parent) {
    this.levelIndex += 1;
    let is_top_level = this.isTopLevel(parent);
    // Empty body, return nothing
    /*if (node.length === 0) {
        return null;
    }*/

    // Final result list
    var children = [], // The complete set of peers
        root = null, // The top of the current peer
        current = null, // The bottom of the current peer
        levelIndex = this.levelIndex;

    function addPeer(peer) {
        if (root == null) {
            children.push(peer);
        } else {
            children.push(root);
        }
        root = peer;
        current = peer;
    }

    function finalizePeers() {
        if (root != null) {
            children.push(root);
        }
    }

    function nestChild(child) {
        if (root == null) {
            root = child;
            current = child;
        } else if (current == null) {
            root = current;
        } else {
            var nextElement = document.createElement("next");
            nextElement.appendChild(child);
            current.appendChild(nextElement);
            current = child;
        }
    }

    var lineNumberInBody = 0,
        lineNumberInProgram,
        previousLineInProgram = null,
        distance,
        skipped_line,
        commentCount,
        previousHeight = null,
        previousWasStatement = false,
        visitedFirstLine = false,
        wasFirstLine = false;

    // Iterate through each node
    for (var i = 0; i < node.length; i++) {
        lineNumberInBody += 1;

        lineNumberInProgram = node[i].lineno;
        distance = 0;
        wasFirstLine = true;
        if (previousLineInProgram != null) {
            distance = lineNumberInProgram - previousLineInProgram - 1;
            wasFirstLine = false;
        }
        lineNumberInBody += distance;

        // Handle earlier comments
        commentCount = 0;
        for (let commentLineInProgram in this.comments) {
            if (commentLineInProgram <= lineNumberInProgram) {
                var comment = this.comments[commentLineInProgram].split("|", 2);

                if (parseInt(comment[0], 10) / 4 == this.levelIndex - 1) {
                    var commentLine = comment[1]
                    var commentChild = this.ast_Comment(commentLine, commentLineInProgram);
                    this.highestLineSeen += 1

                    if (previousLineInProgram == null) {
                        nestChild(commentChild);
                    } else {
                        let skipped_previous_line = Math.abs(previousLineInProgram - commentLineInProgram) > 1;
                        if (is_top_level && skipped_previous_line) {
                            addPeer(commentChild);
                        } else {
                            nestChild(commentChild);
                        }
                    }
                    previousLineInProgram = commentLineInProgram;
                    this.highestLineSeen = Math.max(this.highestLineSeen, parseInt(commentLineInProgram, 10));
                    distance = lineNumberInProgram - previousLineInProgram;
                    delete this.comments[commentLineInProgram];
                    commentCount += 1;
                }
                visitedFirstLine = true;
                previousWasStatement = true;
            }
        }

        distance = lineNumberInProgram - this.highestLineSeen;
        this.highestLineSeen = Math.max(lineNumberInProgram, this.highestLineSeen);

        // Now convert the actual node
        var height = this.heights.shift();
        var originalSourceCode = this.getSourceCode(lineNumberInProgram, height);
        var newChild = this.convertStatement(node[i], originalSourceCode, parent);

        // Skip null blocks (e.g., imports)
        if (newChild == null) {
            continue;
        }

        skipped_line = distance > 1;
        previousLineInProgram = lineNumberInProgram;
        previousHeight = height;

        // Handle top-level expression blocks
        if (is_top_level && newChild.constructor === Array) {
            addPeer(newChild[0]);
        // Handle skipped line
        } else if (is_top_level && skipped_line && visitedFirstLine) {
            addPeer(newChild);
        // The previous line was not a Peer
        } else if (is_top_level && !previousWasStatement) {
            addPeer(newChild);
        // Otherwise, always embed it in there.
        } else {
            nestChild(newChild);
        }
        previousWasStatement = newChild.constructor !== Array;

        visitedFirstLine = true;
    }


    // Handle comments that are on the very last line
    var lastLineNumber = lineNumberInProgram + 1;
    if (lastLineNumber in this.comments) {
        let comment = this.comments[lastLineNumber].split("|", 2)

        if (parseInt(comment[0], 10) / 4 === this.levelIndex - 1) {
            var lastComment = comment[1];

            let commentChild = this.ast_Comment(lastComment, lastLineNumber);

            if (is_top_level && !previousWasStatement) {
                addPeer(commentChild);
            } else {
                nestChild(commentChild);
            }
            delete this.comments[lastLineNumber];
            this.highestLineSeen += 1
        }
    }

    // Handle any extra comments that stuck around
    if (is_top_level) {
        for (var commentLineInProgram in this.comments) {
            let comment = this.comments[commentLineInProgram].split("|", 2)

            if (parseInt(comment[0], 10) / 4 == this.levelIndex - 1) {
              var commentInProgram = comment[1];

              let commentChild = this.ast_Comment(commentInProgram, commentLineInProgram);

              distance = commentLineInProgram - previousLineInProgram;

                if (previousLineInProgram == null) {
                    addPeer(commentChild);
                } else if (distance > 1) {
                    addPeer(commentChild);
                } else {
                    nestChild(commentChild);
                }

                previousLineInProgram = commentLineInProgram;
                delete this.comments[lastLineNumber];
            }
        }
    }


    finalizePeers();

    this.levelIndex -= 1;

    return children;
};

BlockMirrorTextToBlocks.prototype.isTopLevel = function (ast) {

    return !ast || (
        ast instanceof Sk.astnodes.Module ||
        ast instanceof Sk.astnodes.Expression ||
        ast instanceof Sk.astnodes.Interactive ||
        ast instanceof Sk.astnodes.Suite
    )
};

BlockMirrorTextToBlocks.prototype.isStatementContainer = function(ast) {
    return this.isTopLevel(ast) || ast instanceof Sk.astnodes.FunctionDef || ast instanceof Sk.astnodes.Expr && this.isStatementContainer(ast._parent)
}

BlockMirrorTextToBlocks.prototype.isStatement = function(ast) {
    if (ast instanceof Sk.astnodes.FunctionDef) {
        return ast.decorator_list.includes(ast)
    }
    return this.isStatementContainer(ast._parent)
}

BlockMirrorTextToBlocks.prototype.convert = function (node, parent) {
    let functionName = 'ast_' + node._astname;
    if (this[functionName] === undefined) {
        throw new Error("Could not find function: " + functionName);
    }
    node._parent = parent;
    return this[functionName](node, parent);
};

function arrayMax(array) {
    return array.reduce(function (a, b) {
        return Math.max(a, b);
    });
}

function arrayMin(array) {
    return array.reduce(function (a, b) {
        return Math.min(a, b);
    });
}

BlockMirrorTextToBlocks.prototype.convertStatement = function (node, full_source, parent) {
    try {
        return this.convert(node, parent);
    } catch (e) {
        let heights = this.getChunkHeights(node);
        let extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
        console.error(e);
        return BlockMirrorTextToBlocks.raw_block(extractedSource);
    }
};

BlockMirrorTextToBlocks.prototype.getChunkHeights = function (node) {
    let lineNumbers = [];
    if (Object.hasOwn(node, "lineno")) {
        lineNumbers.push(node.lineno);
    }
    if (Object.hasOwn(node, "body")) {
        for (let i = 0; i < node.body.length; i += 1) {
            let subnode = node.body[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    if (Object.hasOwn(node, "orelse")) {
        for (let i = 0; i < node.orelse.length; i += 1) {
            let subnode = node.orelse[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    return lineNumbers;
};

BlockMirrorTextToBlocks.create_block = function (type, lineNumber, fields, values, settings, mutations, statements) {
    var newBlock = document.createElement("block");
    // Settings
    newBlock.setAttribute("type", type);
    newBlock.setAttribute("line_number", lineNumber);
    for (let setting in settings) {
        let settingValue = settings[setting];
        newBlock.setAttribute(setting, settingValue);
    }
    // Mutations
    if (mutations !== undefined && Object.keys(mutations).length > 0) {
        let newMutation = document.createElement("mutation");
        for (let mutation in mutations) {
            let mutationValue = mutations[mutation];
            if (mutation.charAt(0) === '@') {
                newMutation.setAttribute(mutation.substring(1), mutationValue);
            } else if (mutationValue != null && mutationValue.constructor === Array) {
                for (let i = 0; i < mutationValue.length; i++) {
                    let mutationNode = document.createElement(mutation);
                    mutationNode.setAttribute("name", mutationValue[i]);
                    newMutation.appendChild(mutationNode);
                }
            } else {
                let mutationNode = document.createElement("arg");
                if (mutation.charAt(0) === '!') {
                    mutationNode.setAttribute("name", "");
                } else {
                    mutationNode.setAttribute("name", mutation);
                }
                if (mutationValue !== null) {
                    mutationNode.appendChild(mutationValue);
                }
                newMutation.appendChild(mutationNode);
            }
        }
        newBlock.appendChild(newMutation);
    }
    // Fields
    for (let field in fields) {
        let fieldValue = fields[field];
        let newField = document.createElement("field");
        newField.setAttribute("name", field);
        newField.appendChild(document.createTextNode(fieldValue));
        newBlock.appendChild(newField);
    }
    // Values
    for (let value in values) {
        let valueValue = values[value];
        let newValue = document.createElement("value");
        if (valueValue !== null) {
            newValue.setAttribute("name", value);
            newValue.appendChild(valueValue);
            newBlock.appendChild(newValue);
        }
    }
    // Statements
    if (statements !== undefined && Object.keys(statements).length > 0) {
        for (let statement in statements) {
            let statementValue = statements[statement];
            if (statementValue !== null) {
                for (let i = 0; i < statementValue.length; i += 1) {
                    // In most cases, you really shouldn't ever have more than
                    //  one statement in this list. I'm not sure Blockly likes
                    //  that.
                    let newStatement = document.createElement("statement");
                    newStatement.setAttribute("name", statement);
                    newStatement.appendChild(statementValue[i]);
                    newBlock.appendChild(newStatement);
                }
            }
        }
    }
    return newBlock;
};

BlockMirrorTextToBlocks.raw_block = function (txt, lineno=0) {
    return BlockMirrorTextToBlocks.create_block("ast_Raw", lineno, {"TEXT": txt});
};

BlockMirrorTextToBlocks.BLOCKS = [];

BlockMirrorTextToBlocks.prototype['ast_Module'] = function (node) {
    return this.convertBody(node.body, node);
};

BlockMirrorTextToBlocks.prototype['ast_Interactive'] = function (node) {
    return this.convertBody(node.body, node);
};

BlockMirrorTextToBlocks.prototype['ast_Expression'] = BlockMirrorTextToBlocks.prototype['ast_Interactive'];
BlockMirrorTextToBlocks.prototype['ast_Suite'] = BlockMirrorTextToBlocks.prototype['ast_Module'];

BlockMirrorTextToBlocks.prototype['ast_Pass'] = function () {
    return null; //block("controls_pass");
};


BlockMirrorTextToBlocks.prototype.convertElements = function (key, values, parent) {
    var output = {};
    for (var i = 0; i < values.length; i++) {
        output[key + i] = this.convert(values[i], parent);
    }
    return output;
};

python.pythonGenerator.blank = '___';

BlockMirrorTextToBlocks.prototype.LOCKED_BLOCK = {
    "inline": "true",
    'deletable': "false",
    "movable": "false"
};

BlockMirrorTextToBlocks.COLOR = {
    VARIABLES: 225,
    FUNCTIONS: 210,
    OO: 240,
    CONTROL: 270,
    MATH: 190,
    TEXT: 120,
    FILE: 170,
    PLOTTING: 140,
    LOGIC: 345,
    PYTHON: 60,
    EXCEPTIONS: 300,
    SEQUENCES: 15,
    LIST: 30,
    DICTIONARY: 0,
    SET: 10,
    TUPLE: 20
};


BlockMirrorTextToBlocks.prototype.getAsModule = function (node) {
    if (node._astname === 'Name') {
        return Sk.ffi.remapToJs(node.id);
    } else if (node._astname === 'Call') {
        return this.getAsModule(node.func)
    } else if (node._astname === 'Attribute') {
        let origin = this.getAsModule(node.value);
        if (origin !== null) {
            return origin + '.' + Sk.ffi.remapToJs(node.attr);
        }
    } else {
        return null;
    }
};

BlockMirrorTextToBlocks.prototype.resolveFromLibrary = function(node) {
    if (node._astname === 'Name') {
        let name = Sk.ffi.remapToJs(node.id);

        // First check if this may be a globally known variable
        let resolved = this.blockMirror.libraries.resolve(name)

        if (resolved) {
          return resolved;
        }
        let fullTypeName = this.imports.getType(name) ?? name
        return this.blockMirror.libraries.resolve(fullTypeName)
    } else if (node._astname === 'Call') {
        let name = Sk.ffi.remapToJs(node.func.id)
        let fullTypeName = this.imports.getType(name) ?? name
        let resolved = this.blockMirror.libraries.resolve(fullTypeName)

        if (resolved instanceof PythonClass) {
            return resolved
        } else if (resolved instanceof PythonFunction && resolved.typeHint) {
            return resolved.typeHint.resolveSingleClass()
        }
    } else if (node._astname === 'Attribute') {
        let caller = node.value;
        let potentialModule = this.getAsModule(caller);

        if (potentialModule) {
          let resolvedFromLibrary = this.variables.getSingleType(potentialModule) ?? this.blockMirror.libraries.resolve(potentialModule);

          let fullTypeName

          if (resolvedFromLibrary instanceof PythonAttribute) {
            fullTypeName = resolvedFromLibrary.typeHint.value;
          } else if (resolvedFromLibrary) {
            fullTypeName = resolvedFromLibrary.fullName;
          } else {
            fullTypeName = this.imports.getType(potentialModule) ?? potentialModule;
          }

          let attributeName = Sk.ffi.remapToJs(node.attr);
          return this.blockMirror.libraries.resolve(
            fullTypeName + "." + attributeName,
          );
        }
        let callerBlock = this.convert(caller, node._parent) // TODO caller node

        if (!callerBlock?.children) {
            return null
        }

        let mutationElement = callerBlock.children[0]

        // TODO is this clean/reliable enough?
        if (mutationElement && (/^mutation$/i).test(mutationElement.tagName)) {
            let attributeName = Sk.ffi.remapToJs(node.attr);
            return this.blockMirror.libraries.resolve(mutationElement.getAttribute('returns') + "." + attributeName)
        }
    }

    return null
}
