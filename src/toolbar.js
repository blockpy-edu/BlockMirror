

function BlockMirrorToolbar(blockMirror) {
    this.blockMirror = blockMirror;
    
    this.buttonSetMode = document.createElement('div');
    
    this.blockMirror.tags.toolbar.appendChild(this.buttonSetMode)
    
    this.buttonSetModeBlocks = document.createElement('label');
    this.buttonSetModeSplit = document.createElement('label');
    this.buttonSetModeText = document.createElement('label');
    
    this.buttonSetMode.appendChild(this.buttonSetModeBlocks);
    this.buttonSetMode.appendChild(this.buttonSetModeSplit);
    this.buttonSetMode.appendChild(this.buttonSetModeText);
    
    /*
    <label class="btn btn-default blockpy-mode-set-blocks" 
                       data-bind="css: {active: settings.editor() == 'Blocks',
                                        disabled: !areBlocksUpdating()}">
                    <span class='glyphicon glyphicon-th-large'></span>
                    <input type="radio" name="blockpy-mode-set" autocomplete="off" checked> Blocks
                </label>*/
}

BlockMirrorToolbar.prototype.createButton = function(label){
};
