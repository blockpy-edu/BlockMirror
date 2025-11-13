function BlockMirrorTextEditor(blockMirror) {
    this.blockMirror = blockMirror;
    this.textContainer = blockMirror.tags.textContainer;
    this.textArea = blockMirror.tags.textArea;
    this.textSidebar = blockMirror.tags.textSidebar;

    this.highlightedHandles = [];

    // notification
    this.silentEvents_ = false;

    // Do we need to force an update?
    this.outOfDate_ = null;

    // Use a timer to swallow updates
    this.updateTimer_ = null;

    const codeMirrorOptions = {
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
            'Esc': function(cm) {
                if (cm.getOption("fullScreen")) {
                    cm.setOption("fullScreen", false);
                } else {
                    cm.display.input.blur();
                }
            },
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
        },
        // TODO: Hide gutters when short on space
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    };
    this.codeMirror = CodeMirror.fromTextArea(this.textArea, codeMirrorOptions);
    this.codeMirror.on('change', this.changed.bind(this));
    this.codeMirror.setSize(null, '100%');
    this.imageMarkers = [];
    this.textContainer.style.border = '1px solid lightgray';
    this.textContainer.style.float = 'left';
    this.updateWidth();
    this.textContainer.style.height = blockMirror.configuration.height;
    // Style sidebar
    this.textSidebar.style.height = '100%';
    this.textSidebar.style.float = 'left';
    this.textSidebar.style.backgroundColor = '#ddd';

    window.addEventListener('resize', this.resizeResponsively.bind(this), false);

    // TODO: Finish implementing code completion
    /*this.codeMirror.on('inputRead', function onChange(editor, input) {
        if (input.text[0] === ';' || input.text[0] === ' ' || input.text[0] === ":") {
            return;
        }
        editor.showHint({
            hint: CodeMirror.pythonHint
        });
    });*/
    //https://i.imgur.com/ITZKRiq.png
    this.codeMirror.on("beforeChange", (cm, change) => {
        if (this.blockMirror.configuration.imageMode) {
            if (change.origin === "paste") {
                let oldText = change.text[0];
                if (this.isImageUrl(oldText)) {
                    let newText = this.blockMirror.configuration.imageLiteralHook(oldText);
                    change.update(null, null, [newText]);
                }
            }
        }
    });

    this.codeMirror.on("change", (cm, change) => {
        if (this.blockMirror.configuration.imageMode) {
            let lastLine;
            if (change.origin === "paste" || change.origin === "setValue") {
                //"https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png"
                lastLine = change.from.line + change.text.length;
            } else {
                lastLine = Math.max(1 + change.to.line, change.text.length);
            }
            this.updateImages(cm, change.from.line, lastLine);
        }
    });

    this.codeMirror.on("paste", (cm, event) => {
        if (this.blockMirror.configuration.imageMode) {
            var items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (let index = 0; index < items.length; index += 1) {
                var item = items[index];
                if (item.kind === 'file') {
                    let blob = item.getAsFile();
                    let promise = this.blockMirror.configuration.imageUploadHook(blob, item);
                    promise.then(newUrl => {
                        let doc = cm.getDoc();
                        doc.replaceRange(newUrl, doc.getCursor("from"), doc.getCursor("to"));
                    });
                    event.preventDefault();
                }
            }
        }
    });

}

BlockMirrorTextEditor.prototype.enableImages = function () {
    let doc = this.codeMirror.getDoc();
    this.updateImages(this.codeMirror, doc.firstLine(), 1+doc.lastLine());
};
BlockMirrorTextEditor.prototype.disableImages = function () {
    this.imageMarkers.map(imageMarker => imageMarker.clear());
    this.imageMarkers = this.imageMarkers.filter(i => i.find());
};

