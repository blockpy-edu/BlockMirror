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