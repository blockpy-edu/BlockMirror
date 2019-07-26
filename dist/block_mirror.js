/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Python.init = function (workspace) {
    /**
     * Empty loops or conditionals are not allowed in Python.
     */
    Blockly.Python.PASS = this.INDENT + 'pass\n';
    // Create a dictionary of definitions to be printed before the code.
    Blockly.Python.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.Python.functionNames_ = Object.create(null);

    if (!Blockly.Python.variableDB_) {
        Blockly.Python.variableDB_ =
            new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
    } else {
        Blockly.Python.variableDB_.reset();
    }

    Blockly.Python.variableDB_.setVariableMap(workspace.getVariableMap());

    var defvars = [];
    // Add developer variables (not created or named by the user).
    /*
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
        defvars.push(Blockly.Python.variableDB_.getName(devVarList[i],
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
    }

    // Add user variables, but only ones that are being used.
    var variables = Blockly.Variables.allUsedVarModels(workspace);
    for (var i = 0; i < variables.length; i++) {
        defvars.push(Blockly.Python.variableDB_.getName(variables[i].getId(),
            Blockly.Variables.NAME_TYPE) + ' = None');
    }

    Blockly.Python.definitions_['variables'] = defvars.join('\n');
     */
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var imports = [];
    var definitions = [];
    for (var name in Blockly.Python.definitions_) {
        var def = Blockly.Python.definitions_[name];
        if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }
    // Clean up temporary data.
    delete Blockly.Python.definitions_;
    delete Blockly.Python.functionNames_;
    Blockly.Python.variableDB_.reset();
    // acbart: Don't actually inject initializations - we don't need 'em.
    return code;
};

Blockly.Python.INDENT = '    ';

Blockly.Python.RESERVED_WORDS_ = (
    "False,None,True,and,as,assert,break,class," +
    "continue,def,del,elif,else,except,finally,for," +
    "from,global,if,import,in,is,lambda,nonlocal," +
    "not,or,pass,raise,return,try,while,with,yield"
);

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function (line) {
    // acbart: Remove extra new line
    return line;
};


/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Variables.flyoutCategoryBlocks = function (workspace) {
    var variableModelList = workspace.getVariablesOfType('');

    var xmlList = [];
    if (variableModelList.length > 0) {
        // New variables are added to the end of the variableModelList.
        var mostRecentVariableFieldXmlString =
                variableModelList[variableModelList.length - 1];
        if (Blockly.Blocks['ast_Assign']) {
            var gap = Blockly.Blocks['ast_AugAssign'] ? 8 : 24;
            var blockText = '<xml>' +
                '<block type="ast_Assign" gap="' + gap + '">' +
                mostRecentVariableFieldXmlString +
                '</block>' +
                '</xml>';
            var block = Blockly.Xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }
        if (Blockly.Blocks['ast_AugAssign']) {
            var gap = Blockly.Blocks['ast_Name'] ? 20 : 8;
            var blockText = '<xml>' +
                '<block type="ast_AugAssign" gap="' + gap + '">' +
                mostRecentVariableFieldXmlString +
                '<value name="VALUE">' +
                '<shadow type="ast_Num">' +
                '<field name="NUM">1</field>' +
                '</shadow>' +
                '</value>' +
                '<mutation options="false" simple="true"></mutation>' +
                '</block>' +
                '</xml>';
            var block = Blockly.Xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }

        if (Blockly.Blocks['ast_Name']) {
            variableModelList.sort(Blockly.VariableModel.compareByName);
            for (var i = 0, variable; variable = variableModelList[i]; i++) {
                var block = Blockly.utils.xml.createElement('block');
                block.setAttribute('type', 'ast_Name');
                block.setAttribute('gap', 8);
                block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
                xmlList.push(block);
            }
        }
    }
    return xmlList;
};
/**

 External visible stuff

 Changing mode/code can fail on the block side

 setMode(mode) -> bool
 setCode(filename, code) -> bool
 setHighlight(line) -> bool
 setReadOnly(isReadOnly)
 setToolbox(string)
 'basic'
 'advanced'
 'complete'
 list[list[string]]
 onChange(event) ->
 onModeChange
 onCodeChange

 getCode() -> string
 getMode() -> string
 getImage(callback)

 lastBlockConversionFailure: {} or null


 */

/**
 *
 */
function BlockMirror(configuration) {
    this.validateConfiguration(configuration);
    this.initializeVariables();
    this.textEditor = new BlockMirrorTextEditor(this);
    this.blockEditor = new BlockMirrorBlockEditor(this);
    this.textToBlocks = new BlockMirrorTextToBlocks(this);

    if (!this.configuration.skipSkulpt) {
        this.loadSkulpt();
    }

    this.setMode(this.configuration.viewMode);
};

BlockMirror.prototype.validateConfiguration = function (configuration) {
    this.configuration = {};

    // Container
    if ('container' in configuration) {
        this.configuration.container = configuration.container;
    } else {
        throw new Error('Invalid configuration: Missing "container" property.')
    }

    // blocklyPath
    if ('blocklyMediaPath' in configuration) {
        this.configuration.blocklyMediaPath = configuration.blocklyMediaPath;
    } else {
        this.configuration.blocklyMediaPath = '../../blockly/media/';
    }

    // Run function
    if ('run' in configuration) {
        this.configuration.run = configuration.run;
    } else {
        this.configuration.run = function () {
            console.log('Ran!');
        };
    }

    // readOnly
    this.configuration['readOnly'] = configuration['readOnly'] || false;

    // height
    this.configuration.height = configuration.height || '500px';

    // viewMode
    this.configuration.viewMode = configuration.viewMode || 'split';

    // Need to load skulpt?
    this.configuration.skipSkulpt = configuration.skipSkulpt || false;

    // Delay?
    this.configuration.blockDelay = configuration.blockDelay || false;
}

BlockMirror.prototype.initializeVariables = function () {
    this.tags = {
        'toolbar': document.createElement('div'),
        'blockContainer': document.createElement('div'),
        'blockEditor': document.createElement('div'),
        'blockArea': document.createElement('div'),
        'textSidebar': document.createElement('div'),
        'textContainer': document.createElement('div'),
        'textArea': document.createElement('textarea'),
    };
    // Toolbar
    this.configuration.container.appendChild(this.tags.toolbar);
    // Block side
    this.configuration.container.appendChild(this.tags.blockContainer);
    this.tags.blockContainer.appendChild(this.tags.blockEditor);
    this.tags.blockContainer.appendChild(this.tags.blockArea);
    // Text side
    this.configuration.container.appendChild(this.tags.textContainer);
    this.tags.textContainer.appendChild(this.tags.textSidebar);
    this.tags.textContainer.appendChild(this.tags.textArea);

    for (var name in this.tags) {
        this.tags[name].style['box-sizing'] = 'border-box';
    }

    // Files
    this.code_ = "";
    this.mode_ = null;

    // Update Flags
    this.silenceBlock = false;
    this.silenceBlockTimer = null;
    this.silenceText = false;
    this.silenceModel = 0;
    this.blocksFailed = false;
    this.blocksFailedTimeout = null;
    this.triggerOnChange = null;
    this.firstEdit = true;

    // Toolbox width
    this.blocklyToolboxWidth = 0;

    // Listeners
    this.listeners_ = [];
}

BlockMirror.prototype.loadSkulpt = function () {
    Sk.configure({
        __future__: Sk.python3,
        read: function (filename) {
            if (Sk.builtinFiles === undefined ||
                Sk.builtinFiles["files"][filename] === undefined) {
                throw "File not found: '" + filename + "'";
            }
            return Sk.builtinFiles["files"][filename];
        }
    });
};

BlockMirror.prototype.addChangeListener = function (callback) {
    this.listeners_.push(callback);
};

BlockMirror.prototype.fireChangeListener = function (event) {
    for (let i = 0, func; func = this.listeners_[i]; i++) {
        func(event);
    }
};

BlockMirror.prototype.setCode = function (code, quietly) {
    this.code_ = code;
    if (!quietly) {
        this.blockEditor.setCode(code, true);
        this.textEditor.setCode(code, true);
    }
    this.fireChangeListener({'name': 'changed', 'value': code});
};

BlockMirror.prototype.getCode = function () {
    return this.code_;
};

BlockMirror.prototype.getMode = function () {
    return this.mode_;
};

BlockMirror.prototype.setMode = function (mode) {
    this.mode_ = mode;
    this.blockEditor.setMode(mode);
    this.textEditor.setMode(mode);
};

BlockMirror.prototype.setReadOnly = function (isReadOnly) {
    this.textEditor.setReadOnly(isReadOnly);
    this.blockEditor.setReadOnly(isReadOnly);
    this.configuration.container.toggleClass("block-mirror-read-only", isReadOnly);
};

BlockMirror.prototype.VISIBLE_MODES = {
    'block': ['block', 'split'],
    'text': ['text', 'split']
};

exports = BlockMirror;
function BlockMirrorTextEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.textContainer = blockMirror.tags.textContainer;
    this.textArea = blockMirror.tags.textArea;
    this.textSidebar = blockMirror.tags.textSidebar;

    // notification
    this.silentEvents_ = false;

    // Do we need to force an update?
    this.outOfDate_ = null;

    // Use a timer to swallow updates
    this.updateTimer_ = null;

    let codeMirrorOptions = {
        mode: {
            name: 'python',
            version: 3,
            singleLineStringErrors: false
        },
        readOnly: blockMirror.configuration.readOnly,
        showCursorWhenSelecting: true,
        lineNumbers: true,
        firstLineNumber: 1,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        matchBrackets: true,
        extraKeys: {
            'Tab': 'indentMore',
            'Shift-Tab': 'indentLess',
            'Ctrl-Enter': blockMirror.run,
            'Esc': function(cm) {
                if (cm.getOption("fullScreen")) {
                    cm.setOption("fullScreen", false);
                } else {
                    cm.display.input.blur();
                }
            },
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {

            }
        },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    };
    this.codeMirror = CodeMirror.fromTextArea(this.textArea, codeMirrorOptions);
    this.codeMirror.on('change', this.changed.bind(this));
    this.codeMirror.setSize(null, '100%');
    this.textContainer.style.border = '1px solid lightgray';
    this.textContainer.style.float = 'left';
    this.updateWidth();
    this.textContainer.style.height = blockMirror.configuration.height;
    // Style sidebar
    this.textSidebar.style.height = '100%';
    this.textSidebar.style.float = 'left';
    this.textSidebar.style.backgroundColor = '#ddd';

    // TODO: Finish implementing code completion
    /*this.codeMirror.on('inputRead', function onChange(editor, input) {
        if (input.text[0] === ';' || input.text[0] === ' ' || input.text[0] === ":") {
            return;
        }
        editor.showHint({
            hint: CodeMirror.pythonHint
        });
    });*/
}

BlockMirrorTextEditor.prototype.defocus = function () {
    this.codeMirror.display.input.blur();
}

BlockMirrorTextEditor.prototype.updateWidth = function () {
    var newWidth = '0%';
    /*if (this.blockMirror.views.includes('text')) {
        newWidth = (100 / this.blockMirror.views.length)+'%';
    }
    this.textContainer.style.width = newWidth;*/
}

BlockMirrorTextEditor.prototype.setReadOnly = function (isReadOnly) {
    this.codeMirror.setOption('readOnly', isReadOnly);
};

BlockMirrorTextEditor.prototype.VIEW_CONFIGURATIONS = {
    'split': {
        'width': '40%',
        'visible': true,
        'indentSidebar': false
    },
    'text': {
        'width': '100%',
        'visible': true,
        'indentSidebar': true
    },
    'block': {
        'width': '0%',
        'visible': false,
        'indentSidebar': false
    }
};

BlockMirrorTextEditor.prototype.setMode = function (mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    // If there is an update waiting and we're visible, then update
    if (this.outOfDate_ !== null && this.isVisible()) {
        this.setCode(this.outOfDate_, true);
    }
    // Show/hide editor
    this.textContainer.style.width = configuration.width;
    if (configuration.visible) {
        this.textContainer.style.height = this.blockMirror.configuration.height;
        this.textContainer.style.display = 'block';
        this.codeMirror.getWrapperElement().style.display = 'block';
        this.codeMirror.refresh();
    } else {
        this.textContainer.style.height = '0%';
        this.textContainer.style.display = 'none';
        this.codeMirror.getWrapperElement().style.display = 'none';
    }
    // Should we indent the toolbox
    if (configuration.indentSidebar) {
        let gutters = this.textContainer.querySelector('.CodeMirror-gutters');
        let gutterWidth = gutters.offsetWidth;
        let toolbarWidth = this.blockMirror.blockEditor.getToolbarWidth();
        let newGutterWidth = toolbarWidth - gutterWidth - 2;
        this.textSidebar.style.width = newGutterWidth + 'px';
        this.textSidebar.style.display = 'block';
    } else {
        this.textSidebar.style.display = 'none';
        this.textSidebar.style.width = '0px';
    }
}

BlockMirrorTextEditor.prototype.setCode = function (code, quietly) {
    this.silentEvents_ = quietly;

    // Defaults to a single blank line
    code = (code === undefined || code.trim() === "") ? "\n" : code;

    if (this.isVisible()) {
        this.codeMirror.setValue(code);
        this.outOfDate_ = null;
    } else {
        this.outOfDate_ = code;
    }
};

BlockMirrorTextEditor.prototype.getCode = function () {
    return this.codeMirror.getValue();
};

BlockMirrorTextEditor.prototype.changed = function (codeMirror, event) {
    if (!this.silentEvents_) {
        let handleChange = () => {
            let newCode = this.getCode();
            this.blockMirror.blockEditor.setCode(newCode, true);
            this.blockMirror.code_ = newCode;
        };
        if (this.blockMirror.configuration.blockDelay === false) {
            handleChange();
        } else {
            if (this.updateTimer_ !== null) {
                clearTimeout(this.updateTimer_);
            }
            this.updateTimer_ = setTimeout(handleChange, this.blockMirror.configuration.blockDelay);
        }
    }
    this.silentEvents_ = false;
};

BlockMirrorTextEditor.prototype.isVisible = function () {
    return this.blockMirror.VISIBLE_MODES.text.indexOf(this.blockMirror.mode_) !== -1;
};
/**
 * Worth noting - Blockly uses a setTimeOut of 0 steps to make events
 * wait. That has some confusing interaction with trying to make things percolate.
 * @param blockMirror
 * @constructor
 */

function BlockMirrorBlockEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.blockContainer = blockMirror.tags.blockContainer;
    this.blockEditor = blockMirror.tags.blockEditor;
    this.blockArea = blockMirror.tags.blockArea;

    // Null, or the source of the last update
    this.outOfDate_ = null;

    // Inject Blockly
    let blocklyOptions = {
        media: blockMirror.configuration.blocklyMediaPath,
        // We use special comment blocks
        zoom: {controls: true},
        comments: false,
        disable: false,
        oneBasedIndex: false,
        readOnly: blockMirror.configuration.readOnly,
        scrollbars: true,
        toolbox: this.makeToolbox()
    }
    this.workspace = Blockly.inject(blockMirror.tags.blockEditor,
        blocklyOptions);
    // Configure Blockly
    this.workspace.addChangeListener(this.changed.bind(this));

    // Configure Blockly DIV
    //blockMirror.tags.blockEditor.style.resize = 'horizontal';
    this.blockContainer.style.float = 'left';
    this.blockEditor.style.position = 'absolute';
    this.blockEditor.style.width = '100%';
    this.blockArea.style.height = blockMirror.configuration.height;

    window.addEventListener('resize', this.resized.bind(this), false);
    this.resized();
}

BlockMirrorBlockEditor.prototype.updateWidth = function () {
    var newWidth = '0%';
    this.resized();
}

BlockMirrorBlockEditor.prototype.resized = function (e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var blockArea = this.blockMirror.tags.blockArea;
    var current = blockArea;
    var x = 0;
    var y = 0;
    do {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    } while (current);
    // Position blocklyDiv over blockArea.
    var blockEditor = this.blockMirror.tags.blockEditor;
    blockEditor.style.left = x + 'px';
    blockEditor.style.top = y + 'px';
    blockEditor.style.width = blockArea.offsetWidth + 'px';
    blockEditor.style.height = blockArea.offsetHeight + 'px';
    Blockly.svgResize(this.workspace);
}

BlockMirrorBlockEditor.prototype.makeToolbox = function () {
    var xml = '<xml id="toolbox" style="display: none">';
    xml += '<category name="Variables" custom="VARIABLE" colour="240">' +
        '</category>';
    xml += '<category name="Iteration" colour="300">' +
        '<block type="ast_For"></block>' +
        '<block type="ast_ForElse"></block>' +
        '</category>';
    xml += '<category name="Values" colour="300">' +
        '<block type="ast_Num"></block>' +
        '</category>';
    //xml += '<category name="Values" colour="300"><button value="From Code">From Code</button></category>';
    xml += '</xml>';
    return xml;
};

BlockMirrorBlockEditor.prototype.remakeToolbox = function () {
    this.workspace.updateToolbox(this.makeToolbox());
    this.resized();
};

/**
 * Retrieves the current width of the Blockly Toolbox, unless
 * we're in read-only mode (when there is no toolbox).
 * @returns {Number} The current width of the toolbox.
 */
BlockMirrorBlockEditor.prototype.getToolbarWidth = function () {
    if (this.blockMirror.configuration.readOnly) {
        return 0;
    } else {
        return this.workspace.toolbox_.width;
    }
}

BlockMirrorBlockEditor.prototype.VIEW_CONFIGURATIONS = {
    'split': {
        'width': '60%',
        'visible': true
    },
    'block': {
        'width': '100%',
        'visible': true
    },
    'text': {
        'width': '0%',
        'visible': false
    }
}

BlockMirrorBlockEditor.prototype.setMode = function (mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];

    // Show/hide editor
    this.blockContainer.style.width = configuration.width;
    this.workspace.setVisible(configuration.visible);
    if (configuration.visible) {
        this.blockContainer.style.height = this.blockMirror.configuration.height;
        this.blockEditor.style.width = '100%';
        this.resized();
    } else {
        this.blockContainer.style.height = '0%';
    }

    // If there is an update waiting and we're visible, then update
    if (this.outOfDate_ !== null && this.isVisible()) {
        this.setCode(this.outOfDate_, true);
    }
};

