// TODO: direct imports are not variables, because you can do stuff like:
//         import os.path
//       What should the variable be? Blockly will mangle it, but we should really be
//       doing something more complicated here with namespaces (probably make `os` the
//       variable and have some kind of list of attributes. But that's in the fading zone.
Blockly.Blocks['ast_Import'] = {
    init: function () {
        this.nameCount_ = 1;
        this.from_ = false;
        this.regulars_ = [true];
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.PYTHON));
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        // Possible FROM part
        if (this.from_ && !this.getInput('FROM')) {
            this.appendDummyInput('FROM')
                .setAlign(Blockly.inputs.Align.RIGHT)
                .appendField('from')
                .appendField(new Blockly.FieldTextInput("module"), "MODULE");
        } else if (!this.from_ && this.getInput('FROM')) {
            this.removeInput('FROM');
        }
        // Import clauses
        for (var i = 0; i < this.nameCount_; i++) {
            let input = this.getInput('CLAUSE' + i);
            if (!input) {
                input = this.appendDummyInput('CLAUSE' + i)
                    .setAlign(Blockly.inputs.Align.RIGHT);
                if (i === 0) {
                    input.appendField("import");
                }
                input.appendField(new Blockly.FieldTextInput("default"), "NAME" + i)
            }
            if (this.regulars_[i] && this.getField('AS' + i)) {
                input.removeField('AS' + i);
                input.removeField('ASNAME' + i);
            } else if (!this.regulars_[i] && !this.getField('AS' + i)) {
                input.appendField("as", 'AS' + i)
                    .appendField(new Blockly.FieldVariable("alias"), "ASNAME" + i);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('CLAUSE' + i)) {
            this.removeInput('CLAUSE' + i);
            i++;
        }
        // Reposition everything
        if (this.from_ && this.nameCount_ > 0) {
            this.moveInputBefore('FROM', 'CLAUSE0');
        }
        for (i = 0; i + 1 < this.nameCount_; i++) {
            this.moveInputBefore('CLAUSE' + i, 'CLAUSE' + (i + 1));
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('names', this.nameCount_);
        container.setAttribute('from', this.from_);
        for (let i = 0; i < this.nameCount_; i++) {
            let parameter = document.createElement('regular');
            parameter.setAttribute('name', this.regulars_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.nameCount_ = parseInt(xmlElement.getAttribute('names'), 10);
        this.from_ = "true" === xmlElement.getAttribute('from');
        this.regulars_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'regular') {
                this.regulars_.push("true" === childNode.getAttribute('name'));
            }
        }
        this.updateShape_();
    },
};

python.pythonGenerator.forBlock['ast_Import'] = function(block, generator) {
    // Optional from part
    let from = "";
    let moduleName = "";
    if (this.from_) {
        moduleName = block.getFieldValue('MODULE');
        from = "from " + moduleName + " ";
    }
    // Create a list with any number of elements of any type.
    let elements = new Array(block.nameCount_);
    for (let i = 0; i < block.nameCount_; i++) {
        let type = block.getFieldValue('NAME' + i);
        let name = type;
        elements[i] = name;
        if (!this.regulars_[i]) {
            name = python.pythonGenerator.getVariableName(block.getFieldValue('ASNAME' + i), Blockly.Variables.NAME_TYPE);
            elements[i] += " as " + name;
        }
        python.pythonGenerator.imports.set(moduleName + (moduleName ? '.' : '') + type, name);
    }
    return from + 'import ' + elements.join(', ') + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Import'] = function (node, parent) {
    let names = node.names;

    let fields = {};
    let mutations = {'@names': names.length};

    let regulars = [];
    let simpleName = "";
    let fromModule = "";

    if (node._astname === 'ImportFrom') {
        // acbart: GTS suggests module can be None for '.' but it's an empty string in Skulpt
        mutations['@from'] = true;
        fromModule = ('.'.repeat(node.level)) + Sk.ffi.remapToJs(node.module);
        fields['MODULE'] = fromModule;
    } else {
        mutations['@from'] = false;
    }

    for (let i = 0; i < names.length; i++) {
        let type = Sk.ffi.remapToJs(names[i].name);
        fields["NAME" + i] = type;
        let isRegular = (names[i].asname === null);
        if (!isRegular) {
            fields["ASNAME" + i] = Sk.ffi.remapToJs(names[i].asname);
            simpleName = fields["ASNAME"+i];
        } else {
            simpleName = type;
        }
        this.imports.set(fromModule + (fromModule ? '.' : '') + type, simpleName);
        regulars.push(isRegular);
    }

    mutations['regular'] = regulars;

    if (this.hiddenImports.indexOf(simpleName) !== -1) {
        return null;
    }

    return BlockMirrorTextToBlocks.create_block("ast_Import", node.lineno, fields,
        {}, {"inline": true}, mutations);
};

// Alias ImportFrom because of big overlap
BlockMirrorTextToBlocks.prototype['ast_ImportFrom'] = BlockMirrorTextToBlocks.prototype['ast_Import'];
