BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL = 0;
BlockMirrorTextToBlocks.HANDLERS_NO_AS = 1;
BlockMirrorTextToBlocks.HANDLERS_COMPLETE = 3;

Blockly.Blocks['ast_Try'] = {
    init: function () {
        this.handlersCount_ = 0;
        this.handlers_ = [];
        this.hasElse_ = false;
        this.hasFinally_ = false;
        this.appendDummyInput()
            .appendField("try:");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(BlockMirrorTextToBlocks.COLOR.EXCEPTIONS);
        this.updateShape_();
        this.setTooltip('The try statement specifies exception handlers and/or cleanup code for a group of statements');
        this.setHelpUrl('https://docs.python.org/3/reference/compound_stmts.html#try');
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        for (let i = 0; i < this.handlersCount_; i++) {
            if (this.handlers_[i] === BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL) {
                this.appendDummyInput()
                    .appendField('except');
            } else {
                this.appendValueInput("TYPE"+i)
                    .setCheck(null)
                    .appendField("except");
                if (this.handlers_[i] === BlockMirrorTextToBlocks.HANDLERS_COMPLETE) {
                    this.appendDummyInput()
                        .appendField("as")
                        .appendField(new Blockly.FieldVariable("item"), "NAME"+i);
                }
            }
            this.appendStatementInput("HANDLER"+i)
                .setCheck(null);
        }
        if (this.hasElse_) {
            this.appendDummyInput()
                .appendField("else:");
            this.appendStatementInput("ORELSE")
                .setCheck(null);
        }
        if (this.hasFinally_) {
            this.appendDummyInput()
                .appendField("finally:");
            this.appendStatementInput("FINALBODY")
                .setCheck(null);
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('orelse', this.hasElse_);
        container.setAttribute('finalbody', this.hasFinally_);
        container.setAttribute('handlers', this.handlersCount_);
        for (let i = 0; i < this.handlersCount_; i++) {
            let parameter = document.createElement('arg');
            parameter.setAttribute('name', this.handlers_[i]);
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
        this.hasElse_ = "true" === xmlElement.getAttribute('orelse');
        this.hasFinally_ = "true" === xmlElement.getAttribute('finalbody');
        this.handlersCount_ = parseInt(xmlElement.getAttribute('handlers'), 10);
        this.handlers_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                this.handlers_.push(parseInt(childNode.getAttribute('name'), 10));
            }
        }
        this.updateShape_();
    },
};

Blockly.Python['ast_Try'] = function (block) {
    // Try:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Except clauses
    var handlers = new Array(block.handlersCount_);
    for (let i = 0; i < block.handlersCount_; i++) {
        let level = block.handlers_[i];
        let clause = "except";
        if (level !== BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL) {
            clause += " " + Blockly.Python.valueToCode(block, 'TYPE' + i,
                Blockly.Python.ORDER_NONE) || Blockly.Python.blank;
            if (level === BlockMirrorTextToBlocks.HANDLERS_COMPLETE) {
                clause += " as " + Blockly.Python.variableDB_.getName(block.getFieldValue('NAME' + i),
                    Blockly.Variables.NAME_TYPE);
            }
        }
        clause += ":\n" + (Blockly.Python.statementToCode(block, 'HANDLER' + i) || Blockly.Python.PASS);
        handlers[i] = clause;
    }
    // Orelse:
    let orelse = "";
    if (this.hasElse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSE') || Blockly.Python.PASS);
    }
    // Finally:
    let finalbody = "";
    if (this.hasFinally_) {
        finalbody = "finally:\n" + (Blockly.Python.statementToCode(block, 'FINALBODY') || Blockly.Python.PASS);
    }
    return "try:\n" + body + handlers.join("") + orelse + finalbody;
};

BlockMirrorTextToBlocks.prototype['ast_Try'] = function (node, parent) {
    let body = node.body;
    let handlers = node.handlers;
    let orelse = node.orelse;
    let finalbody = node.finalbody;

    let fields = {};
    let values = {};
    let mutations = {
        "@ORELSE": orelse !== null  && orelse.length > 0,
        "@FINALBODY": finalbody !== null  && finalbody.length > 0,
        "@HANDLERS": handlers.length
    };

    let statements = {"BODY": this.convertBody(body, node)};
    if (orelse !== null) {
        statements['ORELSE'] = this.convertBody(orelse, node);
    }
    if (finalbody !== null && finalbody.length) {
        statements['FINALBODY'] = this.convertBody(finalbody, node);
    }

    let handledLevels = [];
    for (let i = 0; i < handlers.length; i++) {
        let handler = handlers[i];
        statements["HANDLER" + i] = this.convertBody(handler.body, node);
        if (handler.type === null) {
            handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL);
        } else {
            values["TYPE" + i] = this.convert(handler.type, node);
            if (handler.name === null) {
                handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_NO_AS);
            } else {
                handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_COMPLETE);
                fields["NAME" + i] = Sk.ffi.remapToJs(handler.name.id);
            }
        }
    }

    mutations["ARG"] = handledLevels;

    return BlockMirrorTextToBlocks.create_block("ast_Try", node.lineno, fields,
        values, {}, mutations, statements);
};