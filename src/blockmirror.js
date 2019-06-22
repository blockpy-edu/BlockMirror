
/**
 *
 */
function BlockMirror(configuration) {
    this.validateConfiguration(configuration);
    this.initializeVariables();
    this.textEditor = new BlockMirrorTextEditor(this);
    this.blockEditor = new BlockMirrorBlockEditor(this);
    this.toolbar = new BlockMirrorToolbar(this);
}

BlockMirror.prototype.validateConfiguration = function(configuration) {
    this.configuration = {};
    
    // Container
    if ("container" in configuration) {
        this.configuration.container = configuration.container;
    } else {
        throw new Error("Invalid configuration: Missing 'container' property.")
    }
    
    // blocklyPath
    if ("blocklyMediaPath" in configuration) {
        this.configuration.blocklyMediaPath = configuration.blocklyMediaPath;
    } else {
        this.configuration.blocklyMediaPath = '../../blockly/media/';
    }
    
    // readOnly
    this.configuration['readOnly'] = configuration['readOnly'] || false;
    
    // height
    this.configuration.height = configuration.height || '500px';
}

BlockMirror.prototype.initializeVariables = function() {
    this.tags = {
        'toolbar': document.createElement("div"),
        'blockEditor': document.createElement("div"),
        'blockArea': document.createElement("div"),
        'textEditor': document.createElement("div"),
    };
    for (var name in this.tags) {
        this.configuration.container.appendChild(this.tags[name]);
    }
    
    this.files = [];
    
    this.views = ['blocks', 'text'];
}

function BlockMirrorTextEditor(blockMirror) {
    this.blockMirror = blockMirror;
}

function BlockMirrorBlockEditor(blockMirror) {
    this.blockMirror = blockMirror;
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
    blockMirror.tags.blockEditor.style.position = 'absolute';
    this.updateWidth();
    blockMirror.tags.blockArea.style.height = blockMirror.configuration.height;
    
    window.addEventListener('resize', this.resized.bind(this), false);
    this.resized();
}

BlockMirrorBlockEditor.prototype.updateWidth = function() {
    var newWidth = '0%';
    if (this.blockMirror.views.includes('blocks')) {
        newWidth = (100 / this.blockMirror.views.length)+'%';
    }
    this.blockMirror.tags.blockArea.style.width = newWidth;
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
    xml += '<category name="Variables" custom="VARIABLE" colour="240">'+'</category>';
    xml += '<category name="Iteration" colour="300">'+
           '<block type="controls_forEach"></block>'+
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
}

function BlockMirrorToolbar(blockMirror) {
    this.blockMirror = blockMirror;
}
