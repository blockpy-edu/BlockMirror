Blockly.Blocks['ast_Assign'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.targetCount_ = 1;
        this.simpleTarget_ = true;
        this.updateShape_();
        Blockly.Extensions.apply("contextMenu_variableSetterGetter", this, false);
    },
    updateShape_: function () {
        if (!this.getInput('VALUE')) {
            this.appendDummyInput()
                .appendField("set");
            this.appendValueInput('VALUE')
                .appendField('=');
        }
        let i = 0;
        if (this.targetCount_ === 1 && this.simpleTarget_) {
            this.setInputsInline(true);
            if (!this.getInput('VAR_ANCHOR')) {
                this.appendDummyInput('VAR_ANCHOR')
                    .appendField(new Blockly.FieldVariable("variable"), "VAR");
            }
            this.moveInputBefore('VAR_ANCHOR', 'VALUE');
        } else {
            this.setInputsInline(true);
            // Add new inputs.
            for (; i < this.targetCount_; i++) {
                if (!this.getInput('TARGET' + i)) {
                    var input = this.appendValueInput('TARGET' + i);
                    if (i !== 0) {
                        input.appendField('and').setAlign(Blockly.ALIGN_RIGHT);
                    }
                }
                this.moveInputBefore('TARGET' + i, 'VALUE');
            }
            // Kill simple VAR
            if (this.getInput('VAR_ANCHOR')) {
                this.removeInput('VAR_ANCHOR');
            }
        }
        // Remove deleted inputs.
        while (this.getInput('TARGET' + i)) {
            this.removeInput('TARGET' + i);
            i++;
        }
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('targets', this.targetCount_);
        container.setAttribute('simple', this.simpleTarget_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.targetCount_ = parseInt(xmlElement.getAttribute('targets'), 10);
        this.simpleTarget_ = "true" === xmlElement.getAttribute('simple');
        this.updateShape_();
    },
};

Blockly.Python['ast_Assign'] = function (block) {
    // Create a list with any number of elements of any type.
    let value = Blockly.Python.valueToCode(block, 'VALUE',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    let targets = new Array(block.targetCount_);
    if (block.targetCount_ === 1 && block.simpleTarget_) {
        targets[0] = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    } else {
        for (var i = 0; i < block.targetCount_; i++) {
            targets[i] = (Blockly.Python.valueToCode(block, 'TARGET' + i,
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank);
        }
    }
    return targets.join(' = ') + " = " + value + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Assign'] = function (node, parent) {
    let targets = node.targets;
    let value = node.value;

    let values;
    let fields = {};
    let simpleTarget = (targets.length === 1 && targets[0]._astname === 'Name');
    if (simpleTarget) {
        values = {};
        fields['VAR'] = Sk.ffi.remapToJs(targets[0].id);
    } else {
        values = this.convertElements("TARGET", targets, node);
    }
    values['VALUE'] = this.convert(value, node);

    return BlockMirrorTextToBlocks.create_block("ast_Assign", node.lineno, fields,
        values,
        {
            "inline": "true",
        }, {
            "@targets": targets.length,
            "@simple": simpleTarget
        });
};