/**
 * Attempts to update the model for the current code file from the
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.getCode = function () {
    return Blockly.Python.workspaceToCode(this.workspace);
};

/**
 * Attempts to update the model for the current code file from the
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.setCode = function (code, quietly) {
    if (this.isVisible()) {
        let result = this.blockMirror.textToBlocks.convertSource('__main__.py', code);
        if (quietly) {
            Blockly.Events.disable();
        }
        try {
            let xml_code = Blockly.Xml.textToDom(result.xml);
            this.workspace.clear();
            Blockly.Xml.domToWorkspace(xml_code, this.workspace);
            this.workspace.cleanUp();
        } catch (error) {
            console.error(error);
        }
        if (quietly) {
            Blockly.Events.enable();
        }
        this.outOfDate_ = null;
    } else {
        this.outOfDate_ = code;
    }
}

BlockMirrorBlockEditor.prototype.BLOCKLY_CHANGE_EVENTS = [
    Blockly.Events.CREATE, Blockly.Events.DELETE, Blockly.Events.CHANGE, Blockly.Events.MOVE
];

BlockMirrorBlockEditor.prototype.changed = function (event) {
    if ((event === undefined || this.BLOCKLY_CHANGE_EVENTS.indexOf(event.type) !== -1) &&
        !this.workspace.isDragging()) {
        let newCode = this.getCode();
        this.blockMirror.textEditor.setCode(newCode, true);
        this.blockMirror.code_ = newCode;
    }
};

BlockMirrorBlockEditor.prototype.isVisible = function () {
    return this.blockMirror.VISIBLE_MODES.block.indexOf(this.blockMirror.mode_) !== -1;
};
function BlockMirrorTextToBlocks(blockMirror) {
    this.blockMirror = blockMirror;
    this.strictAnnotations = ['int', 'float', 'str', 'bool'];
    Blockly.defineBlocksWithJsonArray(BlockMirrorTextToBlocks.BLOCKS);
}

BlockMirrorTextToBlocks.xmlToString = function (xml) {
    return new XMLSerializer().serializeToString(xml);
}

BlockMirrorTextToBlocks.prototype.convertSourceToCodeBlock = function (python_source) {
    var xml = document.createElement("xml");
    xml.appendChild(BlockMirrorTextToBlocks.raw_block(python_source));
    return BlockMirrorTextToBlocks.xmlToString(xml);
}

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
    var xml = document.createElement("xml");
    // Attempt parsing - might fail!
    var parse, ast = null, symbol_table, error;
    let badChunks = [];
    let originalSource = python_source;
    this.source = python_source.split("\n");
    let previousLine = 1+this.source.length;
    while (ast === null) {
        if (python_source.trim() === "") {
            return {"xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": null};
        }
        try {
            parse = Sk.parse(filename, python_source);
            ast = Sk.astFromParse(parse.cst, filename, parse.flags);
        } catch (e) {
            error = e;
            if (e.traceback && e.traceback.length && e.traceback[0].lineno &&
                e.traceback[0].lineno < previousLine) {
                previousLine = e.traceback[0].lineno - 1;
                badChunks = badChunks.concat(this.source.slice(previousLine));
                this.source = this.source.slice(0, previousLine);
                python_source = this.source.join("\n");
            } else {
                xml.appendChild(BlockMirrorTextToBlocks.raw_block(originalSource));
                return {"xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": error};
            }
        }
    }
    this.comments = {};
    for (var commentLocation in parse.comments) {
        var lineColumn = commentLocation.split(",");
        var yLocation = parseInt(lineColumn[0], 10);
        this.comments[yLocation] = parse.comments[commentLocation];
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
        xml.appendChild(BlockMirrorTextToBlocks.raw_block(badChunks.join("\n")));
    }
    return {
        "xml": BlockMirrorTextToBlocks.xmlToString(xml), "error": null,
        "lineMap": this.lineMap, 'comments': this.comments
    };
}

BlockMirrorTextToBlocks.prototype.recursiveMeasure = function (node, nextBlockLine) {
    if (node === undefined) {
        return;
    }
    var myNext = nextBlockLine;
    if ("orelse" in node && node.orelse.length > 0) {
        if (node.orelse.length == 1 && node.orelse[0]._astname == "If") {
            myNext = node.orelse[0].lineno - 1;
        } else {
            myNext = node.orelse[0].lineno - 1 - 1;
        }
    }
    this.heights.push(nextBlockLine);
    if ("body" in node) {
        for (var i = 0; i < node.body.length; i++) {
            var next;
            if (i + 1 == node.body.length) {
                next = myNext;
            } else {
                next = node.body[i + 1].lineno - 1;
            }
            this.recursiveMeasure(node.body[i], next);
        }
    }
    if ("orelse" in node) {
        for (var i = 0; i < node.orelse.length; i++) {
            var next;
            if (i == node.orelse.length) {
                next = nextBlockLine;
            } else {
                next = 1 + (node.orelse[i].lineno - 1);
            }
            this.recursiveMeasure(node.orelse[i], next);
        }
    }
}

BlockMirrorTextToBlocks.prototype.measureNode = function (node) {
    this.heights = [];
    this.recursiveMeasure(node, this.source.length - 1);
    this.heights.shift();
}

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
}

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
        previousWasStatement = false;
    visitedFirstLine = false;

    // Iterate through each node
    for (var i = 0; i < node.length; i++) {
        lineNumberInBody += 1;

        lineNumberInProgram = node[i].lineno;
        distance = 0, wasFirstLine = true;
        if (previousLineInProgram != null) {
            distance = lineNumberInProgram - previousLineInProgram - 1;
            wasFirstLine = false;
        }
        lineNumberInBody += distance;

        // Handle earlier comments
        commentCount = 0;
        for (var commentLineInProgram in this.comments) {
            if (commentLineInProgram < lineNumberInProgram) {
                commentChild = this.ast_Comment(this.comments[commentLineInProgram], commentLineInProgram);
                if (previousLineInProgram == null) {
                    nestChild(commentChild);
                } else {
                    skipped_previous_line = Math.abs(previousLineInProgram - commentLineInProgram) > 1;
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
        if (is_top_level && newChild.constructor == Array) {
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
        commentChild = this.ast_Comment(this.comments[lastLineNumber], lastLineNumber);
        nestChild(commentChild);
        delete this.comments[lastLineNumber];
    }

    // Handle any extra comments that stuck around
    if (is_top_level) {
        for (var commentLineInProgram in this.comments) {
            commentChild = this.ast_Comment(this.comments[commentLineInProgram], commentLineInProgram);
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


    finalizePeers();

    this.levelIndex -= 1;

    return children;
};

BlockMirrorTextToBlocks.prototype.TOP_LEVEL_NODES = ['Module', 'Expression', 'Interactive', 'Suite'];

BlockMirrorTextToBlocks.prototype.isTopLevel = function (parent) {

    return !parent || this.TOP_LEVEL_NODES.indexOf(parent._astname) !== -1;
};

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
        heights = this.getChunkHeights(node);
        extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
        console.error(e);
        return BlockMirrorTextToBlocks.raw_block(extractedSource);
    }
}

BlockMirrorTextToBlocks.prototype.getChunkHeights = function (node) {
    var lineNumbers = [];
    if (node.hasOwnProperty("lineno")) {
        lineNumbers.push(node.lineno);
    }
    if (node.hasOwnProperty("body")) {
        for (var i = 0; i < node.body.length; i += 1) {
            var subnode = node.body[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    if (node.hasOwnProperty("orelse")) {
        for (var i = 0; i < node.orelse.length; i += 1) {
            var subnode = node.orelse[i];
            lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
        }
    }
    return lineNumbers;
}

BlockMirrorTextToBlocks.create_block = function (type, lineNumber, fields, values, settings, mutations, statements) {
    var newBlock = document.createElement("block");
    // Settings
    newBlock.setAttribute("type", type);
    newBlock.setAttribute("line_number", lineNumber);
    for (var setting in settings) {
        var settingValue = settings[setting];
        newBlock.setAttribute(setting, settingValue);
    }
    // Mutations
    if (mutations !== undefined && Object.keys(mutations).length > 0) {
        var newMutation = document.createElement("mutation");
        for (let mutation in mutations) {
            var mutationValue = mutations[mutation];
            if (mutation.charAt(0) === '@') {
                newMutation.setAttribute(mutation.substr(1), mutationValue);
            } else if (mutationValue != null && mutationValue.constructor === Array) {
                for (var i = 0; i < mutationValue.length; i++) {
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
    for (var field in fields) {
        var fieldValue = fields[field];
        var newField = document.createElement("field");
        newField.setAttribute("name", field);
        newField.appendChild(document.createTextNode(fieldValue));
        newBlock.appendChild(newField);
    }
    // Values
    for (var value in values) {
        var valueValue = values[value];
        var newValue = document.createElement("value");
        if (valueValue !== null) {
            newValue.setAttribute("name", value);
            newValue.appendChild(valueValue);
            newBlock.appendChild(newValue);
        }
    }
    // Statements
    if (statements !== undefined && Object.keys(statements).length > 0) {
        for (var statement in statements) {
            var statementValue = statements[statement];
            if (statementValue == null) {
                continue;
            } else {
                for (var i = 0; i < statementValue.length; i += 1) {
                    // In most cases, you really shouldn't ever have more than
                    //  one statement in this list. I'm not sure Blockly likes
                    //  that.
                    var newStatement = document.createElement("statement");
                    newStatement.setAttribute("name", statement);
                    newStatement.appendChild(statementValue[i]);
                    newBlock.appendChild(newStatement);
                }
            }
        }
    }
    return newBlock;
}

BlockMirrorTextToBlocks.raw_block = function (txt) {
    // TODO: lineno as second parameter!
    return BlockMirrorTextToBlocks.create_block("ast_Raw", 0, {"TEXT": txt});
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

Blockly.Python['blank'] = '___';

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
    MATH: 150,
    TEXT: 120,
    FILE: 125,
    PLOTTING: 135,
    LOGIC: 345,
    PYTHON: 60,
    EXCEPTIONS: 300,
    SEQUENCES: 15,
    LIST: 30,
    DICTIONARY: 0,
    SET: 10,
    TUPLE: 20
}
BlockMirrorTextToBlocks.prototype.FUNCTION_SIGNATURES = {
    'abs': {
        'returns': true,
        'full': ['x'], colour: BlockMirrorTextToBlocks.COLOR.MATH
    },
    'all': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'any': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'ascii': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'bin': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'bool': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'breakpoint': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'bytearray': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'bytes': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'callable': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'chr': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'classmethod': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'compile': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'complex': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'delattr': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.VARIABLES},
    'dict': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'dir': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'divmod': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'enumerate': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'eval': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'exec': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'filter': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'float': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'format': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'frozenset': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'getattr': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'globals': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.VARIABLES},
    'hasattr': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'hash': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'help': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'hex': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'id': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'input': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'int': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'isinstance': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'issubclass': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'iter': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'len': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'list': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'locals': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.VARIABLES},
    'map': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'max': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'memoryview': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'min': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'next': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'object': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'oct': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'open': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.FILE},
    'ord': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'pow': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'print': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'property': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'range': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'repr': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'reversed': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'round': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'set': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'setattr': {
        'returns': false,
        'full': ['object', 'name', 'value'], colour: BlockMirrorTextToBlocks.COLOR.OO
    },
    'slice': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'sorted': {
        'full': ['iterable', '*', '**key', '**reverse'],
        'simple': ['iterable'],
        'returns': true,
        colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES
    },
    'staticmethod': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'str': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'sum': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'super': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'tuple': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TUPLE},
    'type': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    'vars': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.VARIABLES},
    'zip': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    '__import__': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.PYTHON}
};

BlockMirrorTextToBlocks.prototype.METHOD_SIGNATURES = {
    'conjugate': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'trunc': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'floor': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'ceil': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'bit_length': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'to_bytes': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'from_bytes': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'as_integer_ratio': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'is_integer': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'hex': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    'fromhex': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.MATH},
    '__iter__': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    '__next__': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'index': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'count': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'append': {
        'returns': false,
        'full': ['x'],
        'message': 'append',
        'premessage': 'to list', colour: BlockMirrorTextToBlocks.COLOR.LIST
    },
    'clear': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'copy': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'extend': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'insert': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'pop': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'remove': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'reverse': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'sort': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.LIST},
    'capitalize': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'casefold': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'center': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'encode': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'endswith': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'expandtabs': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'find': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'format': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'format_map': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isalnum': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isalpha': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isascii': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isdecimal': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isdigit': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isidentifier': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'islower': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isnumeric': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isprintable': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isspace': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'istitle': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'isupper': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'join': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'ljust': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'lower': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'lstrip': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'maketrans': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'partition': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'replace': {
        'returns': true,
        'full': ['old', 'new', 'count'],
        'simple': ['old', 'new'], colour: BlockMirrorTextToBlocks.COLOR.TEXT
    },
    'rfind': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'rindex': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'rjust': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'rpartition': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'rsplit': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'rstrip': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'split': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'splitlines': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'startswith': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'strip': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'swapcase': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'title': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'translate': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'upper': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'zfill': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    'decode': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.TEXT},
    '__eq__': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.LOGIC},
    'tobytes': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'tolist': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'release': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'cast': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.PYTHON},
    'isdisjoint': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'issubset': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'issuperset': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'union': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'intersection': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'difference': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'symmetric_difference': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'update': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'intersection_update': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'difference_update': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'symmetric_difference_update': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'add': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'discard': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.SET},
    'fromkeys': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'get': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'items': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'keys': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'popitem': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'setdefault': {returns: false, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    'values': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
    '__enter__': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.CONTROL},
    '__exit__': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.CONTROL},
    'mro': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
    '__subclasses__': {returns: true, colour: BlockMirrorTextToBlocks.COLOR.OO},
};

BlockMirrorTextToBlocks.prototype.MODULE_FUNCTION_SIGNATURES = {
    'plt': {
        'show': {
            returns: false,
            message: 'show plot canvas',
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        },
        'hist': {
            returns: false,
            message: 'plot histogram',
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        },
        'plot': {
            returns: false,
            message: 'plot line',
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        },
        'scatter': {
            returns: false,
            message: 'plot scatter',
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        },
        'title': {
            returns: false,
            message: "make plot's title",
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        },
        'xlabel': {
            returns: false,
            message: "make plot's x-axis label",
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        },
        'ylabel': {
            returns: false,
            message: "make plot's y-axis label",
            colour: BlockMirrorTextToBlocks.COLOR.PLOTTING
        }
    }
};

BlockMirrorTextToBlocks.prototype.MODULE_FUNCTION_SIGNATURES['matplotlib.pyplot'] =
    BlockMirrorTextToBlocks.prototype.MODULE_FUNCTION_SIGNATURES['plt'];
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_For",
  "message0": "for each item %1 in list %2 : %3 %4",
  "args0": [
    { "type": "input_value", "name": "TARGET" },
    { "type": "input_value", "name": "ITER" },
    { "type": "input_dummy" },
    { "type": "input_statement", "name": "BODY" }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
})

BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_ForElse",
  "message0": "for each item %1 in list %2 : %3 %4 else: %5 %6",
  "args0": [
    { "type": "input_value", "name": "TARGET" },
    { "type": "input_value", "name": "ITER" },
    { "type": "input_dummy" },
    { "type": "input_statement", "name": "BODY" },
    { "type": "input_dummy" },
    { "type": "input_statement", "name": "ELSE" }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
})

Blockly.Python['ast_For'] = function(block) {
  // For each loop.
  var argument0 = Blockly.Python.valueToCode(block, 'TARGET',
      Blockly.Python.ORDER_RELATIONAL) || Blockly.Python.blank;
  var argument1 = Blockly.Python.valueToCode(block, 'ITER',
      Blockly.Python.ORDER_RELATIONAL) || Blockly.Python.blank;
  var branchBody = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
  var branchElse = Blockly.Python.statementToCode(block, 'ELSE');
  var code = 'for ' + argument0 + ' in ' + argument1 + ':\n' + branchBody;
  if (branchElse) {
      code += 'else:\n' + branchElse;
  }
  return code;
};

BlockMirrorTextToBlocks.prototype['ast_For'] = function (node, parent) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var orelse = node.orelse;
    
    var blockName = 'ast_For';
    var bodies = {'BODY': this.convertBody(body, node)};
    
    if (orelse.length > 0) {
        blockName = "ast_ForElse";
        bodies['ELSE'] = this.convertBody(orelse, node);
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
    }, {
        "ITER": this.convert(iter, node),
        "TARGET": this.convert(target, node)
    }, {}, {}, bodies);
}

Blockly.Python['ast_ForElse'] = Blockly.Python['ast_For'];
BlockMirrorTextToBlocks.prototype['ast_ForElse'] = BlockMirrorTextToBlocks.prototype['ast_For'];

Blockly.Blocks['ast_If'] = {
    init: function () {
        this.orelse_ = 0;
        this.elifs_ = 0;
        this.appendValueInput('TEST')
            .appendField("if");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.LOGIC);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        let latestInput = "BODY";
        for (var i = 0; i < this.elifs_; i++) {
            if (!this.getInput('ELIF' + i)) {
                this.appendValueInput('ELIFTEST' + i)
                    .appendField('elif');
                this.appendStatementInput("ELIFBODY" + i)
                    .setCheck(null);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ELIFTEST' + i)) {
            this.removeInput('ELIFTEST' + i);
            this.removeInput('ELIFBODY' + i);
            i++;
        }

        if (this.orelse_ && !this.getInput('ELSE')) {
            this.appendDummyInput('ORELSETEST')
                .appendField("else:");
            this.appendStatementInput("ORELSEBODY")
                .setCheck(null);
        } else if (!this.orelse_ && this.getInput('ELSE')) {
            block.removeInput('ORELSETEST');
            block.removeInput('ORELSEBODY');
        }

        for (i = 0; i < this.elifs_; i++) {
            if (this.orelse_) {
                this.moveInputBefore('ELIFTEST' + i, 'ORELSETEST');
                this.moveInputBefore('ELIFBODY' + i, 'ORELSETEST');
            } else if (i+1 < this.elifs_) {
                this.moveInputBefore('ELIFTEST' + i, 'ELIFTEST' + (i+1));
                this.moveInputBefore('ELIFBODY' + i, 'ELIFBODY' + (i+1));
            }
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('orelse', this.orelse_);
        container.setAttribute('elifs', this.elifs_);
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.orelse_ = "true" === xmlElement.getAttribute('orelse');
        this.elifs_ = parseInt(xmlElement.getAttribute('elifs'), 10);
        this.updateShape_();
    },
};

Blockly.Python['ast_If'] = function (block) {
    // Test
    let test = "if " + (Blockly.Python.valueToCode(block, 'TEST',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank) + ":\n";
    // Body:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Elifs

    let elifs = new Array(block.elifs_);
    for (let i = 0; i < block.elifs_; i++) {
        let elif = block.elifs_[i];
        let clause = "elif " + (Blockly.Python.valueToCode(block, 'ELIFTEST' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank);
        clause += ":\n" + (Blockly.Python.statementToCode(block, 'ELIFBODY' + i) || Blockly.Python.PASS);
        elifs[i] = clause;
    }
    // Orelse:
    let orelse = "";
    if (this.orelse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSEBODY') || Blockly.Python.PASS);
    }
    return test + body + elifs.join("") + orelse;
};

BlockMirrorTextToBlocks.prototype['ast_If'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    let hasOrelse = false;
    let elifCount = 0;

    let values = {"TEST": this.convert(test, node)};
    let statements = {"BODY": this.convertBody(body, node)};

    while (orelse !== undefined && orelse.length > 0) {
        if (orelse.length === 1) {
            if (orelse[0]._astname === "If") {
                // This is an ELIF
                this.heights.shift();
                values['ELIFTEST' + elifCount] = this.convert(orelse[0].test, node);
                statements['ELIFBODY' + elifCount] = this.convertBody(orelse[0].body, node);
                elifCount++;
            } else {
                hasOrelse = true;
                statements['ORELSEBODY'] = this.convertBody(orelse, node);
            }
        } else {
            hasOrelse = true;
            statements['ORELSEBODY'] = this.convertBody(orelse, node);
        }
        orelse = orelse[0].orelse;
    }

    return BlockMirrorTextToBlocks.create_block("ast_If", node.lineno, {},
        values, {}, {
            "@orelse": hasOrelse,
            "@elifs": elifCount
        }, statements);
};
Blockly.Blocks['ast_While'] = {
    init: function () {
        this.orelse_ = 0;
        this.appendValueInput('TEST')
            .appendField("while");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.CONTROL);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        let latestInput = "BODY";

        if (this.orelse_ && !this.getInput('ELSE')) {
            this.appendDummyInput('ORELSETEST')
                .appendField("else:");
            this.appendStatementInput("ORELSEBODY")
                .setCheck(null);
        } else if (!this.orelse_ && this.getInput('ELSE')) {
            block.removeInput('ORELSETEST');
            block.removeInput('ORELSEBODY');
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('orelse', this.orelse_);
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.orelse_ = "true" === xmlElement.getAttribute('orelse');
        this.updateShape_();
    },
};

Blockly.Python['ast_While'] = function (block) {
    // Test
    let test = "while " + (Blockly.Python.valueToCode(block, 'TEST',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank) + ":\n";
    // Body:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Orelse:
    let orelse = "";
    if (this.orelse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSEBODY') || Blockly.Python.PASS);
    }
    return test + body + orelse;
};

BlockMirrorTextToBlocks.prototype['ast_While'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    let values = {"TEST": this.convert(test, node)};
    let statements = {"BODY": this.convertBody(body, node)};

    let hasOrelse = false;
    if (orelse !== null && orelse.length > 0) {
        statements['ORELSEBODY'] = this.convertBody(orelse, node);
        hasOrelse = true;
    }

    return BlockMirrorTextToBlocks.create_block("ast_While", node.lineno, {},
        values, {}, {
            "@orelse": hasOrelse
        }, statements);
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Num",
    "message0": "%1",
    "args0": [
        { "type": "field_number", "name": "NUM", "value": 0}
    ],
    "output": "Number",
    "colour": BlockMirrorTextToBlocks.COLOR.MATH
})

Blockly.Python['ast_Num'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code == Infinity) {
    code = 'float("inf")';
    order = Blockly.Python.ORDER_FUNCTION_CALL;
  } else if (code == -Infinity) {
    code = '-float("inf")';
    order = Blockly.Python.ORDER_UNARY_SIGN;
  } else {
    order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
            Blockly.Python.ORDER_ATOMIC;
  }
  return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return BlockMirrorTextToBlocks.create_block("ast_Num", node.lineno, {
        "NUM": Sk.ffi.remapToJs(n)
    });
}

BlockMirrorTextToBlocks.BINOPS = [
    ["+", "Add", Blockly.Python.ORDER_ADDITIVE, 'Return the sum of the two numbers.', 'increase', 'by'],
    ["-", "Sub", Blockly.Python.ORDER_ADDITIVE, 'Return the difference of the two numbers.', 'decrease', 'by'],
    ["*", "Mult", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the product of the two numbers.', 'multiply', 'by'],
    ["/", "Div", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the quotient of the two numbers.', 'divide', 'by'],
    ["%", "Mod", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the remainder of the first number divided by the second number.',
    'modulo', 'by'],
    ["**", "Pow", Blockly.Python.ORDER_EXPONENTIATION, 'Return the first number raised to the power of the second number.',
    'raise', 'to'],
    ["//", "FloorDiv", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the truncated quotient of the two numbers.',
    'floor divide', 'by'],
    ["<<", "LShift", Blockly.Python.ORDER_BITWISE_SHIFT, 'Return the left number left shifted by the right number.',
    'left shift', 'by'],
    [">>", "RShift", Blockly.Python.ORDER_BITWISE_SHIFT, 'Return the left number right shifted by the right number.',
    'right shift', 'by'],
    ["|", "BitOr", Blockly.Python.ORDER_BITWISE_OR, 'Returns the bitwise OR of the two values.',
    'bitwise OR', 'using'],
    ["^", "BitXor", Blockly.Python.ORDER_BITWISE_XOR, 'Returns the bitwise XOR of the two values.',
    'bitwise XOR', 'using'],
    ["&", "BitAnd", Blockly.Python.ORDER_BITWISE_AND, 'Returns the bitwise AND of the two values.',
    'bitwise AND', 'using'],
    ["@", "MatMult", Blockly.Python.ORDER_MULTIPLICATIVE, 'Return the matrix multiplication of the two numbers.',
    'matrix multiply', 'by']
];
var BINOPS_SIMPLE = ['Add', 'Sub', 'Mult', 'Div', 'Mod', 'Pow'];
var BINOPS_BLOCKLY_DISPLAY_FULL = BlockMirrorTextToBlocks.BINOPS.map(
    binop => [binop[0], binop[1]]
);
var BINOPS_BLOCKLY_DISPLAY = BINOPS_BLOCKLY_DISPLAY_FULL.filter(
    binop => BINOPS_SIMPLE.indexOf(binop[1]) >= 0
);
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL =BlockMirrorTextToBlocks.BINOPS.map(
    binop => [binop[4], binop[1]]
);
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY = BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL.filter(
    binop => BINOPS_SIMPLE.indexOf(binop[1]) >= 0
);

var BINOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION = {};
BlockMirrorTextToBlocks.BINOPS.forEach(function (binop) {
    BINOPS_BLOCKLY_GENERATE[binop[1]] = [" " + binop[0], binop[2]];
    BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION[binop[1]] = binop[5];
    //Blockly.Constants.Math.TOOLTIPS_BY_OP[binop[1]] = binop[3];
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_BinOpFull",
    "message0": "%1 %2 %3",
    "args0": [
        {"type": "input_value", "name": "A"},
        {"type": "field_dropdown", "name": "OP", "options": BINOPS_BLOCKLY_DISPLAY_FULL},
        {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.MATH
    //"extensions": ["math_op_tooltip"]
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_BinOp",
    "message0": "%1 %2 %3",
    "args0": [
        {"type": "input_value", "name": "A"},
        {"type": "field_dropdown", "name": "OP", "options": BINOPS_BLOCKLY_DISPLAY},
        {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.MATH
    //"extensions": ["math_op_tooltip"]
});

Blockly.Python['ast_BinOp'] = function (block) {
    // Basic arithmetic operators, and power.
    var tuple = BINOPS_BLOCKLY_GENERATE[block.getFieldValue('OP')];
    var operator = tuple[0]+" ";
    var order = tuple[1];
    var argument0 = Blockly.Python.valueToCode(block, 'A', order) || Blockly.Python.blank;
    var argument1 = Blockly.Python.valueToCode(block, 'B', order) || Blockly.Python.blank;
    var code = argument0 + operator + argument1;
    return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_BinOp'] = function (node, parent) {
    let left = node.left;
    let op = node.op.name;
    let right = node.right;

    let blockName = (BINOPS_SIMPLE.indexOf(op) >= 0) ? "ast_BinOp" : 'ast_BinOpFull';

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
        "OP": op
    }, {
        "A": this.convert(left, node),
        "B": this.convert(right, node)
    }, {
        "inline": true
    });
}

Blockly.Python['ast_BinOpFull'] = Blockly.Python['ast_BinOp'];
BlockMirrorTextToBlocks.prototype['ast_BinOpFull'] = BlockMirrorTextToBlocks.prototype['ast_BinOp'];

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Name",
    "message0": "%1",
    "args0": [
        {"type": "field_variable", "name": "VAR", "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"}
    ],
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.VARIABLES,
    "extensions": ["contextMenu_variableSetterGetter_forBlockMirror"]
})

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'ast_Name' and 'ast_Assign'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN_FOR_BLOCK_MIRROR = {
    /**
     * Add menu option to create getter/setter block for this setter/getter.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        let name;
        if (!this.isInFlyout){
            // Getter blocks have the option to create a setter block, and vice versa.
            let opposite_type, contextMenuMsg;
            if (this.type === 'ast_Name') {
                opposite_type = 'ast_Assign';
                contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
            } else {
                opposite_type = 'ast_Name';
                contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
            }

            var option = {enabled: this.workspace.remainingCapacity() > 0};
            name = this.getField('VAR').getText();
            option.text = contextMenuMsg.replace('%1', name);
            var xmlField = document.createElement('field');
            xmlField.setAttribute('name', 'VAR');
            xmlField.appendChild(document.createTextNode(name));
            var xmlBlock = document.createElement('block');
            xmlBlock.setAttribute('type', opposite_type);
            xmlBlock.appendChild(xmlField);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
            // Getter blocks have the option to rename or delete that variable.
        } else {
            if (this.type === 'ast_Name' || this.type === 'variables_get_reporter'){
                var renameOption = {
                    text: Blockly.Msg.RENAME_VARIABLE,
                    enabled: true,
                    callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
                };
                name = this.getField('VAR').getText();
                var deleteOption = {
                    text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
                    enabled: true,
                    callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
                };
                options.unshift(renameOption);
                options.unshift(deleteOption);
            }
        }
    }
};

Blockly.Extensions.registerMixin('contextMenu_variableSetterGetter_forBlockMirror',
    Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN_FOR_BLOCK_MIRROR);

Blockly.Python['ast_Name'] = function (block) {
    // Variable getter.
    var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
    var id = node.id;
    var ctx = node.ctx;
    if (id.v == Blockly.Python.blank) {
        return null;
    } else {
        return BlockMirrorTextToBlocks.create_block('ast_Name', node.lineno, {
            "VAR": id.v
        });
    }
}

Blockly.Blocks['ast_Assign'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.targetCount_ = 1;
        this.simpleTarget_ = true;
        this.updateShape_();
        Blockly.Extensions.apply("contextMenu_variableSetterGetter", this, false);
    },
    updateShape_: function () {
        if (!this.getInput('VALUE')) {
            this.appendDummyInput()
                .appendField("set");
            this.appendValueInput('VALUE')
                .appendField('=');
        }
        let i = 0;
        if (this.targetCount_ === 1 && this.simpleTarget_) {
            this.setInputsInline(true);
            if (!this.getInput('VAR_ANCHOR')) {
                this.appendDummyInput('VAR_ANCHOR')
                    .appendField(new Blockly.FieldVariable("variable"), "VAR");
            }
            this.moveInputBefore('VAR_ANCHOR', 'VALUE');
        } else {
            this.setInputsInline(true);
            // Add new inputs.
            for (; i < this.targetCount_; i++) {
                if (!this.getInput('TARGET' + i)) {
                    var input = this.appendValueInput('TARGET' + i);
                    if (i !== 0) {
                        input.appendField('and').setAlign(Blockly.ALIGN_RIGHT);
                    }
                }
                this.moveInputBefore('TARGET' + i, 'VALUE');
            }
            // Kill simple VAR
            if (this.getInput('VAR_ANCHOR')) {
                this.removeInput('VAR_ANCHOR');
            }
        }
        // Remove deleted inputs.
        while (this.getInput('TARGET' + i)) {
            this.removeInput('TARGET' + i);
            i++;
        }
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('targets', this.targetCount_);
        container.setAttribute('simple', this.simpleTarget_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.targetCount_ = parseInt(xmlElement.getAttribute('targets'), 10);
        this.simpleTarget_ = "true" === xmlElement.getAttribute('simple');
        this.updateShape_();
    },
};

Blockly.Python['ast_Assign'] = function (block) {
    // Create a list with any number of elements of any type.
    let value = Blockly.Python.valueToCode(block, 'VALUE',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    let targets = new Array(block.targetCount_);
    if (block.targetCount_ === 1 && block.simpleTarget_) {
        targets[0] = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    } else {
        for (var i = 0; i < block.targetCount_; i++) {
            targets[i] = (Blockly.Python.valueToCode(block, 'TARGET' + i,
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank);
        }
    }
    return targets.join(' = ') + " = " + value + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Assign'] = function (node, parent) {
    let targets = node.targets;
    let value = node.value;

    let values;
    let fields = {};
    let simpleTarget = (targets.length === 1 && targets[0]._astname === 'Name');
    if (simpleTarget) {
        values = {};
        fields['VAR'] = Sk.ffi.remapToJs(targets[0].id);
    } else {
        values = this.convertElements("TARGET", targets, node);
    }
    values['VALUE'] = this.convert(value, node);

    return BlockMirrorTextToBlocks.create_block("ast_Assign", node.lineno, fields,
        values,
        {
            "inline": "true",
        }, {
            "@targets": targets.length,
            "@simple": simpleTarget
        });
};
Blockly.Blocks['ast_AnnAssignFull'] = {
    init: function () {
        this.appendValueInput("TARGET")
            .setCheck(null)
            .appendField("set");
        this.appendValueInput("ANNOTATION")
            .setCheck(null)
            .appendField(":");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.initialized_ = true;
        this.updateShape_();
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('initialized', this.initialized_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.initialized_ = "true" === xmlElement.getAttribute('initialized');
        this.updateShape_();
    },
    updateShape_: function (block) {
        // Add new inputs.
        if (this.initialized_ && !this.getInput('VALUE')) {
            this.appendValueInput('VALUE')
                .appendField('=')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
        if (!this.initialized_ && this.getInput('VALUE')) {
            this.removeInput('VALUE');
        }
    }
};

BlockMirrorTextToBlocks.ANNOTATION_OPTIONS = [
    ["int", "int"],
    ["float", "float"],
    ["str", "str"],
    ["bool", "bool"],
    ["None", "None"]
];

BlockMirrorTextToBlocks.ANNOTATION_GENERATE = {};
BlockMirrorTextToBlocks.ANNOTATION_OPTIONS.forEach(function (ann) {
    BlockMirrorTextToBlocks.ANNOTATION_GENERATE[ann[1]] = ann[0];
});

Blockly.Blocks['ast_AnnAssign'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldVariable("item"), "TARGET")
            .appendField(":")
            .appendField(new Blockly.FieldDropdown(BlockMirrorTextToBlocks.ANNOTATION_OPTIONS), "ANNOTATION");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("=");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.strAnnotations_ = false;
        this.initialized_ = true;
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('str', this.strAnnotations_);
        container.setAttribute('initialized', this.initialized_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.strAnnotations_ = "true" === xmlElement.getAttribute('str');
        this.initialized_ = "true" === xmlElement.getAttribute('initialized');
        this.updateShape_();
    },
    updateShape_: function (block) {
        // Add new inputs.
        if (this.initialized_ && !this.getInput('VALUE')) {
            this.appendValueInput('VALUE')
                .appendField('=')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
        if (!this.initialized_ && this.getInput('VALUE')) {
            this.removeInput('VALUE');
        }
    }
};

Blockly.Python['ast_AnnAssignFull'] = function (block) {
    // Create a list with any number of elements of any type.
    let target = Blockly.Python.valueToCode(block, 'TARGET',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    let annotation = Blockly.Python.valueToCode(block, 'ANNOTATION',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    let value = "";
    if (this.initialized_) {
        value = " = " + Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    return target + ": " + annotation + value + "\n";
};

Blockly.Python['ast_AnnAssign'] = function (block) {
    // Create a list with any number of elements of any type.
    var target = Blockly.Python.variableDB_.getName(block.getFieldValue('TARGET'),
        Blockly.Variables.NAME_TYPE);
    let annotation = block.getFieldValue('ANNOTATION');
    if (block.strAnnotations_) {
        annotation = Blockly.Python.quote_(annotation);
    }
    let value = "";
    if (this.initialized_) {
        value = " = " + Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    return target + ": " + annotation + value + "\n";
};

BlockMirrorTextToBlocks.prototype.getBuiltinAnnotation = function (annotation) {
    let result = false;
    // Can we turn it into a basic type?
    if (annotation._astname === 'Name') {
        result = Sk.ffi.remapToJs(annotation.id);
    } else if (annotation._astname === 'Str') {
        result = Sk.ffi.remapToJs(annotation.s);
    }

    // Potentially filter out unknown annotations
    if (result !== false && this.strictAnnotations) {
        if (this.strictAnnotations.indexOf(result) !== -1) {
            return result;
        } else {
            return false;
        }
    } else {
        return result;
    }
}

BlockMirrorTextToBlocks.prototype['ast_AnnAssign'] = function (node, parent) {
    let target = node.target;
    let annotation = node.annotation;
    let value = node.value;

    let values = {};
    let mutations = {'@initialized': false};
    if (value !== null) {
        values['VALUE'] = this.convert(value, node);
        mutations['@initialized'] = true;
    }

    // TODO: This controls whether the annotation is stored in __annotations__
    let simple = node.simple;

    let builtinAnnotation = this.getBuiltinAnnotation(annotation);

    if (target._astname === 'Name' && target.id.v !== Blockly.Python.blank && builtinAnnotation !== false) {
        mutations['@str'] = annotation._astname === 'Str'
        return BlockMirrorTextToBlocks.create_block("ast_AnnAssign", node.lineno, {
                'TARGET': target.id.v,
                'ANNOTATION': builtinAnnotation,
            },
            values,
            {
                "inline": "true",
            }, mutations);
    } else {
        values['TARGET'] = this.convert(target, node);
        values['ANNOTATION'] = this.convert(annotation, node);
        return BlockMirrorTextToBlocks.create_block("ast_AnnAssignFull", node.lineno, {},
            values,
            {
                "inline": "true",
            }, mutations);
    }
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Str",
    "message0": "%1",
    "args0": [
        {"type": "field_input", "name": "TEXT", "value": ''}
    ],
    "output": "String",
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
    "extensions": ["text_quotes"]
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_StrMultiline",
    "message0": "%1",
    "args0": [
        {"type": "field_multilinetext", "name": "TEXT", "value": ''}
    ],
    "output": "String",
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
    "extensions": ["text_quotes"]
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_StrDocstring",
    "message0": "Docstring: %1 %2",
    "args0": [
        {"type": "input_dummy"},
        {"type": "field_multilinetext", "name": "TEXT", "value": ''}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT
});

Blockly.Python['ast_Str'] = function (block) {
    // Text value.
    let code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ast_StrMultiline'] = function (block) {
    // Text value.
    let code = Blockly.Python.multiline_quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ast_StrDocstring'] = function (block) {
    // Text value.
    let code = block.getFieldValue('TEXT');
    if (code.charAt(0) !== '\n') {
        code = '\n' + code;
    }
    if (code.charAt(code.length-1) !== '\n') {
        code = code + '\n';
    }
    return Blockly.Python.multiline_quote_(code);
};

BlockMirrorTextToBlocks.prototype.isDocString = function (node, parent) {
    return (parent._astname === 'Expr' &&
        parent._parent &&
        ['FunctionDef', 'ClassDef'].indexOf(parent._parent._astname) !== -1 &&
        parent._parent.body[0] === parent);
};

BlockMirrorTextToBlocks.prototype.dedent = function (text, levels) {
    let split = text.split("\n");
    let indentation = "    ".repeat(levels);
    let recombined = [];
    for (let i = 0; i < split.length; i++) {
        // Are all lines indented?
        if (split[i] === '') {
            if (i !== 0) {
                recombined.push("");
            }
        } else if (split[i].startsWith(indentation)) {
            let unindentedLine = split[i].substr(indentation.length);
            if (unindentedLine !== '' || i !== split.length - 1) {
                recombined.push(unindentedLine);
            }
        } else if (i === 0) {
            recombined.push(split[i]);
        } else {
            return text;
        }
    }
    return recombined.join("\n");
};

// TODO: Handle indentation intelligently
BlockMirrorTextToBlocks.prototype['ast_Str'] = function (node, parent) {
    let s = node.s;
    let text = Sk.ffi.remapToJs(s);
    if (this.isDocString(node, parent)) {
        let dedented = this.dedent(text, this.levelIndex - 1);
        return [BlockMirrorTextToBlocks.create_block("ast_StrDocstring", node.lineno, {"TEXT": dedented})];
    } else if (text.indexOf('\n') === -1) {
        return BlockMirrorTextToBlocks.create_block("ast_Str", node.lineno, {"TEXT": text});
    } else {
        let dedented = this.dedent(text, this.levelIndex - 1);
        return BlockMirrorTextToBlocks.create_block("ast_StrMultiline", node.lineno, {"TEXT": dedented});
    }
};

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Expr",
    "message0": "do nothing with %1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
});

Blockly.Python['ast_Expr'] = function (block) {
    // Numeric value.
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    // TODO: Assemble JavaScript into code variable.
    return value+"\n";
};

BlockMirrorTextToBlocks.prototype['ast_Expr'] = function (node, parent) {
    var value = node.value;

    var converted = this.convert(value, node);

    if (converted.constructor === Array) {
        return converted[0];
    } else if (this.isTopLevel(parent)) {
        return [this.convert(value, node)];
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_Expr", node.lineno, {}, {
            "VALUE": this.convert(value, node)
        });
    }
};

BlockMirrorTextToBlocks.UNARYOPS = [
    ["+", "UAdd", 'Do nothing to the number'],
    ["-", "USub", 'Make the number negative'],
    ["not", "Not", 'Return the logical opposite of the value.'],
    ["~", "Invert", 'Take the bit inversion of the number']
];

BlockMirrorTextToBlocks.UNARYOPS.forEach(function (unaryop) {
    //Blockly.Constants.Math.TOOLTIPS_BY_OP[unaryop[1]] = unaryop[2];

    let fullName = "ast_UnaryOp" + unaryop[1];

    BlockMirrorTextToBlocks.BLOCKS.push({
        "type": fullName,
        "message0": unaryop[0] + " %1",
        "args0": [
            {"type": "input_value", "name": "VALUE"}
        ],
        "inputsInline": false,
        "output": null,
        "colour": (unaryop[1] == 'Not' ?
            BlockMirrorTextToBlocks.COLOR.LOGIC :
            BlockMirrorTextToBlocks.COLOR.MATH)
    });

    Blockly.Python[fullName] = function (block) {
        // Basic arithmetic operators, and power.
        var order = (unaryop[1] == 'Not' ? Blockly.Python.ORDER_LOGICAL_NOT : Blockly.Python.ORDER_UNARY_SIGN);
        var argument1 = Blockly.Python.valueToCode(block, 'VALUE', order) || Blockly.Python.blank;
        var code = unaryop[0] + (unaryop[1] == 'Not' ? ' ' : '') + argument1;
        return [code, order];
    };
});

BlockMirrorTextToBlocks.prototype['ast_UnaryOp'] = function (node, parent) {
    let op = node.op.name;
    let operand = node.operand;

    return BlockMirrorTextToBlocks.create_block('ast_UnaryOp' + op, node.lineno, {}, {
        "VALUE": this.convert(operand, node)
    }, {
        "inline": false
    });
}
BlockMirrorTextToBlocks.BOOLOPS = [
    ["and", "And", Blockly.Python.ORDER_LOGICAL_AND, 'Return whether the left and right both evaluate to True.'],
    ["or", "Or", Blockly.Python.ORDER_LOGICAL_OR, 'Return whether either the left or right evaluate to True.']
];
var BOOLOPS_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.BOOLOPS.map(
    boolop => [boolop[0], boolop[1]]
);
var BOOLOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BOOLOPS.forEach(function (boolop) {
    BOOLOPS_BLOCKLY_GENERATE[boolop[1]] = [" " + boolop[0] + " ", boolop[2]];
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_BoolOp",
    "message0": "%1 %2 %3",
    "args0": [
        {"type": "input_value", "name": "A"},
        {"type": "field_dropdown", "name": "OP", "options": BOOLOPS_BLOCKLY_DISPLAY},
        {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

Blockly.Python['ast_BoolOp'] = function (block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') === 'And') ? 'and' : 'or';
    var order = (operator === 'and') ? Blockly.Python.ORDER_LOGICAL_AND :
        Blockly.Python.ORDER_LOGICAL_OR;
    var argument0 = Blockly.Python.valueToCode(block, 'A', order) || Blockly.Python.blank;
    var argument1 = Blockly.Python.valueToCode(block, 'B', order) || Blockly.Python.blank;
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_BoolOp'] = function (node, parent) {
    var op = node.op;
    var values = node.values;
    var result_block = this.convert(values[0], node);
    for (var i = 1; i < values.length; i += 1) {
        result_block = BlockMirrorTextToBlocks.create_block("ast_BoolOp", node.lineno, {
            "OP": op.name
        }, {
            "A": result_block,
            "B": this.convert(values[i], node)
        }, {
            "inline": "true"
        });
    }
    return result_block;
};



BlockMirrorTextToBlocks.COMPARES = [
    ["==", "Eq", 'Return whether the two values are equal.'],
    ["!=", "NotEq", 'Return whether the two values are not equal.'],
    ["<", "Lt", 'Return whether the left value is less than the right value.'],
    ["<=", "LtE", 'Return whether the left value is less than or equal to the right value.'],
    [">", "Gt", 'Return whether the left value is greater than the right value.'],
    [">=", "GtE", 'Return whether the left value is greater than or equal to the right value.'],
    ["is", "Is", 'Return whether the left value is identical to the right value.'],
    ["is not", "IsNot", 'Return whether the left value is not identical to the right value.'],
    ["in", "In", 'Return whether the left value is in the right value.'],
    ["not in", "NotIn", 'Return whether the left value is not in the right value.'],
];

var COMPARES_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.COMPARES.map(
    boolop => [boolop[0], boolop[1]]
);
var COMPARES_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.COMPARES.forEach(function (boolop) {
    COMPARES_BLOCKLY_GENERATE[boolop[1]] = boolop[0];
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Compare",
    "message0": "%1 %2 %3",
    "args0": [
        {"type": "input_value", "name": "A"},
        {"type": "field_dropdown", "name": "OP", "options": COMPARES_BLOCKLY_DISPLAY},
        {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

Blockly.Python['ast_Compare'] = function (block) {
    // Basic arithmetic operators, and power.
    var tuple = COMPARES_BLOCKLY_GENERATE[block.getFieldValue('OP')];
    var operator = ' ' + tuple + ' ';
    var order = Blockly.Python.ORDER_RELATIONAL;
    var argument0 = Blockly.Python.valueToCode(block, 'A', order) || Blockly.Python.blank;
    var argument1 = Blockly.Python.valueToCode(block, 'B', order) || Blockly.Python.blank;
    var code = argument0 + operator + argument1;
    return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_Compare'] = function (node, parent) {
    var ops = node.ops;
    var left = node.left;
    var values = node.comparators;
    var result_block = this.convert(left, node);
    for (var i = 0; i < values.length; i += 1) {
        result_block = BlockMirrorTextToBlocks.create_block("ast_Compare", node.lineno, {
            "OP": ops[i].name
        }, {
            "A": result_block,
            "B": this.convert(values[i], node)
        }, {
            "inline": "true"
        });
    }
    return result_block;
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_AssertFull",
    "message0": "assert %1 %2",
    "args0": [
        {"type": "input_value", "name": "TEST"},
        {"type": "input_value", "name": "MSG"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Assert",
    "message0": "assert %1",
    "args0": [
        {"type": "input_value", "name": "TEST"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC,
});

Blockly.Python['ast_Assert'] = function (block) {
    var test = Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    return "assert " + test + "\n";
};

Blockly.Python['ast_AssertFull'] = function (block) {
    var test = Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    return "assert " + test + ", "+msg+"\n";
};

BlockMirrorTextToBlocks.prototype['ast_Assert'] = function (node, parent) {
    var test = node.test;
    var msg = node.msg;
    if (msg == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Assert", node.lineno, {}, {
            "TEST": this.convert(test, node)
        });
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AssertFull", node.lineno, {}, {
            "TEST": this.convert(test, node),
            "MSG": this.convert(msg, node)
        });
    }
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_NameConstantNone",
    "message0": "None",
    "args0": [],
    "output": "None",
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_NameConstantBoolean",
    "message0": "%1",
    "args0": [
        {
            "type": "field_dropdown", "name": "BOOL", "options": [
                ["True", "TRUE"],
                ["False", "FALSE"]
            ]
        }
    ],
    "output": "Boolean",
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

Blockly.Python['ast_NameConstantBoolean'] = function (block) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ast_NameConstantNone'] = function (block) {
    // Boolean values true and false.
    var code = 'None';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_NameConstant'] = function (node, parent) {
    let value = node.value;

    if (value === Sk.builtin.none.none$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantNone', node.lineno, {});
    } else if (value === Sk.builtin.bool.true$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantBoolean', node.lineno, {
            "BOOL": 'TRUE'
        });
    } else if (value === Sk.builtin.bool.false$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantBoolean', node.lineno, {
            "BOOL": 'FALSE'
        });
    }
};
Blockly.Blocks['ast_List'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
        this.setColour(BlockMirrorTextToBlocks.COLOR.LIST);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'List');
        this.setMutator(new Blockly.Mutator(['ast_List_create_with_item']));
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_List_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('ast_List_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField('create empty list []');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField('create list with [');
                } else {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Add the trailing "]"
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            this.appendDummyInput('TAIL')
                .appendField(']')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['ast_List_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.LIST);
        this.appendDummyInput()
            .appendField('Add new list elements below');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['ast_List_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.LIST);
        this.appendDummyInput()
            .appendField('Element');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Python['ast_List'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    var code = '[' + elements.join(', ') + ']';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_List'] = function (node, parent) {
    var elts = node.elts;
    var ctx = node.ctx;

    return BlockMirrorTextToBlocks.create_block("ast_List", node.lineno, {},
        this.convertElements("ADD", elts, node),
        {
            "inline": elts.length > 3 ? "false" : "true",
        }, {
            "@items": elts.length
        });
}

Blockly.Blocks['ast_Tuple'] = {
    /**
     * Block for creating a tuple with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.TUPLE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Tuple');
        this.setMutator(new Blockly.Mutator(['ast_Tuple_create_with_item']));
    },
    /**
     * Create XML to represent tuple inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the tuple inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_Tuple_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('ast_Tuple_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField('()');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i === 0) {
                    input.appendField('(', ).setAlign(Blockly.ALIGN_RIGHT);
                } else {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Add the trailing "]"
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            let tail = this.appendDummyInput('TAIL');
            if (this.itemCount_ === 1) {
                tail.appendField(',)');
            } else {
                tail.appendField(')');
            }
            tail.setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['ast_Tuple_create_with_container'] = {
    /**
     * Mutator block for tuple container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.TUPLE);
        this.appendDummyInput()
            .appendField('Add new tuple elements below');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['ast_Tuple_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.TUPLE);
        this.appendDummyInput()
            .appendField('Element');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Python['ast_Tuple'] = function (block) {
    // Create a tuple with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    let requiredComma = "";
    if (block.itemCount_ == 1) {
        requiredComma = ", ";
    }
    var code = '(' + elements.join(', ') + requiredComma+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Tuple'] = function (node, parent) {
    var elts = node.elts;
    var ctx = node.ctx;

    return BlockMirrorTextToBlocks.create_block("ast_Tuple", node.lineno, {},
        this.convertElements("ADD", elts, node),
        {
            "inline": elts.length > 4 ? "false" : "true",
        }, {
            "@items": elts.length
        });
}

Blockly.Blocks['ast_Set'] = {
    /**
     * Block for creating a set with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.SET);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Set');
        this.setMutator(new Blockly.Mutator(['ast_Set_create_with_item']));
    },
    /**
     * Create XML to represent set inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the set inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_Set_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('ast_Set_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField('create empty set');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i === 0) {
                    input.appendField('create set with {').setAlign(Blockly.ALIGN_RIGHT);
                } else {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Add the trailing "]"
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            this.appendDummyInput('TAIL').appendField('}').setAlign(Blockly.ALIGN_RIGHT);

        }
    }
};

Blockly.Blocks['ast_Set_create_with_container'] = {
    /**
     * Mutator block for set container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.SET);
        this.appendDummyInput()
            .appendField('Add new set elements below');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['ast_Set_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.SET);
        this.appendDummyInput()
            .appendField('Element');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Python['ast_Set'] = function (block) {
    // Create a set with any number of elements of any type.
    if (block.itemCount_ === 0) {
        return ['set()', Blockly.Python.ORDER_FUNCTION_CALL];
    }
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    var code = '{' + elements.join(', ') + '}';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Set'] = function (node, parent) {
    var elts = node.elts;

    return BlockMirrorTextToBlocks.create_block("ast_Set", node.lineno, {},
        this.convertElements("ADD", elts, node),
        {
            "inline": elts.length > 3 ? "false" : "true",
        }, {
            "@items": elts.length
        });
}

Blockly.Blocks['ast_DictItem'] = {
    init: function () {
        this.appendValueInput("KEY")
            .setCheck(null);
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField(":");
        this.setInputsInline(true);
        this.setOutput(true, "DictPair");
        this.setColour(BlockMirrorTextToBlocks.COLOR.DICTIONARY);
    }
};

Blockly.Blocks['ast_Dict'] = {
    /**
     * Block for creating a dict with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.DICTIONARY);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Dict');
        this.setMutator(new Blockly.Mutator(['ast_Dict_create_with_item']));
    },
    /**
     * Create XML to represent dict inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the dict inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_Dict_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('ast_Dict_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                let key = connection.getSourceBlock().getInput("KEY");
                if (key.connection.targetConnection) {
                    key.connection.targetConnection.getSourceBlock().unplug(true);
                }
                let value = connection.getSourceBlock().getInput("VALUE");
                if (value.connection.targetConnection) {
                    value.connection.targetConnection.getSourceBlock().unplug(true);
                }
                connection.disconnect();
                connection.getSourceBlock().dispose();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
            if (!connections[i]) {
                let itemBlock = this.workspace.newBlock('ast_DictItem');
                itemBlock.setDeletable(false);
                itemBlock.setMovable(false);
                itemBlock.initSvg();
                this.getInput('ADD'+i).connection.connect(itemBlock.outputConnection);
                itemBlock.render();
                //this.get(itemBlock, 'ADD'+i)
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField('empty dictionary');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i)
                    .setCheck('DictPair');
                if (i === 0) {
                    input.appendField('create dict with').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Add the trailing "}"
        /*
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            let tail = this.appendDummyInput('TAIL')
                .appendField('}');
            tail.setAlign(Blockly.ALIGN_RIGHT);
        }*/
    }
};

