BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_AssertFull",
    "message0": "assert %1 %2",
    "args0": [
        {"type": "input_value", "name": "TEST"},
        {"type": "input_value", "name": "MSG"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Assert",
    "message0": "assert %1",
    "args0": [
        {"type": "input_value", "name": "TEST"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC,
});

Blockly.Python['ast_Assert'] = function (block) {
    var test = Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    return "assert " + test + "\n";
};

Blockly.Python['ast_AssertFull'] = function (block) {
    var test = Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || Blockly.Python.blank;
    return "assert " + test + ", "+msg+"\n";
};

BlockMirrorTextToBlocks.prototype['ast_Assert'] = function (node, parent) {
    var test = node.test;
    var msg = node.msg;
    if (msg == null) {
        return BlockMirrorTextToBlocks.create_block("ast_Assert", node.lineno, {}, {
            "TEST": this.convert(test, node)
        });
    } else {
        return BlockMirrorTextToBlocks.create_block("ast_AssertFull", node.lineno, {}, {
            "TEST": this.convert(test, node),
            "MSG": this.convert(msg, node)
        });
    }
};