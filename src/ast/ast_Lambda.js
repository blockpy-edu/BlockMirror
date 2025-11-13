Blockly.Blocks['ast_Lambda'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("lambda")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.decoratorsCount_ = 0;
        this.parametersCount_ = 0;
        this.hasReturn_ = false;
        this.appendValueInput("BODY")
            .appendField("body")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(null);
        this.setInputsInline(false);
        this.setOutput(true);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.FUNCTIONS));
        this.updateShape_();
    },
    mutationToDom: Blockly.Blocks['ast_FunctionDef'].mutationToDom,
    domToMutation: Blockly.Blocks['ast_FunctionDef'].domToMutation,
    updateShape_: Blockly.Blocks['ast_FunctionDef'].updateShape_,
    setReturnAnnotation_: Blockly.Blocks['ast_FunctionDef'].setReturnAnnotation_,
};

python.pythonGenerator.forBlock['ast_Lambda'] = function(block, generator) {
    // Parameters
    let parameters = new Array(block.parametersCount_);
    for (let i = 0; i < block.parametersCount_; i++) {
        parameters[i] = (python.pythonGenerator.valueToCode(block, 'PARAMETER' + i, python.Order.NONE) ||
            python.pythonGenerator.blank);
    }
    // Body
    let body = python.pythonGenerator.valueToCode(block, 'BODY', python.Order.LAMBDA) || python.pythonGenerator.PASS;
    return ["lambda " + parameters.join(', ') + ": " + body, python.Order.LAMBDA];
};

BlockMirrorTextToBlocks.prototype['ast_Lambda'] = function (node, parent) {
    let args = node.args;
    let body = node.body;

    let values = {'BODY': this.convert(body, node)};

    let parsedArgs = 0;
    if (args !== null) {
        parsedArgs = this.parseArgs(args, values, node.lineno);
    }

    return BlockMirrorTextToBlocks.create_block("ast_Lambda", node.lineno, {},
        values,
        {
            "inline": "false"
        }, {
            "@decorators": 0,
            "@parameters": parsedArgs,
            "@returns": false,
        });
};