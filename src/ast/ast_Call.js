// TODO: Support stuff like "append" where the message is after the value input
// TODO: Handle updating function/method definition -> update call
// TODO: Do a pretraversal to determine if a given function returns

Blockly.Blocks['ast_Call'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.givenColour_ = BlockMirrorTextToBlocks.COLOR.FUNCTIONS
        this.setInputsInline(true);
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
        // acbart: added simpleName to handle complex function calls (e.g., chained)
        this.isMethod_ = false;
        this.name_ = null;
        this.message_ = "function";
        this.premessage_ = "";
        this.module_ = "";
        this.updateShape_();
    },

    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        return this.name_;
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * Also rename if it was previously null.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        if (this.name_ === null ||
            Blockly.Names.equals(oldName, this.name_)) {
            this.name_ = newName;
            this.updateShape_();
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
            return false;
        }
        // Test arguments (arrays of strings) for changes. '\n' is not a valid
        // argument name character, so it is a valid delimiter here.
        if (paramNames.join('\n') == this.arguments_.join('\n')) {
            // No change.
            this.quarkIds_ = paramIds;
            return false;
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
            for (let i = 0; i < this.arguments_.length; i++) {
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
        return true;
    },
    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // If it's a method, add in the caller
        if (this.isMethod_ && !this.getInput('FUNC')) {
            let func = this.appendValueInput('FUNC');
            // If there's a premessage, add it in
            if (this.premessage_ !== "") {
                func.appendField(this.premessage_);
            }
        } else if (!this.isMethod_ && this.getInput('FUNC')) {
            this.removeInput('FUNC');
        }

        let drawnArgumentCount = this.getDrawnArgumentCount_();
        let message = this.getInput('MESSAGE_AREA')
        // Zero arguments, just do {message()}
        if (drawnArgumentCount === 0) {
            if (message) {
                message.removeField('MESSAGE');
            } else {
                message = this.appendDummyInput('MESSAGE_AREA')
                    .setAlign(Blockly.ALIGN_RIGHT);
            }
            message.appendField(new Blockly.FieldLabel(this.message_ + "\ ("), 'MESSAGE');
            // One argument, no MESSAGE_AREA
        } else if (message) {
            this.removeInput('MESSAGE_AREA');
        }
        // Process arguments
        let i;
        for (i = 0; i < drawnArgumentCount; i++) {
            let argument = this.arguments_[i];
            let argumentName = this.parseArgument_(argument);
            if (i === 0) {
                argumentName = this.message_ + "\ (" + argumentName;
            }
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

        // Move everything into place
        if (drawnArgumentCount === 0) {
            if (this.isMethod_) {
                this.moveInputBefore('FUNC', 'MESSAGE_AREA');
            }
            this.moveInputBefore('MESSAGE_AREA', 'CLOSE_PAREN');
        } else {
            if (this.isMethod_) {
                this.moveInputBefore('FUNC', 'CLOSE_PAREN');
            }
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

        this.setColour(this.givenColour_);
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
        container.setAttribute('parameters', this.showParameterNames_);
        container.setAttribute('method', this.isMethod_);
        container.setAttribute('message', this.message_);
        container.setAttribute('premessage', this.premessage_);
        container.setAttribute('module', this.module_);
        container.setAttribute('colour', this.givenColour_);
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.name_ = xmlElement.getAttribute('name');
        this.name_ = this.name_ === '*' ? null : this.name_;
        this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10);
        this.showParameterNames_ = "true" === xmlElement.getAttribute('parameters');
        this.returns_ = "true" === xmlElement.getAttribute('returns');
        this.isMethod_ = "true" === xmlElement.getAttribute('method');
        this.message_ = xmlElement.getAttribute('message');
        this.premessage_ = xmlElement.getAttribute('premessage');
        this.module_ = xmlElement.getAttribute('module');
        this.givenColour_ = parseInt(xmlElement.getAttribute('colour'), 10);

        var args = [];
        var paramIds = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                args.push(childNode.getAttribute('name'));
                paramIds.push(childNode.getAttribute('paramId'));
            }
        }
        let result = this.setProcedureParameters_(args, paramIds);
        if (!result) {
            this.updateShape_();
        }
        if (this.name_ !== null) {
            this.renameProcedure(this.getProcedureCall(), this.name_);
        }
    },
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
        });

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
    },
    getDrawnArgumentCount_: function () {
        return Math.min(this.argumentCount_, this.arguments_.length);
    }
};

