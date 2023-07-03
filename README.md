# BlockMirror
An interface for dual block/text representation with Blockly

[Try it out!](https://blockpy-edu.github.io/BlockMirror/docs/index.html)

# Basic Setup

Check out `test/simple.html` for an example of how to use BlockMirror.

There are three major dependencies:

* Blockly: Google Javascript library for creating block interfaces.
* CodeMirror: Popular front-end for textual code editing
* Skulpt: A Python-to-Javascript transpiler. We use it for its parser.

We use the regular versions of Blockly and CodeMirror, and in theory you should be able to use their existing compiled versions without modifications. Skulpt, however, we have made a number of improvements and fixes to (including adding ending line numbers and some missing AST nodes). You'll need to get [our fork](https://github.com/blockpy-edu/skulpt) or our compiled distribution. You'll notice that our release includes the Skulpt JS file that we built with.

Assuming you put the relevant files into a `lib/` directory, your HTML would look something like this:

```html
<head>
    <!-- Blockly -->
    <script src="lib/blockly/blockly_compressed.js" type="text/javascript"></script>
    <script src="lib/blockly/blocks_compressed.js" type="text/javascript"></script>
    <script src="lib/blockly/msg/js/en.js" type="text/javascript"></script>
    <script src="lib/blockly/python_compressed.js" type="text/javascript"></script>

    <!-- CodeMirror -->
    <link rel="stylesheet" href="lib/codemirror/codemirror.css">
    <link rel="stylesheet" href="lib/codemirror/fullscreen.css">
    <link rel="stylesheet" href="lib/codemirror/show-hint.css">
    <script src="lib/codemirror/codemirror.js" type="text/javascript"></script>
    <script src="lib/codemirror/show-hint.js" type="text/javascript"></script>
    <script src="lib/codemirror/python-hint.js" type="text/javascript"></script>
    <script src="lib/codemirror/fullscreen.js" type="text/javascript"></script>
    <script src="lib/codemirror/python.js" type="text/javascript"></script>

    <!-- Skulpt -->
    <script src="lib/skulpt/dist/skulpt.js" type="text/javascript"></script>
    <script src="lib/skulpt/dist/skulpt-stdlib.js" type="text/javascript"></script>

    <!-- BlockMirror -->
    <link rel="stylesheet" href="lib/block_mirror/block_mirror.css">
    <script src="lib/block_mirror/block_mirror.js" type="text/javascript"></script>
</head>
```

You can then instantiate like so:

```html
<body>
    <div id="blockmirror-editor"></div>
    <script>
    const configuration = {
        'container': document.getElementById('blockmirror-editor'),
    }
    let editor = new BlockMirror(configuration);
    </script>
</body>
```

Some interesting configuration options:

* `container` (Html element): The div to attach this editor instance to.
* `blocklyMediaPath` (str): The URL that will be used to access Blockly resources (e.g., audio files). See [Blockly Documentation](https://developers.google.com/blockly/guides/get-started/web#configuration).
* `readOnly` (bool): Whether to have the editors be in read-only mode.
* `height` (str): The height of the editor. Defaults to `'500px'`.
* `viewMode` (str): One of `'split'`, `'block'`, `'text'`. Sets the starting view of the environment.
* `skipSkulpt` (bool): Whether to initialize skulpt or skip that step.
* `blockDelay` (int or null): The number of microseconds to delay/consolidate block updates (important for very long files that take a second to parse). If null, then no delay.

Important API functions:

* `editor.setCode(str)`: Updates the current code in both the blocks and the text.
* `editor.getCode() -> str`: Gets the current code from the model (which is kept consistent between the blocks and text).
* `editor.addChangeListener(event -> null)`: Attach a function to be called when the code changes.
* `editor.setMode(str)`: One of `'split'`, `'block'`, `'text'`. Sets the current view of the environment.
* `editor.getMode() -> str`: Gets the current view of the environment.

# Hacking

Right now, this library supports most of the features I need. However, feel free to raise new Issues and Pull Requests! Here are some common scenarios you might be interested in:

## Swapping out CodeMirror

This would probably be pretty easy - not much is actually required from the text editor side besides the ability to get and set code. Just look into `src/text_editor.js`.

## Adding new language features

If it's a brand new type of ast node, you'll need to create a javascript file in `src/ast/` (import it in the `test/` html files and the webpack build script). You'll need the Blockly Block definition, the Blockly code to generate Python, and the BlocksToText code for turning the Skulpt parse tree back into a block.

## Adding new functions

Check out `src/ast/ast_functions.js`. Needs documentation!

## Building the dist directory

To build the dist directory, you have to run this command :
```bash
npx webpack --config webpack.config.js
```

If you have a problem like : `Error: error:0308010C:digital envelope routines::unsupported`, the command `export NODE_OPTIONS=--openssl-legacy-provider` should fix this.