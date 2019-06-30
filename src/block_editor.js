function BlockMirrorBlockEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.blockContainer = blockMirror.tags.blockContainer;
    this.blockEditor = blockMirror.tags.blockEditor;
    this.blockArea = blockMirror.tags.blockArea;
    
    // Inject Blockly
    let blocklyOptions = {
        media: blockMirror.configuration.blocklyMediaPath, 
        // We use special comment blocks
        comments: false,
        disable: false,
        oneBasedIndex: false,
        readOnly: blockMirror.configuration.readOnly,
        scrollbars: true,
        toolbox: this.makeToolbox()
    }
    this.workspace = Blockly.inject(blockMirror.tags.blockEditor,
                                  blocklyOptions);
    // Configure Blockly
    this.workspace.addChangeListener(this.changed.bind(this));
    
    // Configure Blockly DIV
    //blockMirror.tags.blockEditor.style.resize = 'horizontal';
    this.blockContainer.style.float = 'left';
    this.blockEditor.style.position = 'absolute';
    this.blockEditor.style.width = '100%';
    this.blockArea.style.height = blockMirror.configuration.height;
    
    window.addEventListener('resize', this.resized.bind(this), false);
    this.resized();
}

BlockMirrorBlockEditor.prototype.updateWidth = function() {
    var newWidth = '0%';
    this.resized();
}

BlockMirrorBlockEditor.prototype.resized = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var blockArea = this.blockMirror.tags.blockArea;
    var current = blockArea;
    var x = 0;
    var y = 0;
    do {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    } while (current);
    // Position blocklyDiv over blockArea.
    var blockEditor = this.blockMirror.tags.blockEditor;
    blockEditor.style.left = x + 'px';
    blockEditor.style.top = y + 'px';
    blockEditor.style.width = blockArea.offsetWidth + 'px';
    blockEditor.style.height = blockArea.offsetHeight + 'px';
    Blockly.svgResize(this.workspace);
}

BlockMirrorBlockEditor.prototype.makeToolbox = function() {
    var xml = '<xml id="toolbox" style="display: none">';
    xml += '<category name="Variables" custom="VARIABLE" colour="240">' +
           '</category>';
    xml += '<category name="Iteration" colour="300">' +
           '<block type="ast_For"></block>' +
           '<block type="ast_ForElse"></block>' +
           '</category>';
    xml += '</xml>';
    return xml;
}

BlockMirrorBlockEditor.prototype.remakeToolbox = function() {
    this.workspace.updateToolbox(this.makeToolbox());
    this.resized();
}

BlockMirrorBlockEditor.prototype.changed = function() {
    // todo
    this.blockMirror.textEditor.setCode('__main__', this.getText());
    console.log("Changed block");
}

/**
 * Retrieves the current width of the Blockly Toolbox, unless
 * we're in read-only mode (when there is no toolbox).
 * @returns {Number} The current width of the toolbox.
 */
BlockMirrorBlockEditor.prototype.getToolbarWidth = function() {
    if (this.blockMirror.configuration.readOnly) {
        return 0;
    } else {
        return this.workspace.toolbox_.width;
    }
}

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
}

BlockMirrorBlockEditor.prototype.setMode = function(mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    this.blockContainer.style.width = configuration.width;
    this.workspace.setVisible(configuration.visible);
    
    if (configuration.visible) {
        this.blockContainer.style.height = '100%';
        this.blockEditor.style.width = '100%';
        this.resized();
    } else {
        this.blockContainer.style.height = '0%';
    }
}

/**
 * Attempts to update the model for the current code file from the 
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.getText = function() {
    return Blockly.Python.workspaceToCode(this.workspace);
}

/**
 * Attempts to update the model for the current code file from the 
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.setText = function(code) {
    var result = this.blockMirror.textToBlocks.convertSource('__main__.py', code);
    var xml_code = Blockly.Xml.textToDom(result.xml);
    this.workspace.clear();
    Blockly.Xml.domToWorkspace(xml_code, this.workspace);
}
