BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Comment",
    "message0": "# Comment: %1",
    "args0": [{"type": "field_input", "name": "BODY", "text": "will be ignored"}],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
});

Blockly.Python['ast_Comment'] = function(block) {
    var text_body = block.getFieldValue('BODY');
    return '#'+text_body+'\n';
};

BlockMirrorTextToBlocks.prototype['ast_Comment'] = function (txt, lineno) {
    var commentText = txt.slice(1);
    /*if (commentText.length && commentText[0] === " ") {
        commentText = commentText.substring(1);
    }*/
    return BlockMirrorTextToBlocks.create_block("ast_Comment", lineno, {
        "BODY": commentText
    })
};