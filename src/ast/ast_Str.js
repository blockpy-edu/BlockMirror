BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Str",
    "message0": "%1",
    "args0": [
        { "type": "field_number", "name": "TEXT", "value": ''}
    ],
    "output": "String",
    "style": "text_blocks",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [ "text_quotes",  "parent_tooltip_when_inline" ]
})

Blockly.Python['ast_Str'] = function(block) {
    // Text value.
    var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.Python.ORDER_ATOMIC];
};

BlockMirrorTextToBlocks.prototype['ast_Str'] = function(node) {
    var s = node.s;
    return BlockMirrorTextToBlocks.create_block("ast_Str", node.lineno, {
        "TEXT": Sk.ffi.remapToJs(s)
    });
}
