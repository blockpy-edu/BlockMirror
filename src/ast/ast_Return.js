Blockly.Blocks['ast_ReturnFull'] = {
  init: function() {
    this.appendValueInput('VALUE')
      .appendField('return');
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(BlockMirrorTextToBlocks.COLOR.FUNCTIONS);
  }
};
// Blockly.common.defineBlocks({ast_ReturnFull: ast_ReturnFull});

// BlockMirrorTextToBlocks.BLOCKS.push({
//     "message0": "return %1",
//     "args0": [
//         {"type": "input_value", "name": "VALUE"}
//     ],
//     "inputsInline": true,
//     "previousStatement": null,
//     "nextStatement": null,
//     "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS
// });

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Return",
    "message0": "return",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS
});

python.pythonGenerator.forBlock['ast_Return'] = function(block, generator) {
    return "return\n";
};

python.pythonGenerator.forBlock['ast_ReturnFull'] = function(block, generator) {
    var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.pythonGenerator.ORDER_ATOMIC) || python.pythonGenerator.blank;
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