Blockly.Blocks['ast_Dict_create_with_container'] = {
    /**
     * Mutator block for dict container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.DICTIONARY);
        this.appendDummyInput()
            .appendField('Add new dict elements below');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['ast_Dict_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.DICTIONARY);
        this.appendDummyInput()
            .appendField('Element');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Python['ast_Dict'] = function (block) {
    // Create a dict with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        let child = block.getInputTargetBlock('ADD' + i);
        if (child === null || child.type != 'ast_DictItem') {
            elements[i] = (Blockly.Python.blank + ": "+ Blockly.Python.blank);
            continue;
        }
        let key = Blockly.Python.valueToCode(child, 'KEY', Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank;
        let value = Blockly.Python.valueToCode(child, 'VALUE', Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank;
        elements[i] = (key+ ": "+value);
    }
    var code = '{' + elements.join(', ') + '}';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Dict'] = function (node, parent) {
    let keys = node.keys;
    let values = node.values;

    if (keys === null) {
        return BlockMirrorTextToBlocks.create_block("ast_Dict", node.lineno, {},
            {}, {"inline": "false"}, {"@items": 0});
    }

    let elements = {};
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = values[i];
        elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_DictItem", node.lineno, {},
            {
                "KEY": this.convert(key, node),
                "VALUE": this.convert(value, node)
            },
            this.LOCKED_BLOCK);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Dict", node.lineno, {},
        elements,
        {
            "inline": "false"
        }, {
            "@items": keys.length
        });
}

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": 'ast_Starred',
    "message0": "*%1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": false,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.VARIABLES
});

Blockly.Python['ast_Starred'] = function (block) {
    // Basic arithmetic operators, and power.
    var order = Blockly.Python.ORDER_NONE;
    var argument1 = Blockly.Python.valueToCode(block, 'VALUE', order) || Blockly.Python.blank;
    var code = "*" + argument1;
    return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_Starred'] = function (node, parent) {
    let value = node.value;
    let ctx = node.ctx;

    return BlockMirrorTextToBlocks.create_block('ast_Starred', node.lineno, {}, {
        "VALUE": this.convert(value, node)
    }, {
        "inline": true
    });
}
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_IfExp",
    "message0": "%1 if %2 else %3",
    "args0": [
        {"type": "input_value", "name": "BODY"},
        {"type": "input_value", "name": "TEST"},
        {"type": "input_value", "name": "ORELSE"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

Blockly.Python['ast_IfExp'] = function (block) {
    var test = Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_CONDITIONAL) || Blockly.Python.blank;
    var body = Blockly.Python.valueToCode(block, 'BODY', Blockly.Python.ORDER_CONDITIONAL) || Blockly.Python.blank;
    var orelse = Blockly.Python.valueToCode(block, 'ORELSE', Blockly.Python.ORDER_CONDITIONAL) || Blockly.Python.blank;
    return [body + " if " + test + " else " + orelse + "\n", Blockly.Python.ORDER_CONDITIONAL];
};

BlockMirrorTextToBlocks.prototype['ast_IfExp'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    return BlockMirrorTextToBlocks.create_block("ast_IfExp", node.lineno, {}, {
        "TEST": this.convert(test, node),
        "BODY": this.convert(body, node),
        "ORELSE": this.convert(orelse, node)
    });
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_AttributeFull",
    "lastDummyAlign0": "RIGHT",
    "message0": "%1 . %2",
    "args0": [
        {"type": "input_value", "name": "VALUE"},
        {"type": "field_input", "name": "ATTR", "text": "default"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.OO,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Attribute",
    "message0": "%1 . %2",
    "args0": [
        {"type": "field_variable", "name": "VALUE", "variable": "variable"},
        {"type": "field_input", "name": "ATTR", "text": "attribute"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.OO,
});

Blockly.Python['ast_Attribute'] = function (block) {
    // Text value.
    var value = Blockly.Python.variableDB_.getName(block.getFieldValue('VALUE'),
        Blockly.Variables.NAME_TYPE);
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ast_AttributeFull'] = function (block) {
    // Text value.
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;
    return [code, Blockly.Python.ORDER_MEMBER];
};

BlockMirrorTextToBlocks.prototype['ast_Attribute'] = function (node, parent) {
    let value = node.value;
    let attr = node.attr;

    //if (value.constructor)
    if (value._astname == "Name") {
        return BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
            "VALUE": Sk.ffi.remapToJs(value.id),
            "ATTR": Sk.ffi.remapToJs(attr)
        },);
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AttributeFull", node.lineno, {
            "ATTR": Sk.ffi.remapToJs(attr)
        }, {
            "VALUE": this.convert(value, node)
        });
    }
}

// TODO: Support stuff like "append" where the message is after the value input
// TODO: Handle updating function/method definition -> update call
// TODO: Do a pretraversal to determine if a given function returns

Blockly.Blocks['ast_Call'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.givenColour_ = BlockMirrorTextToBlocks.COLOR.FUNCTIONS
        this.setInputsInline(true);
        // Regular ('NAME') or Keyword (either '**' or '*NAME')
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        // acbart: Added count to keep track of unused parameters
        this.argumentCount_ = 0;
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        // acbart: Show parameter names, if they exist
        this.showParameterNames_ = false;
        // acbart: Whether this block returns
        this.returns_ = true;
        // acbart: added simpleName to handle complex function calls (e.g., chained)
        this.isMethod_ = false;
        this.name_ = null;
        this.message_ = "function";
        this.premessage_ = "";
        this.updateShape_();
    },

    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        return this.name_;
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * Also rename if it was previously null.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        if (this.name_ === null ||
            Blockly.Names.equals(oldName, this.name_)) {
            this.name_ = newName;
            this.updateShape_();
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @private
     * @this Blockly.Block
     */
    setProcedureParameters_: function (paramNames, paramIds) {
        // Data structures:
        // this.arguments = ['x', 'y']
        //     Existing param names.
        // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
        //     Look-up of paramIds to connections plugged into the call block.
        // this.quarkIds_ = ['piua', 'f8b_']
        //     Existing param IDs.
        // Note that quarkConnections_ may include IDs that no longer exist, but
        // which might reappear if a param is reattached in the mutator.
        var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
            this.workspace);
        var mutatorOpen = defBlock && defBlock.mutator &&
            defBlock.mutator.isVisible();
        if (!mutatorOpen) {
            this.quarkConnections_ = {};
            this.quarkIds_ = null;
        }
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            return false;
        }
        // Test arguments (arrays of strings) for changes. '\n' is not a valid
        // argument name character, so it is a valid delimiter here.
        if (paramNames.join('\n') == this.arguments_.join('\n')) {
            // No change.
            this.quarkIds_ = paramIds;
            return false;
        }
        if (paramIds.length !== paramNames.length) {
            throw RangeError('paramNames and paramIds must be the same length.');
        }
        this.setCollapsed(false);
        if (!this.quarkIds_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            this.quarkIds_ = [];
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (let i = 0; i < this.arguments_.length; i++) {
            var input = this.getInput('ARG' + i);
            if (input) {
                let connection = input.connection.targetConnection;
                this.quarkConnections_[this.quarkIds_[i]] = connection;
                if (mutatorOpen && connection &&
                    paramIds.indexOf(this.quarkIds_[i]) === -1) {
                    // This connection should no longer be attached to this block.
                    connection.disconnect();
                    connection.getSourceBlock().bumpNeighbours_();
                }
            }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        this.argumentCount_ = this.arguments_.length;
        // And rebuild the argument model list.
        this.argumentVarModels_ = [];
        /*
        // acbart: Function calls don't create variables, what do they know?
        for (let i = 0; i < this.arguments_.length; i++) {
            let argumentName = this.arguments_[i];
            var variable = Blockly.Variables.getVariable(
                this.workspace, null, this.arguments_[i], '');
            if (variable) {
                this.argumentVarModels_.push(variable);
            }
        }*/

        this.updateShape_();
        this.quarkIds_ = paramIds;
        // Reconnect any child blocks.
        if (this.quarkIds_) {
            for (let i = 0; i < this.arguments_.length; i++) {
                var quarkId = this.quarkIds_[i];
                if (quarkId in this.quarkConnections_) {
                    let connection = this.quarkConnections_[quarkId];
                    if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
                        // Block no longer exists or has been attached elsewhere.
                        delete this.quarkConnections_[quarkId];
                    }
                }
            }
        }
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
        return true;
    },
    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // If it's a method, add in the caller
        if (this.isMethod_ && !this.getInput('FUNC')) {
            let func = this.appendValueInput('FUNC');
            // If there's a premessage, add it in
            if (this.premessage_ !== "") {
                func.appendField(this.premessage_);
            }
        } else if (!this.isMethod_ && this.getInput('FUNC')) {
            this.removeInput('FUNC');
        }

        let drawnArgumentCount = this.getDrawnArgumentCount_();
        let message = this.getInput('MESSAGE_AREA')
        // Zero arguments, just do {message()}
        if (drawnArgumentCount === 0) {
            if (message) {
                message.removeField('MESSAGE');
            } else {
                message = this.appendDummyInput('MESSAGE_AREA')
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
            message.appendField(new Blockly.FieldLabel(this.message_ + "\ ("), 'MESSAGE');
            // One argument, no MESSAGE_AREA
        } else if (message) {
            this.removeInput('MESSAGE_AREA');
        }
        // Process arguments
        let i;
        for (i = 0; i < drawnArgumentCount; i++) {
            let argument = this.arguments_[i];
            let argumentName = this.parseArgument_(argument);
            if (i === 0) {
                argumentName = this.message_ + "\ (" + argumentName;
            }
            let field = this.getField('ARGNAME' + i);
            if (field) {
                // Ensure argument name is up to date.
                // The argument name field is deterministic based on the mutation,
                // no need to fire a change event.
                Blockly.Events.disable();
                try {
                    field.setValue(argumentName);
                } finally {
                    Blockly.Events.enable();
                }
            } else {
                // Add new input.
                field = new Blockly.FieldLabel(argumentName);
                this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(field, 'ARGNAME' + i)
                    .init();
            }
            if (argumentName) {
                field.setVisible(true);
            } else {
                field.setVisible(false);
            }
        }

        // Closing parentheses
        if (!this.getInput('CLOSE_PAREN')) {
            this.appendDummyInput('CLOSE_PAREN')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldLabel(")"));
        }

        // Move everything into place
        if (drawnArgumentCount === 0) {
            if (this.isMethod_) {
                this.moveInputBefore('FUNC', 'MESSAGE_AREA');
            }
            this.moveInputBefore('MESSAGE_AREA', 'CLOSE_PAREN');
        } else {
            if (this.isMethod_) {
                this.moveInputBefore('FUNC', 'CLOSE_PAREN');
            }
        }
        for (let j = 0; j < i; j++) {
            this.moveInputBefore('ARG' + j, 'CLOSE_PAREN')
        }

        // Set return state
        this.setReturn_(this.returns_, false);
        // Remove deleted inputs.
        while (this.getInput('ARG' + i)) {
            this.removeInput('ARG' + i);
            i++;
        }

        this.setColour(this.givenColour_);
    }
    ,
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        let name = this.getProcedureCall();
        container.setAttribute('name', name === null ? '*' : name);
        container.setAttribute('arguments', this.argumentCount_);
        container.setAttribute('returns', this.returns_);
        container.setAttribute('parameters', this.showParameterNames_);
        container.setAttribute('method', this.isMethod_);
        container.setAttribute('message', this.message_);
        container.setAttribute('premessage', this.premessage_);
        container.setAttribute('colour', this.givenColour_);
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.name_ = xmlElement.getAttribute('name');
        this.name_ = this.name_ === '*' ? null : this.name_;
        this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10);
        this.showParameterNames_ = "true" === xmlElement.getAttribute('parameters');
        this.returns_ = "true" === xmlElement.getAttribute('returns');
        this.isMethod_ = "true" === xmlElement.getAttribute('method');
        this.message_ = xmlElement.getAttribute('message');
        this.premessage_ = xmlElement.getAttribute('premessage');
        this.givenColour_ = parseInt(xmlElement.getAttribute('colour'), 10);

        var args = [];
        var paramIds = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                args.push(childNode.getAttribute('name'));
                paramIds.push(childNode.getAttribute('paramId'));
            }
        }
        let result = this.setProcedureParameters_(args, paramIds);
        if (!result) {
            this.updateShape_();
        }
        if (this.name_ !== null) {
            this.renameProcedure(this.getProcedureCall(), this.name_);
        }
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<!Blockly.VariableModel>} List of variable models.
     * @this Blockly.Block
     */
    getVarModels: function () {
        return this.argumentVarModels_;
    }
    ,
    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        if (!this.workspace.isMovable()) {
            // If we center on the block and the workspace isn't movable we could
            // loose blocks at the edges of the workspace.
            return;
        }

        let workspace = this.workspace;
        let block = this;

        // Highlight Definition
        let option = {enabled: true};
        option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
        let name = this.getProcedureCall();
        option.callback = function () {
            let def = Blockly.Procedures.getDefinition(name, workspace);
            if (def) {
                workspace.centerOnBlock(def.id);
                def.select();
            }
        };
        options.push(option);

        // Show Parameter Names
        options.push({
            enabled: true,
            text: "Show/Hide parameters",
            callback: function () {
                block.showParameterNames_ = !block.showParameterNames_;
                block.updateShape_();
                block.render();
            }
        });

        // Change Return Type
        options.push({
            enabled: true,
            text: this.returns_ ? "Make statement" : "Make expression",
            callback: function () {
                block.returns_ = !block.returns_;
                block.setReturn_(block.returns_, true);
            }
        })
    },
    /**
     * Notification that the procedure's return state has changed.
     * @param {boolean} returnState New return state
     * @param forceRerender Whether to render
     * @this Blockly.Block
     */
    setReturn_: function (returnState, forceRerender) {
        this.unplug(true);
        if (returnState) {
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true);
        } else {
            this.setOutput(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        }
        if (forceRerender) {
            if (this.rendered) {
                this.render();
            }
        }
    },
    //defType_: 'procedures_defnoreturn',
    parseArgument_: function (argument) {
        if (argument.startsWith('KWARGS:')) {
            // KWARG
            return "unpack";
        } else if (argument.startsWith('KEYWORD:')) {
            return argument.substring(8) + "=";
        } else {
            if (this.showParameterNames_) {
                if (argument.startsWith("KNOWN_ARG:")) {
                    return argument.substring(10) + "=";
                }
            }
        }
        return "";
    },
    getDrawnArgumentCount_: function () {
        return Math.min(this.argumentCount_, this.arguments_.length);
    }
};

