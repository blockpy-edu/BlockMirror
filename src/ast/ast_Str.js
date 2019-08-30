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
    return Blockly.Python.multiline_quote_(code)+"\n";
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
