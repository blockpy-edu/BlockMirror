Blockly.Blocks['ast_Global'] = {
    init: function () {
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.VARIABLES);
        this.nameCount_ = 1;
        this.appendDummyInput('GLOBAL')
            .appendField("make global", "START_GLOBALS");
        this.updateShape_();
        this.setTooltip('The global statement is a declaration which holds for the entire current code block');
        this.setHelpUrl('https://docs.python.org/3/reference/simple_stmts.html#grammar-token-global-stmt');
    },
    updateShape_: function () {
        let input = this.getInput("GLOBAL");
        // Update pluralization
        if (this.getField('START_GLOBALS')) {
            this.setFieldValue(this.nameCount_ > 1 ? "make globals" : "make global", "START_GLOBALS");
        }
        // Update fields
        for (var i = 0; i < this.nameCount_; i++) {
            if (!this.getField('NAME' + i)) {
                if (i !== 0) {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
                input.appendField(new Blockly.FieldVariable("variable"), 'NAME' + i);
            }
        }
        // Remove deleted fields.
        while (this.getField('NAME' + i)) {
            input.removeField('NAME' + i);
            i++;
        }
        // Delete and re-add ending field
        if (this.getField("END_GLOBALS")) {
            input.removeField("END_GLOBALS");
        }
        input.appendField("available", "END_GLOBALS");
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('names', this.nameCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.nameCount_ = parseInt(xmlElement.getAttribute('names'), 10);
        this.updateShape_();
    },
};

Blockly.Python['ast_Global'] = function (block) {
    // Create a list with any number of elements of any type.
    let elements = new Array(block.nameCount_);
    for (let i = 0; i < block.nameCount_; i++) {
        elements[i] = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME' + i), Blockly.Variables.NAME_TYPE);
    }
    return 'global ' + elements.join(', ') + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Global'] = function (node, parent) {
    let names = node.names;

    let fields = {};
    for (var i = 0; i < names.length; i++) {
        fields["NAME" + i] = Sk.ffi.remapToJs(names[i]);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Global", node.lineno,
        fields,
        {}, {
            "inline": "true",
        }, {
            "@names": names.length
        });
};