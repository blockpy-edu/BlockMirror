class LibraryLabelFieldTextInput extends Blockly.FieldTextInput {
  constructor(libraries, prefix, value, validator, config) {
    super(value, validator, config);
    this._libraries = libraries;
    this.prefix = prefix;
  }

  getDisplayText_() {
    let text = this.getText();
    let fromLibrary = this._libraries.resolve(this.prefix + text);

    if (fromLibrary instanceof PythonAttribute) {
      text = fromLibrary.label;
    }

    if (text.length > this.maxDisplayLength) {
      // Truncate displayed string and add an ellipsis ('...').
      text = text.substring(0, this.maxDisplayLength - 2) + '…';
    }
    // Replace whitespace with non-breaking spaces so the text doesn't collapse.
    text = text.replace(/\s/g, Blockly.Field.NBSP);
    if (this.sourceBlock_ && this.sourceBlock_.RTL) {
      // The SVG is LTR, force text to be RTL by adding an RLM.
      text += '\u200F';
    }
    return text;
  }
}

Blockly.Blocks['ast_Attribute'] = {
    init: function () {
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.premessage_ = "";
        this.message_ = "";
        this.postmessage_ = "";
        this.returns_ = 'Any';
        this.import_ = "";
        this.isFull_ = false;
        this.names_ = [];
        this.labels_ = [];
        this.fromLibrary_ = null;
        this.givenColour_ = BlockMirrorTextToBlocks.COLOR.OO;

        this.appendDummyInput('NAME').appendField(' ', 'premessage')
            .appendField(new Blockly.FieldVariable('variable'), 'VALUE')
            .appendField('.', 'message')
            .appendField(new LibraryLabelFieldTextInput(this.workspace.libraries, "", 'attribute'), 'ATTR')
            .appendField(' ', 'postmessage');
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('premessage', this.premessage_);
        container.setAttribute('message', this.message_);
        container.setAttribute('postmessage', this.postmessage_);
        container.setAttribute('returns', this.returns_);
        container.setAttribute('import', this.import_);
        container.setAttribute('full', this.isFull_);
        container.setAttribute('names', this.names_.join('|'));
        container.setAttribute('labels', this.labels_.join('|'));
        container.setAttribute('fromlibrary', this.fromLibrary_);
        container.setAttribute('colour', this.givenColour_);
        return container;
    },
    domToMutation: function (xmlElement) {
        this.premessage_ = xmlElement.getAttribute('premessage');
        this.message_ = xmlElement.getAttribute('message');
        this.postmessage_ = xmlElement.getAttribute('postmessage');
        this.returns_ = xmlElement.getAttribute('returns');
        this.import_ = xmlElement.getAttribute('import');
        this.isFull_ = "true" === xmlElement.getAttribute('full');
        this.names_ = xmlElement.getAttribute('names').split('|');
        this.labels_ = xmlElement.getAttribute('labels').split('|');
        this.fromLibrary_ = xmlElement.getAttribute('fromlibrary');
        let colour = xmlElement.getAttribute('colour')
        this.givenColour_ = parseInt(colour, 10);
        if (isNaN(this.givenColour_)) {
          this.givenColour_ = colour;
        }
        this.updateShape_();
    },
    updateShape_: function () {
        if (this.isFull_) {
          let nameInput = this.getInput('NAME')

          if (nameInput.removeField('premessage', true)) {
            nameInput.removeField('VALUE');
            this.appendValueInput('VALUE').appendField(' ', 'premessage');
            this.moveInputBefore('VALUE', 'NAME')
          }
        } else {
          if (this.removeInput('VALUE', true)) {
            let nameInput = this.getInput('NAME')
            nameInput.insertFieldAt(0, new Blockly.FieldVariable('variable'), 'VALUE')
            nameInput.insertFieldAt(0, new Blockly.FieldLabel(''), 'premessage')
          }
        }

        let attrField = this.getField('ATTR')

        if (attrField instanceof LibraryLabelFieldTextInput) {
            if (this.names_.length > 1) {
                let nameInput = this.getInput('NAME')
                nameInput.removeField('ATTR')
                nameInput.insertFieldAt(this.isFull_ ? 1 : 3, new Blockly.FieldDropdown(this.names_.map(
                    (item, index) => [this.labels_[index], item])
                ), 'ATTR')
            } else {
              attrField.prefix = this.fromLibrary_.replace(/[^.]+$/, '')
            }
        } else if (this.names_.length <= 1) {
            let nameInput = this.getInput('NAME')
            nameInput.removeField('ATTR')
            nameInput.insertFieldAt(this.isFull_ ? 1 : 3, new LibraryLabelFieldTextInput(this.workspace.libraries, this.fromLibrary_.replace(/[^.]+$/, ''), 'attribute'), 'ATTR')
        }

        this.getField('premessage').setValue(this.premessage_)
        this.getField('message').setValue(this.message_)
        this.getField('postmessage').setValue(this.postmessage_)
        this.setColour(this.givenColour_);
    },
};

