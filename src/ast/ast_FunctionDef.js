// TODO: what if a user deletes a parameter through the context menu?

// The mutator container
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_FunctionHeaderMutator",
    "message0": "Setup parameters below: %1 %2 returns %3",
    "args0": [
        {"type": "input_dummy"},
        {"type": "input_statement", "name": "STACK", "align": "RIGHT"},
        {"type": "field_checkbox", "name": "RETURNS", "checked": true, "align": "RIGHT"}
    ],
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
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
  let [parameterType, parameterDescription, parameterPrefix, parameterTyped, parameterDefault] = parameterTypeTuple;
    BlockMirrorTextToBlocks.BLOCKS.push({
        "type": "ast_FunctionMutant" + parameterType,
        "message0": parameterDescription,
        "previousStatement": null,
        "nextStatement": null,
        "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
        "enableContextMenu": false
    });
    let realParameterBlock = {
        "type": "ast_Function" + parameterType,
        "output": "Parameter",
        "message0": parameterPrefix + (parameterPrefix ? ' ' : '') + "%1",
        "args0": [{"type": "field_variable", "name": "NAME", "variable": "param"}],
        "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
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

    python.pythonGenerator.forBlock["ast_Function" + parameterType] = function (block) {
        let name = python.pythonGenerator.getVariableName(block.getFieldValue('NAME'),
            Blockly.Variables.NAME_TYPE);
        let typed = "";
        if (parameterTyped) {
            typed = ": " + (python.pythonGenerator.valueToCode(block, 'TYPE',
                python.Order.NONE) || python.pythonGenerator.blank);
        }
        let defaulted = "";
        if (parameterDefault) {
            defaulted = "=" + (python.pythonGenerator.valueToCode(block, 'DEFAULT',
                python.Order.NONE) || python.pythonGenerator.blank);
        }
        return [parameterPrefix + name + typed + defaulted, python.Order.ATOMIC];
    }
});

// TODO: Figure out an elegant "complexity" flag feature to allow different levels of Mutators