Blockly.Python['ast_Call'] = function (block) {
    // Get the caller
    let funcName = "";
    if (block.isMethod_) {
        funcName = Blockly.Python.valueToCode(block, 'FUNC', Blockly.Python.ORDER_FUNCTION_CALL) ||
            Blockly.Python.blank;
    }
    funcName += this.name_;
    // Build the arguments
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        let value = Blockly.Python.valueToCode(block, 'ARG' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        let argument = block.arguments_[i];
        if (argument.startsWith('KWARGS:')) {
            args[i] = "**" + value;
        } else if (argument.startsWith('KEYWORD:')) {
            args[i] = argument.substring(8) + "=" + value;
        } else {
            args[i] = value;
        }
    }
    // Return the result
    let code = funcName + '(' + args.join(', ') + ')';
    if (block.returns_) {
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    } else {
        return code + "\n";
    }
};

BlockMirrorTextToBlocks.prototype.getAsModule = function (node) {
    if (node._astname === 'Name') {
        return Sk.ffi.remapToJs(node.id);
    } else if (node._astname === 'Attribute') {
        let origin = this.getAsModule(node.value);
        if (origin !== null) {
            return origin + '.' + Sk.ffi.remapToJs(node.attr);
        }
    } else {
        return null;
    }
}

//                              messageBefore, message, name
// function call: print() -> "print" ([message]) ; print
// Module function: plt.show() -> "show plot" ([plot]) ; plt.show
// Method call: "test".title() -> "make" [str] "title case" () ; .title ; isMethod = true

BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    let keywords = node.keywords;

    // Can we make any guesses about this based on its name?
    let signature = null;
    let isMethod = false;
    let premessage = "";
    let message = "";
    let name = "";
    let caller = null;
    let colour = BlockMirrorTextToBlocks.COLOR.FUNCTIONS;

    if (func._astname === 'Name') {
        message = name = Sk.ffi.remapToJs(func.id);
        if (name in this.FUNCTION_SIGNATURES) {
            signature = this.FUNCTION_SIGNATURES[Sk.ffi.remapToJs(func.id)];
        }
    } else if (func._astname === 'Attribute') {
        isMethod = true;
        caller = func.value;
        let potentialModule = this.getAsModule(caller);
        let attributeName = Sk.ffi.remapToJs(func.attr);
        message = "." + attributeName;
        if (potentialModule in this.MODULE_FUNCTION_SIGNATURES) {
            signature = this.MODULE_FUNCTION_SIGNATURES[potentialModule][attributeName];
            message = name = potentialModule + message;
            isMethod = false;
        } else if (attributeName in this.METHOD_SIGNATURES) {
            signature = this.METHOD_SIGNATURES[attributeName];
            name = message;
        } else {
            name = message;
        }
    } else {
        isMethod = true;
        message = "";
        name = "";
        caller = func;
        // (lambda x: x)()
    }
    let returns = true;

    if (signature !== null) {
        if ('returns' in signature) {
            returns = signature.returns;
        }
        if ('message' in signature) {
            message = signature.message;
        }
        if ('premessage' in signature) {
            premessage = signature.premessage;
        }
        if ('colour' in signature) {
            colour = signature.colour;
        }
    }

    returns = returns || (parent._astname !== 'Expr');

    let argumentsNormal = {};
    // TODO: do I need to be limiting only the *args* length, not keywords?
    let argumentsMutation = {
        "@arguments": (args !== null ? args.length : 0) +
            (keywords !== null ? keywords.length : 0),
        "@returns": returns,
        "@parameters": true,
        "@method": isMethod,
        "@name": name,
        "@message": message,
        "@premessage": premessage,
        "@colour": colour
    };
    // Handle arguments
    let overallI = 0;
    if (args !== null) {
        for (let i = 0; i < args.length; i += 1, overallI += 1) {
            argumentsNormal["ARG" + overallI] = this.convert(args[i], node);
            argumentsMutation["UNKNOWN_ARG:" + overallI] = null;
        }
    }
    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i += 1, overallI += 1) {
            let keyword = keywords[i];
            let arg = keyword.arg;
            let value = keyword.value;
            if (arg === null) {
                argumentsNormal["ARG" + overallI] = this.convert(value, node);
                argumentsMutation["KWARGS:" + overallI] = null;
            } else {
                argumentsNormal["ARG" + overallI] = this.convert(value, node);
                argumentsMutation["KEYWORD:" + Sk.ffi.remapToJs(arg)] = null;
            }
        }
    }
    // Build actual block
    let newBlock;
    if (isMethod) {
        argumentsNormal['FUNC'] = this.convert(caller, node);
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno,
            {}, argumentsNormal, {inline: true}, argumentsMutation);
    } else {
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno, {},
            argumentsNormal, {inline: true}, argumentsMutation);
    }
    // Return as either statement or expression
    if (returns) {
        return newBlock;
    } else {
        return [newBlock];
    }
};
Blockly.Blocks['ast_Raise'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.EXCEPTIONS);
        this.exc_ = true;
        this.cause_ = false;

        this.appendDummyInput()
            .appendField("raise");
        this.updateShape_();
    },
    updateShape_: function () {
        if (this.exc_ && !this.getInput('EXC')) {
            this.appendValueInput("EXC")
                .setCheck(null);
        } else if (!this.exc_ && this.getInput('EXC')) {
            this.removeInput('EXC');
        }
        if (this.cause_ && !this.getInput('CAUSE')) {
            this.appendValueInput("CAUSE")
                .setCheck(null)
                .appendField("from");
        } else if (!this.cause_ && this.getInput('CAUSE')) {
            this.removeInput('CAUSE');
        }
        if (this.cause_ && this.exc_) {
            this.moveInputBefore('EXC', 'CAUSE');
        }
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('exc', this.exc_);
        container.setAttribute('cause', this.cause_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.exc_ = "true" === xmlElement.getAttribute('exc');
        this.cause_ = "true" === xmlElement.getAttribute('cause');
        this.updateShape_();
    },
};

