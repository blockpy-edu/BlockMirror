Blockly.Blocks['ast_Num'] = {
    init: function () {
        this.setOutput(true, "Number");
        this.appendDummyInput('INPUT')
            .appendField(new Blockly.FieldNumber(0), 'NUM');
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.MATH));
        this.fieldFactory_ = "";
        // TODO perhaps more numeric types to check, but this handles the most common scenarios.
        initBlockFieldFactory(this, ["int", "float"])
    },
    updateShape_: function () {
        let input = this.getInput('INPUT')
        let field = null

        if (this.fieldFactory_) {
            let resolvedFieldFactory = _resolveFunction(this.fieldFactory_)

            if (resolvedFieldFactory) {
                field = resolvedFieldFactory(this, 'NUM')
            }
        }

        if (!field) {
            field = new Blockly.FieldNumber(0);
        }

        let value = this.getFieldValue('NUM');
        input.removeField('NUM')
        field.setValue(value, false);
        input.appendField(field, 'NUM')
    },
};

python.pythonGenerator.forBlock['ast_Num'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code === Infinity) {
    code = 'float("inf")';
    order = python.Order.FUNCTION_CALL;
  } else if (code === -Infinity) {
    code = '-float("inf")';
    order = python.Order.UNARY_SIGN;
  } else {
    order = code < 0 ? python.Order.UNARY_SIGN :
            python.Order.ATOMIC;
  }
  return [code, order];
};

BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
    var n = node.n;
    return BlockMirrorTextToBlocks.create_block("ast_Num", node.lineno, {
        "NUM": Sk.ffi.remapToJs(n)
    });
}
