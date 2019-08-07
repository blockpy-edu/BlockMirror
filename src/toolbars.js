let ZERO_BLOCK = BlockMirrorTextToBlocks.create_block('ast_Num', null, {'NUM': 0});

BlockMirrorBlockEditor.EXTRA_TOOLS = {};

BlockMirrorBlockEditor.getDefaultBlocks = function () {
    return `<category name="Variables" custom="VARIABLE" colour="${BlockMirrorTextToBlocks.COLOR.VARIABLES}"></category>
        <category name="Decisions" colour="${BlockMirrorTextToBlocks.COLOR.LOGIC}">
            <block type="ast_If"></block>
            <block type="ast_If"><mutation orelse="true"></mutation></block>
            <block type="ast_Compare"></block>
            <block type="ast_BoolOp"></block>
            <block type="ast_UnaryOpNot"></block>
        </category>
        <category name="Iteration" colour="${BlockMirrorTextToBlocks.COLOR.CONTROL}">
            <block type="ast_For"></block>        
        </category>
        <sep></sep>
        <category name="Calculation" colour="${BlockMirrorTextToBlocks.COLOR.MATH}">
            <block type="ast_BinOp"></block>
            ${BlockMirrorTextToBlocks.getFunctionBlock("round")}
        </category>
        <category name="Output" colour="${BlockMirrorTextToBlocks.COLOR.PLOTTING}">
            ${BlockMirrorTextToBlocks.getFunctionBlock("print")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("plot", {}, "plt")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("scatter", {}, "plt")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("hist", {}, "plt")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("show", {}, "plt")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("title", {}, "plt")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("xlabel", {}, "plt")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("ylabel", {}, "plt")}
        </category>
        <category name="Input" colour="${BlockMirrorTextToBlocks.COLOR.TEXT}">
            ${BlockMirrorTextToBlocks.getFunctionBlock("input")}
        </category>
        <sep></sep>
        <category name="Values" colour="${BlockMirrorTextToBlocks.COLOR.TEXT}">
            <block type="ast_Str"></block>
            <block type="ast_Num"></block>
            <block type="ast_NameConstantBoolean"></block>
        </category>
        <category name="Conversion" colour="${BlockMirrorTextToBlocks.COLOR.TEXT}">
            ${BlockMirrorTextToBlocks.getFunctionBlock("int")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("float")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("str")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("bool")}
        </category>
        <category name="Lists" colour="${BlockMirrorTextToBlocks.COLOR.LIST}">
            <block type="ast_List"><mutation items="3"></mutation>
                <value name="ADD0"><block type="ast_Num"><field name="NUM">0</field></block></value>
                <value name="ADD1"><block type="ast_Num"><field name="NUM">0</field></block></value>
                <value name="ADD2"><block type="ast_Num"><field name="NUM">0</field></block></value>
            </block>
            <block type="ast_List"><mutation items="3"></mutation>
                <value name="ADD0"></value>
                <value name="ADD1"></value>
                <value name="ADD2"></value>
            </block>
            <block type="ast_List"><mutation items="0"></mutation></block>
            ${BlockMirrorTextToBlocks.getFunctionBlock(".append")}
            ${BlockMirrorTextToBlocks.getFunctionBlock("range", {'ARG0': ZERO_BLOCK})}
        </category>
        <category name="Dictionaries" colour="${BlockMirrorTextToBlocks.COLOR.DICTIONARY}">
            <block type="ast_Dict">
                <mutation items="3"></mutation>
                <value name="ADD0"><block type="ast_DictItem" deletable="false" movable="false">
                    <value name="KEY"><block type="ast_Str"><field name="TEXT">1st key</field></block></value>
                </block></value>
                <value name="ADD1"><block type="ast_DictItem" deletable="false" movable="false">
                    <value name="KEY"><block type="ast_Str"><field name="TEXT">2nd key</field></block></value>
                </block></value>
                <value name="ADD2"><block type="ast_DictItem" deletable="false" movable="false">
                    <value name="KEY"><block type="ast_Str"><field name="TEXT">3rd key</field></block></value>
                </block></value>
            </block>
            <block type="ast_Subscript">
                <mutation><arg name="I"></arg></mutation>
                <value name="INDEX0"><block type="ast_Str"><field name="TEXT">key</field></block></value>
            </block>
        </category>
        <sep></sep>`;
}

BlockMirrorBlockEditor.prototype.TOOLBOXES = {
    'normal': BlockMirrorBlockEditor.getDefaultBlocks(),
};

// TODO: fix these to be more interesting
BlockMirrorBlockEditor.prototype.TOOLBOXES['minimal'] = BlockMirrorBlockEditor.prototype.TOOLBOXES['normal'];
BlockMirrorBlockEditor.prototype.TOOLBOXES['full'] = BlockMirrorBlockEditor.prototype.TOOLBOXES['normal'];

/*
xml += '<category name="Iteration" colour="300">' +

    '<block type="ast_ForElse"></block>' +
    '</category>';
xml += '<category name="Values" colour="300">' +
    '<block type="ast_Num"></block>' +
    '</category>';
//xml += '<category name="Values" colour="300"><button value="From Code">From Code</button></category>';
xml += '</xml>';*/