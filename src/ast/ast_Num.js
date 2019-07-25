BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Num",
    "message0": "%1",
    "args0": [
        { "type": "field_number", "name": "NUM", "value": 0}
    ],
    "output": "Number",
    "colour": BlockMirrorTextToBlocks.COLOR.MATH
})

Blockly.Python['ast_Num'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code == Infinity) {
    code = 'float("inf")';
    order = Blockly.Python.ORDER_FUNCTION_CALL;
  } else if (code == -Infinity) {
    code = '-float("inf")';
    order = Blockly.Python.ORDER_UNARY_SIGN;
  } else {
    order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
            Blockly.Python.ORDER_ATOMIC;
  }
  return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return BlockMirrorTextToBlocks.create_block("ast_Num", node.lineno, {
        "NUM": Sk.ffi.remapToJs(n)
    });
}
