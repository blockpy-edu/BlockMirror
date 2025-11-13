BlockMirrorTextToBlocks.BLOCKS.push({
  type: "ast_comprehensionFor",
  message0: "for %1 in %2",
  args0: [
    { type: "input_value", name: "TARGET" },
    { type: "input_value", name: "ITER" },
  ],
  inputsInline: true,
  output: "ComprehensionFor",
  colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES,
});

BlockMirrorTextToBlocks.BLOCKS.push({
  type: "ast_comprehensionIf",
  message0: "if %1",
  args0: [{ type: "input_value", name: "TEST" }],
  inputsInline: true,
  output: "ComprehensionIf",
  colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES,
});

Blockly.Blocks["ast_Comp_create_with_container"] = {
  /**
   * Mutator block for dict container.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.appendDummyInput().appendField("Add new comprehensions below");
    this.appendDummyInput().appendField("   For clause");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  },
};

Blockly.Blocks["ast_Comp_create_with_for"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.appendDummyInput().appendField("For clause");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  },
};

Blockly.Blocks["ast_Comp_create_with_if"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function () {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.appendDummyInput().appendField("If clause");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  },
};

BlockMirrorTextToBlocks.COMP_SETTINGS = {
  ListComp: { start: "[", end: "]", color: BlockMirrorTextToBlocks.COLOR.LIST },
  SetComp: { start: "{", end: "}", color: BlockMirrorTextToBlocks.COLOR.SET },
  GeneratorExp: {
    start: "(",
    end: ")",
    color: BlockMirrorTextToBlocks.COLOR.SEQUENCES,
  },
  DictComp: {
    start: "{",
    end: "}",
    color: BlockMirrorTextToBlocks.COLOR.DICTIONARY,
  },
};

["ListComp", "SetComp", "GeneratorExp", "DictComp"].forEach(function (kind) {
  Blockly.Blocks["ast_" + kind] = {
    /**
     * Block for creating a dict with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
      this.setStyle("loop_blocks");
      this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COMP_SETTINGS[kind].color));
      this.itemCount_ = 3;
      let input = this.appendValueInput("ELT").appendField(
        BlockMirrorTextToBlocks.COMP_SETTINGS[kind].start,
      );
      if (kind === "DictComp") {
        input.setCheck("DictPair");
      }
      this.appendDummyInput("END_BRACKET").appendField(
        BlockMirrorTextToBlocks.COMP_SETTINGS[kind].end,
      );
      this.updateShape_();
      this.setOutput(true);
      this.setMutator(
        new Blockly.icons.MutatorIcon(
          ["ast_Comp_create_with_for", "ast_Comp_create_with_if"],
          this,
        ),
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
      var containerBlock = workspace.newBlock("ast_Comp_create_with_container");
      containerBlock.initSvg();
      var connection = containerBlock.getInput("STACK").connection;
      let generators = [];
      for (var i = 1; i < this.itemCount_; i++) {
        let generator = this.getInput("GENERATOR" + i).connection;
        let createName;
        if (
          generator.targetConnection.getSourceBlock().type ===
          "ast_comprehensionIf"
        ) {
          createName = "ast_Comp_create_with_if";
        } else if (
          generator.targetConnection.getSourceBlock().type ===
          "ast_comprehensionFor"
        ) {
          createName = "ast_Comp_create_with_for";
        } else {
          throw Error(
            "Unknown block type: " +
              generator.targetConnection.getSourceBlock().type,
          );
        }
        var itemBlock = workspace.newBlock(createName);
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
        generators.push(itemBlock);
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
      var connections = [containerBlock.valueConnection_];
      let blockTypes = ["ast_Comp_create_with_for"];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        blockTypes.push(itemBlock.type);
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (let i = 1; i < this.itemCount_; i++) {
        var connection = this.getInput("GENERATOR" + i).connection
          .targetConnection;
        if (connection && connections.indexOf(connection) === -1) {
          let connectedBlock = connection.getSourceBlock();
          if (connectedBlock.type === "ast_comprehensionIf") {
            let testField = connectedBlock.getInput("TEST");
            if (testField.connection.targetConnection) {
              testField.connection.targetConnection
                .getSourceBlock()
                .unplug(true);
            }
          } else if (connectedBlock.type === "ast_comprehensionFor") {
            let iterField = connectedBlock.getInput("ITER");
            if (iterField.connection.targetConnection) {
              iterField.connection.targetConnection
                .getSourceBlock()
                .unplug(true);
            }
            let targetField = connectedBlock.getInput("TARGET");
            if (targetField.connection.targetConnection) {
              targetField.connection.targetConnection
                .getSourceBlock()
                .unplug(true);
            }
          } else {
            throw Error("Unknown block type: " + connectedBlock.type);
          }
          connection.disconnect();
          connection.getSourceBlock().dispose();
        }
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      // Reconnect any child blocks.
      for (let i = 1; i < this.itemCount_; i++) {
        connections[i]?.reconnect(this, "GENERATOR" + i);
        // TODO: glitch when inserting into middle, deletes children values
        if (!connections[i]) {
          let createName;
          if (blockTypes[i] === "ast_Comp_create_with_if") {
            createName = "ast_comprehensionIf";
          } else if (blockTypes[i] === "ast_Comp_create_with_for") {
            createName = "ast_comprehensionFor";
          } else {
            throw Error("Unknown block type: " + blockTypes[i]);
          }
          let itemBlock = this.workspace.newBlock(createName);
          itemBlock.setDeletable(false);
          itemBlock.setMovable(false);
          itemBlock.initSvg();
          this.getInput("GENERATOR" + i).connection.connect(
            itemBlock.outputConnection,
          );
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
      containerBlock.valueConnection_ =
        this.getInput("GENERATOR0").connection.targetConnection;
      var itemBlock = containerBlock.getInputTargetBlock("STACK");
      var i = 1;
      while (itemBlock) {
        var input = this.getInput("GENERATOR" + i);
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
      // Add new inputs.
      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput("GENERATOR" + i)) {
          let input = this.appendValueInput("GENERATOR" + i);
          if (i === 0) {
            input.setCheck("ComprehensionFor");
          } else {
            input.setCheck(["ComprehensionFor", "ComprehensionIf"]);
          }
          this.moveInputBefore("GENERATOR" + i, "END_BRACKET");
        }
      }
      // Remove deleted inputs.
      while (this.getInput("GENERATOR" + i)) {
        this.removeInput("GENERATOR" + i);
        i++;
      }
    },
  };

  python.pythonGenerator.forBlock["ast_" + kind] = function (block) {
    // elt
    let elt;
    if (kind === "DictComp") {
      let child = block.getInputTargetBlock("ELT");
      if (child === null || child.type !== "ast_DictItem") {
        elt =
          python.pythonGenerator.blank + ": " + python.pythonGenerator.blank;
      } else {
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
        elt = key + ": " + value;
      }
    } else {
      elt =
        python.pythonGenerator.valueToCode(
          block,
          "ELT",
          python.Order.NONE,
        ) || python.pythonGenerator.blank;
    }
    // generators
    let elements = new Array(block.itemCount_);
    const BAD_DEFAULT =
      elt +
      " for " +
      python.pythonGenerator.blank +
      " in" +
      python.pythonGenerator.blank;
    for (var i = 0; i < block.itemCount_; i++) {
      let child = block.getInputTargetBlock("GENERATOR" + i);
      if (child === null) {
        elements[i] = BAD_DEFAULT;
      } else if (child.type === "ast_comprehensionIf") {
        let test =
          python.pythonGenerator.valueToCode(
            child,
            "TEST",
            python.Order.NONE,
          ) || python.pythonGenerator.blank;
        elements[i] = "if " + test;
      } else if (child.type === "ast_comprehensionFor") {
        let target =
          python.pythonGenerator.valueToCode(
            child,
            "TARGET",
            python.Order.NONE,
          ) || python.pythonGenerator.blank;
        let iter =
          python.pythonGenerator.valueToCode(
            child,
            "ITER",
            python.Order.NONE,
          ) || python.pythonGenerator.blank;
        elements[i] = "for " + target + " in " + iter;
      } else {
        elements[i] = BAD_DEFAULT;
      }
    }
    // Put it all together
    let code =
      BlockMirrorTextToBlocks.COMP_SETTINGS[kind].start +
      elt +
      " " +
      elements.join(" ") +
      BlockMirrorTextToBlocks.COMP_SETTINGS[kind].end;
    return [code, python.Order.ATOMIC];
  };

  BlockMirrorTextToBlocks.prototype["ast_" + kind] = function (node, parent) {
    let generators = node.generators;

    let elements = {};
    if (kind === "DictComp") {
      let key = node.key;
      let value = node.value;
      elements["ELT"] = BlockMirrorTextToBlocks.create_block(
        "ast_DictItem",
        node.lineno,
        {},
        {
          KEY: this.convert(key, node),
          VALUE: this.convert(value, node),
        },
        {
          inline: "true",
          deletable: "false",
          movable: "false",
        },
      );
    } else {
      let elt = node.elt;
      elements["ELT"] = this.convert(elt, node);
    }
    let DEFAULT_SETTINGS = {
      inline: "true",
      deletable: "false",
      movable: "false",
    };
    let g = 0;
    for (let i = 0; i < generators.length; i++) {
      let target = generators[i].target;
      let iter = generators[i].iter;
      let ifs = generators[i].ifs;
      let is_async = generators[i].is_async;
      elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block(
        "ast_comprehensionFor",
        node.lineno,
        {},
        {
          ITER: this.convert(iter, node),
          TARGET: this.convert(target, node),
        },
        DEFAULT_SETTINGS,
      );
      g += 1;
      if (ifs) {
        for (let j = 0; j < ifs.length; j++) {
          elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block(
            "ast_comprehensionIf",
            node.lineno,
            {},
            {
              TEST: this.convert(ifs[j], node),
            },
            DEFAULT_SETTINGS,
          );
          g += 1;
        }
      }
    }

    return BlockMirrorTextToBlocks.create_block(
      "ast_" + kind,
      node.lineno,
      {},
      elements,
      {
        inline: "false",
      },
      {
        "@items": g,
      },
    );
  };
});
