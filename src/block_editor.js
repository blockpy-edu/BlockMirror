/**
 * Worth noting - Blockly uses a setTimeOut of 0 steps to make events
 * wait. That has some confusing interaction with trying to make things percolate.
 * @param blockMirror
 * @constructor
 */

function BlockMirrorBlockEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.blockContainer = blockMirror.tags.blockContainer;
    this.blockEditor = blockMirror.tags.blockEditor;
    this.blockArea = blockMirror.tags.blockArea;

    // Null, or the source of the last update
    this.outOfDate_ = null;

    // Have to call BEFORE we inject, or Blockly will delete the css string!
    // this.loadBlocklyCSS();
    this.baseToolboxContent_ = this.makeBaseToolboxContent()

    // Inject Blockly
    let blocklyOptions = {
        media: blockMirror.configuration.blocklyMediaPath,
        comments: false, // We use special comment blocks
        disable: false,
        oneBasedIndex: false,
        readOnly: blockMirror.configuration.readOnly,
        scrollbars: true,
        toolbox: this.makeToolbox(),
        renderer: blockMirror.configuration.renderer,
        move: blockMirror.configuration.move,
        zoom: blockMirror.configuration.zoom
    };
    this.workspace = Blockly.inject(blockMirror.tags.blockEditor,
        blocklyOptions);

    this.workspace.registerToolboxCategoryCallback(
      'VARIABLE', this.variableFlyoutCallback);

    this.workspace.convertColour = blockMirror.configuration.convertColour;
    this.workspace.translateText = blockMirror.configuration.translate;
    this.workspace.libraries = blockMirror.libraries;
    this.workspace.toolbox.flyout.workspace_.libraries = blockMirror.libraries;

  // Configure Blockly
    this.workspace.addChangeListener(this.changed.bind(this));

    // Configure Blockly DIV
    //blockMirror.tags.blockEditor.style.resize = 'horizontal';
    this.blockContainer.style.float = 'left';
    this.blockEditor.style.position = 'absolute';
    this.blockEditor.style.width = '100%';
    this.blockArea.style.height = blockMirror.configuration.height + "px";

    this.readOnlyDiv_ = null;

    window.addEventListener('resize', this.resized.bind(this), false);
    this.resized();

    // Needed for libraries with dynamic toolbox
    // TODO optimize
    this.blockMirror.addChangeListener(event => this.remakeToolbox());
}

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
BlockMirrorBlockEditor.prototype.variableFlyoutCallback = function (workspace) {
  var xmlList = [];

  const button = document.createElement('button');
  button.setAttribute('text', '%{BKY_NEW_VARIABLE}');
  button.setAttribute('callbackKey', 'CREATE_VARIABLE');

  workspace.registerButtonCallback('CREATE_VARIABLE', function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
  });

  xmlList.push(button);

  var variableModelList = workspace.getVariableMap().getVariablesOfType('');

  if (variableModelList.length > 0) {
    // New variables are added to the end of the variableModelList.
    let mostRecentVariableState;

    for (let i = variableModelList.length - 1; i >= 0; i--) {
      let variable = variableModelList[i];

      if (variable.name !== python.pythonGenerator.blank) {
        mostRecentVariableState = variable;
        break;
      }
    }

    if (mostRecentVariableState && !Blockly.Variables._HIDE_GETTERS_SETTERS) {
      let mostRecentVariableFieldXmlString =
        '<field name="VAR"><shadow type="ast_Name">' +
        mostRecentVariableState.getName() +
        "</shadow></field>";

      xmlList.push(
        Blockly.utils.xml.textToDom(
          (blockText =
            '<block type="ast_Assign" gap="8">' +
            mostRecentVariableFieldXmlString +
            "</block>"),
        ),
      );

      let blockText =
        '<block type="ast_AugAssign" gap="8">' +
        mostRecentVariableFieldXmlString +
        '<value name="VALUE">' +
        '<shadow type="ast_Num">' +
        '<field name="NUM">1</field>' +
        "</shadow>" +
        "</value>" +
        '<mutation options="false" simple="true"></mutation>' +
        "</block>";
      xmlList.push(Blockly.utils.xml.textToDom(blockText));
    }
  }

  xmlList.push(
    Blockly.utils.xml.textToDom(
      '<block type="ast_Assign" gap="8"><mutation targets="1" simple="false"></mutation></block>',
    ),
  );

  variableModelList.sort(Blockly.VariableModel.compareByName);
  for (let i = 0, variable; variable = variableModelList[i]; i++) {
    if (variable.name === python.pythonGenerator.blank) {
      continue;
    } else if (Blockly.Variables._HIDE_GETTERS_SETTERS) {
      block = Blockly.utils.xml.createElement('label');
      block.setAttribute('text', variable.name);
      block.setAttribute('web-class', 'blockmirror-toolbox-variable');
      //block.setAttribute('gap', 8);
      xmlList.push(block);
    } else {
      let block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'ast_Name');
      block.setAttribute('gap', 8);
      block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
      xmlList.push(block);
    }
  }

  return xmlList;
};

