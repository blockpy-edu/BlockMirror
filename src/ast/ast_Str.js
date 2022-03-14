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
    "type": "ast_StrChar",
    "message0": "%1",
    "args0": [
        {"type": "field_dropdown", "name": "TEXT", "options": [
            ["\\n", "\n"], ["\\t", "\t"]
            ]}
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


Blockly.Blocks['ast_Image'] = {
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.TEXT);
        this.src_ = "loading.png";
        this.updateShape_();
        this.setOutput(true);
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('src', this.src_);
        return container;
    },
    domToMutation: function (xmlElement) {
        this.src_ = xmlElement.getAttribute('src');
        this.updateShape_();
    },
    updateShape_: function () {
        let image = this.getInput('IMAGE');
        if (!image) {
            image = this.appendDummyInput("IMAGE");
            image.appendField(new Blockly.FieldImage(this.src_, 40, 40, { alt: this.src_, flipRtl: "FALSE" }));
        }
        let imageField = image.fieldRow[0];
        imageField.setValue(this.src_);
    }
};

/*
"https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png"
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_StrImage",
    "message0": "%1%2",
    "args0": [
        {"type": "field_image", "src": "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png", "width": 20, "height": 20, "alt": ""},
        //{"type": "field_label_serializable", "name": "SRC", "value": '', "visible": "false"}
    ],
    "output": "String",
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
    //"extensions": ["text_quotes"]
});*/

Blockly.Python['ast_Str'] = function (block) {
    // Text value
    let code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
    code = code.replace("\n", "n");
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ast_StrChar'] = function (block) {
    // Text value
    let value = block.getFieldValue('TEXT');
    switch (value) {
        case "\n": return ["'\\n'", Blockly.Python.ORDER_ATOMIC];
        case "\t": return ["'\\t'", Blockly.Python.ORDER_ATOMIC];
    }
};

Blockly.Python['ast_Image'] = function (block) {
    // Text value
    //Blockly.Python.definitions_["import_image"] = "from image import Image";
    let code = Blockly.Python.quote_(block.src_);
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['ast_StrMultiline'] = function (block) {
    // Text value
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
    return Blockly.Python.multiline_quote_(code)+"\n";
};

BlockMirrorTextToBlocks.prototype.isSingleChar = function (text) {
    return text === "\n" || text === "\t";
};

BlockMirrorTextToBlocks.prototype.isDocString = function (node, parent) {
    return (parent._astname === 'Expr' &&
        parent._parent &&
        ['FunctionDef', 'ClassDef'].indexOf(parent._parent._astname) !== -1 &&
        parent._parent.body[0] === parent);
};

BlockMirrorTextToBlocks.prototype.isSimpleString = function (text) {
    return text.split("\n").length <= 2 && text.length <= 40;
};

BlockMirrorTextToBlocks.prototype.dedent = function (text, levels, isDocString) {
    if (!isDocString && text.charAt(0) === "\n") {
        return text;
    }
    let split = text.split("\n");
    let indentation = "    ".repeat(levels);
    let recombined = [];
    // Are all lines indented?
    for (let i = 0; i < split.length; i++) {
        // This was a blank line, add it unchanged unless its the first line
        if (split[i] === '') {
            if (i !== 0) {
                recombined.push("");
            }
        // If it has our ideal indentation, add it without indentation
        } else if (split[i].startsWith(indentation)) {
            let unindentedLine = split[i].substr(indentation.length);
            if (unindentedLine !== '' || i !== split.length - 1) {
                recombined.push(unindentedLine);
            }
        // If it's the first line, then add it unmodified
        } else if (i === 0) {
            recombined.push(split[i]);
        // This whole structure cannot be uniformly dedented, better give up.
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
    const regex = BlockMirrorTextEditor.REGEX_PATTERNS[this.blockMirror.configuration.imageDetection];
    //console.log(text, regex.test(JSON.stringify(text)));
    if (regex.test(JSON.stringify(text))) {
        //if (text.startsWith("http") && text.endsWith(".png")) {
        return BlockMirrorTextToBlocks.create_block("ast_Image", node.lineno, {}, {}, {},
            {"@src": text});
    } else if (this.isSingleChar(text)) {
        return BlockMirrorTextToBlocks.create_block("ast_StrChar", node.lineno, {"TEXT": text});
    } else if (this.isDocString(node, parent)) {
        let dedented = this.dedent(text, this.levelIndex - 1, true);
        return [BlockMirrorTextToBlocks.create_block("ast_StrDocstring", node.lineno, {"TEXT": dedented})];
    } else if (text.indexOf('\n') === -1) {
        return BlockMirrorTextToBlocks.create_block("ast_Str", node.lineno, {"TEXT": text});
    } else {
        let dedented = this.dedent(text, this.levelIndex - 1, false);
        return BlockMirrorTextToBlocks.create_block("ast_StrMultiline", node.lineno, {"TEXT": dedented});
    }
};
