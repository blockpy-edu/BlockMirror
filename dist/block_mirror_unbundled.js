/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var BlockMirror;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("{// CSS\n// <link rel=\"stylesheet\" href=\"../lib/codemirror/codemirror.css\">\n\n// TODO: check skulpt files to see how they do these imports\n\n//BlockMirrorTextEditor = require('./text_editor.js');\n\n//BlockMirror = require('./block_mirror.js');\n\n//module.exports = BlockMirror.BlockMirror;\n\n/*\n\n// Blockly\nrequire('../../blockly/blockly_compressed.js');\nrequire('../../blockly/blocks_compressed.js');\nrequire('../../blockly/msg/js/en.js');\nrequire('../../blockly/python_compressed.js');\n\n// CodeMirror\nrequire('../lib/codemirror/codemirror.js');\n\n\n\nrequire('./text_editor.js');\nrequire('./block_editor.js');\nrequire('./blockly_shims.js');\nrequire('./text_to_blocks.js');\n\nrequire('./block_mirror.js');\n\nrequire('./text_to_blocks.js');\n\n    <!-- CodeMirror -->\n\n    <script src=\"\" type=\"text/javascript\"></script>\n    <script src=\"../lib/codemirror/python.js\" type=\"text/javascript\"></script>\n\n    <!-- Skulpt -->\n    <script src=\"../../skulpt/dist/skulpt.js\" type=\"text/javascript\"></script>\n    <script src=\"../../skulpt/dist/skulpt-stdlib.js\" type=\"text/javascript\"></script>\n\n    <!-- BlockMirror -->\n    <link rel=\"stylesheet\" href=\"../src/block_mirror.css\">\n    <script src=\"../src/blockly_shims.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/block_mirror.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/text_editor.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/block_editor.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/text_to_blocks.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_functions.js\" type=\"text/javascript\"></script>\n\n    <script src=\"../src/ast/ast_For.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_If.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_While.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Num.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_BinOp.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Name.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Assign.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_AnnAssign.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_AugAssign.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Str.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Expr.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_UnaryOp.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_BoolOp.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Compare.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Assert.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_NameConstant.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_List.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Tuple.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Set.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Dict.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Starred.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_IfExp.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Attribute.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Call.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Raise.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Delete.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Subscript.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Comp.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_FunctionDef.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Lambda.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Return.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Yield.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_YieldFrom.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Global.js\" type=\"text/javascript\"></script>\n    <!--<script src=\"../src/ast/ast_Nonlocal.js\" type=\"text/javascript\"></script>-->\n    <script src=\"../src/ast/ast_Break.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Continue.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Try.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_ClassDef.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Import.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_With.js\" type=\"text/javascript\"></script>\n    <script src=\"../src/ast/ast_Comment.js\" type=\"text/javascript\"></script>\n\n */\n\n//# sourceURL=webpack://BlockMirror/./src/main.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	BlockMirror = __webpack_exports__;
/******/ 	
/******/ })()
;