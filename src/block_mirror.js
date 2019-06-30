/**

External visible stuff

Changing mode/code/filename can fail on the block side

setMode(mode) -> bool
setFilename(filename) -> bool
setCode(filename, code) -> bool
setHighlight(line) -> bool
setReadOnly(isReadOnly)
setToolbox(string)
    'basic'
    'advanced'
    'complete'
    list[list[string]]
onChange(event) ->
    onModeChange
    onFilenameChange
    onCodeChange
    
getCode(filename) -> string
getCode() -> string
getFilename() -> string
getMode() -> string
getImage(callback)

lastBlockConversionFailure: {} or null


*/

/**
 *
 */
function BlockMirror(configuration) {
    this.validateConfiguration(configuration);
    this.initializeVariables();
    this.textEditor = new BlockMirrorTextEditor(this);
    this.blockEditor = new BlockMirrorBlockEditor(this);
    this.textToBlocks = new BlockMirrorTextToBlocks(this);
    
    Sk.configure({});
    
    this.setMode(this.configuration.viewMode);
}

BlockMirror.prototype.validateConfiguration = function(configuration) {
    this.configuration = {};
    
    // Container
    if ('container' in configuration) {
        this.configuration.container = configuration.container;
    } else {
        throw new Error('Invalid configuration: Missing "container" property.')
    }
    
    // blocklyPath
    if ('blocklyMediaPath' in configuration) {
        this.configuration.blocklyMediaPath = configuration.blocklyMediaPath;
    } else {
        this.configuration.blocklyMediaPath = '../../blockly/media/';
    }
    
    // Run function
    if ('run' in configuration) {
        this.configuration.run = configuration.run;
    } else {
        this.configuration.run = function(){console.log('Ran!');};
    }
    
    // readOnly
    this.configuration['readOnly'] = configuration['readOnly'] || false;
    
    // height
    this.configuration.height = configuration.height || '500px';
    
    // viewMode
    this.configuration.viewMode = configuration.viewMode || 'split';
}

BlockMirror.prototype.initializeVariables = function() {
    this.tags = {
        'toolbar': document.createElement('div'),
        'blockContainer': document.createElement('div'),
        'blockEditor': document.createElement('div'),
        'blockArea': document.createElement('div'),
        'textSidebar': document.createElement('div'),
        'textContainer': document.createElement('div'),
        'textArea': document.createElement('textarea'),
    };
    // Toolbar
    this.configuration.container.appendChild(this.tags.toolbar);
    // Block side
    this.configuration.container.appendChild(this.tags.blockContainer);
    this.tags.blockContainer.appendChild(this.tags.blockEditor);
    this.tags.blockContainer.appendChild(this.tags.blockArea);
    // Text side
    this.configuration.container.appendChild(this.tags.textContainer);
    this.tags.textContainer.appendChild(this.tags.textSidebar);
    this.tags.textContainer.appendChild(this.tags.textArea);
    
    for (var name in this.tags) {
        this.tags[name].style['box-sizing'] = 'border-box';
    }
    
    // Files
    this.files = [];
    
    // Update Flags
    this.silenceBlock = false;
    this.silenceBlockTimer = null;
    this.silenceText = false;
    this.silenceModel = 0;
    this.blocksFailed = false;
    this.blocksFailedTimeout = null;
    this.triggerOnChange = null;
    this.firstEdit = true;
    
    // Toolbox width
    this.blocklyToolboxWidth = 0;
    
    // Listeners
    this.listeners_ = [];
}

BlockMirror.prototype.addChangeListener = function(callback) {
    this.listeners_.push(callback);
}

BlockMirror.prototype.fireChangeListener = function(event) {
    for (var i = 0, func; func = this.listeners_[i]; i++) {
        func(event);
    }
};

BlockMirror.prototype.setCode = function(filename, code, event) {
    this.fireChangeListener(event);
};

BlockMirror.prototype.setMode = function(mode) {
    this.blockEditor.setMode(mode);
    this.textEditor.setMode(mode);
};

BlockMirror.prototype.setFilename = function(filename) {
};

BlockMirror.prototype.setReadOnly = function(isReadOnly) {
    this.textEditor.setReadOnly(isReadOnly);
    this.blockEditor.setReadOnly(isReadOnly);
    this.configuration.container.toggleClass("block-mirror-read-only", isReadOnly);
};

