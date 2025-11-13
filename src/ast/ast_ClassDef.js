Blockly.Blocks['ast_ClassDef'] = {
    init: function () {
        this.decorators_ = 0;
        this.bases_ = 0;
        this.keywords_ = 0;
        this.appendDummyInput('HEADER')
            .appendField("Class")
            .appendField(new Blockly.FieldVariable("item"), "NAME");
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.OO));
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        for (let i = 0; i < this.decorators_; i++) {
            let input = this.appendValueInput("DECORATOR" + i)
                .setCheck(null)
                .setAlign(Blockly.inputs.Align.RIGHT);
            if (i === 0) {
                input.appendField("decorated by");
            }
            this.moveInputBefore('DECORATOR' + i, 'BODY');
        }
        for (let i = 0; i < this.bases_; i++) {
            let input = this.appendValueInput("BASE" + i)
                .setCheck(null)
                .setAlign(Blockly.inputs.Align.RIGHT);
            if (i === 0) {
                input.appendField("inherits from");
            }
            this.moveInputBefore('BASE' + i, 'BODY');
        }

        for (let i = 0; i < this.keywords_; i++) {
            this.appendValueInput("KEYWORDVALUE" + i)
                .setCheck(null)
                .setAlign(Blockly.inputs.Align.RIGHT)
                .appendField(new Blockly.FieldTextInput("metaclass"), "KEYWORDNAME" + i)
                .appendField("=");
            this.moveInputBefore('KEYWORDVALUE' + i, 'BODY');
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('decorators', this.decorators_);
        container.setAttribute('bases', this.bases_);
        container.setAttribute('keywords', this.keywords_);
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.decorators_ = parseInt(xmlElement.getAttribute('decorators'), 10);
        this.bases_ = parseInt(xmlElement.getAttribute('bases'), 10);
        this.keywords_ = parseInt(xmlElement.getAttribute('keywords'), 10);
        this.updateShape_();
    },
};

python.pythonGenerator.forBlock['ast_ClassDef'] = function(block, generator) {
    // Name
    let name = python.pythonGenerator.getVariableName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // Decorators
    let decorators = new Array(block.decorators_);
    for (let i = 0; i < block.decorators_; i++) {
        let decorator = (python.pythonGenerator.valueToCode(block, 'DECORATOR' + i, python.Order.NONE) ||
            python.pythonGenerator.blank);
        decorators[i] = "@" + decorator + "\n";
    }
    // Bases
    let bases = new Array(block.bases_);
    for (let i = 0; i < block.bases_; i++) {
        bases[i] = (python.pythonGenerator.valueToCode(block, 'BASE' + i, python.Order.NONE) ||
            python.pythonGenerator.blank);
    }
    // Keywords
    let keywords = new Array(block.keywords_);
    for (let i = 0; i < block.keywords_; i++) {
        let name = block.getFieldValue('KEYWORDNAME' + i);
        let value = (python.pythonGenerator.valueToCode(block, 'KEYWORDVALUE' + i, python.Order.NONE) ||
            python.pythonGenerator.blank);
        if (name == '**') {
            keywords[i] = '**' + value;
        } else {
            keywords[i] = name + '=' + value;
        }
    }
    // Body:
    let body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
    // Put it together
    let args = (bases.concat(keywords));
    args = (args.length === 0) ? "" : "(" + args.join(', ') + ")";
    return decorators.join('') + "class " + name + args + ":\n" + body;
}
;

BlockMirrorTextToBlocks.prototype['ast_ClassDef'] = function (node, parent) {
    let name = node.name;
    let bases = node.bases;
    let keywords = node.keywords;
    let body = node.body;
    let decorator_list = node.decorator_list;

    let values = {};
    let fields = {'NAME': Sk.ffi.remapToJs(name)};

    if (decorator_list !== null) {
        for (let i = 0; i < decorator_list.length; i++) {
            values['DECORATOR' + i] = this.convert(decorator_list[i], node);
        }
    }

    if (bases !== null) {
        for (let i = 0; i < bases.length; i++) {
            values['BASE' + i] = this.convert(bases[i], node);
        }
    }

    if (keywords !== null) {
        for (let i = 0; i < keywords.length; i++) {
            values['KEYWORDVALUE' + i] = this.convert(keywords[i].value, node);
            let arg = keywords[i].arg;
            if (arg === null) {
                fields['KEYWORDNAME' + i] = "**";
            } else {
                fields['KEYWORDNAME' + i] = Sk.ffi.remapToJs(arg);
            }
        }
    }

    return BlockMirrorTextToBlocks.create_block("ast_ClassDef", node.lineno, fields,
        values,
        {
            "inline": "false"
        }, {
            "@decorators": (decorator_list === null ? 0 : decorator_list.length),
            "@bases": (bases === null ? 0 : bases.length),
            "@keywords": (keywords === null ? 0 : keywords.length),
        }, {
            'BODY': this.convertBody(body, node)
        });
};