Blockly.Python['ast_Raise'] = function (block) {
    if (this.exc_) {
        let exc = Blockly.Python.valueToCode(block, 'EXC', Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        if (this.cause_) {
            let cause = Blockly.Python.valueToCode(block, 'CAUSE', Blockly.Python.ORDER_NONE)
                || Blockly.Python.blank;
            return "raise " + exc + " from " + cause + "\n";
        } else {
            return "raise " + exc + "\n";
        }
    } else {
        return "raise"+"\n";
    }
};

BlockMirrorTextToBlocks.prototype['ast_Raise'] = function (node, parent) {
    var exc = node.exc;
    var cause = node.cause;
    let values = {};
    let hasExc = false, hasCause = false;
    if (exc !== null) {
        values['EXC'] = this.convert(exc, node);
        hasExc = true;
    }
    if (cause !== null) {
        values['CAUSE'] = this.convert(cause, node);
        hasCause = true;
    }
    return BlockMirrorTextToBlocks.create_block("ast_Raise", node.lineno, {}, values, {}, {
        '@exc': hasExc,
        '@cause': hasCause
    });
};
Blockly.Blocks['ast_Delete'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.targetCount_ = 1;

        this.appendDummyInput()
            .appendField("delete");
        this.updateShape_();
    },
    updateShape_: function () {
        // Add new inputs.
        for (var i = 0; i < this.targetCount_; i++) {
            if (!this.getInput('TARGET' + i)) {
                var input = this.appendValueInput('TARGET' + i);
                if (i !== 0) {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('TARGET' + i)) {
            this.removeInput('TARGET' + i);
            i++;
        }
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('targets', this.targetCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.targetCount_ = parseInt(xmlElement.getAttribute('targets'), 10);
        this.updateShape_();
    },
};

Blockly.Python['ast_Delete'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.targetCount_);
    for (var i = 0; i < block.targetCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, 'TARGET' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    var code = 'del ' + elements.join(', ') + "\n";
    return code;
};

BlockMirrorTextToBlocks.prototype['ast_Delete'] = function (node, parent) {
    let targets = node.targets;

    return BlockMirrorTextToBlocks.create_block("ast_Delete", node.lineno, {},
        this.convertElements("TARGET", targets, node),
        {
            "inline": "true",
        }, {
            "@targets": targets.length
        });
};
Blockly.Blocks['ast_Subscript'] = {
    init: function () {
        this.setInputsInline(true);
        this.setOutput(true);
        this.setColour(BlockMirrorTextToBlocks.COLOR.SEQUENCES);
        this.sliceKinds_ = ["I"];

        this.appendValueInput("VALUE")
            .setCheck(null);
        this.appendDummyInput('OPEN_BRACKET')
            .appendField("[",);
        this.appendDummyInput('CLOSE_BRACKET')
            .appendField("]",);
        this.updateShape_();
    },
    setExistence: function (label, exist, isDummy) {
        if (exist && !this.getInput(label)) {
            if (isDummy) {
                return this.appendDummyInput(label);
            } else {
                return this.appendValueInput(label);
            }
        } else if (!exist && this.getInput(label)) {
            this.removeInput(label);
        }
        return null;
    },
    createSlice_: function (i, kind) {
        // ,
        let input = this.setExistence('COMMA' + i, i !== 0, true);
        if (input) {
            input.appendField(",")
        }
        // Single index
        let isIndex = (kind.charAt(0) === 'I');
        input = this.setExistence('INDEX' + i, isIndex, false);
        // First index
        input = this.setExistence('SLICELOWER' + i, !isIndex && "1" === kind.charAt(1), false);
        // First colon
        input = this.setExistence('SLICECOLON' + i, !isIndex , true);
        if (input) {
            input.appendField(':').setAlign(Blockly.ALIGN_RIGHT);
        }
        // Second index
        input = this.setExistence('SLICEUPPER' + i, !isIndex && "1" === kind.charAt(2), false);
        // Second colon and third index
        input = this.setExistence('SLICESTEP' + i, !isIndex && "1" === kind.charAt(3), false);
        if (input) {
            input.appendField(':').setAlign(Blockly.ALIGN_RIGHT);
        }
    },
    updateShape_: function () {
        // Add new inputs.
        for (var i = 0; i < this.sliceKinds_.length; i++) {
            this.createSlice_(i, this.sliceKinds_[i]);
        }

        for (let j = 0; j < i; j++) {
            if (j !== 0) {
                this.moveInputBefore('COMMA' + j, 'CLOSE_BRACKET');
            }
            let kind = this.sliceKinds_[j];
            if (kind.charAt(0) === "I") {
                this.moveInputBefore('INDEX' + j, 'CLOSE_BRACKET');
            } else {
                if (kind.charAt(1) === "1") {
                    this.moveInputBefore("SLICELOWER" + j, 'CLOSE_BRACKET');
                }
                this.moveInputBefore("SLICECOLON" + j, 'CLOSE_BRACKET');
                if (kind.charAt(2) === "1") {
                    this.moveInputBefore("SLICEUPPER" + j, 'CLOSE_BRACKET');
                }
                if (kind.charAt(3) === "1") {
                    this.moveInputBefore("SLICESTEP" + j, 'CLOSE_BRACKET');
                }
            }
        }

        // Remove deleted inputs.
        while (this.getInput('TARGET' + i) || this.getInput('SLICECOLON')) {
            this.removeInput('COMMA'+i, true);
            if (this.getInput('INDEX' + i)) {
                this.removeInput('INDEX' + i);
            } else {
                this.removeInput('SLICELOWER' + i, true);
                this.removeInput('SLICECOLON' + i, true);
                this.removeInput('SLICEUPPER' + i, true);
                this.removeInput('SLICESTEP' + i, true);
            }
            i++;
        }
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        for (let i = 0; i < this.sliceKinds_.length; i++) {
            let parameter = document.createElement('arg');
            parameter.setAttribute('name', this.sliceKinds_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.sliceKinds_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                this.sliceKinds_.push(childNode.getAttribute('name'));
            }
        }
        this.updateShape_();
    },
};

Blockly.Python['ast_Subscript'] = function (block) {
    // Create a list with any number of elements of any type.
    let value = Blockly.Python.valueToCode(block, 'VALUE',
        Blockly.Python.ORDER_MEMBER) || Blockly.Python.blank;
    var slices = new Array(block.sliceKinds_.length);
    for (let i = 0; i < block.sliceKinds_.length; i++) {
        let kind = block.sliceKinds_[i];
        if (kind.charAt(0) === 'I') {
            slices[i] = Blockly.Python.valueToCode(block, 'INDEX' + i,
                Blockly.Python.ORDER_MEMBER) || Blockly.Python.blank;
        } else {
            slices[i] = "";
            if (kind.charAt(1) === '1') {
                slices[i] += Blockly.Python.valueToCode(block, 'SLICELOWER' + i,
                    Blockly.Python.ORDER_MEMBER) || Blockly.Python.blank;
            }
            slices[i] += ":";
            if (kind.charAt(2) === '1') {
                slices[i] += Blockly.Python.valueToCode(block, 'SLICEUPPER' + i,
                    Blockly.Python.ORDER_MEMBER) || Blockly.Python.blank;
            }
            if (kind.charAt(3) === '1') {
                slices[i] += ":" + Blockly.Python.valueToCode(block, 'SLICESTEP' + i,
                    Blockly.Python.ORDER_MEMBER) || Blockly.Python.blank;
            }
        }
    }
    var code = value + '[' + slices.join(', ') + "]";
    return [code, Blockly.Python.ORDER_MEMBER];
};

var isWeirdSliceCase = function(slice) {
    return (slice.lower == null && slice.upper == null &&
        slice.step !== null && slice.step._astname === 'NameConstant' &&
        slice.step.value === Sk.builtin.none.none$);
}

BlockMirrorTextToBlocks.prototype.addSliceDim = function (slice, i, values, mutations, node) {
    let sliceKind = slice._astname;
    if (sliceKind === "Index") {
        values['INDEX' + i] = this.convert(slice.value, node);
        mutations.push("I");
    } else if (sliceKind === "Slice") {
        let L = "0", U = "0", S = "0";
        if (slice.lower !== null) {
            values['SLICELOWER' + i] = this.convert(slice.lower, node);
            L = "1";
        }
        if (slice.upper !== null) {
            values['SLICEUPPER' + i] = this.convert(slice.upper, node);
            U = "1";
        }
        if (slice.step !== null && !isWeirdSliceCase(slice)) {
            values['SLICESTEP' + i] = this.convert(slice.step, node);
            S = "1";
        }
        mutations.push("S" + L + U + S);
    }
}

BlockMirrorTextToBlocks.prototype['ast_Subscript'] = function (node, parent) {
    let value = node.value;
    let slice = node.slice;
    let ctx = node.ctx;

    let values = {'VALUE': this.convert(value, node)};
    let mutations = [];

    let sliceKind = slice._astname;
    if (sliceKind === "ExtSlice") {
        for (let i = 0; i < slice.dims.length; i += 1) {
            let dim = slice.dims[i];
            this.addSliceDim(dim, i, values, mutations, node);
        }
    } else {
        this.addSliceDim(slice, 0, values, mutations, node);
    }
    return BlockMirrorTextToBlocks.create_block("ast_Subscript", node.lineno, {},
        values, {"inline": "true"}, {"arg": mutations});
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_comprehensionFor",
    "message0": "for %1 in %2",
    "args0": [
        {"type": "input_value", "name": "TARGET"},
        {"type": "input_value", "name": "ITER"}
    ],
    "inputsInline": true,
    "output": "ComprehensionFor",
    "colour": BlockMirrorTextToBlocks.COLOR.SEQUENCES
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_comprehensionIf",
    "message0": "if %1",
    "args0": [
        {"type": "input_value", "name": "TEST"}
    ],
    "inputsInline": true,
    "output": "ComprehensionIf",
    "colour": BlockMirrorTextToBlocks.COLOR.SEQUENCES
});

Blockly.Blocks['ast_Comp_create_with_container'] = {
    /**
     * Mutator block for dict container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.SEQUENCES);
        this.appendDummyInput()
            .appendField('Add new comprehensions below');
        this.appendDummyInput()
            .appendField('   For clause');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

Blockly.Blocks['ast_Comp_create_with_for'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.SEQUENCES);
        this.appendDummyInput()
            .appendField('For clause');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

Blockly.Blocks['ast_Comp_create_with_if'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.SEQUENCES);
        this.appendDummyInput()
            .appendField('If clause');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

BlockMirrorTextToBlocks.COMP_SETTINGS = {
    'ListComp': {start: '[', end: ']', color: BlockMirrorTextToBlocks.COLOR.LIST},
    'SetComp': {start: '{', end: '}', color: BlockMirrorTextToBlocks.COLOR.SET},
    'GeneratorExp': {start: '(', end: ')', color: BlockMirrorTextToBlocks.COLOR.SEQUENCES},
    'DictComp': {start: '{', end: '}', color: BlockMirrorTextToBlocks.COLOR.DICTIONARY},
};

['ListComp', 'SetComp', 'GeneratorExp', 'DictComp'].forEach(function (kind) {
    Blockly.Blocks['ast_' + kind] = {
        /**
         * Block for creating a dict with any number of elements of any type.
         * @this Blockly.Block
         */
        init: function () {
            this.setStyle('loop_blocks');
            this.setColour(BlockMirrorTextToBlocks.COMP_SETTINGS[kind].color);
            this.itemCount_ = 3;
            let input = this.appendValueInput("ELT")
                .appendField(BlockMirrorTextToBlocks.COMP_SETTINGS[kind].start);
            if (kind === 'DictComp') {
                input.setCheck('DictPair');
            }
            this.appendDummyInput("END_BRACKET")
                .appendField(BlockMirrorTextToBlocks.COMP_SETTINGS[kind].end);
            this.updateShape_();
            this.setOutput(true);
            this.setMutator(new Blockly.Mutator(['ast_Comp_create_with_for', 'ast_Comp_create_with_if']));
        },
        /**
         * Create XML to represent dict inputs.
         * @return {!Element} XML storage element.
         * @this Blockly.Block
         */
        mutationToDom: function () {
            var container = document.createElement('mutation');
            container.setAttribute('items', this.itemCount_);
            return container;
        },
        /**
         * Parse XML to restore the dict inputs.
         * @param {!Element} xmlElement XML storage element.
         * @this Blockly.Block
         */
        domToMutation: function (xmlElement) {
            this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
            this.updateShape_();
        },
        /**
         * Populate the mutator's dialog with this block's components.
         * @param {!Blockly.Workspace} workspace Mutator's workspace.
         * @return {!Blockly.Block} Root block in mutator.
         * @this Blockly.Block
         */
        decompose: function (workspace) {
            var containerBlock = workspace.newBlock('ast_Comp_create_with_container');
            containerBlock.initSvg();
            var connection = containerBlock.getInput('STACK').connection;
            let generators = [];
            for (var i = 1; i < this.itemCount_; i++) {
                let generator = this.getInput('GENERATOR' + i).connection;
                let createName;
                if (generator.targetConnection.getSourceBlock().type === 'ast_comprehensionIf') {
                    createName = 'ast_Comp_create_with_if';
                } else if (generator.targetConnection.getSourceBlock().type === 'ast_comprehensionFor') {
                    createName = 'ast_Comp_create_with_for';
                } else {
                    throw Error("Unknown block type: " + generator.targetConnection.getSourceBlock().type);
                }
                var itemBlock = workspace.newBlock(createName);
                itemBlock.initSvg();
                connection.connect(itemBlock.previousConnection);
                connection = itemBlock.nextConnection;
                generators.push(itemBlock);
            }
            return containerBlock;
        },
        /**
         * Reconfigure this block based on the mutator dialog's components.
         * @param {!Blockly.Block} containerBlock Root block in mutator.
         * @this Blockly.Block
         */
        compose: function (containerBlock) {
            var itemBlock = containerBlock.getInputTargetBlock('STACK');
            // Count number of inputs.
            var connections = [containerBlock.valueConnection_];
            let blockTypes = ['ast_Comp_create_with_for'];
            while (itemBlock) {
                connections.push(itemBlock.valueConnection_);
                blockTypes.push(itemBlock.type);
                itemBlock = itemBlock.nextConnection &&
                    itemBlock.nextConnection.targetBlock();
            }
            // Disconnect any children that don't belong.
            for (var i = 1; i < this.itemCount_; i++) {
                var connection = this.getInput('GENERATOR' + i).connection.targetConnection;
                if (connection && connections.indexOf(connection) === -1) {
                    let connectedBlock = connection.getSourceBlock();
                    if (connectedBlock.type === 'ast_comprehensionIf') {
                        let testField = connectedBlock.getInput('TEST');
                        if (testField.connection.targetConnection) {
                            testField.connection.targetConnection.getSourceBlock().unplug(true);
                        }
                    } else if (connectedBlock.type === 'ast_comprehensionFor') {
                        let iterField = connectedBlock.getInput('ITER');
                        if (iterField.connection.targetConnection) {
                            iterField.connection.targetConnection.getSourceBlock().unplug(true);
                        }
                        let targetField = connectedBlock.getInput('TARGET');
                        if (targetField.connection.targetConnection) {
                            targetField.connection.targetConnection.getSourceBlock().unplug(true);
                        }
                    } else {
                        throw Error("Unknown block type: " + connectedBlock.type);
                    }
                    connection.disconnect();
                    connection.getSourceBlock().dispose();
                }
            }
            this.itemCount_ = connections.length;
            this.updateShape_();
            // Reconnect any child blocks.
            for (var i = 1; i < this.itemCount_; i++) {
                Blockly.Mutator.reconnect(connections[i], this, 'GENERATOR' + i);
                // TODO: glitch when inserting into middle, deletes children values
                if (!connections[i]) {
                    let createName;
                    if (blockTypes[i] === 'ast_Comp_create_with_if') {
                        createName = 'ast_comprehensionIf';
                    } else if (blockTypes[i] === 'ast_Comp_create_with_for') {
                        createName = 'ast_comprehensionFor';
                    } else {
                        throw Error("Unknown block type: " + blockTypes[i]);
                    }
                    let itemBlock = this.workspace.newBlock(createName);
                    itemBlock.setDeletable(false);
                    itemBlock.setMovable(false);
                    itemBlock.initSvg();
                    this.getInput('GENERATOR' + i).connection.connect(itemBlock.outputConnection);
                    itemBlock.render();
                    //this.get(itemBlock, 'ADD'+i)
                }
            }
        },
        /**
         * Store pointers to any connected child blocks.
         * @param {!Blockly.Block} containerBlock Root block in mutator.
         * @this Blockly.Block
         */
        saveConnections: function (containerBlock) {
            containerBlock.valueConnection_ = this.getInput('GENERATOR0').connection.targetConnection;
            var itemBlock = containerBlock.getInputTargetBlock('STACK');
            var i = 1;
            while (itemBlock) {
                var input = this.getInput('GENERATOR' + i);
                itemBlock.valueConnection_ = input && input.connection.targetConnection;
                i++;
                itemBlock = itemBlock.nextConnection &&
                    itemBlock.nextConnection.targetBlock();
            }
        },
        /**
         * Modify this block to have the correct number of inputs.
         * @private
         * @this Blockly.Block
         */
        updateShape_: function () {
            // Add new inputs.
            for (var i = 0; i < this.itemCount_; i++) {
                if (!this.getInput('GENERATOR' + i)) {
                    let input = this.appendValueInput('GENERATOR' + i);
                    if (i === 0) {
                        input.setCheck("ComprehensionFor");
                    } else {
                        input.setCheck(["ComprehensionFor", "ComprehensionIf"]);
                    }
                    this.moveInputBefore('GENERATOR' + i, 'END_BRACKET');
                }
            }
            // Remove deleted inputs.
            while (this.getInput('GENERATOR' + i)) {
                this.removeInput('GENERATOR' + i);
                i++;
            }
        }
    };

    Blockly.Python['ast_' + kind] = function (block) {
        // elt
        let elt;
        if (kind === 'DictComp') {
            let child = block.getInputTargetBlock('ELT');
            if (child === null || child.type !== 'ast_DictItem') {
                elt = (Blockly.Python.blank + ": " + Blockly.Python.blank);
            } else {
                let key = Blockly.Python.valueToCode(child, 'KEY', Blockly.Python.ORDER_NONE) ||
                    Blockly.Python.blank;
                let value = Blockly.Python.valueToCode(child, 'VALUE', Blockly.Python.ORDER_NONE) ||
                    Blockly.Python.blank;
                elt = (key + ": " + value);
            }
        } else {
            elt = Blockly.Python.valueToCode(block, 'ELT', Blockly.Python.ORDER_NONE) ||
                Blockly.Python.blank;
        }
        // generators
        let elements = new Array(block.itemCount_);
        const BAD_DEFAULT = (elt + " for " + Blockly.Python.blank + " in" + Blockly.Python.blank);
        for (var i = 0; i < block.itemCount_; i++) {
            let child = block.getInputTargetBlock('GENERATOR' + i);
            if (child === null) {
                elements[i] = BAD_DEFAULT;
            } else if (child.type === 'ast_comprehensionIf') {
                let test = Blockly.Python.valueToCode(child, 'TEST', Blockly.Python.ORDER_NONE) ||
                    Blockly.Python.blank;
                elements[i] = ("if " + test);
            } else if (child.type === 'ast_comprehensionFor') {
                let target = Blockly.Python.valueToCode(child, 'TARGET', Blockly.Python.ORDER_NONE) ||
                    Blockly.Python.blank;
                let iter = Blockly.Python.valueToCode(child, 'ITER', Blockly.Python.ORDER_NONE) ||
                    Blockly.Python.blank;
                elements[i] = ("for " + target + " in " + iter);
            } else {
                elements[i] = BAD_DEFAULT;
            }
        }
        // Put it all together
        let code = BlockMirrorTextToBlocks.COMP_SETTINGS[kind].start
            + elt + " " + elements.join(' ') +
            BlockMirrorTextToBlocks.COMP_SETTINGS[kind].end;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    BlockMirrorTextToBlocks.prototype['ast_' + kind] = function (node, parent) {
        let generators = node.generators;

        let elements = {};
        if (kind === 'DictComp') {
            let key = node.key;
            let value = node.value;
            elements["ELT"] = BlockMirrorTextToBlocks.create_block("ast_DictItem", node.lineno, {},
                {
                    "KEY": this.convert(key, node),
                    "VALUE": this.convert(value, node)
                },
                {
                    "inline": "true",
                    'deletable': "false",
                    "movable": "false"
                });
        } else {
            let elt = node.elt;
            elements["ELT"] = this.convert(elt, node);
        }
        let DEFAULT_SETTINGS = {
            "inline": "true",
            'deletable': "false",
            "movable": "false"
        };
        let g = 0;
        for (let i = 0; i < generators.length; i++) {
            let target = generators[i].target;
            let iter = generators[i].iter;
            let ifs = generators[i].ifs;
            let is_async = generators[i].is_async;
            elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block("ast_comprehensionFor", node.lineno, {},
                {
                    "ITER": this.convert(iter, node),
                    "TARGET": this.convert(target, node)
                },
                DEFAULT_SETTINGS);
            g += 1;
            if (ifs) {
                for (let j = 0; j < ifs.length; j++) {
                    elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block("ast_comprehensionIf", node.lineno, {},
                        {
                            "TEST": this.convert(ifs[j], node)
                        },
                        DEFAULT_SETTINGS);
                    g += 1;
                }
            }
        }

        return BlockMirrorTextToBlocks.create_block("ast_" + kind, node.lineno, {},
            elements,
            {
                "inline": "false"
            }, {
                "@items": g
            });
    };

});
// TODO: what if a user deletes a parameter through the context menu?

// The mutator container
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_FunctionHeaderMutator",
    "message0": "Setup parameters below: %1 %2 returns %3",
    "args0": [
        {"type": "input_dummy"},
        {"type": "input_statement", "name": "STACK", "align": "RIGHT"},
        {"type": "field_checkbox", "name": "RETURNS", "checked": true, "align": "RIGHT"}
    ],
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
    "enableContextMenu": false
});

