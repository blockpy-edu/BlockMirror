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