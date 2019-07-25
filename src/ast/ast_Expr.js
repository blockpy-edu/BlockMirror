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