// The elements you can put into the mutator
[
    ['Parameter', 'Parameter', '', false, false],
    ['ParameterType', 'Parameter with type', '', true, false],
    ['ParameterDefault', 'Parameter with default value', '', false, true],
    ['ParameterDefaultType', 'Parameter with type and default value', '', true, true],
    ['ParameterVararg', 'Variable length parameter', '*', false, false],
    ['ParameterVarargType', 'Variable length parameter with type', '*', true, false],
    ['ParameterKwarg', 'Keyworded Variable length parameter', '**', false],
    ['ParameterKwargType', 'Keyworded Variable length parameter with type', '**', true, false],
].forEach(function (parameterTypeTuple) {
    let parameterType = parameterTypeTuple[0],
        parameterDescription = parameterTypeTuple[1],
        parameterPrefix = parameterTypeTuple[2],
        parameterTyped = parameterTypeTuple[3],
        parameterDefault = parameterTypeTuple[4];
    BlockMirrorTextToBlocks.BLOCKS.push({
        "type": "ast_FunctionMutant" + parameterType,
        "message0": parameterDescription,
        "previousStatement": null,
        "nextStatement": null,
        "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
        "enableContextMenu": false
    });
    let realParameterBlock = {
        "type": "ast_Function" + parameterType,
        "output": "Parameter",
        "message0": parameterPrefix + (parameterPrefix ? ' ' : '') + "%1",
        "args0": [{"type": "field_variable", "name": "NAME", "variable": "param"}],
        "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
        "enableContextMenu": false,
        "inputsInline": (parameterTyped && parameterDefault),
    };
    if (parameterTyped) {
        realParameterBlock['message0'] += " : %2";
        realParameterBlock['args0'].push({"type": "input_value", "name": "TYPE"});
    }
    if (parameterDefault) {
        realParameterBlock['message0'] += " = %" + (parameterTyped ? 3 : 2);
        realParameterBlock['args0'].push({"type": "input_value", "name": "DEFAULT"});
    }
    BlockMirrorTextToBlocks.BLOCKS.push(realParameterBlock);

    Blockly.Python["ast_Function" + parameterType] = function (block) {
        let name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'),
            Blockly.Variables.NAME_TYPE);
        let typed = "";
        if (parameterTyped) {
            typed = ": " + Blockly.Python.valueToCode(block, 'TYPE',
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        }
        let defaulted = "";
        if (parameterDefault) {
            defaulted = "=" + Blockly.Python.valueToCode(block, 'DEFAULT',
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        }
        return [parameterPrefix + name + typed + defaulted, Blockly.Python.ORDER_ATOMIC];
    }
});

// TODO: Figure out an elegant "complexity" flag feature to allow different levels of Mutators

Blockly.Blocks['ast_FunctionDef'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("define")
            .appendField(new Blockly.FieldTextInput("function"), "NAME");
        this.decoratorsCount_ = 0;
        this.parametersCount_ = 0;
        this.hasReturn_ = false;
        this.mutatorComplexity_ = 0;
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.FUNCTIONS);
        this.updateShape_();
        this.setMutator(new Blockly.Mutator(['ast_FunctionMutantParameter',
            'ast_FunctionMutantParameterType']));
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('decorators', this.decoratorsCount_);
        container.setAttribute('parameters', this.parametersCount_);
        container.setAttribute('returns', this.hasReturn_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.decoratorsCount_ = parseInt(xmlElement.getAttribute('decorators'), 10);
        this.parametersCount_ = parseInt(xmlElement.getAttribute('parameters'), 10);
        this.hasReturn_ = "true" === xmlElement.getAttribute('returns');
        this.updateShape_();
    },
    setReturnAnnotation_: function (status) {
        let currentReturn = this.getInput('RETURNS');
        if (status) {
            if (!currentReturn) {
                this.appendValueInput("RETURNS")
                    .setCheck(null)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField("returns");
            }
            this.moveInputBefore('RETURNS', 'BODY');
        } else if (!status && currentReturn) {
            this.removeInput('RETURNS');
        }
        this.hasReturn_ = status;
    },
    updateShape_: function () {
        // Set up decorators and parameters
        let block = this;
        let position = 1;
        [
            ['DECORATOR', 'decoratorsCount_', null, 'decorated by'],
            ['PARAMETER', 'parametersCount_', 'Parameter', 'parameters:']
        ].forEach(function (childTypeTuple) {
            let childTypeName = childTypeTuple[0],
                countVariable = childTypeTuple[1],
                inputCheck = childTypeTuple[2],
                childTypeMessage = childTypeTuple[3];
            for (var i = 0; i < block[countVariable]; i++) {
                if (!block.getInput(childTypeName + i)) {
                    let input = block.appendValueInput(childTypeName + i)
                        .setCheck(inputCheck)
                        .setAlign(Blockly.ALIGN_RIGHT);
                    if (i === 0) {
                        input.appendField(childTypeMessage);
                    }
                }
                block.moveInputBefore(childTypeName + i, 'BODY');
            }
            // Remove deleted inputs.
            while (block.getInput(childTypeName + i)) {
                block.removeInput(childTypeName + i);
                i++;
            }
        });
        // Set up optional Returns annotation
        this.setReturnAnnotation_(this.hasReturn_);
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_FunctionHeaderMutator');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('RETURNS')) {
            containerBlock.setFieldValue(
                this.hasReturn_ ? 'TRUE' : 'FALSE', 'RETURNS');
        } else {
            // TODO: set up "canReturns" for lambda mode
            //containerBlock.getField('RETURNS').setVisible(false);
        }

        // Set up parameters
        var connection = containerBlock.getInput('STACK').connection;
        let parameters = [];
        for (var i = 0; i < this.parametersCount_; i++) {
            let parameter = this.getInput('PARAMETER' + i).connection;
            let sourceType = parameter.targetConnection.getSourceBlock().type;
            let createName = 'ast_FunctionMutant' + sourceType.substring('ast_Function'.length);
            var itemBlock = workspace.newBlock(createName);
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
            parameters.push(itemBlock);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        let blockTypes = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            blockTypes.push(itemBlock.type);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.parametersCount_; i++) {
            var connection = this.getInput('PARAMETER' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) === -1) {
                // Disconnect all children of this block
                let connectedBlock = connection.getSourceBlock();
                for (let j = 0; j < connectedBlock.inputList.length; j++) {
                    let field = connectedBlock.inputList[j].connection;
                    if (field && field.targetConnection) {
                        field.targetConnection.getSourceBlock().unplug(true);
                    }
                }
                connection.disconnect();
                connection.getSourceBlock().dispose();
            }
        }
        this.parametersCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.parametersCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'PARAMETER' + i);
            if (!connections[i]) {
                let createName = 'ast_Function' + blockTypes[i].substring('ast_FunctionMutant'.length);
                let itemBlock = this.workspace.newBlock(createName);
                itemBlock.setDeletable(false);
                itemBlock.setMovable(false);
                itemBlock.initSvg();
                this.getInput('PARAMETER' + i).connection.connect(itemBlock.outputConnection);
                itemBlock.render();
                //this.get(itemBlock, 'ADD'+i)
            }
        }
        // Show/hide the returns annotation
        let hasReturns = containerBlock.getFieldValue('RETURNS');
        if (hasReturns !== null) {
            hasReturns = hasReturns === 'TRUE';
            if (this.hasReturn_ != hasReturns) {
                if (hasReturns) {
                    this.setReturnAnnotation_(true);
                    Blockly.Mutator.reconnect(this.returnConnection_, this, 'RETURNS');
                    this.returnConnection_ = null;
                } else {
                    let returnConnection = this.getInput('RETURNS').connection
                    this.returnConnection_ = returnConnection.targetConnection;
                    if (this.returnConnection_) {
                        let returnBlock = returnConnection.targetBlock();
                        returnBlock.unplug();
                        returnBlock.bumpNeighbours_();
                    }
                    this.setReturnAnnotation_(false);
                }
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('PARAMETER' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
};

Blockly.Python['ast_FunctionDef'] = function (block) {
    // Name
    let name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // Decorators
    let decorators = new Array(block.decoratorsCount_);
    for (let i = 0; i < block.decoratorsCount_; i++) {
        let decorator = (Blockly.Python.valueToCode(block, 'DECORATOR' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
        decorators[i] = "@" + decorator + "\n";
    }
    // Parameters
    let parameters = new Array(block.parametersCount_);
    for (let i = 0; i < block.parametersCount_; i++) {
        parameters[i] = (Blockly.Python.valueToCode(block, 'PARAMETER' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
    }
    // Return annotation
    let returns = "";
    if (this.hasReturn_) {
        returns = " -> " + Blockly.Python.valueToCode(block, 'RETURNS', Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank;
    }
    // Body
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    return decorators.join('') + "def " + name + "(" + parameters.join(', ') + ")" + returns + ":\n" + body;
};

BlockMirrorTextToBlocks.prototype.parseArg = function (arg, type, lineno, values, node) {
    let settings = {
        "movable": false,
        "deletable": false
    };
    if (arg.annotation === null) {
        return BlockMirrorTextToBlocks.create_block(type,
            lineno, {'NAME': Sk.ffi.remapToJs(arg.arg)}, values, settings);
    } else {
        values['TYPE'] = this.convert(arg.annotation, node);
        return BlockMirrorTextToBlocks.create_block(type + "Type",
            lineno, {'NAME': Sk.ffi.remapToJs(arg.arg)}, values, settings);
    }
};

BlockMirrorTextToBlocks.prototype.parseArgs = function (args, values, lineno, node) {
    let positional = args.args,
        vararg = args.vararg,
        kwonlyargs = args.kwonlyargs,
        kwarg = args.kwarg,
        defaults = args.defaults,
        kw_defaults = args.kw_defaults;
    let totalArgs = 0;
    // args (positional)
    if (positional !== null) {
        // "If there are fewer defaults, they correspond to the last n arguments."
        let defaultOffset = defaults ? defaults.length - positional.length : 0;
        for (let i = 0; i < positional.length; i++) {
            let childValues = {};
            let type = 'ast_FunctionParameter';
            if (defaults[defaultOffset + i]) {
                childValues['DEFAULT'] = this.convert(defaults[defaultOffset + i], node);
                type += "Default";
            }
            values['PARAMETER' + totalArgs] = this.parseArg(positional[i], type, lineno, childValues, node);
            totalArgs += 1;
        }
    }
    // *arg
    if (vararg !== null) {
        values['PARAMETER' + totalArgs] = this.parseArg(vararg, 'ast_FunctionParameterVararg', lineno, {}, node);
        totalArgs += 1;
    }
    // keyword arguments that must be referenced by name
    if (kwonlyargs !== null) {
        for (let i = 0; i < kwonlyargs.length; i++) {
            let childValues = {};
            let type = 'ast_FunctionParameter';
            if (kw_defaults[i]) {
                childValues['DEFAULT'] = this.convert(kw_defaults[i], node);
                type += "Default";
            }
            values['PARAMETER' + totalArgs] = this.parseArg(kwonlyargs[i], type, lineno, childValues, node);
            totalArgs += 1;
        }
    }
    // **kwarg
    if (kwarg) {
        values['PARAMETER' + totalArgs] = this.parseArg(kwarg, 'ast_FunctionParameterKwarg', lineno, {}, node);
        totalArgs += 1;
    }

    return totalArgs;
};

BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node, parent) {
    let name = node.name;
    let args = node.args;
    let body = node.body;
    let decorator_list = node.decorator_list;
    let returns = node.returns;

    let values = {};

    if (decorator_list !== null) {
        for (let i = 0; i < decorator_list.length; i++) {
            values['DECORATOR' + i] = this.convert(decorator_list[i], node);
        }
    }

    let parsedArgs = 0;
    if (args !== null) {
        parsedArgs = this.parseArgs(args, values, node.lineno, node);
    }

    let hasReturn = (returns !== null &&
        (returns._astname !== 'NameConstant' || returns.value !== Sk.builtin.none.none$));
    if (hasReturn) {
        values['RETURNS'] = this.convert(returns, node);
    }

    return BlockMirrorTextToBlocks.create_block("ast_FunctionDef", node.lineno, {
            'NAME': Sk.ffi.remapToJs(name)
        },
        values,
        {
            "inline": "false"
        }, {
            "@decorators": (decorator_list === null ? 0 : decorator_list.length),
            "@parameters": parsedArgs,
            "@returns": hasReturn,
        }, {
            'BODY': this.convertBody(body, node)
        });
};

Blockly.Blocks['ast_Lambda'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("lambda")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.decoratorsCount_ = 0;
        this.parametersCount_ = 0;
        this.hasReturn_ = false;
        this.appendValueInput("BODY")
            .appendField("body")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(null);
        this.setInputsInline(false);
        this.setOutput(true);
        this.setColour(BlockMirrorTextToBlocks.COLOR.FUNCTIONS);
        this.updateShape_();
    },
    mutationToDom: Blockly.Blocks['ast_FunctionDef'].mutationToDom,
    domToMutation: Blockly.Blocks['ast_FunctionDef'].domToMutation,
    updateShape_: Blockly.Blocks['ast_FunctionDef'].updateShape_,
    setReturnAnnotation_: Blockly.Blocks['ast_FunctionDef'].setReturnAnnotation_,
};

Blockly.Python['ast_Lambda'] = function (block) {
    // Parameters
    let parameters = new Array(block.parametersCount_);
    for (let i = 0; i < block.parametersCount_; i++) {
        parameters[i] = (Blockly.Python.valueToCode(block, 'PARAMETER' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
    }
    // Body
    let body = Blockly.Python.valueToCode(block, 'BODY', Blockly.Python.ORDER_LAMBDA) || Blockly.Python.PASS;
    return ["lambda " + parameters.join(', ') + ": " + body, Blockly.Python.ORDER_LAMBDA];
};

BlockMirrorTextToBlocks.prototype['ast_Lambda'] = function (node, parent) {
    let args = node.args;
    let body = node.body;

    let values = {'BODY': this.convert(body, node)};

    let parsedArgs = 0;
    if (args !== null) {
        parsedArgs = this.parseArgs(args, values, node.lineno);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Lambda", node.lineno, {},
        values,
        {
            "inline": "false"
        }, {
            "@decorators": 0,
            "@parameters": parsedArgs,
            "@returns": false,
        });
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_ReturnFull",
    "message0": "return %1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Return",
    "message0": "return",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
});

Blockly.Python['ast_Return'] = function (block) {
    return "return\n";
};

Blockly.Python['ast_ReturnFull'] = function (block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    return "return " + value + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Return'] = function (node, parent) {
    let value = node.value;

    if (value == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Return", node.lineno);
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_ReturnFull", node.lineno, {}, {
            "VALUE": this.convert(value, node)
        });
    }
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_YieldFull",
    "message0": "yield %1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": false,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Yield",
    "message0": "yield",
    "inputsInline": false,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
});

Blockly.Python['ast_Yield'] = function (block) {
    return ["yield", Blockly.Python.ORDER_LAMBDA];
};

Blockly.Python['ast_YieldFull'] = function (block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_LAMBDA) || Blockly.Python.blank;
    return ["yield " + value, Blockly.Python.ORDER_LAMBDA];
};

BlockMirrorTextToBlocks.prototype['ast_Yield'] = function (node, parent) {
    let value = node.value;

    if (value == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Yield", node.lineno);
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_YieldFull", node.lineno, {}, {
            "VALUE": this.convert(value, node)
        });
    }
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_YieldFrom",
    "message0": "yield from %1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": false,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
});

Blockly.Python['ast_YieldFrom'] = function (block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_LAMBDA) || Blockly.Python.blank;
    return ["yield from " + value, Blockly.Python.ORDER_LAMBDA];
};

