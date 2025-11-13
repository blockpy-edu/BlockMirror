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

python.pythonGenerator.forBlock['ast_Starred'] = function(block, generator) {
    // Basic arithmetic operators, and power.
    var order = python.Order.NONE;
    var argument1 = python.pythonGenerator.valueToCode(block, 'VALUE', order) || python.pythonGenerator.blank;
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