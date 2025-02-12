{
    let multiline_input_type = "field_multilinetext";

    if (!Blockly.registry.hasItem(Blockly.registry.Type.FIELD, multiline_input_type)) {
        if (typeof registerFieldMultilineInput === "function") {
            // Register if the field-multilineinput plugin is available
            registerFieldMultilineInput()
        } else {
            // Fallback in case plugin @blockly/field-multilineinput is not available
            multiline_input_type = "field_input";
        }
    }

    BlockMirrorTextToBlocks.BLOCKS.push({
        "type": "ast_Raw",
        "message0": "Code Block: %1 %2",
        "args0": [
            {"type": "input_dummy"},
            {"type": multiline_input_type, "name": "TEXT", "value": ''}
        ],
        "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
        "previousStatement": null,
        "nextStatement": null,
    });
}

python.pythonGenerator.forBlock['ast_Raw'] = function(block, generator) {
    var code = block.getFieldValue('TEXT') + "\n";
    return code;
};
