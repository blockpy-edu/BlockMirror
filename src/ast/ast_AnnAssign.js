Blockly.Blocks['ast_AnnAssignFull'] = {
    init: function () {
        this.appendValueInput("TARGET")
            .setCheck(null)
            .appendField("set");
        this.appendValueInput("ANNOTATION")
            .setCheck(null)
            .appendField(":");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
        this.initialized_ = true;
        this.updateShape_();
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('initialized', this.initialized_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.initialized_ = "true" === xmlElement.getAttribute('initialized');
        this.updateShape_();
    },
    updateShape_: function (block) {
        // Add new inputs.
        if (this.initialized_ && !this.getInput('VALUE')) {
            this.appendValueInput('VALUE')
                .appendField('=')
                .setAlign(Blockly.inputs.Align.RIGHT);
        }
        if (!this.initialized_ && this.getInput('VALUE')) {
            this.removeInput('VALUE');
        }
    }
};

BlockMirrorTextToBlocks.ANNOTATION_OPTIONS = [
    ["int", "int"],
    ["float", "float"],
    ["str", "str"],
    ["bool", "bool"],
    ["None", "None"]
];

BlockMirrorTextToBlocks.ANNOTATION_GENERATE = {};
BlockMirrorTextToBlocks.ANNOTATION_OPTIONS.forEach(function (ann) {
    BlockMirrorTextToBlocks.ANNOTATION_GENERATE[ann[1]] = ann[0];
});

Blockly.Blocks['ast_AnnAssign'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldVariable("item"), "TARGET")
            .appendField(":")
            .appendField(new Blockly.FieldDropdown(BlockMirrorTextToBlocks.ANNOTATION_OPTIONS), "ANNOTATION");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("=");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
        this.strAnnotations_ = false;
        this.initialized_ = true;
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('str', this.strAnnotations_);
        container.setAttribute('initialized', this.initialized_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.strAnnotations_ = "true" === xmlElement.getAttribute('str');
        this.initialized_ = "true" === xmlElement.getAttribute('initialized');
        this.updateShape_();
    },
    updateShape_: function (block) {
        // Add new inputs.
        if (this.initialized_ && !this.getInput('VALUE')) {
            this.appendValueInput('VALUE')
                .appendField('=')
                .setAlign(Blockly.inputs.Align.RIGHT);
        }
        if (!this.initialized_ && this.getInput('VALUE')) {
            this.removeInput('VALUE');
        }
    }
};

python.pythonGenerator.forBlock['ast_AnnAssignFull'] = function(block, generator) {
    // Create a list with any number of elements of any type.
    let target = python.pythonGenerator.valueToCode(block, 'TARGET',
        python.Order.NONE) || python.pythonGenerator.blank;
    let annotation = python.pythonGenerator.valueToCode(block, 'ANNOTATION',
        python.Order.NONE) || python.pythonGenerator.blank;
    let value = "";
    if (this.initialized_) {
        value = " = " + python.pythonGenerator.valueToCode(block, 'VALUE',
            python.Order.NONE) || python.pythonGenerator.blank;
    }
    python.pythonGenerator.variables.add(annotation, target)
    return target + ": " + annotation + value + "\n";
};

python.pythonGenerator.forBlock['ast_AnnAssign'] = function(block, generator) {
    // Create a list with any number of elements of any type.
    var target = python.pythonGenerator.getVariableName(block.getFieldValue('TARGET'),
        Blockly.Variables.NAME_TYPE);
    let annotation = block.getFieldValue('ANNOTATION');
    if (block.strAnnotations_) {
        annotation = python.pythonGenerator.quote_(annotation);
    }
    let value = "";
    if (this.initialized_) {
        value = " = " + python.pythonGenerator.valueToCode(block, 'VALUE',
            python.Order.NONE) || python.pythonGenerator.blank;
    }
    python.pythonGenerator.variables.add(annotation, target)
    return target + ": " + annotation + value + "\n";
};

BlockMirrorTextToBlocks.prototype.getBuiltinAnnotation = function (annotation) {
    let result = false;
    // Can we turn it into a basic type?
    if (annotation._astname === 'Name') {
        result = Sk.ffi.remapToJs(annotation.id);
    } else if (annotation._astname === 'Str') {
        result = Sk.ffi.remapToJs(annotation.s);
    }

    // Potentially filter out unknown annotations
    if (result !== false && this.strictAnnotations) {
        if (this.strictAnnotations.indexOf(result) !== -1) {
            return result;
        } else {
            return false;
        }
    } else {
        return result;
    }
}

BlockMirrorTextToBlocks.prototype['ast_AnnAssign'] = function (node, parent) {
    let target = node.target;
    let annotation = node.annotation;
    let value = node.value;

    let values = {};
    let mutations = {'@initialized': false};
    if (value !== null) {
        values['VALUE'] = this.convert(value, node);
        mutations['@initialized'] = true;
    }

    // TODO: This controls whether the annotation is stored in __annotations__
    let simple = node.simple;

    let builtinAnnotation = this.getBuiltinAnnotation(annotation);

    if (target._astname === 'Name' && target.id.v !== python.pythonGenerator.blank && builtinAnnotation !== false) {
        mutations['@str'] = annotation._astname === 'Str'

        let variableName = target.id.v
        this.variables.add(builtinAnnotation, variableName)
        return BlockMirrorTextToBlocks.create_block("ast_AnnAssign", node.lineno, {
                'TARGET': variableName,
                'ANNOTATION': builtinAnnotation,
            },
            values,
            {
                "inline": "true",
            }, mutations);
    } else {
        values['TARGET'] = this.convert(target, node);
        values['ANNOTATION'] = this.convert(annotation, node);

        if (target._astname === 'Name') {
          let fullVariableType = this.resolveFromLibrary(annotation);

          if (fullVariableType) {
            let variableName = target.id.v;
            this.variables.add(fullVariableType, variableName);
          }
        }

        return BlockMirrorTextToBlocks.create_block("ast_AnnAssignFull", node.lineno, {},
            values,
            {
                "inline": "true",
            }, mutations);
    }
};