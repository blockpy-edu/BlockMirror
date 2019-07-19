BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Continue",
    "message0": "continue",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "",
    "helpUrl": ""
});

Blockly.Python['ast_Continue'] = function (block) {
    return "continue\n";
};

BlockMirrorTextToBlocks.prototype['ast_Continue'] = function (node) {
    return BlockMirrorTextToBlocks.create_block("ast_Continue", node.lineno);
};