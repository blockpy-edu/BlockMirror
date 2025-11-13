// TODO: Support stuff like "append" where the message is after the value input
// TODO: Handle updating function/method definition -> update call
// TODO: Do a pretraversal to determine if a given function returns

Blockly.Blocks['ast_Call'] = {
    /**
     * Block for calling a procedure
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
        this.returns_ = 'Any';
        // acbart: added simpleName to handle complex function calls (e.g., chained)
        this.isMethod_ = false;
        this.name_ = null;
        this.message_ = "function";
        this.premessage_ = "";
        this.postmessage_ = "";
        this.import_ = "";
        this.fromLibrary_ = null;

        let messageInput = this.appendDummyInput('MESSAGE_INPUT').setAlign(Blockly.inputs.Align.RIGHT);
        messageInput.appendField(new Blockly.FieldLabel(), 'MESSAGE');
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
        if (paramNames.join('\n') === this.arguments_.join('\n')) {
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
                    connection.getSourceBlock().bumpNeighbours();
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
                    if (!connection?.reconnect(this, 'ARG' + i)) {
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
    //defType_: 'procedures_defnoreturn',
    parseArgument_: function (argument) {
        if (argument.startsWith('KWARGS:')) {
            // KWARG
            return "unpack";
        } else if (argument.startsWith('KEYWORD:')) {
            let keywords = argument.substring(8);
            return keywords + "=";
        } else if (argument.startsWith("KNOWN_ARG:") && this.showParameterNames_) {
            // FIXME KNOWN_ARG is not set anywhere?
            return argument.substring(10) + "=";
        }
        return "";
    },
    updateShapeOfMessage: function(fromLibrary) {
      let messageInput = this.getInput('MESSAGE_INPUT')

      if (!fromLibrary) {
        this.setFieldValue(this.message_ + this.postmessage_ + " (", "MESSAGE");
        messageInput.removeField('MESSAGE_NAME', true)
        messageInput.removeField('MESSAGE_POST', true)
      } else {
        this.setFieldValue(this.message_, "MESSAGE");

        if (fromLibrary.labels.length === 1) {
          this.setFieldValue(this.message_ + fromLibrary.label + this.postmessage_ + " (", "MESSAGE");
          messageInput.removeField('MESSAGE_NAME', true)
          messageInput.removeField('MESSAGE_POST', true)
        } else if (messageInput.fieldRow.length === 1) {
          this.setFieldValue(this.message_, "MESSAGE");
          messageInput.appendField(new Blockly.FieldDropdown(
            [[fromLibrary.label, fromLibrary.name],
            ...fromLibrary.aliases.map(function (alias) {
              return [alias.label, alias.name];
            })]
          ), "MESSAGE_NAME");
          messageInput.appendField(new Blockly.FieldLabel(this.postmessage_ + " ("), "MESSAGE_POST")
        }
      }
    },
    updateShapeOfArguments(fromLibrary) {
      // Process arguments
      let drawnArgumentCount = this.getDrawnArgumentCount_();
      let translateArgumentLabel = fromLibrary ? (item => fromLibrary.pythonModule.library.translate(item, item)) : (item => item)

      for (let i = 0; i < drawnArgumentCount; i++) {
            let argument = this.arguments_[i];
            let argumentName = this.parseArgument_(argument);
            let argumentNames = []
            let postfix = ''

            if (argumentName.endsWith('=')) {
                argumentNames = argumentName.substring(0, argumentName.length - 1).split(' ');
                argumentName = argumentNames[0];
                postfix = '='
            }

            let field = this.getField('ARGNAME' + i);
            let postfixField = this.getField('ARGPOSTFIX' + i);
            if (field) {
                if (argumentNames.length > 1) {
                    if (field instanceof Blockly.FieldLabel) {
                        field = new Blockly.FieldDropdown(argumentNames.map(item => [
                          translateArgumentLabel(item), item]
                        ));
                        let input = input.getInput('ARG' + i)
                        input.removeField('ARGNAME' + i);
                        input.insertFieldAt(0, field);
                    } else {
                        field.setOptions(argumentNames.map(item => [translateArgumentLabel(item), item]));
                    }
                    field.setValue(argumentName, false);
                } else if (!(field instanceof Blockly.FieldLabel)) {
                    let label = postfix === "=" ? translateArgumentLabel(argumentName) : argumentName;
                    field = new Blockly.FieldLabel(label);
                    let input = input.getInput('ARG' + i)
                    input.removeField('ARGNAME' + i);
                    input.insertFieldAt(0, field);
                }
            } else {
                // Add new input.
                // For now, this assumes the function definition does not change.
                if (argumentNames.length > 1) {
                  field = new Blockly.FieldDropdown(argumentNames.map(item => [translateArgumentLabel(item), item]))
                } else if (postfix === '=') {
                  field = new Blockly.FieldLabel(translateArgumentLabel(argumentName));
                } else {
                  field = new Blockly.FieldLabel(argumentName);
                }
                postfixField = new Blockly.FieldLabel(postfix);
                this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.inputs.Align.RIGHT)
                    .appendField(field, 'ARGNAME' + i)
                    .appendField(postfixField, 'ARGPOSTFIX' + i)
                    .init();
            }
            field.setVisible(!!argumentName);
            postfixField.setVisible(!!postfix);
        }
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

        let fromLibrary = (this.fromLibrary_ === "" ? null : this.workspace.libraries.resolve(this.fromLibrary_));

        this.updateShapeOfMessage(fromLibrary);
        this.updateShapeOfArguments(fromLibrary);
        let i = this.getDrawnArgumentCount_();

        // Closing parentheses
        if (!this.getInput('CLOSE_PAREN')) {
            this.appendDummyInput('CLOSE_PAREN')
                .setAlign(Blockly.inputs.Align.RIGHT)
                .appendField(new Blockly.FieldLabel(")"));
        }

        // Move everything into place
        if (this.isMethod_) {
            this.moveInputBefore('FUNC', 'MESSAGE_INPUT');
        }
        this.moveInputBefore('MESSAGE_INPUT', 'CLOSE_PAREN');

        for (let j = 0; j < i; j++) {
            this.moveInputBefore('ARG' + j, 'CLOSE_PAREN')
        }

        // Set return state
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        if (this.returns_ === 'None') {
          this.setOutput(false);
        } else if (this.returns_ === 'bool') {
          this.setOutput(true, 'Boolean');
        } else {
          this.setOutput(true);
        }

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
        container.setAttribute('postmessage', this.postmessage_);
        container.setAttribute('import', this.import_);
        container.setAttribute('fromlibrary', this.fromLibrary_);
        container.setAttribute('colour', this.givenColour_);
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
            parameter.textContent = this.argumentInfo[i];
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
        if (this.name_ === '*') {
            this.name_ = null;
        }
        this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10);
        this.showParameterNames_ = "true" === xmlElement.getAttribute('parameters');
        this.returns_ = xmlElement.getAttribute('returns');
        this.isMethod_ = "true" === xmlElement.getAttribute('method');
        this.message_ = xmlElement.getAttribute('message');
        this.premessage_ = xmlElement.getAttribute('premessage');
        this.postmessage_ = xmlElement.getAttribute('postmessage');
        this.import_ = xmlElement.getAttribute('import');
        this.fromLibrary_ = xmlElement.getAttribute('fromlibrary');
        let colour = xmlElement.getAttribute('colour')
        this.givenColour_ = parseInt(colour, 10);
        if (isNaN(this.givenColour_)) {
          this.givenColour_ = colour;
        }

        var args = [];
        var paramIds = [];
        this.argumentInfo = []

        for (var i = 0; i < xmlElement.childNodes.length; i++) {
            let childNode = xmlElement.childNodes[i];

            if (childNode.nodeName.toLowerCase() === 'arg') {
                args.push(childNode.getAttribute('name'));
                paramIds.push(childNode.getAttribute('paramId'));
                this.argumentInfo.push(childNode.textContent)
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
            // If we center on the block and the workspace is not movable,
            // we could lose blocks at the edges of the workspace.
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
    },

    getDrawnArgumentCount_: function () {
        return Math.min(this.argumentCount_, this.arguments_.length);
    }
};

python.pythonGenerator.forBlock['ast_Call'] = function(block, generator) {
    if (block.import_) {
        let [type, alias] = block.import_.split(' as ', 2)

        if (type && !python.pythonGenerator.imports.hasType(type)) {
            let name = alias ?? type;
            python.pythonGenerator.imports.set(type, name);
        }
    }
    // Get the caller
    let funcName, fromLibrary
    let name = block.getField('MESSAGE_NAME')?.getValue()

    if (name) {
      name = this.name_.substring(0, this.name_.lastIndexOf('.') + 1) + name;
    } else {
      name = this.name_;
    }

    if (block.isMethod_) {
        let caller = python.pythonGenerator.valueToCode(block, 'FUNC', python.Order.FUNCTION_CALL) ||
            python.pythonGenerator.blank;
        let funcInputTargetBlock = block.getInputTargetBlock('FUNC')

        if (funcInputTargetBlock?.returns_) {
            fromLibrary = generator.libraries.resolve(funcInputTargetBlock.returns_ + name)
            funcName = caller + name
        } else {
            let resolvedCaller = python.pythonGenerator.variables.getSingleType(caller) ?? caller
            resolvedCaller = python.pythonGenerator.imports.getType(resolvedCaller) ?? resolvedCaller
            fromLibrary = generator.libraries.resolve(resolvedCaller + name)
            funcName = resolvedCaller + name
        }
    } else {
        funcName = name;
        fromLibrary = generator.libraries.resolve(name)
    }

    if (fromLibrary) {
        // Save library item to the block, in case it changed
        block.fromLibrary_ = fromLibrary.fullName
    } else if (block.fromLibrary_) {
        // Fall back to previously resolved library item
        fromLibrary = generator.libraries.resolve(block.fromLibrary_)
    }

    if (fromLibrary instanceof PythonClass) {
        fromLibrary = fromLibrary.members.get("__init__") ?? fromLibrary
    }

    if (fromLibrary instanceof PythonFunction) {
        // Needed in case values were modified, but no blocks dragged.
        fromLibrary.applyShadow(block)
    }

    // Build the arguments
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        let argBlock = block.getInputTargetBlock('ARG' + i)

        if (argBlock?.shadow) {
            continue
        }

        let value = python.pythonGenerator.valueToCode(block, 'ARG' + i,
            python.Order.NONE) || python.pythonGenerator.blank
        let argument = block.arguments_[i];

        if (argument.startsWith('KWARGS:')) {
            args.push("**" + value);
        } else if (argument.startsWith('KEYWORD:')) {
            let keyword;

            if (block.getField('ARGNAME' + i) instanceof Blockly.FieldLabel) {
              keyword = argument.substring(8);
            } else {
              keyword = block.getFieldValue('ARGNAME' + i);
            }

            args.push(keyword + "=" + value);
        } else {
            args.push(value);
        }
    }

    // Return the result
    let code = funcName + '(' + args.join(', ') + ')';
    if (block.outputConnection && block.outputConnection.targetBlock()) {
        // Return as expression
        return [code, python.Order.FUNCTION_CALL];
    }

    return code + "\n";
};

BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, parent) {
    let func = node.func;
    let args = node.args;
    let keywords = node.keywords;
    let isMethod = false;
    let import_ = null;
    let premessage = "";
    let postmessage = "";
    let message;
    let name;
    let caller = null;
    let returns = 'Any';
    let fromLibrary = this.resolveFromLibrary(func)

    if (func._astname === 'Name') {
        message = name = Sk.ffi.remapToJs(func.id);
    } else if (func._astname === 'Attribute') {
        isMethod = true;
        caller = func.value;
        let attributeName = Sk.ffi.remapToJs(func.attr);
        name = "." + attributeName;
        message = name
    } else {
        isMethod = true;
        caller = func;
        message = "";
        name = "";
        // (lambda x: x)()
    }

    if (fromLibrary) {
        if (fromLibrary instanceof PythonClass) {
            fromLibrary = fromLibrary.members.get("__init__") ?? fromLibrary
        }

        if (fromLibrary instanceof PythonFunction) {
            if (fromLibrary instanceof PythonMethod && !(fromLibrary instanceof PythonConstructorMethod) && !(fromLibrary.classmethod || fromLibrary.staticmethod)) {
                // Regular instance method, no import needed
                import_ = ""
            } else {
                import_ = fromLibrary.pythonClass?.requiresImport ?? fromLibrary.pythonModule.requiresImport
            }

            name = fromLibrary.name;
            premessage = fromLibrary.premessage;
            postmessage = fromLibrary.postmessage;
            message = fromLibrary.message;
            if (fromLibrary.typeHint) {
              returns = fromLibrary.typeHint.flattened().toString()
            }

            if (fromLibrary instanceof PythonConstructorMethod) {
                // For constructor methods, the caller is fixed.
                isMethod = false;
                name = fromLibrary.pythonClass.name
                returns = fromLibrary.pythonClass.fullName
            } else if (fromLibrary instanceof PythonMethod) {
                // For static and class methods, the caller is fixed.
                isMethod = !fromLibrary.staticmethod && !fromLibrary.classmethod

                if (isMethod) {
                    caller = func.value
                    name = "." + fromLibrary.name;
                } else {
                    name = fromLibrary.pythonClass.name + "." + fromLibrary.name;
                }
            } else {
                // For functions, the caller is fixed.
                isMethod = false;

                if (fromLibrary.pythonModule.name === "") {
                  name = fromLibrary.name;
                } else {
                  name = fromLibrary.pythonModule.name + "." + fromLibrary.name;

                  if (message === ".") {
                    let moduleName =
                      this.imports.getName(fromLibrary.pythonModule.fullName) ??
                      fromLibrary.pythonModule.name;
                    message = moduleName + message;
                  }
                }
            }
        } else {
            throw new TypeError("Unexpected type from library: " + fromLibrary.constructor.name + " for " + this.getAsModule(func.value))
        }
    }

    let colour;

    if (fromLibrary) {
      if (fromLibrary.custom) {
          try {
              let result = fromLibrary.custom(node, parent, this)

              if (result !== null && result !== undefined) {
                return result
              }
          } catch (e) {
              console.error(e);
              // We tried to be fancy and failed, better fall back to default behavior!
          }
      }
      colour = fromLibrary.colour;
    } else {
      colour = this.blockMirror.configuration.convertColour(
        "ast_Call", BlockMirrorTextToBlocks.COLOR.FUNCTIONS
      );
    }

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
        "@postmessage": postmessage,
        "@colour": colour,
        "@import": import_ ?? "",
        "@fromlibrary": fromLibrary?.fullName ?? ""
    };
    // Handle arguments
    let overallI = 0;
    if (args !== null) {
        for (let i = 0; i < args.length; i += 1, overallI += 1) {
            argumentsNormal["ARG" + i] = this.convert(args[i], node)
            argumentsMutation["UNKNOWN_ARG:" + i] = null
        }
    }
    if (fromLibrary instanceof PythonFunction) {
        if (args !== null) {
            for (let i = 0; i < args.length; i += 1) {
                argumentsMutation["UNKNOWN_ARG:" + i] = document.createTextNode(fromLibrary.fullName)
            }
        }
        if (this.blockMirror.configuration.showDefaultArguments) {
            for (let i = overallI; i < fromLibrary.parameters.length - fromLibrary.argumentOffset; i += 1) {
                let pythonParameter = fromLibrary.parameters[i + fromLibrary.argumentOffset]
                if (pythonParameter.keyword || pythonParameter.preferKeyword) {
                    break
                }

                if (pythonParameter.defaultValue !== "") {
                    argumentsNormal["ARG" + i] = pythonParameter.defaultValueBlocks(this)
                }
                argumentsMutation["UNKNOWN_ARG:" + i] = document.createTextNode(fromLibrary.fullName)
                overallI += 1
            }
        }
    }
    let foundKeywords = new Set();
    let overallIBeforeKeywords = overallI;
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
                let keywordName = Sk.ffi.remapToJs(arg)

                if (fromLibrary instanceof PythonFunction) {
                    let parameter = fromLibrary.parameters.findByKeyword(keywordName)
                    foundKeywords.add(keywordName);
                    let keywordNames = keywordName

                    if (parameter?.names.length > 1) {
                        let otherNames = [...parameter.names].filter(item => item !== keywordName)
                        keywordNames = keywordName + ' ' + otherNames;
                        otherNames.forEach(foundKeywords.add, foundKeywords);
                    }
                    argumentsMutation["KEYWORD:" + keywordNames] = document.createTextNode(fromLibrary.fullName + " " + keywordName)
                } else {
                    argumentsMutation["KEYWORD:" + keywordName] = null;
                }
            }
        }
    }
    if (this.blockMirror.configuration.showDefaultArguments && fromLibrary instanceof PythonFunction) {
        for (let i = overallIBeforeKeywords; i < fromLibrary.parameters.length - fromLibrary.argumentOffset; i += 1) {
            let pythonParameter = fromLibrary.parameters[i + fromLibrary.argumentOffset]
            if (!(pythonParameter.keyword || pythonParameter.preferKeyword) || foundKeywords.has(pythonParameter.name)) {
                continue
            }

            if (pythonParameter.variableLength) {
                continue
            }

            if (pythonParameter.defaultValue !== "") {
                argumentsNormal["ARG" + overallI] = pythonParameter.defaultValueBlocks(this)
            }
            argumentsMutation["KEYWORD:" + pythonParameter.names.join(' ')] = document.createTextNode(fromLibrary.fullName + " " + pythonParameter.name)
            overallI += 1
        }
    }

    if (isMethod) {
        argumentsNormal['FUNC'] = this.convert(caller, node);
    }

    // Build actual block
    let newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno,
        {}, argumentsNormal, {inline: true}, argumentsMutation);

    if (fromLibrary instanceof PythonFunction) {
        fromLibrary.applyShadow(newBlock)
    }

    if (returns === 'None' || this.isStatement(node)) {
        // Return as statement
        return [newBlock];
    } else {
        // Return as expression
        return newBlock;
    }
};