python.pythonGenerator.forBlock['ast_Attribute'] = function(block, generator) {
    if (block.import_) {
        let [type, alias] = block.import_.split(' as ', 2)

        if (type && !python.pythonGenerator.imports.hasType(type)) {
            let name = alias ?? type;
            python.pythonGenerator.imports.set(type, name);
        }
    }

    let value

    if (block.isFull_) {
        value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
    } else {
        value = python.pythonGenerator.getVariableName(block.getFieldValue('VALUE'),
            Blockly.Variables.NAME_TYPE);
    }
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;

    if (block.outputConnection && block.outputConnection.targetBlock()) {
        // Return as expression
        return [code, python.Order.MEMBER];
    }

    return code + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Attribute'] = function (node, parent) {
    let value = node.value;
    let attrStr = Sk.ffi.remapToJs(node.attr)
    let returns = 'Any';
    let fromLibrary = this.resolveFromLibrary(node)
    let importAlias = null

    let mutations = {
        "@returns": returns,
        "@premessage": '',
        "@message": '.',
        "@postmessage": '',
        "@import": '',
        "@full": false,
        "@names": '',
        "@labels": '',
        "@fromlibrary": fromLibrary?.fullName ?? ""
    };

    if (fromLibrary) {
        // TODO support for custom behavior?
        mutations["@colour"] = fromLibrary.colour

        if (fromLibrary instanceof PythonAttribute) {
            mutations["@premessage"] = fromLibrary.premessage
            mutations["@message"] = fromLibrary.message
            mutations["@postmessage"] = fromLibrary.postmessage
            mutations["@returns"] = fromLibrary.typeHint?.flattened().toString() ?? returns
            mutations["@names"] = fromLibrary.names.join("|")
            mutations["@labels"] = fromLibrary.labels.join("|")

            if (fromLibrary.pythonClass === null) {
                mutations["@import"] = fromLibrary.pythonModule.requiresImport ?? ""
            }
        } else if (fromLibrary instanceof PythonClass || fromLibrary instanceof PythonModule) {
            if (fromLibrary.requiresImport) {
                mutations["@import"] = fromLibrary.requiresImport
                let importType
                [importType, importAlias] = fromLibrary.requiresImport.split(' as ', 2)
            }
        }
    } else {
      mutations["@colour"] = this.blockMirror.configuration.convertColour("ast_Attribute", BlockMirrorTextToBlocks.COLOR.OO)
    }

    let newBlock

    if (importAlias !== null) {
        // TODO colour from fromLibrary?
        newBlock = BlockMirrorTextToBlocks.create_block('ast_Name', node.lineno, {
            "VAR": attrStr
        },  {}, {}, {"@import": mutations["@import"]});
    } else if (this.blockMirror.configuration.preferFullAttributeBlocks || value._astname !== "Name") {
        mutations["@full"] = true
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
            "ATTR": attrStr
        }, {
            "VALUE": this.convert(value, node)
        }, {}, mutations);
    } else {
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
            "VALUE": Sk.ffi.remapToJs(value.id),
            "ATTR": attrStr
        }, {}, {}, mutations);
    }

    return newBlock;
}
