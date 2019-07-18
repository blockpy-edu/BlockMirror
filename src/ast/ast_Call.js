Blockly.Blocks['ast_Call'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setStyle('procedure_blocks');
        this.setInputsInline(true);
        // acbart: added simpleName to handle complex function calls (e.g., chained)
        this.simpleName_ = "function";
        // Regular ('NAME') or Keyword (either '**' or '*NAME')
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        // acbart: Added count to keep track of unused parameters
        this.argumentCount_ = 0;
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        // acbart: Show parameter names, if they exist
        this.showParameterNames_ = false;
        // acbart: Whether this block returns
        this.returns_ = true;
        this.updateShape_();
    },

    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        if (this.simpleName_) {
            return /** @type {string} */ (this.getFieldValue('FUNC_NAME_VALUE'));
        } else {
            return null;
        }
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        if (this.getProcedureCall() === null ||
            Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'FUNC_NAME_VALUE');
            this.simpleName_ = newName;
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @private
     * @this Blockly.Block
     */
    setProcedureParameters_: function (paramNames, paramIds) {
        // Data structures:
        // this.arguments = ['x', 'y']
        //     Existing param names.
        // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
        //     Look-up of paramIds to connections plugged into the call block.
        // this.quarkIds_ = ['piua', 'f8b_']
        //     Existing param IDs.
        // Note that quarkConnections_ may include IDs that no longer exist, but
        // which might reappear if a param is reattached in the mutator.
        var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
            this.workspace);
        var mutatorOpen = defBlock && defBlock.mutator &&
            defBlock.mutator.isVisible();
        if (!mutatorOpen) {
            this.quarkConnections_ = {};
            this.quarkIds_ = null;
        }
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            return;
        }
        // Test arguments (arrays of strings) for changes. '\n' is not a valid
        // argument name character, so it is a valid delimiter here.
        if (paramNames.join('\n') == this.arguments_.join('\n')) {
            // No change.
            this.quarkIds_ = paramIds;
            return;
        }
        if (paramIds.length !== paramNames.length) {
            throw RangeError('paramNames and paramIds must be the same length.');
        }
        this.setCollapsed(false);
        if (!this.quarkIds_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            this.quarkIds_ = [];
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (let i = 0; i < this.arguments_.length; i++) {
            var input = this.getInput('ARG' + i);
            if (input) {
                let connection = input.connection.targetConnection;
                this.quarkConnections_[this.quarkIds_[i]] = connection;
                if (mutatorOpen && connection &&
                    paramIds.indexOf(this.quarkIds_[i]) === -1) {
                    // This connection should no longer be attached to this block.
                    connection.disconnect();
                    connection.getSourceBlock().bumpNeighbours_();
                }
            }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        this.argumentCount_ = this.arguments_.length;
        // And rebuild the argument model list.
        this.argumentVarModels_ = [];
        /*
        // acbart: Function calls don't create variables, what do they know?
        for (let i = 0; i < this.arguments_.length; i++) {
            let argumentName = this.arguments_[i];
            var variable = Blockly.Variables.getVariable(
                this.workspace, null, this.arguments_[i], '');
            if (variable) {
                this.argumentVarModels_.push(variable);
            }
        }*/

        this.updateShape_();
        this.quarkIds_ = paramIds;
        // Reconnect any child blocks.
        if (this.quarkIds_) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var quarkId = this.quarkIds_[i];
                if (quarkId in this.quarkConnections_) {
                    let connection = this.quarkConnections_[quarkId];
                    if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
                        // Block no longer exists or has been attached elsewhere.
                        delete this.quarkConnections_[quarkId];
                    }
                }
            }
        }
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
    },
    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Open Parentheses
        if (!this.getInput('OPEN_PAREN')) {
            this.appendDummyInput('OPEN_PAREN')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldLabel("("));
        }

        // Update function call name
        if (this.simpleName_) {
            if (this.getInput('FUNC')) {
                this.removeInput('FUNC');
            }
            if (!this.getInput('FUNC_NAME')) {
                this.appendDummyInput('FUNC_NAME')
                    .appendField(new Blockly.FieldTextInput("function"), "FUNC_NAME_VALUE");
            }
            this.moveInputBefore('FUNC_NAME', 'OPEN_PAREN');
        } else {
            if (!this.getInput('FUNC')) {
                this.appendValueInput('FUNC');
            }
            if (this.getInput('FUNC_NAME')) {
                this.removeInput('FUNC_NAME');
            }
            this.moveInputBefore('FUNC', 'OPEN_PAREN');
        }

        // Process arguments
        for (var i = 0; i < Math.min(this.argumentCount_, this.arguments_.length); i++) {
            let argument = this.arguments_[i];
            let argumentName = this.parseArgument_(argument);
            let field = this.getField('ARGNAME' + i);
            if (field) {
                // Ensure argument name is up to date.
                // The argument name field is deterministic based on the mutation,
                // no need to fire a change event.
                Blockly.Events.disable();
                try {
                    field.setValue(argumentName);
                } finally {
                    Blockly.Events.enable();
                }
            } else {
                // Add new input.
                field = new Blockly.FieldLabel(argumentName);
                this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(field, 'ARGNAME' + i)
                    .init();
            }
            if (argumentName) {
                field.setVisible(true);
            } else {
                field.setVisible(false);
            }
        }

        // Closing parentheses
        if (!this.getInput('CLOSE_PAREN')) {
            this.appendDummyInput('CLOSE_PAREN')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldLabel(")"));
        }

        for (let j = 0; j < i; j++) {
            this.moveInputBefore('ARG' + j, 'CLOSE_PAREN')
        }

        // Set return state
        this.setReturn_(this.returns_, false);
        // Remove deleted inputs.
        while (this.getInput('ARG' + i)) {
            this.removeInput('ARG' + i);
            i++;
        }
    }
    ,
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        let name = this.getProcedureCall();
        container.setAttribute('name', name === null ? '*' : name);
        container.setAttribute('arguments', this.argumentCount_);
        container.setAttribute('returns', this.returns_);
        container.setAttribute('names', this.showParameterNames_);
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    }
    ,
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.simpleName_ = xmlElement.getAttribute('name');
        this.simpleName_ = this.simpleName_ === '*' ? null : this.simpleName_;
        this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10);
        this.showParameterNames_ = "true" === xmlElement.getAttribute('names');
        this.returns_ = "true" === xmlElement.getAttribute('returns');
        var args = [];
        var paramIds = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                args.push(childNode.getAttribute('name'));
                paramIds.push(childNode.getAttribute('paramId'));
            }
        }
        this.setProcedureParameters_(args, paramIds);
        if (this.simpleName_ !== null) {
            this.renameProcedure(this.getProcedureCall(), this.simpleName_);
        }
    }
    ,
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<!Blockly.VariableModel>} List of variable models.
     * @this Blockly.Block
     */
    getVarModels: function () {
        return this.argumentVarModels_;
    }
    ,
    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        if (!this.workspace.isMovable()) {
            // If we center on the block and the workspace isn't movable we could
            // loose blocks at the edges of the workspace.
            return;
        }

        let workspace = this.workspace;
        let block = this;

        // Highlight Definition
        let option = {enabled: true};
        option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
        let name = this.getProcedureCall();
        option.callback = function () {
            let def = Blockly.Procedures.getDefinition(name, workspace);
            if (def) {
                workspace.centerOnBlock(def.id);
                def.select();
            }
        };
        options.push(option);

        // Show Parameter Names
        options.push({
            enabled: true,
            text: "Show/Hide parameters",
            callback: function () {
                block.showParameterNames_ = !block.showParameterNames_;
                block.updateShape_();
                block.render();
            }
        })

        // Change Return Type
        options.push({
            enabled: true,
            text: this.returns_ ? "Make statement" : "Make expression",
            callback: function () {
                block.returns_ = !block.returns_;
                block.setReturn_(block.returns_, true);
            }
        })
    },
    /**
     * Notification that the procedure's return state has changed.
     * @param {boolean} returnState New return state
     * @param forceRerender Whether to render
     * @this Blockly.Block
     */
    setReturn_: function (returnState, forceRerender) {
        this.unplug(true);
        if (returnState) {
            this.setPreviousStatement(false);
            this.setNextStatement(false);
            this.setOutput(true);
        } else {
            this.setOutput(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        }
        if (forceRerender) {
            if (this.rendered) {
                this.render();
            }
        }
    },
    //defType_: 'procedures_defnoreturn',
    parseArgument_: function (argument) {
        if (argument.startsWith('KWARGS:')) {
            // KWARG
            return "unpack";
        } else if (argument.startsWith('KEYWORD:')) {
            return argument.substring(8) + "=";
        } else {
            if (this.showParameterNames_) {
                if (argument.startsWith("KNOWN_ARG:")) {
                    return argument.substring(10) + "=";
                }
            }
        }
        return "";
    }
};

