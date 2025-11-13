Blockly.Blocks['ast_Name'] = {
    init: function () {
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.appendDummyInput('NAME')
          .appendField(new Blockly.FieldTextInput('default'), 'VAR');
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
        this.import_ = "";
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('import', this.import_);
        return container;
    },
    domToMutation: function (xmlElement) {
        this.import_ = xmlElement.getAttribute('import');
    },
    /**
     * Add menu option to create getter/setter block for this setter/getter.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        let name;
        if (!this.isInFlyout){
            // Getter blocks have the option to create a setter block, and vice versa.
            let opposite_type, contextMenuMsg;
            if (this.type === 'ast_Name') {
                opposite_type = 'ast_Assign';
                contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
            } else {
                opposite_type = 'ast_Name';
                contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
            }

            var option = {enabled: this.workspace.remainingCapacity() > 0};
            name = this.getField('VAR').getText();
            option.text = contextMenuMsg.replace('%1', name);
            var xmlField = document.createElement('field');
            xmlField.setAttribute('name', 'VAR');
            xmlField.appendChild(document.createTextNode(name));
            var xmlBlock = document.createElement('block');
            xmlBlock.setAttribute('type', opposite_type);
            xmlBlock.appendChild(xmlField);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
            // Getter blocks have the option to rename or delete that variable.
        } else {
            if (this.type === 'ast_Name' || this.type === 'variables_get_reporter'){
                var renameOption = {
                    text: Blockly.Msg.RENAME_VARIABLE,
                    enabled: true,
                    callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
                };
                name = this.getField('VAR').getText();
                var deleteOption = {
                    text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
                    enabled: true,
                    callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
                };
                options.unshift(renameOption);
                options.unshift(deleteOption);
            }
        }
    }
};

python.pythonGenerator.forBlock['ast_Name'] = function(block, generator) {
    // Variable getter.
    if (block.import_) {
        let [type, alias] = block.import_.split(' as ', 2)

        if (type && !python.pythonGenerator.imports.hasType(type)) {
            let name = alias ?? type;
            python.pythonGenerator.imports.set(type, name);
        }
    }

    var code = python.pythonGenerator.getVariableName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, python.Order.ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
  let id = node.id;
  if (id.v === python.pythonGenerator.blank) {
    return null;
  }
  let mutations = {}

  let fromLibrary = this.resolveFromLibrary(node)
  if (fromLibrary instanceof PythonClass || fromLibrary instanceof PythonModule) {
    mutations["@import"] = fromLibrary.requiresImport;
  }
  return BlockMirrorTextToBlocks.create_block('ast_Name', node.lineno, {
    "VAR": id.v
  }, {}, {}, mutations);
}
