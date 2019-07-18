// TODO: what if a user deletes a parameter through the context menu?

// The mutator container
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_FunctionHeaderMutator",
    "message0": "Setup parameters below: %1 %2 returns %3",
    "args0": [
        {"type": "input_dummy"},
        {"type": "input_statement", "name": "STACK", "align": "RIGHT"},
        {"type": "input_value", "name": "RETURNS", "align": "RIGHT"}
    ],
    "style": "procedure_blocks",
    "enableContextMenu": false
});

// The elements you can put into the mutator
[
    ['Parameter', 'Parameter', '', false, false],
    ['ParameterType', 'Parameter with type', '', true, false],
    ['ParameterDefault', 'Parameter with default value', '', false, true],
    ['ParameterDefaultType', 'Parameter with type and default value', '', true, true],
    ['ParameterVararg', 'Variable length parameter', '*', false, false],
    ['ParameterVarargType', 'Variable length parameter with type', '*', true, false],
    ['ParameterKwarg', 'Keyworded Variable length parameter', '**', false],
    ['ParameterKwargType', 'Keyworded Variable length parameter with type', '**', true, false],
].forEach(function (parameterTypeTuple) {
    let parameterType = parameterTypeTuple[0],
        parameterDescription = parameterTypeTuple[1],
        parameterPrefix = parameterTypeTuple[2],
        parameterTyped = parameterTypeTuple[3],
        parameterDefault = parameterTypeTuple[4];
    BlockMirrorTextToBlocks.BLOCKS.push({
        "type": "ast_FunctionMutant" + parameterType,
        "message0": parameterDescription,
        "previousStatement": null,
        "nextStatement": null,
        "style": "procedure_blocks",
        "enableContextMenu": false
    });
    let realParameterBlock = {
        "type": "ast_Function" + parameterType,
        "output": "Parameter",
        "message0": parameterPrefix + (parameterPrefix ? ' ' : '') + "%1",
        "args0": [{"type": "field_variable", "name": "NAME", "variable": "param"}],
        "style": "procedure_blocks",
        "enableContextMenu": false,
        "inputsInline": (parameterTyped && parameterDefault),
    };
    if (parameterTyped) {
        realParameterBlock['message0'] += " : %2";
        realParameterBlock['args0'].push({"type": "input_value", "name": "TYPE"});
    }
    if (parameterDefault) {
        realParameterBlock['message0'] += " = %" + (parameterTyped ? 3 : 2);
        realParameterBlock['args0'].push({"type": "input_value", "name": "DEFAULT"});
    }
    BlockMirrorTextToBlocks.BLOCKS.push(realParameterBlock);

    Blockly.Python["ast_Function" + parameterType] = function (block) {
        let name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'),
            Blockly.Variables.NAME_TYPE);
        let typed = "";
        if (parameterTyped) {
            typed = ": " + Blockly.Python.valueToCode(block, 'TYPE',
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        }
        let defaulted = "";
        if (parameterDefault) {
            defaulted = "=" + Blockly.Python.valueToCode(block, 'DEFAULT',
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        }
        return [parameterPrefix + name + typed + defaulted, Blockly.Python.ORDER_ATOMIC];
    }
});

Blockly.Blocks['ast_FunctionDef'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("define")
            .appendField(new Blockly.FieldTextInput("function"), "NAME");
        this.decoratorsCount_ = 0;
        this.parametersCount_ = 0;
        this.hasReturn_ = false;
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("procedure_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
        this.updateShape_();
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('decorators', this.decoratorsCount_);
        container.setAttribute('parameters', this.parametersCount_);
        container.setAttribute('returns', this.hasReturn_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.decoratorsCount_ = parseInt(xmlElement.getAttribute('decorators'), 10);
        this.parametersCount_ = parseInt(xmlElement.getAttribute('parameters'), 10);
        this.hasReturn_ = "true" === xmlElement.getAttribute('returns');
        this.updateShape_();
    },
    updateShape_: function () {
        // Set up decorators and parameters
        let block = this;
        let position = 1;
        [
            ['DECORATOR', 'decoratorsCount_', null, 'decorated by'],
            ['PARAMETER', 'parametersCount_', 'Parameter', 'parameters:']
        ].forEach(function (childTypeTuple) {
            let childTypeName = childTypeTuple[0],
                countVariable = childTypeTuple[1],
                inputCheck = childTypeTuple[2],
                childTypeMessage = childTypeTuple[3];
            for (var i = 0; i < block[countVariable]; i++) {
                if (!block.getInput(childTypeName + i)) {
                    let input = block.appendValueInput(childTypeName + i)
                        .setCheck(inputCheck)
                        .setAlign(Blockly.ALIGN_RIGHT);
                    if (i === 0) {
                        input.appendField(childTypeMessage);
                    }
                }
                block.moveInputBefore(childTypeName + i, 'BODY');
            }
            // Remove deleted inputs.
            while (block.getInput(childTypeName + i)) {
                block.removeInput(childTypeName + i);
                i++;
            }
        });
        // Set up optional Returns annotation
        let currentReturn = this.getInput('RETURNS');
        if (this.hasReturn_) {
            if (!currentReturn) {
                this.appendValueInput("RETURNS")
                    .setCheck(null)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField("returns");
            }
            this.moveInputBefore('RETURNS', 'BODY');
        } else if (!this.hasReturn_ && currentReturn) {
            this.removeInput('RETURNS');
        }
    }
};

Blockly.Python['ast_FunctionDef'] = function (block) {
    // Name
    let name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // Decorators
    let decorators = new Array(block.decoratorsCount_);
    for (let i = 0; i < block.decoratorsCount_; i++) {
        let decorator = (Blockly.Python.valueToCode(block, 'DECORATOR' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
        decorators[i] = "@" + decorator + "\n";
    }
    // Parameters
    let parameters = new Array(block.parametersCount_);
    for (let i = 0; i < block.parametersCount_; i++) {
        parameters[i] = (Blockly.Python.valueToCode(block, 'PARAMETER' + i, Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank);
    }
    // Return annotation
    let returns = "";
    if (this.hasReturn_) {
        returns = " -> " + Blockly.Python.valueToCode(block, 'RETURNS', Blockly.Python.ORDER_NONE) ||
            Blockly.Python.blank;
    }
    // Body
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    return decorators.join('') + "def " + name + "(" + parameters.join(', ') + ")" + returns + ":\n" + body + "\n";
};

BlockMirrorTextToBlocks.prototype.parseArg = function (arg, type, lineno, values) {
    let settings = {
        "movable": false,
        "deletable": false
    };
    if (arg.annotation === null) {
        return BlockMirrorTextToBlocks.create_block(type,
            lineno, {'NAME': Sk.ffi.remapToJs(arg.arg)}, values, settings);
    } else {
        values['TYPE'] = this.convert(arg.annotation);
        return BlockMirrorTextToBlocks.create_block(type + "Type",
            lineno, {'NAME': Sk.ffi.remapToJs(arg.arg)}, values, settings);
    }
};

BlockMirrorTextToBlocks.prototype.parseArgs = function (args, values, lineno) {
    let positional = args.args,
        vararg = args.vararg,
        kwonlyargs = args.kwonlyargs,
        kwarg = args.kwarg,
        defaults = args.defaults,
        kw_defaults = args.kw_defaults;
    let totalArgs = 0;
    // args (positional)
    if (positional !== null) {
        // "If there are fewer defaults, they correspond to the last n arguments."
        let defaultOffset = defaults !== null ? defaults.length - positional.length : 0;
        for (let i = 0; i < positional.length; i++) {
            let childValues = {};
            let type = 'ast_FunctionParameter';
            if (defaults[defaultOffset+i]) {
                childValues['DEFAULT'] = this.convert(defaults[defaultOffset+i]);
                type += "Default";
            }
            values['PARAMETER' + totalArgs] = this.parseArg(positional[i], type, lineno, childValues);
            totalArgs += 1;
        }
    }
    // *arg
    if (vararg !== null) {
        values['PARAMETER' + totalArgs] = this.parseArg(vararg, 'ast_FunctionParameterVararg', lineno, {});
        totalArgs += 1;
    }
    // keyword arguments that must be referenced by name
    if (kwonlyargs !== null) {
        for (let i = 0; i < kwonlyargs.length; i++) {
            let childValues = {};
            let type = 'ast_FunctionParameter';
            if (kw_defaults[i]) {
                childValues['DEFAULT'] = this.convert(kw_defaults[i]);
                type += "Default";
            }
            values['PARAMETER' + totalArgs] = this.parseArg(kwonlyargs[i], type, lineno, childValues);
            totalArgs += 1;
        }
    }
    // **kwarg
    if (kwarg !== null) {
        values['PARAMETER' + totalArgs] = this.parseArg(kwarg, 'ast_FunctionParameterKwarg', lineno, {});
        totalArgs += 1;
    }

    return totalArgs;
}

BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node) {
    let name = node.name;
    let args = node.args;
    let body = node.body;
    let decorator_list = node.decorator_list;
    let returns = node.returns;

    let values = {};

    if (decorator_list !== null) {
        for (let i = 0; i < decorator_list.length; i++) {
            values['DECORATOR' + i] = this.convert(decorator_list[i]);
        }
    }

    let parsedArgs = 0;
    if (args !== null) {
        parsedArgs = this.parseArgs(args, values, node.lineno);
    }

    let hasReturn = (returns !== null &&
        (returns._astname !== 'NameConstant' || returns.value !== Sk.builtin.none.none$));
    if (hasReturn) {
        values['RETURNS'] = this.convert(returns);
    }

    return BlockMirrorTextToBlocks.create_block("ast_FunctionDef", node.lineno, {
            'NAME': Sk.ffi.remapToJs(name)
        },
        values,
        {
            "inline": "false"
        }, {
            "@decorators": (decorator_list === null ? 0 : decorator_list.length),
            "@parameters": parsedArgs,
            "@returns": hasReturn,
        }, {
            'BODY': this.convertBody(body)
        });
};