BlockMirrorBlockEditor.prototype.resizeReadOnlyDiv = function () {
    if (this.readOnlyDiv_ !== null) {
        if (!this.isVisible()) {
            this.readOnlyDiv_.css("left", '0px');
            this.readOnlyDiv_.css("top", '0px');
            this.readOnlyDiv_.css("width", '0px');
            this.readOnlyDiv_.css("height", '0px');
        }
        let blockArea = this.blockMirror.tags.blockArea;
        let current = blockArea;
        let x = 0;
        let y = 0;
        do {
            x += current.offsetLeft;
            y += current.offsetTop;
            current = current.offsetParent;
        } while (current);
        // Position blocklyDiv over blockArea.
        this.readOnlyDiv_.css("left", x+'px');
        this.readOnlyDiv_.css("top", y+'px');
        this.readOnlyDiv_.css("width", blockArea.offsetWidth + 'px');
        this.readOnlyDiv_.css("height", blockArea.offsetHeight + 'px');
    }
};

BlockMirrorBlockEditor.prototype.setReadOnly = function (isReadOnly) {
    if (isReadOnly) {
        if (this.readOnlyDiv_ === null) {
            this.readOnlyDiv_ = $("<div class='blockly-readonly-layer'></div>");
            $("body").append(this.readOnlyDiv_);
        }
        this.resizeReadOnlyDiv();
    } else if (this.readOnlyDiv_ !== null) {
        this.readOnlyDiv_.remove();
        this.readOnlyDiv_ = null;
    }
};

BlockMirrorBlockEditor.prototype.updateWidth = function () {
    var newWidth = '0%';
    this.resized();
};

BlockMirrorBlockEditor.prototype.resized = function (e) {
    this.resizeResponsively();
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let blockArea = this.blockMirror.tags.blockArea;
    /*var current = blockArea;
    var x = 0;
    var y = 0;
    do {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    } while (current);*/
    // Position blocklyDiv over blockArea.
    let blockEditor = this.blockMirror.tags.blockEditor;
    /*blockEditor.style.left = x + 'px';
    blockEditor.style.top = y + 'px';*/
    blockEditor.style.width = blockArea.offsetWidth + 'px';
    blockEditor.style.height = blockArea.offsetHeight + 'px';
    Blockly.svgResize(this.workspace);
    this.resizeReadOnlyDiv();
};

