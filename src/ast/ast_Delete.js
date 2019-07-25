Blockly.Blocks['ast_Delete'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.targetCount_ = 1;

        this.appendDummyInput()
            .appendField("delete");
        this.updateShape_();
    },
    updateShape_: function () {
        // Add new inputs.
        for (var i = 0; i < this.targetCount_; i++) {
            if (!this.getInput('TARGET' + i)) {
                var input = this.appendValueInput('TARGET' + i);
                if (i !== 0) {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
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
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.targetCount_ = parseInt(xmlElement.getAttribute('targets'), 10);
        this.updateShape_();
    },
};

Blockly.Python['ast_Delete'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.targetCount_);
    for (var i = 0; i < block.targetCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, 'TARGET' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    var code = 'del ' + elements.join(', ') + "\n";
    return code;
};

BlockMirrorTextToBlocks.prototype['ast_Delete'] = function (node, parent) {
    let targets = node.targets;

    return BlockMirrorTextToBlocks.create_block("ast_Delete", node.lineno, {},
        this.convertElements("TARGET", targets, node),
        {
            "inline": "true",
        }, {
            "@targets": targets.length
        });
};