Blockly.Python['ast_Call'] = function (block) {
    // Call a procedure with a return value.
    let funcName;
    if (block.simpleName_ === null) {
        funcName = Blockly.Python.valueToCode(block, 'FUNC', Blockly.Python.ORDER_FUNCTION_CALL) ||
            Blockly.Python.blank;
    } else {
        funcName = Blockly.Python.variableDB_.getName(block.getFieldValue('FUNC_NAME_VALUE'),
            Blockly.Variables.NAME_TYPE);
    }
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        let value = Blockly.Python.valueToCode(block, 'ARG' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
        let argument = block.arguments_[i];
        if (argument.startsWith('KWARGS:')) {
            args[i] = "**" + value;
        } else if (argument.startsWith('KEYWORD:')) {
            args[i] = argument.substring(8) + "=" + value;
        } else {
            args[i] = value;
        }
    }
    var code = funcName + '(' + args.join(', ') + ')';
    if (block.returns_) {
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    } else {
        return code + "\n";
    }
};

BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, is_top_level) {
    let func = node.func;
    let args = node.args;
    let keywords = node.keywords;

    let argumentsNormal = {};
    // TODO: do I need to be limiting only the *args* length, not keywords?
    let argumentsMutation = {
        "@arguments": (args !== null ? args.length : 0) +
            (keywords !== null ? keywords.length : 0),
        "@returns": !is_top_level,
        "@names": true
    };
    let overallI = 0;
    if (args !== null) {
        for (let i = 0; i < args.length; i += 1, overallI += 1) {
            argumentsNormal["ARG" + overallI] = this.convert(args[i]);
            argumentsMutation["UNKNOWN_ARG:" + overallI] = null;
        }
    }
    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i += 1, overallI += 1) {
            let keyword = keywords[i];
            let arg = keyword.arg;
            let value = keyword.value;
            if (arg === null) {
                argumentsNormal["ARG" + overallI] = this.convert(value);
                argumentsMutation["KWARGS:" + overallI] = null;
            } else {
                argumentsNormal["ARG" + overallI] = this.convert(value);
                argumentsMutation["KEYWORD:" + Sk.ffi.remapToJs(arg)] = null;
            }
        }
    }

    if (func._astname === "Name") {
        let name = Sk.ffi.remapToJs(func.id);
        argumentsMutation['@name'] = name;
        return BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno, {
            "FUNC_NAME_VALUE": name,
        }, argumentsNormal, {inline: true}, argumentsMutation);
    } else {
        argumentsMutation['@name'] = '*';
        argumentsNormal['FUNC'] = this.convert(func);
        return BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno, {},
            argumentsNormal, {inline: true}, argumentsMutation);
    }
};