BlockMirrorBlockEditor.prototype.toolboxPythonToBlocks = function (toolboxPython) {
    Blockly.Variables._HIDE_GETTERS_SETTERS = false;
    return toolboxPython.map((category) => {
        if (typeof category === "string") {
            return category;
        }
        let colour = this.blockMirror.configuration.convertColour("toolbox", BlockMirrorTextToBlocks.COLOR[category.colour], category.name);
        let header = `<category name="${category.name}" colour="${colour}"`;
        if (category.custom) {
            header += ` custom="${category.custom}">`;
        } else {
            header += ">";
        }
        let body = (category.blocks || []).map((code) => {
          if (code === '') {
            return "<sep gap='50'></sep>";
          }

          let textToBlocks = this.blockMirror.textToBlocks;
          let originalVariables = textToBlocks.variables;
          try {
            textToBlocks.variables = new TypesRegistry()
            let result = this.blockMirror.textToBlocks.convertSource('toolbox.py', code);

            if (result.rawXml.firstElementChild.getAttribute('type') === 'ast_AnnAssignFull') {
              // In case the first line only specifies the class the attribute is defined on.
              let nextElements = result.rawXml.getElementsByTagName("next");

              if (nextElements.length > 0) {
                return nextElements.item(0).innerHTML.toString();
              }
            }
            return result.rawXml.innerHTML.toString();
          } finally {
            textToBlocks.variables = originalVariables
          }
        }).join("\n");
        let footer = "</category>";
        if (category['hideGettersSetters']) {
            Blockly.Variables._HIDE_GETTERS_SETTERS = true;
        }
        return [header, body, footer].join("\n");
    }).join("\n");
};

BlockMirrorBlockEditor.prototype.makeBaseToolboxContent = function () {
    let toolbox = this.blockMirror.configuration.toolbox;
    // Use palette if it exists, otherwise assume it is a custom one.
    if (toolbox in this.TOOLBOXES) {
        toolbox = this.TOOLBOXES[toolbox];
    }
    // Convert if necessary
    if (typeof toolbox !== "string") {
        let textToBlocks = this.blockMirror.textToBlocks
        let originalImports = textToBlocks.imports
        let originalVariables = textToBlocks.variables
        try {
            textToBlocks.imports = new TypeRegistry()
            textToBlocks.variables = new TypesRegistry()
            this.blockMirror.libraries.registerImports(textToBlocks.imports)
            toolbox = this.toolboxPythonToBlocks(toolbox);
        } finally {
            textToBlocks.imports = originalImports
            textToBlocks.variables = originalVariables
        }
    }
    // TODO: Fix Hack, this should be configurable by instance rather than by class
    for (let name in BlockMirrorBlockEditor.EXTRA_TOOLS) {
        toolbox += BlockMirrorBlockEditor.EXTRA_TOOLS[name];
    }

    return toolbox
}

BlockMirrorBlockEditor.prototype.makeToolbox = function () {
    let toolbox = this.baseToolboxContent_;
    toolbox += this.blockMirror.libraries.toToolbox(this.blockMirror.textToBlocks);
    return '<xml id="toolbox" style="display:none">' + toolbox + '</xml>';
};

BlockMirrorBlockEditor.prototype.remakeToolbox = function () {
    this.workspace.updateToolbox(this.makeToolbox());
    this.resized();
};

/**
 * Retrieves the current width of the Blockly Toolbox, unless
 * we're in read-only mode (when there is no toolbox).
 * @returns {Number} The current width of the toolbox.
 */
BlockMirrorBlockEditor.prototype.getToolbarWidth = function () {
    if (this.blockMirror.configuration.readOnly) {
        return 0;
    } else {
        return this.workspace.toolbox.width_;
    }
};

BlockMirrorBlockEditor.prototype.VIEW_CONFIGURATIONS = {
    'split': {
        'width': '60%',
        'visible': true
    },
    'block': {
        'width': '100%',
        'visible': true
    },
    'text': {
        'width': '0%',
        'visible': false
    }
};

BlockMirrorBlockEditor.prototype.resizeResponsively = function () {
    let mode = this.blockMirror.mode_;
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    if (mode === 'split') {
        if (window.innerWidth >= this.blockMirror.BREAK_WIDTH) {
            this.blockContainer.style.width = configuration.width;
            this.blockContainer.style.height = this.blockMirror.configuration.height+"px";
            this.blockArea.style.height = this.blockMirror.configuration.height + "px";
        } else {
            this.blockContainer.style.width = '100%';
            this.blockContainer.style.height = (this.blockMirror.configuration.height/2)+"px";
            this.blockArea.style.height = (this.blockMirror.configuration.height/2)+"px";
        }
    } else if (mode === 'block') {
        this.blockContainer.style.width = configuration.width;
        this.blockContainer.style.height = this.blockMirror.configuration.height+"px";
        this.blockArea.style.height = this.blockMirror.configuration.height + "px";
    }
};

