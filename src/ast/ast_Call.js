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

        switch(name) {
            case 'abs':
                this.setTooltip('Return the absolute value of a number');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#abs');
            break;

            case 'all':
                this.setTooltip('Return True if all elements of the iterable are true (or if the iterable is empty)');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#all');
            break;

            case 'any':
                this.setTooltip('Return True if any element of the iterable is true. If the iterable is empty, return False');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#any');
            break;

            case 'ascii':
                this.setTooltip('As repr(), return a string containing a printable representation of an object, but escape the non-ASCII characters in the string returned by repr() using \\x, \\u or \\U escapes');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#ascii');
            break;

            case 'bin':
                this.setTooltip('Convert an integer number to a binary string prefixed with “0b”');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#bin');
            break;

            case 'bool':
                this.setTooltip('Return a Boolean value, i.e. one of True or False. The parameter is converted using the standard truth testing procedure.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#bool');
            break;

            case 'breakpoint':
                this.setTooltip('This function drops you into the debugger at the call site. Specifically, it calls sys.breakpointhook(), passing args and kws straight through.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#breakpoint');
            break;

            case 'bytearray':
                this.setTooltip('Return a new array of bytes.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#func-bytearray');
            break;

            case 'bytes':
                this.setTooltip('Return a new “bytes” object, which is an immutable sequence of integers in the range 0 <= x < 256.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#func-bytes');
            break;

            case 'callable':
                this.setTooltip('Return True if the object argument appears callable, False if not');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#callable');
            break;

            case 'chr':
                this.setTooltip('Return the string representing a character whose Unicode code point is the integer i. For example, chr(97) returns the string "a", while chr(8364) returns the string "€"');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#chr');
            break;

            case 'compile':
                this.setTooltip('Compile the source into a code or AST object. Code objects can be executed by exec() or eval()');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#compile');
            break;

            case 'complex':
                this.setTooltip('Return a complex number with the value real + imag*1j or convert a string or number to a complex number.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#complex');
            break;

            case 'delattr':
                this.setTooltip('The function deletes the named attribute, provided the object allows it.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#delattr');
            break;

            case 'dict':
                this.setTooltip('Create a new dictionary.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#func-dict');
            break;

            case 'dir':
                this.setTooltip('Without arguments, return the list of names in the current local scope. With an argument, attempt to return a list of valid attributes for that object.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#dir');
            break;

            case 'divmod':
                this.setTooltip('take two (non complex) numbers as arguments and return a pair of numbers consisting of their quotient and remainder when using integer division');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#divmod');
            break;

            case 'enumerate':
                this.setTooltip('Return an enumerate object');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#enumerate');
            break;

            case 'eval':
                this.setTooltip('The argument is parsed and evaluated as a Python expression. The return value is the result of the evaluated expression.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#eval');
            break;

            case 'exec':
                this.setTooltip('This function supports dynamic execution of Python code.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#exec');
            break;

            case 'filter':
                this.setTooltip('Construct an iterator from those elements of iterable for which function returns true');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#filter');
            break;

            case 'float':
                this.setTooltip('Return a floating point number constructed from a number or string input');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#float');
            break;

            case 'format':
                this.setTooltip('Convert a value to a “formatted” representation, as controlled by format_spec');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#format');
            break;

            case 'frozenset':
                this.setTooltip('Return a new frozenset object, optionally with elements taken from iterable');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#func-frozenset');
            break;

            case 'getattr':
                this.setTooltip('Return the value of the named attribute of object');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#getattr');
            break;

            case 'globals':
                this.setTooltip('Return a dictionary representing the current global symbol table.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#globals');
            break;

            case 'hasattr':
                this.setTooltip('The result is True if the string is the name of one of the object’s attributes, False if not.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#hasattr');
            break;

            case 'hash':
                this.setTooltip('Return the hash value of the object (if it has one). Hash values are integers.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#hash');
            break;

            case 'hex':
                this.setTooltip('Convert an integer number to a lowercase hexadecimal string prefixed with “0x”.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#hex');
            break;

            case 'id':
                this.setTooltip('Return the “identity” of an object. This is an integer which is guaranteed to be unique and constant for this object during its lifetime');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#id');
            break;

            case 'input':
                this.setTooltip('The function reads a line from input, converts it to a string (stripping a trailing newline), and returns that');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#input');
            break;

            case 'int':
                this.setTooltip('Return an integer object constructed from a number or string');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#int');
            break;

            case 'isinstance':
                this.setTooltip('Return True if the object argument is an instance of the classinfo argument, or of a (direct, indirect or virtual) subclass thereof');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#isinstance');
            break;

            case 'issubclass':
                this.setTooltip('Return True if class is a subclass (direct, indirect or virtual) of classinfo');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#issubclass');
            break;

            case 'iter':
                this.setTooltip('Return an iterator object');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#iter');
            break;

            case 'len':
                this.setTooltip('Return the length (the number of items) of an object');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#len');
            break;

            case 'list':
                this.setTooltip('mutable sequences, typically used to store collections of homogeneous items');
                this.setHelpUrl('https://docs.python.org/3/library/stdtypes.html#typesseq-list');
            break;

            case 'locals':
                this.setTooltip('Update and return a dictionary representing the current local symbol table');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#locals');
            break;

            case 'map':
                this.setTooltip('Return an iterator that applies function to every item of iterable, yielding the results');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#map');
            break;

            case 'max':
                this.setTooltip('Return the largest item in an iterable or the largest of two or more arguments');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#map');
            break;

            case 'min':
                this.setTooltip('Return the smallest item in an iterable or the smallest of two or more arguments');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#min');
            break;

            case 'next':
                this.setTooltip('Retrieve the next item from the iterator by calling its __next__() method');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#next');
            break;

            case 'object':
                this.setTooltip('Return a new featureless object. object is a base for all classes');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#object');
            break;

            case 'oct':
                this.setTooltip('Convert an integer number to an octal string prefixed with “0o”');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#oct');
            break;

            case 'ord':
                this.setTooltip('Given a string representing one Unicode character, return an integer representing the Unicode code point of that character.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#ord');
            break;

            case 'pow':
                this.setTooltip('Return base to the power exp; if mod is present, return base to the power exp, modulo mod (computed more efficiently than pow(base, exp) % mod)');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#pow');
            break;

            case 'print':
                this.setTooltip('Print objects to the text stream');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#print');
            break;

            case 'property':
                this.setTooltip('Return a property attribute.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#property');
            break;

            case 'repr':
                this.setTooltip('Return a string containing a printable representation of an object.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#repr');
            break;

            case 'reversed':
                this.setTooltip('Return a reverse iterator.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#reversed');
            break;

            case 'round':
                this.setTooltip('Return number rounded to ndigits precision after the decimal point');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#round');
            break;

            case 'set':
                this.setTooltip('Return a new set object, optionally with elements taken from iterable');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#func-set');
            break;

            case 'setattr':
                this.setTooltip('This is the counterpart of getattr(). The arguments are an object, a string and an arbitrary value');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#setattr');
            break;

            case 'slice':
                this.setTooltip('Return a slice object representing the set of indices specified by range(start, stop, step)');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#slice');
            break;

            case 'sorted':
                this.setTooltip('Return a new sorted list from the items in iterable');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#sorted');
            break;

            case 'str':
                this.setTooltip('Return a string version of object');
                this.setHelpUrl('https://docs.python.org/3/library/stdtypes.html#str');
            break;

            case 'sum':
                this.setTooltip('Sums start and the items of an iterable from left to right and returns the total');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#sum');
            break;

            case 'super':
                this.setTooltip('Return a proxy object that delegates method calls to a parent or sibling class of type');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#super');
            break;

            case 'tuple':
                this.setTooltip('immutable sequences, typically used to store collections of heterogeneous data');
                this.setHelpUrl('https://docs.python.org/3/library/stdtypes.html#typesseq-tuple');
            break;

            case 'type':
                this.setTooltip('With one argument, return the type of an object');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#type');
            break;

            case 'vars':
                this.setTooltip('Return the __dict__ attribute for a module, class, instance, or any other object with a __dict__ attribute');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#vars');
            break;

            case 'zip':
                this.setTooltip('Make an iterator that aggregates elements from each of the iterables.');
                this.setHelpUrl('https://docs.python.org/3/library/functions.html#zip');
            break;

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
        console.log(signature);
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

