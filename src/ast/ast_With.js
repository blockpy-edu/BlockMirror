BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_WithItem",
    "output": "WithItem",
    "message0": "context %1",
    "args0": [{"type": "input_value", "name": "CONTEXT"}],
    "enableContextMenu": false,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
    "inputsInline": false,
});
Blockly.Python["ast_WithItem"] = function (block) {
    let context = Blockly.Python.valueToCode(block, 'CONTEXT',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    return [context, Blockly.Python.ORDER_NONE];
};
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_WithItemAs",
    "output": "WithItem",
    "message0": "context %1 as %2",
    "args0": [{"type": "input_value", "name": "CONTEXT"},
        {"type": "input_value", "name": "AS"}],
    "enableContextMenu": false,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
    "inputsInline": true,
});
Blockly.Python["ast_WithItemAs"] = function (block) {
    let context = Blockly.Python.valueToCode(block, 'CONTEXT',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    let as = Blockly.Python.valueToCode(block, 'AS',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    return [context + " as " + as, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ast_With'] = {
    init: function () {
        this.appendValueInput('ITEM0')
            .appendField("with");
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.itemCount_ = 1;
        this.renames_ = [false];
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.CONTROL);
        this.updateShape_();
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        for (let i = 0; i < this.itemCount_; i++) {
            let parameter = document.createElement('as');
            parameter.setAttribute('name', this.renames_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.renames_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'as') {
                this.renames_.push("true" === childNode.getAttribute('name'));
            }
        }
        this.updateShape_();
    },
    updateShape_: function () {
        // With clauses
        for (var i = 1; i < this.itemCount_; i++) {
            let input = this.getInput('ITEM' + i);
            if (!input) {
                input = this.appendValueInput('ITEM' + i);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ITEM' + i)) {
            this.removeInput('ITEM' + i);
            i++;
        }
        // Reposition everything
        for (i = 0; i < this.itemCount_; i++) {
            this.moveInputBefore('ITEM' + i, 'BODY');
        }
    },
};

Blockly.Python['ast_With'] = function (block) {
    // Contexts
    let items = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
        items[i] = (Blockly.Python.valueToCode(block, 'ITEM' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
    }
    // Body
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    return "with " + items.join(', ') + ":\n" + body;
};

BlockMirrorTextToBlocks.prototype['ast_With'] = function (node, parent) {
    let items = node.items;
    let body = node.body;

    let values = {};
    let mutations = {"@items": items.length};

    let renamedItems = [];
    for (let i = 0; i < items.length; i++) {
        let hasRename = items[i].optional_vars;
        renamedItems.push(hasRename);
        let innerValues = {'CONTEXT':this.convert(items[i].context_expr, node)};
        if (hasRename) {
            innerValues['AS'] = this.convert(items[i].optional_vars, node);
            values['ITEM'+i] = BlockMirrorTextToBlocks.create_block("ast_WithItemAs", node.lineno,
                {}, innerValues, this.LOCKED_BLOCK);
        } else {
            values['ITEM'+i] = BlockMirrorTextToBlocks.create_block("ast_WithItem", node.lineno,
                {}, innerValues, this.LOCKED_BLOCK);
        }
    }
    mutations['as'] = renamedItems;

    return BlockMirrorTextToBlocks.create_block("ast_With", node.lineno, {},
        values,
        {
            "inline": "false"
        }, mutations, {
            'BODY': this.convertBody(body, node)
        });
};
