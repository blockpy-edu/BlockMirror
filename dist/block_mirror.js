function BlockMirrorTextEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.textContainer = blockMirror.tags.textContainer;
    this.textArea = blockMirror.tags.textArea;
    this.textSidebar = blockMirror.tags.textSidebar;

    // notification
    this.silentEvents_ = false;
    
    let codeMirrorOptions = {
        mode: {
            name: 'python',
            version: 3,
            singleLineStringErrors: false
        },
        readOnly: blockMirror.configuration.readOnly,
        showCursorWhenSelecting: true,
        lineNumbers: true,
        firstLineNumber: 1,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        matchBrackets: true,
        extraKeys: {
            'Tab': 'indentMore', 
            'Shift-Tab': 'indentLess',
            'Ctrl-Enter': blockMirror.run,
            'Esc': this.defocus.bind(this)
        }
    };
    this.codeMirror = CodeMirror.fromTextArea(this.textArea, codeMirrorOptions);
    this.codeMirror.on('change', this.changed.bind(this));
    this.codeMirror.setSize(null, '100%');
    this.textContainer.style.border= '1px solid lightgray';
    this.textContainer.style.float = 'left';
    this.updateWidth();
    this.textContainer.style.height = blockMirror.configuration.height;
    // Style sidebar
    this.textSidebar.style.height = '100%';
    this.textSidebar.style.float = 'left';
    this.textSidebar.style.backgroundColor = '#ddd';

}

BlockMirrorTextEditor.prototype.defocus = function() {
    this.codeMirror.display.input.blur();
}

BlockMirrorTextEditor.prototype.updateWidth = function() {
    var newWidth = '0%';
    /*if (this.blockMirror.views.includes('text')) {
        newWidth = (100 / this.blockMirror.views.length)+'%';
    }
    this.textContainer.style.width = newWidth;*/
}

BlockMirrorTextEditor.prototype.setReadOnly = function(isReadOnly) {
    this.codeMirror.setOption('readOnly', isReadOnly);
}

BlockMirrorTextEditor.prototype.VIEW_CONFIGURATIONS = {
    'split': {
        'width': '40%',
        'visible': true,
        'indentSidebar': false
    },
    'text': {
        'width': '100%',
        'visible': true,
        'indentSidebar': true
    },
    'block': {
        'width': '0%',
        'visible': false,
        'indentSidebar': false
    }
}

BlockMirrorTextEditor.prototype.setMode = function(mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    this.textContainer.style.width = configuration.width;
    if (configuration.visible) {
        this.textContainer.style.height = this.blockMirror.configuration.height;
        this.textContainer.style.display = 'block';
        this.codeMirror.getWrapperElement().style.display = 'block';
        this.codeMirror.refresh();
    } else {
        this.textContainer.style.height = '0%';
        this.textContainer.style.display = 'none';
        this.codeMirror.getWrapperElement().style.display = 'none';
    }
    // Should we indent the toolbox
    if (configuration.indentSidebar) {
        let gutters = this.textContainer.querySelector('.CodeMirror-gutters');
        let gutterWidth = gutters.offsetWidth;
        let toolbarWidth = this.blockMirror.blockEditor.getToolbarWidth();
        let newGutterWidth = toolbarWidth - gutterWidth - 2;
        this.textSidebar.style.width = newGutterWidth + 'px';
        this.textSidebar.style.display = 'block';
    } else {
        this.textSidebar.style.display = 'none';
        this.textSidebar.style.width = '0px';
    }
}

BlockMirrorTextEditor.prototype.setCode = function(code, quietly) {
    this.silentEvents_ = quietly;
    if (code === undefined || code.trim() === "") {
        this.codeMirror.setValue("\n");
    } else {
        this.codeMirror.setValue(code);
    }
};

BlockMirrorTextEditor.prototype.getCode = function() {
    return this.codeMirror.getValue();
};

BlockMirrorTextEditor.prototype.changed = function(codeMirror, event) {
    if (!this.silentEvents_) {
        let newCode = this.getCode();
        this.blockMirror.blockEditor.setCode(newCode, true);
        this.blockMirror.model_ = newCode;
    }
    this.silentEvents_ = false;
    //console.log("Changed text");
};


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
    this.configuration['readOnly'] = configuration['readOnly'] || false;

    // height
    this.configuration.height = configuration.height || '500px';

    // viewMode
    this.configuration.viewMode = configuration.viewMode || 'split';
}

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

    for (var name in this.tags) {
        this.tags[name].style['box-sizing'] = 'border-box';
    }

    // Files
    this.files = [];
    this.model_ = "";

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

BlockMirror.prototype.addChangeListener = function (callback) {
    this.listeners_.push(callback);
}

BlockMirror.prototype.fireChangeListener = function (event) {
    for (var i = 0, func; func = this.listeners_[i]; i++) {
        func(event);
    }
};

BlockMirror.prototype.setCode = function (code, quietly) {
    this.model_ = code;
    if (!quietly) {
        this.blockEditor.setCode(code, true);
        this.textEditor.setCode(code, true);
    }
    this.fireChangeListener({'name': 'changed', 'value': code});
};

BlockMirror.prototype.getCode = function () {
    return this.model_;
};

BlockMirror.prototype.setMode = function (mode) {
    this.blockEditor.setMode(mode);
    this.textEditor.setMode(mode);
};

BlockMirror.prototype.setFilename = function (filename) {
};

BlockMirror.prototype.setReadOnly = function (isReadOnly) {
    this.textEditor.setReadOnly(isReadOnly);
    this.blockEditor.setReadOnly(isReadOnly);
    this.configuration.container.toggleClass("block-mirror-read-only", isReadOnly);
};


var exports = BlockMirror;