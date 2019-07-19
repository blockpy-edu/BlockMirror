BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Break",
    "message0": "break",
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "",
    "helpUrl": ""
});

Blockly.Python['ast_Break'] = function (block) {
    return "break\n";
};

BlockMirrorTextToBlocks.prototype['ast_Break'] = function (node) {
    return BlockMirrorTextToBlocks.create_block("ast_Break", node.lineno);
};