BlockMirrorTextEditor.prototype.makeImageWidget = function (url) {
    let newImage = document.createElement("IMG");
    newImage.setAttribute("src", url);
    newImage.style.display = "none";
    //newImage.setAttribute("height", "40");
    newImage.style.maxHeight = "100px";
    //newImage.setAttribute("width", "40");
    newImage.setAttribute("title", url);
    newImage.onclick = (x) => {
        if (newImage.hasAttribute('width')) {
            newImage.removeAttribute("height");
            newImage.removeAttribute("width");
        } else {
            newImage.setAttribute("height", "40");
            newImage.setAttribute("width", "40");
        }
    };
    let newSpan = document.createElement("span");
    newSpan.className = "cm-string";
    newSpan.innerText = JSON.stringify(url);
    newSpan.onmouseover = (x) => {
        newImage.style.display = "block";
    };
    newSpan.onmouseout = (x) => {
        newImage.style.display = "none";
    }
    newSpan.appendChild(newImage);

    return newSpan;
    //return newImage;
};

BlockMirrorTextEditor.prototype.updateImages = function(cm, from, to) {
    cm.doc.eachLine(from, to, (line) => {
        let match;
        const regex = BlockMirrorTextEditor.REGEX_PATTERNS[this.blockMirror.configuration.imageDetection];
        while ((match = regex.exec(line.text)) !== null) {
            let imageWidget = this.makeImageWidget(match[3]);
            let offset = (match[0].length-match[1].length);
            //console.log(offset);
            let imageMarker = cm.markText({
                    line: cm.doc.getLineNumber(line),
                    ch: match.index+ offset},
                {line: cm.doc.getLineNumber(line),
                    ch: match.index + match[1].length + offset},
                {className: "bm-hyperlinked-image", attributes: {
                        "data-url": match[3]
                    }, inclusiveLeft: false, inclusiveRight: false});
            console.log(imageMarker);
            //imageWidget.onclick = (x) => imageMarker.clear();
            this.imageMarkers.push(imageMarker);
        }
    });
};

