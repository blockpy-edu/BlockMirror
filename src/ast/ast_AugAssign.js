Blockly.Blocks['ast_AugAssign'] = {
    init: function () {
        let block = this;
        this.simpleTarget_ = true;
        this.allOptions_ = false;
        this.initialPreposition_ = "by";
        this.appendDummyInput("OP")
            .appendField(new Blockly.FieldDropdown(function () {
                return (block.allOptions_ ?
                    BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL :
                    BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY).map(
                      ([label, value]) => [block.translateText(label), value]
                    );
            }, function (value) {
                let block = this.sourceBlock_;
                block.updatePreposition_(value);
            }), "OP_NAME")
            .appendField(" ");
        this.appendDummyInput('PREPOSITION_ANCHOR')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("by", 'PREPOSITION');
        this.appendValueInput('VALUE');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
        this.updateShape_();
        this.updatePreposition_(this.initialPreposition_);
    },

    updatePreposition_: function(value) {
        let preposition = BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION[value];
        this.setFieldValue(this.translateText(preposition), 'PREPOSITION')
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('simple', this.simpleTarget_);
        container.setAttribute('options', this.allOptions_);
        container.setAttribute('preposition', this.initialPreposition_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.simpleTarget_ = "true" === xmlElement.getAttribute('simple');
        this.allOptions_ = "true" === xmlElement.getAttribute('options');
        this.initialPreposition_ = xmlElement.getAttribute('preposition');
        this.updateShape_();
        this.updatePreposition_(this.initialPreposition_);
    },
    updateShape_: function (block) {
        // Add new inputs.
        this.getField("OP_NAME").getOptions(false);

        if (this.simpleTarget_) {
            if (!this.getInput('VAR_ANCHOR')) {
                this.appendDummyInput('VAR_ANCHOR')
                    .appendField(new Blockly.FieldVariable("variable"), "VAR");
                this.moveInputBefore('VAR_ANCHOR', 'PREPOSITION_ANCHOR')
            }
            if (this.getInput('TARGET')) {
                this.removeInput('TARGET');
            }
        } else {
            if (this.getInput('VAR_ANCHOR')) {
                this.removeInput('VAR_ANCHOR');
            }
            if (!this.getInput('TARGET')) {
                this.appendValueInput('TARGET');
                this.moveInputBefore('TARGET', 'PREPOSITION_ANCHOR')
            }
        }
    }
};

python.pythonGenerator.forBlock['ast_AugAssign'] = function(block, generator) {
    // Create a list with any number of elements of any type.
    let target;
    if (block.simpleTarget_) {
        target = python.pythonGenerator.getVariableName(block.getFieldValue('VAR'),
            Blockly.Variables.NAME_TYPE);
    } else {
        target = python.pythonGenerator.valueToCode(block, 'TARGET',
            python.Order.NONE) || python.pythonGenerator.blank;
    }

    let operator = BINOPS_BLOCKLY_GENERATE[block.getFieldValue('OP_NAME')][0];

    let value = python.pythonGenerator.valueToCode(block, 'VALUE',
        python.Order.NONE) || python.pythonGenerator.blank;
    return target + operator + "= " + value + "\n";
};


BlockMirrorTextToBlocks.prototype['ast_AugAssign'] = function (node, parent) {
    let target = node.target;
    let op = node.op.name;
    let value = node.value;

    let values = {'VALUE': this.convert(value, node)};
    let fields = {'OP_NAME': op};
    let simpleTarget = target._astname === 'Name';

    if (simpleTarget) {
        fields['VAR'] = Sk.ffi.remapToJs(target.id);
    } else {
        values['TARGET'] = this.convert(target, node);
    }

    let preposition = op;

    let allOptions = BINOPS_SIMPLE.indexOf(op) === -1;

    return BlockMirrorTextToBlocks.create_block("ast_AugAssign", node.lineno, fields,
        values,
        {
            "inline": "true",
        }, {
            "@options": allOptions,
            "@simple": simpleTarget,
            "@preposition": preposition
        });
};
