BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_FormattedValue",
    "message0": "%1",
    "args0": [
        {"type": "input_value", "name": "VALUE"}
    ],
    "output": "FormattedValueStr",
    "inputsInline": false,
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
});

BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_JoinedStrStr",
    "message0": "%1",
    "args0": [
        {"type": "field_input", "name": "TEXT", "value": ''}
    ],
    "output": "FormattedValueStr",
    "inputsInline": false,
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
});

BlockMirrorTextToBlocks.BLOCKS.push({
        "type": "ast_FormattedValueFull",
        "tooltip": "",
        "helpUrl": "",
        "message0": "%1 : %2 ! %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE"
            },
            {
                "type": "field_input",
                "name": "FORMAT_SPEC",
                "text": ""
            },
            {
                "type": "field_dropdown",
                "name": "CONVERSION",
                "options": [
                    [
                        "plain",
                        "-1"
                    ],
                    [
                        "repr",
                        "r"
                    ],
                    [
                        "str",
                        "s"
                    ],
                    [
                        "ascii",
                        "a"
                    ]
                ]
            },
            {
                "type": "input_dummy",
                "name": "NAME"
            }
        ],
        "output": "FormattedValueStr",
        "colour": BlockMirrorTextToBlocks.COLOR.TEXT
    }
);

Blockly.Blocks["ast_JoinedStr"] = {
    /**
     * Block for JoinedStr and FormattedValue
     */
    init: function () {
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
        this.itemCount_ = 3;
        this.updateShape_();
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setMutator(
            new Blockly.icons.MutatorIcon(["ast_JoinedStr_create_with_item_S",
            "ast_JoinedStr_create_with_item_FV","ast_JoinedStr_create_with_item_FVF"], this),
        );
    },

    /**
   * Create XML to represent dict inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function () {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },

    /**
   * Parse XML to restore the dict inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },

    /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("ast_JoinedStr_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
        const piece = this.getInput("ADD" + i).connection;
        const pieceType = piece.targetConnection.getSourceBlock().type;
        console.log(piece, pieceType);
        const createName = pieceType === "ast_JoinedStrStr" ?
            "ast_JoinedStr_create_with_item_S" :
              pieceType === "ast_FormattedValueFull" ? "ast_JoinedStr_create_with_item_FVF" : "ast_JoinedStr_create_with_item_FV";
      var itemBlock = workspace.newBlock(createName);
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

    /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
        let blockTypes = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      blockTypes.push(itemBlock.type);
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        let value = connection.getSourceBlock().getInput("VALUE");
        if (value && value.connection.targetConnection) {
          value.connection.targetConnection.getSourceBlock().unplug(true);
        }
        connection.disconnect();
        connection.getSourceBlock().dispose();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      connections[i]?.reconnect(this, "ADD" + i);
      if (!connections[i]) {
          const createName = blockTypes[i] === "ast_JoinedStr_create_with_item_S" ? "ast_JoinedStrStr" :
              blockTypes[i] === "ast_JoinedStr_create_with_item_FVF" ? "ast_FormattedValueFull" : "ast_FormattedValue";
        let itemBlock = this.workspace.newBlock(createName);
        itemBlock.setDeletable(false);
        itemBlock.setMovable(false);
        itemBlock.initSvg();
        this.getInput("ADD" + i).connection.connect(itemBlock.outputConnection);
        itemBlock.render();
        //this.get(itemBlock, 'ADD'+i)
      }
    }
  },

    /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("empty string");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i).setCheck("FormattedValueStr");
        if (i === 0) {
          input
            .appendField("Join:")
            .setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
    // Add the trailing "}"
    /*
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            let tail = this.appendDummyInput('TAIL')
                .appendField('}');
            tail.setAlign(Blockly.inputs.Align.RIGHT);
        }*/
  },
}


