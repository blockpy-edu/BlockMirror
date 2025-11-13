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

python.pythonGenerator.forBlock['ast_Yield'] = function(block, generator) {
    return ["yield", python.Order.LAMBDA];
};

python.pythonGenerator.forBlock['ast_YieldFull'] = function(block, generator) {
    var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.LAMBDA) || python.pythonGenerator.blank;
    return ["yield " + value, python.Order.LAMBDA];
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