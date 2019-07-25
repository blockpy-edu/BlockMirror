/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Python.init = function (workspace) {
    /**
     * Empty loops or conditionals are not allowed in Python.
     */
    Blockly.Python.PASS = this.INDENT + 'pass\n';
    // Create a dictionary of definitions to be printed before the code.
    Blockly.Python.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.Python.functionNames_ = Object.create(null);

    if (!Blockly.Python.variableDB_) {
        Blockly.Python.variableDB_ =
            new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
    } else {
        Blockly.Python.variableDB_.reset();
    }

    Blockly.Python.variableDB_.setVariableMap(workspace.getVariableMap());

    var defvars = [];
    // Add developer variables (not created or named by the user).
    /*
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
        defvars.push(Blockly.Python.variableDB_.getName(devVarList[i],
            Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
    }

    // Add user variables, but only ones that are being used.
    var variables = Blockly.Variables.allUsedVarModels(workspace);
    for (var i = 0; i < variables.length; i++) {
        defvars.push(Blockly.Python.variableDB_.getName(variables[i].getId(),
            Blockly.Variables.NAME_TYPE) + ' = None');
    }

    Blockly.Python.definitions_['variables'] = defvars.join('\n');
     */
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function (code) {
    // Convert the definitions dictionary into a list.
    var imports = [];
    var definitions = [];
    for (var name in Blockly.Python.definitions_) {
        var def = Blockly.Python.definitions_[name];
        if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }
    // Clean up temporary data.
    delete Blockly.Python.definitions_;
    delete Blockly.Python.functionNames_;
    Blockly.Python.variableDB_.reset();
    // acbart: Don't actually inject initializations - we don't need 'em.
    return code;
};

Blockly.Python.INDENT = '    ';

Blockly.Python.RESERVED_WORDS_ = (
    "False,None,True,and,as,assert,break,class," +
    "continue,def,del,elif,else,except,finally,for," +
    "from,global,if,import,in,is,lambda,nonlocal," +
    "not,or,pass,raise,return,try,while,with,yield"
);

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function (line) {
    // acbart: Remove extra new line
    return line;
};


/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Variables.flyoutCategoryBlocks = function (workspace) {
    var variableModelList = workspace.getVariablesOfType('');

    var xmlList = [];
    if (variableModelList.length > 0) {
        // New variables are added to the end of the variableModelList.
        var mostRecentVariableFieldXmlString =
                variableModelList[variableModelList.length - 1];
        if (Blockly.Blocks['ast_Assign']) {
            var gap = Blockly.Blocks['ast_AugAssign'] ? 8 : 24;
            var blockText = '<xml>' +
                '<block type="ast_Assign" gap="' + gap + '">' +
                mostRecentVariableFieldXmlString +
                '</block>' +
                '</xml>';
            var block = Blockly.Xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }
        if (Blockly.Blocks['ast_AugAssign']) {
            var gap = Blockly.Blocks['ast_Name'] ? 20 : 8;
            var blockText = '<xml>' +
                '<block type="ast_AugAssign" gap="' + gap + '">' +
                mostRecentVariableFieldXmlString +
                '<value name="VALUE">' +
                '<shadow type="ast_Num">' +
                '<field name="NUM">1</field>' +
                '</shadow>' +
                '</value>' +
                '<mutation options="false" simple="true"></mutation>' +
                '</block>' +
                '</xml>';
            var block = Blockly.Xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }

        if (Blockly.Blocks['ast_Name']) {
            variableModelList.sort(Blockly.VariableModel.compareByName);
            for (var i = 0, variable; variable = variableModelList[i]; i++) {
                var block = Blockly.utils.xml.createElement('block');
                block.setAttribute('type', 'ast_Name');
                block.setAttribute('gap', 8);
                block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
                xmlList.push(block);
            }
        }
    }
    return xmlList;
};