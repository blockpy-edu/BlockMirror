/**

 External visible stuff

 Changing mode/code can fail on the block side

 setMode(mode) -> bool
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
 onCodeChange

 getCode() -> string
 getMode() -> string
 getImage(callback)

 lastBlockConversionFailure: {} or null


 */

/**
 * Location to register default libraries.
 */
BlockMirror.LIBRARIES = {};

/**
 *
 */
function BlockMirror(configuration) {
    this.validateConfiguration(configuration);
    this.initializeVariables();

  if (!this.configuration.skipSkulpt) {
        this.loadSkulpt();
    }

    this.textToBlocks = new BlockMirrorTextToBlocks(this);
    this.textEditor = new BlockMirrorTextEditor(this);
    this.blockEditor = new BlockMirrorBlockEditor(this);

    this.setMode(this.configuration.viewMode);
}

BlockMirror.prototype.validateConfiguration = function (configuration) {
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
        this.configuration.run = function () {
            console.log('Ran!');
        };
    }

    // readOnly
    this.configuration['readOnly'] = configuration['readOnly'] ?? false;

    // height
    this.configuration.height = configuration.height ?? 500;

    // viewMode
    this.configuration.viewMode = configuration.viewMode ?? 'split';

    // Need to load skulpt?
    this.configuration.skipSkulpt = configuration.skipSkulpt ?? false;

    // Delay?
    this.configuration.blockDelay = configuration.blockDelay ?? false;

    // Toolbox
    this.configuration.toolbox = configuration.toolbox ?? "normal";

    this.configuration.renderer = configuration.renderer ?? 'Thrasos';

    // Convert image URLs?
    this.configuration.imageUploadHook = configuration.imageUploadHook ?? (old => Promise.resolve(old));
    this.configuration.imageDownloadHook = configuration.imageDownloadHook ?? (old => old);
    this.configuration.imageLiteralHook = configuration.imageLiteralHook ?? (old => old);
    this.configuration.imageDetection = configuration.imageDetection ?? 'string';
    this.configuration.imageMode = configuration.imageMode ?? false;
    this.configuration.libraries = configuration.libraries ?? BlockMirror.LIBRARIES;
    this.configuration.translate = configuration.translate ?? ((identifier, defaultValue, _namespace) =>
        defaultValue === undefined || defaultValue === null ? identifier : defaultValue);
    this.configuration.preferFullAttributeBlocks = configuration.preferFullAttributeBlocks ?? false;
    this.configuration.showDefaultArguments = configuration.showDefaultArguments ?? false;
    this.configuration.move = configuration.move ?? {};
    this.configuration.zoom = configuration.zoom ?? {controls: true};
    this.configuration.convertColour = configuration.convertColour ?? ((type, defaultValue, name) => defaultValue);
};

BlockMirror.prototype.initializeVariables = function () {
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

    for (let name in this.tags) {
        this.tags[name].style['box-sizing'] = 'border-box';
    }

    // Files
    this.code_ = "";
    this.mode_ = null;

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
    this.libraries = new Libraries(this.configuration.libraries, this.configuration.translate, this.configuration.convertColour);
};

BlockMirror.prototype.loadSkulpt = function () {
    Sk.configure({
        __future__: Sk.python3,
        read: function (filename) {
            if (Sk.builtinFiles === undefined ||
                Sk.builtinFiles["files"][filename] === undefined) {
                throw "File not found: '" + filename + "'";
            }
            return Sk.builtinFiles["files"][filename];
        }
    });
};

BlockMirror.prototype.removeAllChangeListeners = function () {
    this.listeners_.length = 0;
};

BlockMirror.prototype.removeChangeListener = function (callback) {
    let index = this.listeners_.indexOf(callback);
    if (index !== -1) {
        this.listeners_.splice(index, 1);
    }
};

BlockMirror.prototype.addChangeListener = function (callback) {
    this.listeners_.push(callback);
};

BlockMirror.prototype.fireChangeListener = function (event) {
    for (let i = 0, func; func = this.listeners_[i]; i++) {
        func(event);
    }
};

BlockMirror.prototype.setCode = function (code, quietly) {
    this.code_ = code;
    if (!quietly) {
        this.blockEditor.setCode(code, true);
        this.textEditor.setCode(code, true);
    }
    this.fireChangeListener({'name': 'changed', 'value': code});
};

BlockMirror.prototype.getCode = function () {
    return this.code_;
};

BlockMirror.prototype.getMode = function () {
    return this.mode_;
};

BlockMirror.prototype.setMode = function (mode) {
    this.mode_ = mode;
    this.blockEditor.setMode(mode);
    this.textEditor.setMode(mode);
};

BlockMirror.prototype.setImageMode = function (imageMode) {
    this.configuration.imageMode = imageMode;
    if (imageMode) {
        this.textEditor.enableImages();
    } else {
        this.textEditor.disableImages();
    }
    console.log(imageMode);
};

BlockMirror.prototype.setReadOnly = function (isReadOnly) {
    this.textEditor.setReadOnly(isReadOnly);
    this.blockEditor.setReadOnly(isReadOnly);
    $(this.configuration.container).toggleClass("block-mirror-read-only", isReadOnly);
};

BlockMirror.prototype.refresh = function() {
    this.blockEditor.resized();
    this.textEditor.codeMirror.refresh();
};

BlockMirror.prototype.forceBlockRefresh = function() {
    this.blockEditor.setCode(this.code_, true);
};

BlockMirror.prototype.VISIBLE_MODES = {
    'block': ['block', 'split'],
    'text': ['text', 'split']
};

BlockMirror.prototype.BREAK_WIDTH = 675;

BlockMirror.prototype.setHighlightedLines = function(lines, style) {
    this.textEditor.setHighlightedLines(lines, style);
    //this.blockEditor.highlightLines(lines, style);
};

BlockMirror.prototype.clearHighlightedLines = function(style=null) {
    this.textEditor.clearHighlightedLines(style);
    //this.blockEditor.unhighlightLines(lines, style);
};
