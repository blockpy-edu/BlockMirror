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

python.pythonGenerator.forBlock['ast_YieldFrom'] = function(block, generator) {
    var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.LAMBDA) || python.pythonGenerator.blank;
    return ["yield from " + value, python.Order.LAMBDA];
};

BlockMirrorTextToBlocks.prototype['ast_YieldFrom'] = function (node, parent) {
    let value = node.value;

    return BlockMirrorTextToBlocks.create_block("ast_YieldFrom", node.lineno, {}, {
        "VALUE": this.convert(value, node)
    });
};