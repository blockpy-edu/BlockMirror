Blockly.Blocks['ast_While'] = {
    init: function () {
        this.orelse_ = 0;
        this.appendValueInput('TEST')
            .appendField(this.translateText("while"));
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.CONTROL));
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        let latestInput = "BODY";

        if (this.orelse_ && !this.getInput('ELSE')) {
            this.appendDummyInput('ORELSETEST')
                .appendField(this.translateText("else:"));
            this.appendStatementInput("ORELSEBODY")
                .setCheck(null);
        } else if (!this.orelse_ && this.getInput('ELSE')) {
            block.removeInput('ORELSETEST');
            block.removeInput('ORELSEBODY');
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('orelse', this.orelse_);
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.orelse_ = "true" === xmlElement.getAttribute('orelse');
        this.updateShape_();
    },
};

python.pythonGenerator.forBlock['ast_While'] = function(block, generator) {
    // Test
    let test = "while " + (python.pythonGenerator.valueToCode(block, 'TEST',
        python.Order.NONE) || python.pythonGenerator.blank) + ":\n";
    // Body:
    let body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
    // Orelse:
    let orelse = "";
    if (this.orelse_) {
        orelse = "else:\n" + (python.pythonGenerator.statementToCode(block, 'ORELSEBODY') || python.pythonGenerator.PASS);
    }
    return test + body + orelse;
};

BlockMirrorTextToBlocks.prototype['ast_While'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    let values = {"TEST": this.convert(test, node)};
    let statements = {"BODY": this.convertBody(body, node)};

    let hasOrelse = false;
    if (orelse !== null && orelse.length > 0) {
        statements['ORELSEBODY'] = this.convertBody(orelse, node);
        hasOrelse = true;
    }

    return BlockMirrorTextToBlocks.create_block("ast_While", node.lineno, {},
        values, {}, {
            "@orelse": hasOrelse
        }, statements);
};