BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Name",
    "message0": "%1",
    "args0": [
        {"type": "field_variable", "name": "VAR", "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"}
    ],
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.VARIABLES,
    "extensions": ["contextMenu_variableSetterGetter_forBlockMirror"]
})

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'ast_Name' and 'ast_Assign'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN_FOR_BLOCK_MIRROR = {
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

Blockly.Extensions.registerMixin('contextMenu_variableSetterGetter_forBlockMirror',
    Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN_FOR_BLOCK_MIRROR);

Blockly.Python['ast_Name'] = function (block) {
    // Variable getter.
    var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE);
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
    var id = node.id;
    var ctx = node.ctx;
    if (id.v == Blockly.Python.blank) {
        return null;
    } else {
        return BlockMirrorTextToBlocks.create_block('ast_Name', node.lineno, {
            "VAR": id.v
        });
    }
}