BlockMirrorBlockEditor.prototype.setMode = function (mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];

    // Show/hide editor
    this.workspace.setVisible(configuration.visible);
    if (configuration.visible) {
        this.blockEditor.style.width = '100%';
        this.resized();
    } else {
        this.blockContainer.style.height = '0%';
        this.blockArea.style.height = '0%';
        this.resizeReadOnlyDiv();
    }

    // If there is an update waiting and we're visible, then update
    if (this.outOfDate_ !== null && this.isVisible()) {
        this.setCode(this.outOfDate_, true);
    }
};

/**
 * Attempts to update the model for the current code file from the
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.getCode = function () {
    python.pythonGenerator.libraries = this.blockMirror.libraries
    return python.pythonGenerator.workspaceToCode(this.workspace)
};

// Simplified workspace cleanup, which can assume there are no immovable blocks.
BlockMirrorBlockEditor.prototype._cleanUpWorkspace = function() {
    this.workspace.setResizesEnabled(false);
    const topBlocks = this.workspace.getTopBlocks(true);
    const spacerHeight = this.workspace.renderer.getConstants().SPACER_DEFAULT_HEIGHT
    // Not entirely clear why, but these are the minimum values needed to avoid most unwanted layout changes when dragging.
    const extraHeight = Math.round(this.workspace.renderer.getConstants().MIN_BLOCK_HEIGHT * 2.5);
    let cursorY = extraHeight;

    for (const block of topBlocks) {
        let boundingRect = block.getBoundingRectangle();
        block.moveBy(-boundingRect.left + spacerHeight, Math.max(0, cursorY - boundingRect.top), ['cleanup']);
        cursorY =
            block.getRelativeToSurfaceXY().y +
            block.getHeightWidth().height +
            extraHeight;
    }
    this.workspace.setResizesEnabled(true);
}

/**
 * Attempts to update the model for the current code file from the
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.setCode = function (code, quietly) {
    if (this.isVisible()) {
        this.blockMirror.textToBlocks.imports.clear()
        this.blockMirror.textToBlocks.variables.clear()
        let result = this.blockMirror.textToBlocks.convertSource('__main__.py', code);
        if (quietly) {
            Blockly.Events.disable();
        }
        try {
            let minBlockHeight = this.workspace.renderer.getConstants().MIN_BLOCK_HEIGHT
            let xml_code = Blockly.utils.xml.textToDom(result.xml);
            // Convert line numbers to y coordinates, to ensure proper ordering
            for (let i = 0, xmlChild; (xmlChild = xml_code.childNodes[i]); i++) {
                xmlChild.setAttribute('y', ((xmlChild.getAttribute('line_number') ?? 1) - 1) * minBlockHeight);
            }

            Blockly.Xml.clearWorkspaceAndLoadFromXml(xml_code, this.workspace);
            this._cleanUpWorkspace();
        } catch (error) {
            console.error(error);
        }
        if (quietly) {
            Blockly.Events.enable();
        } else {
            this.blockMirror.setCode(code, true);
        }
        this.outOfDate_ = null;
    } else {
        this.outOfDate_ = code;
    }
}

BlockMirrorBlockEditor.prototype.BLOCKLY_CHANGE_EVENTS = [
    Blockly.Events.CREATE, Blockly.Events.DELETE, Blockly.Events.CHANGE,
    Blockly.Events.MOVE, Blockly.Events.VAR_RENAME
];

BlockMirrorBlockEditor.prototype.changed = function (event) {
    if ((event === undefined || this.BLOCKLY_CHANGE_EVENTS.indexOf(event.type) !== -1) &&
        !this.workspace.isDragging()) {
        let newCode = this.getCode();
        this.blockMirror.textEditor.setCode(newCode, true);
        this.blockMirror.setCode(newCode, true);
    }
};

BlockMirrorBlockEditor.prototype.isVisible = function () {
    return this.blockMirror.VISIBLE_MODES.block.indexOf(this.blockMirror.mode_) !== -1;
};

BlockMirrorBlockEditor.prototype.DOCTYPE = '<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
BlockMirrorBlockEditor.prototype.BLOCKLY_LOADED_CSS = null;
BlockMirrorBlockEditor.prototype.loadBlocklyCSS = function() {
    if (this.BLOCKLY_LOADED_CSS === null) {
        let result = [".blocklyDraggable {}"];
        const blocklyCommonStyle = document.getElementById('blockly-common-style').getHTML();
        const thrasosStyle = document.getElementById('blockly-renderer-style-Thrasos-classic').getHTML();
        result = result.concat(blocklyCommonStyle, thrasosStyle);
        if (Blockly.FieldDate) {
            result = result.concat(Blockly.FieldDate.CSS);
        }
        result = result.join("\n");
        // Strip off any trailing slash (either Unix or Windows).
        result = result.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
        this.BLOCKLY_LOADED_CSS = result;
    }
}

/**
 * Generates a PNG version of the current workspace. This PNG is stored in a Base-64 encoded
 * string as part of a data URL (e.g., "data:image/png;base64,...").
 * TODO: There seems to be some problems capturing blocks that don't start with
 * statement level blocks (e.g., expression blocks).
 *
 * @param {Function} callback - A function to be called with the results.
 *  This function should take two parameters, the URL (as a string) of the generated
 *  base64-encoded PNG and the IMG tag.
 */
