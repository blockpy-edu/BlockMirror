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
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
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
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
})

Blockly.Python['ast_For'] = function(block) {
  // For each loop.
  var argument0 = Blockly.Python.valueToCode(block, 'TARGET',
      Blockly.Python.ORDER_RELATIONAL) || Blockly.Python.blank;
  var argument1 = Blockly.Python.valueToCode(block, 'ITER',
      Blockly.Python.ORDER_RELATIONAL) || Blockly.Python.blank;
  var branchBody = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
  var branchElse = Blockly.Python.statementToCode(block, 'ELSE');
  var code = 'for ' + argument0 + ' in ' + argument1 + ':\n' + branchBody;
  if (branchElse) {
      code += 'else:\n' + branchElse;
  }
  return code;
};

BlockMirrorTextToBlocks.prototype['ast_For'] = function(node) {
    var target = node.target;
    var iter = node.iter;
    var body = node.body;
    var orelse = node.orelse;
    
    var blockName = 'ast_For';
    var bodies = {'BODY': this.convertBody(body)};
    
    if (orelse.length > 0) {
        blockName = "ast_ForElse";
        bodies['ELSE'] = this.convertBody(orelse);
    }

    return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
    }, {
        "ITER": this.convert(iter),
        "TARGET": this.convert(target)
    }, {}, {}, bodies);
}

Blockly.Python['ast_ForElse'] = Blockly.Python['ast_For'];
BlockMirrorTextToBlocks.prototype['ast_ForElse'] = BlockMirrorTextToBlocks.prototype['ast_For'];
