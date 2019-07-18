BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_NameConstantNone",
    "message0": "None",
    "args0": [],
    "output": "None",
    "style": "logic_blocks",
    "tooltip": "%{BKY_LOGIC_NULL_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_NULL_HELPURL}"
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_NameConstantBoolean",
    "message0": "%1",
    "args0": [
        {
            "type": "field_dropdown", "name": "BOOL", "options": [
                ["True", "TRUE"],
                ["False", "FALSE"]
            ]
        }
    ],
    "output": "Boolean",
    "style": "logic_blocks",
    "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}"
});

Blockly.Python['ast_NameConstantBoolean'] = function (block) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ast_NameConstantNone'] = function (block) {
    // Boolean values true and false.
    var code = 'None';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_NameConstant'] = function (node) {
    let value = node.value;

    if (value === Sk.builtin.none.none$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantNone', node.lineno, {});
    } else if (value === Sk.builtin.bool.true$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantBoolean', node.lineno, {
            "BOOL": 'TRUE'
        });
    } else if (value === Sk.builtin.bool.false$) {
        return BlockMirrorTextToBlocks.create_block('ast_NameConstantBoolean', node.lineno, {
            "BOOL": 'FALSE'
        });
    }
};