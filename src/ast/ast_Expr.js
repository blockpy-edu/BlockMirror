BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Expr",
    "message0": "do nothing with %1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
});

python.pythonGenerator.forBlock['ast_Expr'] = function(block, generator) {
    var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
    // TODO: Assemble JavaScript into code variable.
    return value + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Expr'] = function (node, parent) {
    let converted = this.convert(node.value, node);

    if (converted?.constructor === Array) {
        return converted[0];
    } else if (this.isTopLevel(parent) && this.filename === "toolbox.py") {
        // For toolbox only
        return converted;
    }

    return BlockMirrorTextToBlocks.create_block("ast_Expr", node.lineno, {}, {
        "VALUE": converted
    });
};