Blockly.Blocks['ast_FunctionDef'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(this.translateText("define"))
            .appendField(new Blockly.FieldTextInput("function"), "NAME");
        this.decoratorsCount_ = 0;
        this.parametersCount_ = 0;
        this.hasReturn_ = false;
        this.mutatorComplexity_ = 0;
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.FUNCTIONS));
        this.updateShape_();
        this.setMutator(new Blockly.icons.MutatorIcon(['ast_FunctionMutantParameter',
            'ast_FunctionMutantParameterType'], this));
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
    setReturnAnnotation_: function (status) {
        let currentReturn = this.getInput('RETURNS');
        if (status) {
            if (!currentReturn) {
                this.appendValueInput("RETURNS")
                    .setCheck(null)
                    .setAlign(Blockly.inputs.Align.RIGHT)
                    .appendField(this.translateText("returns"));
            }
            this.moveInputBefore('RETURNS', 'BODY');
        } else if (!status && currentReturn) {
            this.removeInput('RETURNS');
        }
        this.hasReturn_ = status;
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
                        .setAlign(Blockly.inputs.Align.RIGHT);
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
        this.setReturnAnnotation_(this.hasReturn_);
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('ast_FunctionHeaderMutator');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('RETURNS')) {
            containerBlock.setFieldValue(
                this.hasReturn_ ? 'TRUE' : 'FALSE', 'RETURNS');
        } else {
            // TODO: set up "canReturns" for lambda mode
            //containerBlock.getField('RETURNS').setVisible(false);
        }

        // Set up parameters
        var connection = containerBlock.getInput('STACK').connection;
        let parameters = [];
        for (var i = 0; i < this.parametersCount_; i++) {
            let parameter = this.getInput('PARAMETER' + i).connection;
            let sourceType = parameter.targetConnection.getSourceBlock().type;
            let createName = 'ast_FunctionMutant' + sourceType.substring('ast_Function'.length);
            var itemBlock = workspace.newBlock(createName);
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
            parameters.push(itemBlock);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        let blockTypes = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            blockTypes.push(itemBlock.type);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.parametersCount_; i++) {
            var connection = this.getInput('PARAMETER' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) === -1) {
                // Disconnect all children of this block
                let connectedBlock = connection.getSourceBlock();
                for (let j = 0; j < connectedBlock.inputList.length; j++) {
                    let field = connectedBlock.inputList[j].connection;
                    if (field && field.targetConnection) {
                        field.targetConnection.getSourceBlock().unplug(true);
                    }
                }
                connection.disconnect();
                connection.getSourceBlock().dispose();
            }
        }
        this.parametersCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.parametersCount_; i++) {
            connections[i]?.reconnect(this, 'PARAMETER' + i);
            if (!connections[i]) {
                let createName = 'ast_Function' + blockTypes[i].substring('ast_FunctionMutant'.length);
                let itemBlock = this.workspace.newBlock(createName);
                itemBlock.setDeletable(false);
                itemBlock.setMovable(false);
                itemBlock.initSvg();
                this.getInput('PARAMETER' + i).connection.connect(itemBlock.outputConnection);
                itemBlock.render();
                //this.get(itemBlock, 'ADD'+i)
            }
        }
        // Show/hide the returns annotation
        let hasReturns = containerBlock.getFieldValue('RETURNS');
        if (hasReturns !== null) {
            hasReturns = hasReturns === 'TRUE';
            if (this.hasReturn_ != hasReturns) {
                if (hasReturns) {
                    this.setReturnAnnotation_(true);
                    this.returnConnection_?.reconnect(this, 'RETURNS');
                    this.returnConnection_ = null;
                } else {
                    let returnConnection = this.getInput('RETURNS').connection
                    this.returnConnection_ = returnConnection.targetConnection;
                    if (this.returnConnection_) {
                        let returnBlock = returnConnection.targetBlock();
                        returnBlock.unplug();
                        returnBlock.bumpNeighbours();
                    }
                    this.setReturnAnnotation_(false);
                }
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('PARAMETER' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
};

python.pythonGenerator.forBlock['ast_FunctionDef'] = function(block, generator) {
    // Name
    let name = python.pythonGenerator.getVariableName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // Decorators
    let decorators = new Array(block.decoratorsCount_);
    for (let i = 0; i < block.decoratorsCount_; i++) {
        let decorator = (python.pythonGenerator.valueToCode(block, 'DECORATOR' + i, python.Order.NONE) ||
            python.pythonGenerator.blank);
        decorators[i] = "@" + decorator + "\n";
    }
    // Parameters
    let parameters = new Array(block.parametersCount_);
    for (let i = 0; i < block.parametersCount_; i++) {
        parameters[i] = (python.pythonGenerator.valueToCode(block, 'PARAMETER' + i, python.Order.NONE) ||
            python.pythonGenerator.blank);
    }
    // Return annotation
    let returns = "";
    if (this.hasReturn_) {
        returns = " -> " + python.pythonGenerator.valueToCode(block, 'RETURNS', python.Order.NONE) ||
            python.pythonGenerator.blank;
    }
    // Body
    let body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
    return decorators.join('') + "def " + name + "(" + parameters.join(', ') + ")" + returns + ":\n" + body;
};

BlockMirrorTextToBlocks.prototype.parseArg = function (arg, type, lineno, values, node) {
    let settings = {
        "movable": false,
        "deletable": false
    };
    if (arg.annotation === null) {
        return BlockMirrorTextToBlocks.create_block(type,
            lineno, {'NAME': Sk.ffi.remapToJs(arg.arg)}, values, settings);
    } else {
        values['TYPE'] = this.convert(arg.annotation, node);
        return BlockMirrorTextToBlocks.create_block(type + "Type",
            lineno, {'NAME': Sk.ffi.remapToJs(arg.arg)}, values, settings);
    }
};

BlockMirrorTextToBlocks.prototype.parseArgs = function (args, values, lineno, node) {
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
        let defaultOffset = defaults ? defaults.length - positional.length : 0;
        for (let i = 0; i < positional.length; i++) {
            let childValues = {};
            let type = 'ast_FunctionParameter';
            if (defaults[defaultOffset + i]) {
                childValues['DEFAULT'] = this.convert(defaults[defaultOffset + i], node);
                type += "Default";
            }
            values['PARAMETER' + totalArgs] = this.parseArg(positional[i], type, lineno, childValues, node);
            totalArgs += 1;
        }
    }
    // *arg
    if (vararg !== null) {
        values['PARAMETER' + totalArgs] = this.parseArg(vararg, 'ast_FunctionParameterVararg', lineno, {}, node);
        totalArgs += 1;
    }
    // keyword arguments that must be referenced by name
    if (kwonlyargs !== null) {
        for (let i = 0; i < kwonlyargs.length; i++) {
            let childValues = {};
            let type = 'ast_FunctionParameter';
            if (kw_defaults[i]) {
                childValues['DEFAULT'] = this.convert(kw_defaults[i], node);
                type += "Default";
            }
            values['PARAMETER' + totalArgs] = this.parseArg(kwonlyargs[i], type, lineno, childValues, node);
            totalArgs += 1;
        }
    }
    // **kwarg
    if (kwarg) {
        values['PARAMETER' + totalArgs] = this.parseArg(kwarg, 'ast_FunctionParameterKwarg', lineno, {}, node);
        totalArgs += 1;
    }

    return totalArgs;
};

BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node, parent) {
    let name = node.name;
    let args = node.args;
    let body = node.body;
    let decorator_list = node.decorator_list;
    let returns = node.returns;

    let values = {};

    if (decorator_list !== null) {
        for (let i = 0; i < decorator_list.length; i++) {
            let converted = this.convert(decorator_list[i], node)
            if (converted.constructor === Array) {
                converted = converted[0]
            }
            values['DECORATOR' + i] = converted;
        }
    }

    let parsedArgs = 0;
    if (args !== null) {
        parsedArgs = this.parseArgs(args, values, node.lineno, node);
    }

    let hasReturn = (returns !== null &&
        (returns._astname !== 'NameConstant' || returns.value !== Sk.builtin.none.none$));
    if (hasReturn) {
        values['RETURNS'] = this.convert(returns, node);
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
            'BODY': this.convertBody(body, node)
        });
};
