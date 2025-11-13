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
    "output": "Boolean",
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

python.pythonGenerator.forBlock['ast_Compare'] = function(block, generator) {
    // Basic arithmetic operators, and power.
    var tuple = COMPARES_BLOCKLY_GENERATE[block.getFieldValue('OP')];
    var operator = ' ' + tuple + ' ';
    var order = python.Order.RELATIONAL;
    var argument0 = python.pythonGenerator.valueToCode(block, 'A', order) || python.pythonGenerator.blank;
    var argument1 = python.pythonGenerator.valueToCode(block, 'B', order) || python.pythonGenerator.blank;
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