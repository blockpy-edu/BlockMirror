Blockly.Blocks['ast_Raise'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.EXCEPTIONS);
        this.exc_ = true;
        this.cause_ = false;

        this.appendDummyInput()
            .appendField("raise");
        this.updateShape_();
        this.setTooltip('The raise statement allows the programmer to force a specified exception to occur.');
        this.setHelpUrl('https://docs.python.org/3/tutorial/errors.html#raising-exceptions');
    },
    updateShape_: function () {
        if (this.exc_ && !this.getInput('EXC')) {
            this.appendValueInput("EXC")
                .setCheck(null);
        } else if (!this.exc_ && this.getInput('EXC')) {
            this.removeInput('EXC');
        }
        if (this.cause_ && !this.getInput('CAUSE')) {
            this.appendValueInput("CAUSE")
                .setCheck(null)
                .appendField("from");
        } else if (!this.cause_ && this.getInput('CAUSE')) {
            this.removeInput('CAUSE');
        }
        if (this.cause_ && this.exc_) {
            this.moveInputBefore('EXC', 'CAUSE');
        }
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('exc', this.exc_);
        container.setAttribute('cause', this.cause_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.exc_ = "true" === xmlElement.getAttribute('exc');
        this.cause_ = "true" === xmlElement.getAttribute('cause');
        this.updateShape_();
    },
};

Blockly.Python['ast_Raise'] = function (block) {
    if (this.exc_) {
        let exc = Blockly.Python.valueToCode(block, 'EXC', Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        if (this.cause_) {
            let cause = Blockly.Python.valueToCode(block, 'CAUSE', Blockly.Python.ORDER_NONE)
                || Blockly.Python.blank;
            return "raise " + exc + " from " + cause + "\n";
        } else {
            return "raise " + exc + "\n";
        }
    } else {
        return "raise"+"\n";
    }
};

BlockMirrorTextToBlocks.prototype['ast_Raise'] = function (node, parent) {
    var exc = node.exc;
    var cause = node.cause;
    let values = {};
    let hasExc = false, hasCause = false;
    if (exc !== null) {
        values['EXC'] = this.convert(exc, node);
        hasExc = true;
    }
    if (cause !== null) {
        values['CAUSE'] = this.convert(cause, node);
        hasCause = true;
    }
    return BlockMirrorTextToBlocks.create_block("ast_Raise", node.lineno, {}, values, {}, {
        '@exc': hasExc,
        '@cause': hasCause
    });
};