BlockMirrorBlockEditor.prototype.getPngFromBlocks = function(callback) {
    try {
        this.loadBlocklyCSS();
        // Retreive the entire canvas, strip some unnecessary tags
        var blocks = this.workspace.svgBlockCanvas_.cloneNode(true);
        blocks.removeAttribute("width");
        blocks.removeAttribute("height");
        // Ensure that we have some content
        if (blocks.childNodes[0] !== undefined) {
            // Remove tags that offset
            blocks.removeAttribute("transform");
            blocks.childNodes[0].removeAttribute("transform");
            blocks.childNodes[0].childNodes[0].removeAttribute("transform");
            // Add in styles
            var linkElm = document.createElementNS("http://www.w3.org/1999/xhtml", "style");
            linkElm.textContent = this.BLOCKLY_LOADED_CSS + "\n\n";
            blocks.insertBefore(linkElm, blocks.firstChild);
            // Get the bounding box
            var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
            // Create the XML representation of the SVG
            var xml = new XMLSerializer().serializeToString(blocks);
            const classes = 'class="' + this.blockMirror.configuration.renderer + '-renderer classic-theme" ';
            xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '+classes+' width="'+bbox.width+'" height="'+bbox.height+'" viewBox="0 0 '+bbox.width+" "+bbox.height+'"><rect width="100%" height="100%" fill="white"></rect>'+xml+"</svg>";
            console.log(xml);
            // create a file blob of our SVG.
            // Unfortunately, this crashes modern chrome for unknown reasons.
            //var blob = new Blob([ this.DOCTYPE + xml], { type: 'image/svg+xml' });
            //var url = window.URL.createObjectURL(blob);
            // Old method: this failed on IE
            var url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
            // Create an IMG tag to hold the new element
            var img  = document.createElement("img");
            img.style.display = "block";
            img.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = bbox.width;
                canvas.height = bbox.height;
                if (!canvas.width || !canvas.height) {
                    callback("", img);
                    return;
                }
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var canvasUrl;
                try {
                    canvasUrl = canvas.toDataURL("image/png");
                } catch (e) {
                    canvasUrl = url;
                }
                img.onload = null;
                callback(canvasUrl, img);
            };
            img.onerror = function() {
                callback("", img);
            };
            img.setAttribute("src", url);
        } else {
            callback("", document.createElement("img"));
        }
    } catch (e) {
        callback("", document.createElement("img"));
        console.error("PNG image creation not supported!", e);
    }
};

BlockMirrorBlockEditor.prototype.highlightLines = function(lines, style) {
    // Make some kind of block map?
    /*this.workspace.getAllBlocks().map((block) => {
        block
    });*/
};