BlockMirrorTextToBlocks.prototype['ast_YieldFrom'] = function (node, parent) {
    let value = node.value;

    return BlockMirrorTextToBlocks.create_block("ast_YieldFrom", node.lineno, {}, {
        "VALUE": this.convert(value, node)
    });
};
Blockly.Blocks['ast_Global'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.nameCount_ = 1;
        this.appendDummyInput('GLOBAL')
            .appendField("make global", "START_GLOBALS");
        this.updateShape_();
    },
    updateShape_: function () {
        let input = this.getInput("GLOBAL");
        // Update pluralization
        if (this.getField('START_GLOBALS')) {
            this.setFieldValue(this.nameCount_ > 1 ? "make globals" : "make global", "START_GLOBALS");
        }
        // Update fields
        for (var i = 0; i < this.nameCount_; i++) {
            if (!this.getField('NAME' + i)) {
                if (i !== 0) {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
                input.appendField(new Blockly.FieldVariable("variable"), 'NAME' + i);
            }
        }
        // Remove deleted fields.
        while (this.getField('NAME' + i)) {
            input.removeField('NAME' + i);
            i++;
        }
        // Delete and re-add ending field
        if (this.getField("END_GLOBALS")) {
            input.removeField("END_GLOBALS");
        }
        input.appendField("available", "END_GLOBALS");
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('names', this.nameCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.nameCount_ = parseInt(xmlElement.getAttribute('names'), 10);
        this.updateShape_();
    },
};

Blockly.Python['ast_Global'] = function (block) {
    // Create a list with any number of elements of any type.
    let elements = new Array(block.nameCount_);
    for (let i = 0; i < block.nameCount_; i++) {
        elements[i] = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME' + i), Blockly.Variables.NAME_TYPE);
    }
    return 'global ' + elements.join(', ') + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Global'] = function (node, parent) {
    let names = node.names;

    let fields = {};
    for (var i = 0; i < names.length; i++) {
        fields["NAME" + i] = Sk.ffi.remapToJs(names[i]);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Global", node.lineno,
        fields,
        {}, {
            "inline": "true",
        }, {
            "@names": names.length
        });
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Break",
    "message0": "break",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
});

Blockly.Python['ast_Break'] = function (block) {
    return "break\n";
};

BlockMirrorTextToBlocks.prototype['ast_Break'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("ast_Break", node.lineno);
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Continue",
    "message0": "continue",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
});

Blockly.Python['ast_Continue'] = function (block) {
    return "continue\n";
};

BlockMirrorTextToBlocks.prototype['ast_Continue'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("ast_Continue", node.lineno);
};
BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL = 0;
BlockMirrorTextToBlocks.HANDLERS_NO_AS = 1;
BlockMirrorTextToBlocks.HANDLERS_COMPLETE = 3;

Blockly.Blocks['ast_Try'] = {
    init: function () {
        this.handlersCount_ = 0;
        this.handlers_ = [];
        this.hasElse_ = false;
        this.hasFinally_ = false;
        this.appendDummyInput()
            .appendField("try:");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.EXCEPTIONS);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        for (let i = 0; i < this.handlersCount_; i++) {
            if (this.handlers_[i] === BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL) {
                this.appendDummyInput()
                    .appendField('except');
            } else {
                this.appendValueInput("TYPE"+i)
                    .setCheck(null)
                    .appendField("except");
                if (this.handlers_[i] === BlockMirrorTextToBlocks.HANDLERS_COMPLETE) {
                    this.appendDummyInput()
                        .appendField("as")
                        .appendField(new Blockly.FieldVariable("item"), "NAME"+i);
                }
            }
            this.appendStatementInput("HANDLER"+i)
                .setCheck(null);
        }
        if (this.hasElse_) {
            this.appendDummyInput()
                .appendField("else:");
            this.appendStatementInput("ORELSE")
                .setCheck(null);
        }
        if (this.hasFinally_) {
            this.appendDummyInput()
                .appendField("finally:");
            this.appendStatementInput("FINALBODY")
                .setCheck(null);
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('orelse', this.hasElse_);
        container.setAttribute('finalbody', this.hasFinally_);
        container.setAttribute('handlers', this.handlersCount_);
        for (let i = 0; i < this.handlersCount_; i++) {
            let parameter = document.createElement('arg');
            parameter.setAttribute('name', this.handlers_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.hasElse_ = "true" === xmlElement.getAttribute('orelse');
        this.hasFinally_ = "true" === xmlElement.getAttribute('finalbody');
        this.handlersCount_ = parseInt(xmlElement.getAttribute('handlers'), 10);
        this.handlers_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                this.handlers_.push(parseInt(childNode.getAttribute('name'), 10));
            }
        }
        this.updateShape_();
    },
};

Blockly.Python['ast_Try'] = function (block) {
    // Try:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Except clauses
    var handlers = new Array(block.handlersCount_);
    for (let i = 0; i < block.handlersCount_; i++) {
        let level = block.handlers_[i];
        let clause = "except";
        if (level !== BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL) {
            clause += " " + Blockly.Python.valueToCode(block, 'TYPE' + i,
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
            if (level === BlockMirrorTextToBlocks.HANDLERS_COMPLETE) {
                clause += " as " + Blockly.Python.variableDB_.getName(block.getFieldValue('NAME' + i),
                    Blockly.Variables.NAME_TYPE);
            }
        }
        clause += ":\n" + (Blockly.Python.statementToCode(block, 'HANDLER' + i) || Blockly.Python.PASS);
        handlers[i] = clause;
    }
    // Orelse:
    let orelse = "";
    if (this.hasElse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSE') || Blockly.Python.PASS);
    }
    // Finally:
    let finalbody = "";
    if (this.hasFinally_) {
        finalbody = "finally:\n" + (Blockly.Python.statementToCode(block, 'FINALBODY') || Blockly.Python.PASS);
    }
    return "try:\n" + body + handlers.join("") + orelse + finalbody;
};

BlockMirrorTextToBlocks.prototype['ast_Try'] = function (node, parent) {
    let body = node.body;
    let handlers = node.handlers;
    let orelse = node.orelse;
    let finalbody = node.finalbody;

    let fields = {};
    let values = {};
    let mutations = {
        "@ORELSE": orelse !== null  && orelse.length > 0,
        "@FINALBODY": finalbody !== null  && finalbody.length > 0,
        "@HANDLERS": handlers.length
    };

    let statements = {"BODY": this.convertBody(body, node)};
    if (orelse !== null) {
        statements['ORELSE'] = this.convertBody(orelse, node);
    }
    if (finalbody !== null && finalbody.length) {
        statements['FINALBODY'] = this.convertBody(finalbody, node);
    }

    let handledLevels = [];
    for (let i = 0; i < handlers.length; i++) {
        let handler = handlers[i];
        statements["HANDLER" + i] = this.convertBody(handler.body, node);
        if (handler.type === null) {
            handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL);
        } else {
            values["TYPE" + i] = this.convert(handler.type, node);
            if (handler.name === null) {
                handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_NO_AS);
            } else {
                handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_COMPLETE);
                fields["NAME" + i] = Sk.ffi.remapToJs(handler.name.id);
            }
        }
    }

    mutations["ARG"] = handledLevels;

    return BlockMirrorTextToBlocks.create_block("ast_Try", node.lineno, fields,
        values, {}, mutations, statements);
};
Blockly.Blocks['ast_ClassDef'] = {
    init: function () {
        this.decorators_ = 0;
        this.bases_ = 0;
        this.keywords_ = 0;
        this.appendDummyInput('HEADER')
            .appendField("Class")
            .appendField(new Blockly.FieldVariable("item"), "NAME");
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.OO);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        for (let i = 0; i < this.decorators_; i++) {
            let input = this.appendValueInput("DECORATOR" + i)
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT);
            if (i === 0) {
                input.appendField("decorated by");
            }
            this.moveInputBefore('DECORATOR' + i, 'BODY');
        }
        for (let i = 0; i < this.bases_; i++) {
            let input = this.appendValueInput("BASE" + i)
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT);
            if (i === 0) {
                input.appendField("inherits from");
            }
            this.moveInputBefore('BASE' + i, 'BODY');
        }

        for (let i = 0; i < this.keywords_; i++) {
            this.appendValueInput("KEYWORDVALUE" + i)
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldTextInput("metaclass"), "KEYWORDNAME" + i)
                .appendField("=");
            this.moveInputBefore('KEYWORDVALUE' + i, 'BODY');
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('decorators', this.decorators_);
        container.setAttribute('bases', this.bases_);
        container.setAttribute('keywords', this.keywords_);
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.decorators_ = parseInt(xmlElement.getAttribute('decorators'), 10);
        this.bases_ = parseInt(xmlElement.getAttribute('bases'), 10);
        this.keywords_ = parseInt(xmlElement.getAttribute('keywords'), 10);
        this.updateShape_();
    },
};

Blockly.Python['ast_ClassDef'] = function (block) {
    // Name
    let name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // Decorators
    let decorators = new Array(block.decorators_);
    for (let i = 0; i < block.decorators_; i++) {
        let decorator = (Blockly.Python.valueToCode(block, 'DECORATOR' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
        decorators[i] = "@" + decorator + "\n";
    }
    // Bases
    let bases = new Array(block.bases_);
    for (let i = 0; i < block.bases_; i++) {
        bases[i] = (Blockly.Python.valueToCode(block, 'BASE' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
    }
    // Keywords
    let keywords = new Array(block.keywords_);
    for (let i = 0; i < block.keywords_; i++) {
        let name = block.getFieldValue('KEYWORDNAME' + i);
        let value = (Blockly.Python.valueToCode(block, 'KEYWORDVALUE' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
        if (name == '**') {
            keywords[i] = '**' + value;
        } else {
            keywords[i] = name + '=' + value;
        }
    }
    // Body:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Put it together
    let arguments = (bases.concat(keywords));
    arguments = (arguments.length === 0) ? "" : "(" + arguments.join(', ') + ")";
    return decorators.join('') + "class " + name + arguments + ":\n" + body;
}
;

BlockMirrorTextToBlocks.prototype['ast_ClassDef'] = function (node, parent) {
    let name = node.name;
    let bases = node.bases;
    let keywords = node.keywords;
    let body = node.body;
    let decorator_list = node.decorator_list;

    let values = {};
    let fields = {'NAME': Sk.ffi.remapToJs(name)};

    if (decorator_list !== null) {
        for (let i = 0; i < decorator_list.length; i++) {
            values['DECORATOR' + i] = this.convert(decorator_list[i], node);
        }
    }

    if (bases !== null) {
        for (let i = 0; i < bases.length; i++) {
            values['BASE' + i] = this.convert(bases[i], node);
        }
    }

    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i++) {
            values['KEYWORDVALUE' + i] = this.convert(keywords[i].value, node);
            let arg = keywords[i].arg;
            if (arg === null) {
                fields['KEYWORDNAME' + i] = "**";
            } else {
                fields['KEYWORDNAME' + i] = Sk.ffi.remapToJs(arg);
            }
        }
    }

    return BlockMirrorTextToBlocks.create_block("ast_ClassDef", node.lineno, fields,
        values,
        {
            "inline": "false"
        }, {
            "@decorators": (decorator_list === null ? 0 : decorator_list.length),
            "@bases": (bases === null ? 0 : bases.length),
            "@keywords": (keywords === null ? 0 : keywords.length),
        }, {
            'BODY': this.convertBody(body, node)
        });
};

// TODO: direct imports are not variables, because you can do stuff like:
//         import os.path
//       What should the variable be? Blockly will mangle it, but we should really be
//       doing something more complicated here with namespaces (probably make `os` the
//       variable and have some kind of list of attributes. But that's in the fading zone.
Blockly.Blocks['ast_Import'] = {
    init: function () {
        this.nameCount_ = 1;
        this.from_ = false;
        this.regulars_ = [true];
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.PYTHON);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        // Possible FROM part
        if (this.from_ && !this.getInput('FROM')) {
            this.appendDummyInput('FROM')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('from')
                .appendField(new Blockly.FieldTextInput("module"), "MODULE");
        } else if (!this.from_ && this.getInput('FROM')) {
            this.removeInput('FROM');
        }
        // Import clauses
        for (var i = 0; i < this.nameCount_; i++) {
            let input = this.getInput('CLAUSE' + i);
            if (!input) {
                input = this.appendDummyInput('CLAUSE' + i)
                    .setAlign(Blockly.ALIGN_RIGHT);
                if (i === 0) {
                    input.appendField("import");
                }
                input.appendField(new Blockly.FieldTextInput("default"), "NAME" + i)
            }
            if (this.regulars_[i] && this.getField('AS' + i)) {
                input.removeField('AS' + i);
                input.removeField('ASNAME' + i);
            } else if (!this.regulars_[i] && !this.getField('AS' + i)) {
                input.appendField("as", 'AS' + i)
                    .appendField(new Blockly.FieldVariable("alias"), "ASNAME" + i);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('CLAUSE' + i)) {
            this.removeInput('CLAUSE' + i);
            i++;
        }
        // Reposition everything
        if (this.from_ && this.nameCount_ > 0) {
            this.moveInputBefore('FROM', 'CLAUSE0');
        }
        for (i = 0; i + 1 < this.nameCount_; i++) {
            this.moveInputBefore('CLAUSE' + i, 'CLAUSE' + (i + 1));
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('names', this.nameCount_);
        container.setAttribute('from', this.from_);
        for (let i = 0; i < this.nameCount_; i++) {
            let parameter = document.createElement('regular');
            parameter.setAttribute('name', this.regulars_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.nameCount_ = parseInt(xmlElement.getAttribute('names'), 10);
        this.from_ = "true" === xmlElement.getAttribute('from');
        this.regulars_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'regular') {
                this.regulars_.push("true" === childNode.getAttribute('name'));
            }
        }
        this.updateShape_();
    },
};

Blockly.Python['ast_Import'] = function (block) {
    // Optional from part
    let from = "";
    if (this.from_) {
        from = "from "+block.getFieldValue('MODULE') + " ";
    }
    // Create a list with any number of elements of any type.
    let elements = new Array(block.nameCount_);
    for (let i = 0; i < block.nameCount_; i++) {
        elements[i] = block.getFieldValue('NAME' + i);
        if (!this.regulars_[i]) {
            elements[i] += " as " + Blockly.Python.variableDB_.getName(block.getFieldValue('ASNAME' + i), Blockly.Variables.NAME_TYPE);
        }
    }
    return from + 'import ' + elements.join(', ') + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Import'] = function (node, parent) {
    let names = node.names;

    let fields = {};
    let mutations = {'@names': names.length};

    let regulars = [];
    for (let i = 0; i < names.length; i++) {
        fields["NAME" + i] = Sk.ffi.remapToJs(names[i].name);
        let isRegular = (names[i].asname === null);
        if (!isRegular) {
            fields["ASNAME" + i] = Sk.ffi.remapToJs(names[i].asname);
        }
        regulars.push(isRegular);
    }
    mutations['regular'] = regulars;

    if (node._astname === 'ImportFrom') {
        // acbart: GTS suggests module can be None for '.' but it's an empty string in Skulpt
        mutations['@from'] = true;
        fields['MODULE'] = ('.'.repeat(node.level)) + Sk.ffi.remapToJs(node.module);
    } else {
        mutations['@from'] = false;
    }

    return BlockMirrorTextToBlocks.create_block("ast_Import", node.lineno, fields,
        {}, {}, mutations);
};

// Alias ImportFrom because of big overlap
BlockMirrorTextToBlocks.prototype['ast_ImportFrom'] = BlockMirrorTextToBlocks.prototype['ast_Import'];
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_WithItem",
    "output": "WithItem",
    "message0": "context %1",
    "args0": [{"type": "input_value", "name": "CONTEXT"}],
    "enableContextMenu": false,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
    "inputsInline": false,
});
Blockly.Python["ast_WithItem"] = function (block) {
    let context = Blockly.Python.valueToCode(block, 'CONTEXT',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    return [context, Blockly.Python.ORDER_NONE];
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_WithItemAs",
    "output": "WithItem",
    "message0": "context %1 as %2",
    "args0": [{"type": "input_value", "name": "CONTEXT"},
        {"type": "input_value", "name": "AS"}],
    "enableContextMenu": false,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
    "inputsInline": true,
});
Blockly.Python["ast_WithItemAs"] = function (block) {
    let context = Blockly.Python.valueToCode(block, 'CONTEXT',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    let as = Blockly.Python.valueToCode(block, 'AS',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    return [context + " as " + as, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ast_With'] = {
    init: function () {
        this.appendValueInput('ITEM0')
            .appendField("with");
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.itemCount_ = 1;
        this.renames_ = [false];
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.CONTROL);
        this.updateShape_();
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        for (let i = 0; i < this.itemCount_; i++) {
            let parameter = document.createElement('as');
            parameter.setAttribute('name', this.renames_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.renames_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'as') {
                this.renames_.push("true" === childNode.getAttribute('name'));
            }
        }
        this.updateShape_();
    },
    updateShape_: function () {
        // With clauses
        for (var i = 1; i < this.itemCount_; i++) {
            let input = this.getInput('ITEM' + i);
            if (!input) {
                input = this.appendValueInput('ITEM' + i);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ITEM' + i)) {
            this.removeInput('ITEM' + i);
            i++;
        }
        // Reposition everything
        for (i = 0; i < this.itemCount_; i++) {
            this.moveInputBefore('ITEM' + i, 'BODY');
        }
    },
};

Blockly.Python['ast_With'] = function (block) {
    // Contexts
    let items = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
        items[i] = (Blockly.Python.valueToCode(block, 'ITEM' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
    }
    // Body
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    return "with " + items.join(', ') + ":\n" + body;
};

BlockMirrorTextToBlocks.prototype['ast_With'] = function (node, parent) {
    let items = node.items;
    let body = node.body;

    let values = {};
    let mutations = {"@items": items.length};

    let renamedItems = [];
    for (let i = 0; i < items.length; i++) {
        let hasRename = items[i].optional_vars;
        renamedItems.push(hasRename);
        let innerValues = {'CONTEXT':this.convert(items[i].context_expr, node)};
        if (hasRename) {
            innerValues['AS'] = this.convert(items[i].optional_vars, node);
            values['ITEM'+i] = BlockMirrorTextToBlocks.create_block("ast_WithItemAs", node.lineno,
                {}, innerValues, this.LOCKED_BLOCK);
        } else {
            values['ITEM'+i] = BlockMirrorTextToBlocks.create_block("ast_WithItem", node.lineno,
                {}, innerValues, this.LOCKED_BLOCK);
        }
    }
    mutations['as'] = renamedItems;

    return BlockMirrorTextToBlocks.create_block("ast_With", node.lineno, {},
        values,
        {
            "inline": "false"
        }, mutations, {
            'BODY': this.convertBody(body, node)
        });
};

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Comment",
    "message0": "# Comment: %1",
    "args0": [{"type": "field_input", "name": "BODY", "text": "will be ignored"}],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
});

Blockly.Python['ast_Comment'] = function(block) {
    var text_body = block.getFieldValue('BODY');
    return '#'+text_body+'\n';
};

BlockMirrorTextToBlocks.prototype['ast_Comment'] = function (txt, lineno) {
    var commentText = txt.slice(1);
    /*if (commentText.length && commentText[0] === " ") {
        commentText = commentText.substring(1);
    }*/
    return BlockMirrorTextToBlocks.create_block("ast_Comment", lineno, {
        "BODY": commentText
    })
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Raw",
    "message0": "Code Block: %1 %2",
    "args0": [
        {"type": "input_dummy"},
        {"type": "field_multilinetext", "name": "TEXT", "value": ''}
    ],
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
    "previousStatement": null,
    "nextStatement": null,
});

Blockly.Python['ast_Raw'] = function (block) {
    var code = block.getFieldValue('TEXT') + "\n";
    return code;
};
