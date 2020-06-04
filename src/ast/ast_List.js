Blockly.Blocks['ast_List'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.LIST);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'List');
        this.setMutator(new Blockly.Mutator(['ast_List_create_with_item']));
        this.setTooltip('Lists are mutable sequences, typically used to store collections of homogeneous items');
        this.setHelpUrl('https://docs.python.org/3/library/stdtypes.html#list');
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_List_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('ast_List_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField('create empty list []');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField('create list with [');
                } else {
                    input.appendField(',').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
        // Add the trailing "]"
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            this.appendDummyInput('TAIL')
                .appendField(']')
                .setAlign(Blockly.ALIGN_RIGHT);
        }
    }
};

Blockly.Blocks['ast_List_create_with_container'] = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.LIST);
        this.appendDummyInput()
            .appendField('Add new list elements below');
        this.appendStatementInput('STACK');
        this.contextMenu = false;
        this.setTooltip('Lists are mutable sequences, typically used to store collections of homogeneous items');
        this.setHelpUrl('https://docs.python.org/3/library/stdtypes.html#list');
    }
};

Blockly.Blocks['ast_List_create_with_item'] = {
    /**
     * Mutator block for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(BlockMirrorTextToBlocks.COLOR.LIST);
        this.appendDummyInput()
            .appendField('Element');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
        this.setTooltip('Lists are mutable sequences, typically used to store collections of homogeneous items');
        this.setHelpUrl('https://docs.python.org/3/library/stdtypes.html#list');
    }
};

Blockly.Python['ast_List'] = function (block) {
    // Create a list with any number of elements of any type.
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    }
    var code = '[' + elements.join(', ') + ']';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_List'] = function (node, parent) {
    var elts = node.elts;
    var ctx = node.ctx;

    return BlockMirrorTextToBlocks.create_block("ast_List", node.lineno, {},
        this.convertElements("ADD", elts, node),
        {
            "inline": elts.length > 3 ? "false" : "true",
        }, {
            "@items": elts.length
        });
}
