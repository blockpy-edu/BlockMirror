BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Continue",
    "message0": "continue",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
});

python.pythonGenerator.forBlock['ast_Continue'] = function(block, generator) {
    return "continue\n";
};

BlockMirrorTextToBlocks.prototype['ast_Continue'] = function (node, parent) {
    return BlockMirrorTextToBlocks.create_block("ast_Continue", node.lineno);
};