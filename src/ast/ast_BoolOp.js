BlockMirrorTextToBlocks.BOOLOPS = [
    ["and", "And", python.Order.LOGICAL_AND, 'Return whether the left and right both evaluate to True.'],
    ["or", "Or", python.Order.LOGICAL_OR, 'Return whether either the left or right evaluate to True.']
];
var BOOLOPS_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.BOOLOPS.map(
    boolop => [boolop[0], boolop[1]]
);
var BOOLOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BOOLOPS.forEach(function (boolop) {
    BOOLOPS_BLOCKLY_GENERATE[boolop[1]] = [" " + boolop[0] + " ", boolop[2]];
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_BoolOp",
    "message0": "%1 %2 %3",
    "args0": [
        {"type": "input_value", "name": "A"},
        {"type": "field_dropdown", "name": "OP", "options": BOOLOPS_BLOCKLY_DISPLAY},
        {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

python.pythonGenerator.forBlock['ast_BoolOp'] = function(block, generator) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') === 'And') ? 'and' : 'or';
    var order = (operator === 'and') ? python.Order.LOGICAL_AND :
        python.Order.LOGICAL_OR;
    var argument0 = python.pythonGenerator.valueToCode(block, 'A', order) || python.pythonGenerator.blank;
    var argument1 = python.pythonGenerator.valueToCode(block, 'B', order) || python.pythonGenerator.blank;
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_BoolOp'] = function (node, parent) {
    var op = node.op;
    var values = node.values;
    var result_block = this.convert(values[0], node);
    for (var i = 1; i < values.length; i += 1) {
        result_block = BlockMirrorTextToBlocks.create_block("ast_BoolOp", node.lineno, {
            "OP": op.name
        }, {
            "A": result_block,
            "B": this.convert(values[i], node)
        }, {
            "inline": "true"
        });
    }
    return result_block;
};