Blockly.Python['ast_Call'] = function (block) {
    // TODO: Handle import
    if (block.module_) {
        Blockly.Python.definitions_["import_"+block.module_] = BlockMirrorTextToBlocks.prototype.MODULE_FUNCTION_IMPORTS[block.module_];
    }
    // Blockly.Python.definitions_['import_matplotlib'] = 'import matplotlib.pyplot as plt';
    // Get the caller
    let funcName = "";
    if (block.isMethod_) {
        funcName = Blockly.Python.valueToCode(block, 'FUNC', Blockly.Python.ORDER_FUNCTION_CALL) ||
            Blockly.Python.blank;
    }
    funcName += this.name_;
    // Build the arguments
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
    // Return the result
    let code = funcName + '(' + args.join(', ') + ')';
    if (block.returns_) {
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    } else {
        return code + "\n";
    }
};

BlockMirrorTextToBlocks.prototype.getAsModule = function (node) {
    if (node._astname === 'Name') {
        return Sk.ffi.remapToJs(node.id);
    } else if (node._astname === 'Attribute') {
        let origin = this.getAsModule(node.value);
        if (origin !== null) {
            return origin + '.' + Sk.ffi.remapToJs(node.attr);
        }
    } else {
        return null;
    }
};

//                              messageBefore, message, name
// function call: print() -> "print" ([message]) ; print
// Module function: plt.show() -> "show plot" ([plot]) ; plt.show
// Method call: "test".title() -> "make" [str] "title case" () ; .title ; isMethod = true

BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    let keywords = node.keywords;

    // Can we make any guesses about this based on its name?
    let signature = null;
    let isMethod = false;
    let module = null;
    let premessage = "";
    let message = "";
    let name = "";
    let caller = null;
    let colour = BlockMirrorTextToBlocks.COLOR.FUNCTIONS;

    if (func._astname === 'Name') {
        message = name = Sk.ffi.remapToJs(func.id);
        if (name in this.FUNCTION_SIGNATURES) {
            signature = this.FUNCTION_SIGNATURES[Sk.ffi.remapToJs(func.id)];
        }
    } else if (func._astname === 'Attribute') {
        isMethod = true;
        caller = func.value;
        let potentialModule = this.getAsModule(caller);
        let attributeName = Sk.ffi.remapToJs(func.attr);
        message = "." + attributeName;
        if (potentialModule in this.MODULE_FUNCTION_SIGNATURES) {
            signature = this.MODULE_FUNCTION_SIGNATURES[potentialModule][attributeName];
            module = potentialModule;
            message = name = potentialModule + message;
            isMethod = false;
        } else if (attributeName in this.METHOD_SIGNATURES) {
            signature = this.METHOD_SIGNATURES[attributeName];
            name = message;
        } else {
            name = message;
        }
    } else {
        isMethod = true;
        message = "";
        name = "";
        caller = func;
        // (lambda x: x)()
    }
    let returns = true;

    if (signature !== null && signature !== undefined) {
        if (signature.custom) {
            try {
                return signature.custom(node, parent, this)
            } catch (e) {
                console.error(e);
                // We tried to be fancy and failed, better fall back to default behavior!
            }
        }
        if ('returns' in signature) {
            returns = signature.returns;
        }
        if ('message' in signature) {
            message = signature.message;
        }
        if ('premessage' in signature) {
            premessage = signature.premessage;
        }
        if ('colour' in signature) {
            colour = signature.colour;
        }
    }

    returns = returns || (parent._astname !== 'Expr');

    let argumentsNormal = {};
    // TODO: do I need to be limiting only the *args* length, not keywords?
    let argumentsMutation = {
        "@arguments": (args !== null ? args.length : 0) +
            (keywords !== null ? keywords.length : 0),
        "@returns": returns,
        "@parameters": true,
        "@method": isMethod,
        "@name": name,
        "@message": message,
        "@premessage": premessage,
        "@colour": colour,
        "@module": module || ""
    };
    // Handle arguments
    let overallI = 0;
    if (args !== null) {
        for (let i = 0; i < args.length; i += 1, overallI += 1) {
            argumentsNormal["ARG" + overallI] = this.convert(args[i], node);
            argumentsMutation["UNKNOWN_ARG:" + overallI] = null;
        }
    }
    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i += 1, overallI += 1) {
            let keyword = keywords[i];
            let arg = keyword.arg;
            let value = keyword.value;
            if (arg === null) {
                argumentsNormal["ARG" + overallI] = this.convert(value, node);
                argumentsMutation["KWARGS:" + overallI] = null;
            } else {
                argumentsNormal["ARG" + overallI] = this.convert(value, node);
                argumentsMutation["KEYWORD:" + Sk.ffi.remapToJs(arg)] = null;
            }
        }
    }
    // Build actual block
    let newBlock;
    if (isMethod) {
        argumentsNormal['FUNC'] = this.convert(caller, node);
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno,
            {}, argumentsNormal, {inline: true}, argumentsMutation);
    } else {
        newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno, {},
            argumentsNormal, {inline: true}, argumentsMutation);
    }
    // Return as either statement or expression
    if (returns) {
        return newBlock;
    } else {
        return [newBlock];
    }
};

