Blockly.Blocks["ast_DictItem"] = {
  init: function () {
    this.appendValueInput("KEY").setCheck(null);
    this.appendValueInput("VALUE").setCheck(null).appendField(":");
    this.setInputsInline(true);
    this.setOutput(true, "DictPair");
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
  },
};

Blockly.Blocks["ast_Dict"] = {
  /**
   * Block for creating a dict with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "Dict");
    this.setMutator(
      new Blockly.icons.MutatorIcon(["ast_Dict_create_with_item"], this),
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
    var containerBlock = workspace.newBlock("ast_Dict_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("ast_Dict_create_with_item");
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
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        let key = connection.getSourceBlock().getInput("KEY");
        if (key.connection.targetConnection) {
          key.connection.targetConnection.getSourceBlock().unplug(true);
        }
        let value = connection.getSourceBlock().getInput("VALUE");
        if (value.connection.targetConnection) {
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
        let itemBlock = this.workspace.newBlock("ast_DictItem");
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
      this.appendDummyInput("EMPTY").appendField(this.translateText("empty dictionary"));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i).setCheck("DictPair");
        if (i === 0) {
          input
            .appendField(this.translateText("create dict with"))
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
};

Blockly.Blocks["ast_Dict_create_with_container"] = {
  /**
   * Mutator block for dict container.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
    this.appendDummyInput().appendField(this.translateText("Add new dict elements below"));
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  },
};

Blockly.Blocks["ast_Dict_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
    this.appendDummyInput().appendField("Element");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  },
};

python.pythonGenerator.forBlock["ast_Dict"] = function (block, generator) {
  // Create a dict with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    let child = block.getInputTargetBlock("ADD" + i);
    if (child === null || child.type !== "ast_DictItem") {
      elements[i] =
        python.pythonGenerator.blank + ": " + python.pythonGenerator.blank;
      continue;
    }
    let key =
      python.pythonGenerator.valueToCode(
        child,
        "KEY",
        python.Order.NONE,
      ) || python.pythonGenerator.blank;
    let value =
      python.pythonGenerator.valueToCode(
        child,
        "VALUE",
        python.Order.NONE,
      ) || python.pythonGenerator.blank;
    elements[i] = key + ": " + value;
  }
  var code = "{" + elements.join(", ") + "}";
  return [code, python.Order.ATOMIC];
};

BlockMirrorTextToBlocks.prototype["ast_Dict"] = function (node, parent) {
  let keys = node.keys;
  let values = node.values;

  if (keys === null) {
    return BlockMirrorTextToBlocks.create_block(
      "ast_Dict",
      node.lineno,
      {},
      {},
      { inline: "false" },
      { "@items": 0 },
    );
  }

  let elements = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let value = values[i];
    elements["ADD" + i] = BlockMirrorTextToBlocks.create_block(
      "ast_DictItem",
      node.lineno,
      {},
      {
        KEY: this.convert(key, node),
        VALUE: this.convert(value, node),
      },
      this.LOCKED_BLOCK,
    );
  }

  return BlockMirrorTextToBlocks.create_block(
    "ast_Dict",
    node.lineno,
    {},
    elements,
    {
      inline: "false",
    },
    {
      "@items": keys.length,
    },
  );
};
