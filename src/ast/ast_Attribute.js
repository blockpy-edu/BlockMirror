BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_AttributeFull",
    "lastDummyAlign0": "RIGHT",
    "message0": "%1 . %2",
    "args0": [
        {"type": "input_value", "name": "VALUE"},
        {"type": "field_input", "name": "ATTR", "text": "default"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.OO,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Attribute",
    "message0": "%1 . %2",
    "args0": [
        {"type": "field_variable", "name": "VALUE", "variable": "variable"},
        {"type": "field_input", "name": "ATTR", "text": "attribute"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.OO,
});

python.pythonGenerator.forBlock['ast_Attribute'] = function(block, generator) {
    // Text value.
    var value = python.pythonGenerator.getVariableName(block.getFieldValue('VALUE'),
        Blockly.Variables.NAME_TYPE);
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;
    return [code, python.pythonGenerator.ORDER_MEMBER];
};

python.pythonGenerator.forBlock['ast_AttributeFull'] = function(block, generator) {
    // Text value.
    var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.pythonGenerator.ORDER_NONE) || python.pythonGenerator.blank;
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;
    return [code, python.pythonGenerator.ORDER_MEMBER];
};

BlockMirrorTextToBlocks.prototype['ast_Attribute'] = function (node, parent) {
    let value = node.value;
    let attr = node.attr;

    //if (value.constructor)
    if (value._astname == "Name") {
        return BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
            "VALUE": Sk.ffi.remapToJs(value.id),
            "ATTR": Sk.ffi.remapToJs(attr)
        },);
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AttributeFull", node.lineno, {
            "ATTR": Sk.ffi.remapToJs(attr)
        }, {
            "VALUE": this.convert(value, node)
        });
    }
}
