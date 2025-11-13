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

python.pythonGenerator.forBlock['ast_IfExp'] = function(block, generator) {
    var test = python.pythonGenerator.valueToCode(block, 'TEST', python.Order.CONDITIONAL) || python.pythonGenerator.blank;
    var body = python.pythonGenerator.valueToCode(block, 'BODY', python.Order.CONDITIONAL) || python.pythonGenerator.blank;
    var orelse = python.pythonGenerator.valueToCode(block, 'ORELSE', python.Order.CONDITIONAL) || python.pythonGenerator.blank;
    return [body + " if " + test + " else " + orelse + "\n", python.Order.CONDITIONAL];
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