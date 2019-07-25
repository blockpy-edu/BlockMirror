BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Raw",
    "message0": "Code Block: %1 %2",
    "args0": [
        {"type": "input_dummy"},
        {"type": "field_multilinetext", "name": "TEXT", "value": ''}
    ],
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
    "previousStatement": null,
    "nextStatement": null,
});

Blockly.Python['ast_Raw'] = function (block) {
    var code = block.getFieldValue('TEXT') + "\n";
    return code;
};