//'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png'
const FULL_IMAGE_URL = /^(?:https?:\/\/[-a-zA-Z0-9@:%._/\\+~#=]+(?:png|jpg|jpeg|gif|svg)+)$/;
//const BLOB_IMAGE_URL = /(["'])(blob:null\/[A-Fa-f0-9-]+)\1/g;
//const REGULAR_IMAGE_URL = /(["'])((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+)\1/g;
const STRING_IMAGE_URL = /((["'])(?:https?:\/\/[-a-zA-Z0-9@:%._\\/+~#=]+(?:png|jpg|jpeg|gif|svg)+)|(?:blob:null\/[A-Fa-f0-9-]+)|(?:data:image\/(?:png|jpg|jpeg|gif|svg\+xml|webp|bmp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}))/g;
//const CONSTRUCTOR_IMAGE_URL = /(?:^|\W)(Image\((["'])((?:blob:null\/[A-Fa-f0-9-]+)|(?:(?:https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+))\2\))/g;
const CONSTRUCTOR_IMAGE_URL = /(?:^|\W)(Image\((["'])(.+?)\2\))/g;
BlockMirrorTextEditor.REGEX_PATTERNS = {
    "constructor": CONSTRUCTOR_IMAGE_URL,
    "string": STRING_IMAGE_URL,
    "none": false
};
BlockMirrorTextEditor.prototype.isImageUrl = function (url) {
    return url.match(FULL_IMAGE_URL);
};

BlockMirrorTextEditor.prototype.defocus = function () {
    this.codeMirror.display.input.blur();
};

BlockMirrorTextEditor.prototype.updateWidth = function () {
    //var newWidth = '0%';
    /*if (this.blockMirror.views.includes('text')) {
        newWidth = (100 / this.blockMirror.views.length)+'%';
    }
    this.textContainer.style.width = newWidth;*/
};

BlockMirrorTextEditor.prototype.setReadOnly = function (isReadOnly) {
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

BlockMirrorTextEditor.prototype.resizeResponsively = function () {
    let mode = this.blockMirror.mode_;
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    let width = configuration.width;
    let height = this.blockMirror.configuration.height;
    if (mode === 'split') {
        if (window.innerWidth >= this.blockMirror.BREAK_WIDTH) {
            this.textContainer.style.width = width;
            this.textContainer.style.height = height+"px";
        } else {
            this.textContainer.style.width = '100%';
            this.textContainer.style.height = (height/2)+"px";
        }
    } else {
        this.textContainer.style.width = width;
        this.textContainer.style.height = height+"px";
    }
};

BlockMirrorTextEditor.prototype.setMode = function (mode) {
    mode = mode.toLowerCase();
    let configuration = this.VIEW_CONFIGURATIONS[mode];
    // If there is an update waiting and we're visible, then update
    if (this.outOfDate_ !== null && this.isVisible()) {
        this.setCode(this.outOfDate_, true);
    }
    // Show/hide editor
    this.resizeResponsively();
    if (configuration.visible) {
        this.textContainer.style.display = 'block';
        this.codeMirror.getWrapperElement().style.display = 'block';
        this.codeMirror.refresh();
    } else {
        this.textContainer.style.height = '0%';
        this.textContainer.style.display = 'none';
        this.codeMirror.getWrapperElement().style.display = 'none';
    }
    // Should we indent the toolbox
    this.updateGutter(configuration);
};

BlockMirrorTextEditor.prototype.updateGutter = function (configuration) {
    if (configuration === undefined) {
        let mode = this.blockMirror.mode_.toLowerCase();
        configuration = this.VIEW_CONFIGURATIONS[mode];
    }
    let isBigWindow = window.innerWidth >= this.blockMirror.BREAK_WIDTH;
    if (configuration.indentSidebar && isBigWindow) {
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
};

BlockMirrorTextEditor.prototype.setCode = function (code, quietly) {
    this.silentEvents_ = quietly;

    // Defaults to a single blank line
    code = (code === undefined || code.trim() === "") ? "\n" : code;

    if (this.isVisible()) {
        this.codeMirror.setValue(code);
        this.outOfDate_ = null;
    } else {
        this.outOfDate_ = code;
    }
};

BlockMirrorTextEditor.prototype.getCode = function () {
    return this.codeMirror.getValue();
};

BlockMirrorTextEditor.prototype.changed = function (codeMirror, event) {
    if (!this.silentEvents_) {
        let handleChange = () => {
            let newCode = this.getCode();
            this.blockMirror.blockEditor.setCode(newCode, true);
            this.blockMirror.setCode(newCode, true);
        };
        if (this.blockMirror.configuration.blockDelay === false) {
            handleChange();
        } else {
            if (this.updateTimer_ !== null) {
                clearTimeout(this.updateTimer_);
            }
            this.updateTimer_ = setTimeout(handleChange, this.blockMirror.configuration.blockDelay);
        }
    }
    this.silentEvents_ = false;
};

BlockMirrorTextEditor.prototype.isVisible = function () {
    return this.blockMirror.VISIBLE_MODES.text.indexOf(this.blockMirror.mode_) !== -1;
};

BlockMirrorTextEditor.prototype.setHighlightedLines = function (lines, style) {
    let handles = lines.map((l) => { return {
        "handle": this.codeMirror.doc.addLineClass(l-1, "background", style),
        "style": style
    }});
    this.highlightedHandles = this.highlightedHandles.concat(handles);
};

BlockMirrorTextEditor.prototype.clearHighlightedLines = function (style) {
    if (this.highlightedHandles) {
        const kept = [];
        let removed = this.highlightedHandles.map((h) => {
            this.codeMirror.doc.removeLineClass(h.handle, "background", style || h.style);
            var info = this.codeMirror.doc.lineInfo(h.handle);
            if (info) {
                if (info.style) {
                    kept.push(h);
                }
                return info.line + 1;
            } else {
                return info;
            }
        });
        this.highlightedHandles = kept;
        return removed;
    }
};
