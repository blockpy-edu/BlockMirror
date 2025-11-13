BlockMirrorTextToBlocks.UNARYOPS = [
    ["+", "UAdd", 'Do nothing to the number'],
    ["-", "USub", 'Make the number negative'],
    ["not", "Not", 'Return the logical opposite of the value.'],
    ["~", "Invert", 'Take the bit inversion of the number']
];

BlockMirrorTextToBlocks.UNARYOPS.forEach(function (unaryop) {
    //Blockly.Constants.Math.TOOLTIPS_BY_OP[unaryop[1]] = unaryop[2];

    let fullName = "ast_UnaryOp" + unaryop[1];

    BlockMirrorTextToBlocks.BLOCKS.push({
        "type": fullName,
        "message0": unaryop[0] + " %1",
        "args0": [
            {"type": "input_value", "name": "VALUE"}
        ],
        "inputsInline": false,
        "output": unaryop[1] === 'Not' ? "Boolean" : null,
        "colour": (unaryop[1] === 'Not' ?
            BlockMirrorTextToBlocks.COLOR.LOGIC :
            BlockMirrorTextToBlocks.COLOR.MATH)
    });

    python.pythonGenerator.forBlock[fullName] = function (block) {
        // Basic arithmetic operators, and power.
        var order = (unaryop[1] === 'Not' ? python.Order.LOGICAL_NOT : python.Order.UNARY_SIGN);
        var argument1 = python.pythonGenerator.valueToCode(block, 'VALUE', order) || python.pythonGenerator.blank;
        var code = unaryop[0] + (unaryop[1] === 'Not' ? ' ' : '') + argument1;
        return [code, order];
    };
});

BlockMirrorTextToBlocks.prototype['ast_UnaryOp'] = function (node, parent) {
    let op = node.op.name;
    let operand = node.operand;

    if (operand instanceof Sk.astnodes.Num && op === "USub") {
      // Do not make the blocks more complex than needed, just make the number negative:
      operand.n.v = - operand.n.v
      return this.convert(operand, node)
    }

    return BlockMirrorTextToBlocks.create_block('ast_UnaryOp' + op, node.lineno, {}, {
        "VALUE": this.convert(operand, node)
    }, {
        "inline": false
    });
}