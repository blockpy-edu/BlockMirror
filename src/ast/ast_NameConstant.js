BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_NameConstantNone",
    "message0": "None",
    "args0": [],
    "output": "None",
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
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
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

python.pythonGenerator.forBlock['ast_NameConstantBoolean'] = function(block, generator) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'True' : 'False';
    return [code, python.Order.ATOMIC];
};

python.pythonGenerator.forBlock['ast_NameConstantNone'] = function(block, generator) {
    var code = 'None';
    return [code, python.Order.ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_NameConstant'] = function (node, parent) {
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