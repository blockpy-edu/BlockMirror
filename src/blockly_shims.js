{
    let orig_init = python.pythonGenerator.init

    /**
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     */
    python.pythonGenerator.init = function (workspace) {
        // Keep track of datasets that are already imported
        python.pythonGenerator.imported_ = Object.create(null);
        orig_init.bind(this)(workspace);
    };
}

python.pythonGenerator.finish = function(code) {
    // Convert the definitions dictionary into a list.
    var imports = [];
    var definitions = [];
    for (let name in this.definitions_) {
      var def = this.definitions_[name];
      if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
        imports.push(def);
      } else {
        definitions.push(def);
      }
    }
    this.definitions_ = Object.create(null);
    this.functionNames_ = Object.create(null);
    this.imported_ = Object.create(null);
    this.isInitialized = false;

    this.nameDB_.reset();
    // acbart: Don't actually inject initializations - we don't need 'em.
    var allDefs = imports.join('\n') + '\n\n' // + definitions.join('\n\n');
    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
}

python.pythonGenerator.INDENT = '    ';

python.pythonGenerator.RESERVED_WORDS_ = (
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
python.pythonGenerator.scrubNakedValue = function (line) {
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
        if (!Blockly.Variables._HIDE_GETTERS_SETTERS && Blockly.Blocks['ast_Assign']) {
            var gap = Blockly.Blocks['ast_AugAssign'] ? 8 : 24;
            var blockText = '<xml>' +
                '<block type="ast_Assign" gap="' + gap + '">' +
                mostRecentVariableFieldXmlString +
                '</block>' +
                '</xml>';
            var block = Blockly.utils.xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }
        if (!Blockly.Variables._HIDE_GETTERS_SETTERS && Blockly.Blocks['ast_AugAssign']) {
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
            var block = Blockly.utils.xml.textToDom(blockText).firstChild;
            xmlList.push(block);
        }

        if (Blockly.Blocks['ast_Name']) {
            variableModelList.sort(Blockly.VariableModel.compareByName);
            for (let i = 0, variable; variable = variableModelList[i]; i++) {
                if (!Blockly.Variables._HIDE_GETTERS_SETTERS) {
                    let block = Blockly.utils.xml.createElement('block');
                    block.setAttribute('type', 'ast_Name');
                    block.setAttribute('gap', 8);
                    block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
                    xmlList.push(block);
                } else {
                    block = Blockly.utils.xml.createElement('label');
                    block.setAttribute('text', variable.name);
                    block.setAttribute('web-class', 'blockmirror-toolbox-variable');
                    //block.setAttribute('gap', 8);
                    xmlList.push(block);
                }
            }
        }
    }
    return xmlList;
};

//******************************************************************************
// Hacks to make variable names case sensitive

/**
 * A custom compare function for the VariableModel objects.
 * @param {Blockly.VariableModel} var1 First variable to compare.
 * @param {Blockly.VariableModel} var2 Second variable to compare.
 * @return {number} -1 if name of var1 is less than name of var2, 0 if equal,
 *     and 1 if greater.
 * @package
 */
Blockly.VariableModel.compareByName = function(var1, var2) {
  var name1 = var1.name;
  var name2 = var2.name;
  if (name1 < name2) {
    return -1;
  } else if (name1 === name2) {
    return 0;
  } else {
    return 1;
  }
};

Blockly.Names.prototype.getName = function(name, type) {
  if (type == Blockly.VARIABLE_CATEGORY_NAME) {
    var varName = null;
    const variable = this.variableMap.getVariableById(name);
    if (variable) {
      varName = variable.name;
    }
    if (varName) {
      name = varName;
    }
  }
  var normalized = name + '_' + type;

  var isVarType = type == Blockly.VARIABLE_CATEGORY_NAME ||
      type == Blockly.Names.DEVELOPER_VARIABLE_TYPE;

  var prefix = isVarType ? this.variablePrefix : '';
  if (normalized in this.db) {
    return prefix + this.db[normalized];
  }
  var safeName = this.getDistinctName(name, type);
  this.db[normalized] = safeName.substr(prefix.length);
  return safeName;
};

Blockly.Names.equals = function(name1, name2) {
  return name1 == name2;
};

Blockly.Variables.nameUsedWithOtherType = function(name, type, workspace) {
  var allVariables = workspace.getVariableMap().getAllVariables();

  for (var i = 0, variable; (variable = allVariables[i]); i++) {
    if (variable.name == name && variable.type != type) {
      return variable;
    }
  }
  return null;
};

Blockly.Variables.nameUsedWithAnyType = function(name, workspace) {
  var allVariables = workspace.getVariableMap().getAllVariables();

  for (var i = 0, variable; (variable = allVariables[i]); i++) {
    if (variable.name == name) {
      return variable;
    }
  }
  return null;
};