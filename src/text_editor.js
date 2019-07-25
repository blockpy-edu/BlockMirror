function BlockMirrorTextEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.textContainer = blockMirror.tags.textContainer;
    this.textArea = blockMirror.tags.textArea;
    this.textSidebar = blockMirror.tags.textSidebar;

    // notification
    this.silentEvents_ = false;

    // Do we need to force an update?
    this.outOfDate_ = null;
    
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
};

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
};

BlockMirrorTextEditor.prototype.setMode = function(mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    // If there is an update waiting and we're visible, then update
    if (this.outOfDate_ !== null && this.isVisible()) {
        this.setCode(this.outOfDate_, true);
    }
    // Show/hide editor
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

    // Defaults to a single blank line
    code = (code === undefined || code.trim() === "") ? "\n": code;

    if (this.isVisible()) {
        this.codeMirror.setValue(code);
        this.outOfDate_ = null;
    } else {
        this.outOfDate_ = code;
    }
};

BlockMirrorTextEditor.prototype.getCode = function() {
    return this.codeMirror.getValue();
};

BlockMirrorTextEditor.prototype.changed = function(codeMirror, event) {
    if (!this.silentEvents_) {
        let newCode = this.getCode();
        this.blockMirror.blockEditor.setCode(newCode, true);
        this.blockMirror.code_ = newCode;
    }
    this.silentEvents_ = false;
    //console.log("Changed text");
};

BlockMirrorTextEditor.prototype.isVisible = function() {
    return this.blockMirror.VISIBLE_MODES.text.indexOf(this.blockMirror.mode_) !== -1;
};