Blockly.Blocks["ast_JoinedStr_create_with_container"] = {
  /**
   * Mutator block for JoinedStr container.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.appendDummyInput().appendField("Add new values and strings below");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  },
};

Blockly.Blocks["ast_JoinedStr_create_with_item_S"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.appendDummyInput().appendField("Text");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  },
};

Blockly.Blocks["ast_JoinedStr_create_with_item_FV"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.appendDummyInput().appendField("Expression");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  },
};

Blockly.Blocks["ast_JoinedStr_create_with_item_FVF"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.appendDummyInput().appendField("Formatted Expression");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  },
};

python.pythonGenerator.forBlock["ast_JoinedStr"] = function (block, generator) {
  // Create a dict with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  const strings = [];
  const indices = [];
  for (var i = 0; i < block.itemCount_; i++) {
    let child = block.getInputTargetBlock("ADD" + i);
    if (child === null || (child.type != "ast_JoinedStrStr" && child.type != "ast_FormattedValue" && child.type != "ast_FormattedValueFull")) {
      elements[i] = python.pythonGenerator.blank;
      continue;
    }
    if (child.type === "ast_JoinedStrStr") {
        let value = child.getFieldValue("TEXT") || generator.blank;
        elements[i] = value;
        indices.push(i);
        strings.push(value);
    } else if (child.type === "ast_FormattedValue") {
        let value = generator.valueToCode(child, "VALUE", generator.ORDER_NONE) || generator.blank;
        elements[i] = `{${value}}`;
    } else if (child.type === "ast_FormattedValueFull") {
        let value = generator.valueToCode(child, "VALUE", generator.ORDER_NONE) || generator.blank;
        let formatSpec = child.getFieldValue("FORMAT_SPEC");
        formatSpec = formatSpec ? `:${formatSpec}` : "";
        let conversion = child.getFieldValue("CONVERSION");
        elements[i] = `{${value}${formatSpec}${conversion === "-1" ? "" : `!${conversion}`}}`;
    }
  }

  let code;
  if (strings.some(s => s.includes("\n"))) {
      indices.forEach(i => {
          elements[i] = elements[i].replace(/'''/g, '\\\'\\\'\\\'');
      })
      code = "f'''" + elements.join("") + "'''";
  } else {
      let quote = '"';
      if (strings.some(s => s.includes("'"))) {
          if (!strings.some(s => s.includes('"'))) {
              quote = "'";
          } else {
              indices.forEach(i => {
                    elements[i] = elements[i].replace(/"/g, '\\"');
              })
          }
      }
      code = "f" + quote + elements.join("") + quote;
  }
  return [code, python.Order.ATOMIC];
};

BlockMirrorTextToBlocks.prototype["ast_JoinedStr"] = function (node, parent) {
    let values = node.values;
    let elements = {};
    values.forEach((v, i) => {
        if (v._astname === "FormattedValue") {
            console.log(v);
            if (!v.conversion && !v.format_spec) {
                elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_FormattedValue", v.lineno, {}, {
                    "VALUE": this.convert(v.value, node)
                },
                this.LOCKED_BLOCK);
            } else {
                const format_spec = v.format_spec ? chompExclamation(v.format_spec.values[0].s.v) : "";
                // Can there ever be a non-1 length format_spec?
                elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_FormattedValueFull", v.lineno, {
                    "FORMAT_SPEC": format_spec,
                    "CONVERSION": v.conversion
                }, {
                    "VALUE": this.convert(v.value, node)
                },
                this.LOCKED_BLOCK);
            }
        } else if (v._astname === "Str") {
            const text = Sk.ffi.remapToJs(v.s);
            elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_JoinedStrStr", v.lineno, {
                "TEXT": text
            }, {},
                this.LOCKED_BLOCK);
        }
    });
    return BlockMirrorTextToBlocks.create_block("ast_JoinedStr", node.lineno, {}, elements, { inline: values.length > 3 ? "false" : "true"}, {
        "@items": values.length
    });
}

function chompExclamation(text) {
    // Remove any text starting with an exclamation mark in the text
    return text.replace(/!.*$/, "");
}

function formattedValueConversion(conversion) {
    switch (conversion) {
        case -1:
            return "";
        case 115:
            return "s";
        case 114:
            return "r";
        case 97:
            return "a";
        default: return "";
    }
}