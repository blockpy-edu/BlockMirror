BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_For",
  "message0": "for each item %1 in list %2 : %3 %4",
  "args0": [
    { "type": "input_value", "name": "TARGET" },
    { "type": "input_value", "name": "ITER" },
    { "type": "input_dummy" },
    { "type": "input_statement", "name": "BODY" }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
})

BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_ForElse",
  "message0": "for each item %1 in list %2 : %3 %4 else: %5 %6",
  "args0": [
    { "type": "input_value", "name": "TARGET" },
    { "type": "input_value", "name": "ITER" },
    { "type": "input_dummy" },
    { "type": "input_statement", "name": "BODY" },
    { "type": "input_dummy" },
    { "type": "input_statement", "name": "ELSE" }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
})

python.pythonGenerator.forBlock['ast_For'] = function(block, generator) {
  // For each loop.
  var argument0 = python.pythonGenerator.valueToCode(block, 'TARGET',
      python.Order.RELATIONAL) || python.pythonGenerator.blank;
  var argument1 = python.pythonGenerator.valueToCode(block, 'ITER',
      python.Order.RELATIONAL) || python.pythonGenerator.blank;
  var branchBody = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  var code = 'for ' + argument0 + ' in ' + argument1 + ':\n' + branchBody;

  if (block.getInputTargetBlock('ELSE')) {
      var branchElse = python.pythonGenerator.statementToCode(block, 'ELSE');

      if (branchElse) {
        code += 'else:\n' + branchElse;
      }
  }
  return code;
};

BlockMirrorTextToBlocks.prototype['ast_For'] = function (node, parent) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var orelse = node.orelse;
    
    var blockName = 'ast_For';
    var bodies = {'BODY': this.convertBody(body, node)};
    
    if (orelse.length > 0) {
        blockName = "ast_ForElse";
        bodies['ELSE'] = this.convertBody(orelse, node);
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
    }, {
        "ITER": this.convert(iter, node),
        "TARGET": this.convert(target, node)
    }, {}, {}, bodies);
}

python.pythonGenerator.forBlock['ast_ForElse'] = python.pythonGenerator.forBlock['ast_For']
BlockMirrorTextToBlocks.prototype['ast_ForElse'] = BlockMirrorTextToBlocks.prototype['ast_For'];
