BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Break",
    "message0": "break",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
});

python.pythonGenerator.forBlock['ast_Break'] = function(block, generator) {
    return "break\n";
};

BlockMirrorTextToBlocks.prototype['ast_Break'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("ast_Break", node.lineno);
};