Blockly.Blocks['ast_While'] = {
    init: function () {
        this.orelse_ = 0;
        this.appendValueInput('TEST')
            .appendField("while");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.CONTROL);
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        let latestInput = "BODY";

        if (this.orelse_ && !this.getInput('ELSE')) {
            this.appendDummyInput('ORELSETEST')
                .appendField("else:");
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

Blockly.Python['ast_While'] = function (block) {
    // Test
    let test = "while " + (Blockly.Python.valueToCode(block, 'TEST',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank) + ":\n";
    // Body:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Orelse:
    let orelse = "";
    if (this.orelse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSEBODY') || Blockly.Python.PASS);
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