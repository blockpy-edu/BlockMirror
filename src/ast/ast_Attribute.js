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

Blockly.Python['ast_Attribute'] = function (block) {
    // Text value.
    var value = Blockly.Python.variableDB_.getName(block.getFieldValue('VALUE'),
        Blockly.Variables.NAME_TYPE);
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;
    return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['ast_AttributeFull'] = function (block) {
    // Text value.
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
    var attr = block.getFieldValue('ATTR');
    let code = value + "." + attr;
    return [code, Blockly.Python.ORDER_MEMBER];
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
