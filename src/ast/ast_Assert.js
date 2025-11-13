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

python.pythonGenerator.forBlock['ast_Assert'] = function(block, generator) {
    var test = python.pythonGenerator.valueToCode(block, 'TEST', python.Order.ATOMIC) || python.pythonGenerator.blank;
    return "assert " + test + "\n";
};

python.pythonGenerator.forBlock['ast_AssertFull'] = function(block, generator) {
    var test = python.pythonGenerator.valueToCode(block, 'TEST', python.Order.ATOMIC) || python.pythonGenerator.blank;
    var msg = python.pythonGenerator.valueToCode(block, 'MSG', python.Order.ATOMIC) || python.pythonGenerator.blank;
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