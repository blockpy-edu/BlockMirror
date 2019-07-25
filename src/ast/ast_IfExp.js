BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_IfExp",
    "message0": "%1 if %2 else %3",
    "args0": [
        {"type": "input_value", "name": "BODY"},
        {"type": "input_value", "name": "TEST"},
        {"type": "input_value", "name": "ORELSE"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});

Blockly.Python['ast_IfExp'] = function (block) {
    var test = Blockly.Python.valueToCode(block, 'TEST', Blockly.Python.ORDER_CONDITIONAL) || Blockly.Python.blank;
    var body = Blockly.Python.valueToCode(block, 'BODY', Blockly.Python.ORDER_CONDITIONAL) || Blockly.Python.blank;
    var orelse = Blockly.Python.valueToCode(block, 'ORELSE', Blockly.Python.ORDER_CONDITIONAL) || Blockly.Python.blank;
    return [body + " if " + test + " else " + orelse + "\n", Blockly.Python.ORDER_CONDITIONAL];
};

BlockMirrorTextToBlocks.prototype['ast_IfExp'] = function (node, parent) {
    let test = node.test;
    let body = node.body;
    let orelse = node.orelse;

    return BlockMirrorTextToBlocks.create_block("ast_IfExp", node.lineno, {}, {
        "TEST": this.convert(test, node),
        "BODY": this.convert(body, node),
        "ORELSE": this.convert(orelse, node)
    });
};