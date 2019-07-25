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