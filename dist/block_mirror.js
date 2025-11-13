"use strict";

function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TypeRegistry = /*#__PURE__*/function () {
  function TypeRegistry() {
    _classCallCheck(this, TypeRegistry);
    this._name_to_type = new Map();
    this._type_to_name = new Map();
  }
  return _createClass(TypeRegistry, [{
    key: "size",
    get: function get() {
      return this._name_to_type.size;
    }
  }, {
    key: "set",
    value: function set(type, name) {
      this._name_to_type.set(name, type);
      this._type_to_name.set(type, name);
    }
  }, {
    key: "getType",
    value: function getType(name) {
      return this._name_to_type.get(name);
    }
  }, {
    key: "getName",
    value: function getName(type) {
      return this._type_to_name.get(type);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._name_to_type.clear();
      this._type_to_name.clear();
    }
  }, {
    key: "deleteName",
    value: function deleteName(name) {
      var type = this._name_to_type.get(name);
      this._name_to_type["delete"](name);
      this._type_to_name["delete"](type);
    }
  }, {
    key: "deleteType",
    value: function deleteType(type) {
      var name = this._type_to_name.get(type);
      this._name_to_type["delete"](name);
      this._type_to_name["delete"](type);
    }
  }, {
    key: "entries",
    value: function entries() {
      return this._name_to_type.entries();
    }
  }, {
    key: "hasName",
    value: function hasName(name) {
      return this._name_to_type.has(name);
    }
  }, {
    key: "hasType",
    value: function hasType(type) {
      return this._type_to_name.has(type);
    }
  }, {
    key: "names",
    value: function names() {
      return this._name_to_type.keys();
    }
  }, {
    key: "types",
    value: function types() {
      return this._type_to_name.keys();
    }
  }]);
}(); // A type may be used by multiple names.
// A name may have multiple types, as Python is not typed.
var TypesRegistry = /*#__PURE__*/function () {
  function TypesRegistry() {
    _classCallCheck(this, TypesRegistry);
    this._name_to_types = new Map();
    this._type_to_names = new Map();
  }
  return _createClass(TypesRegistry, [{
    key: "size",
    get: function get() {
      return this._name_to_types.size;
    }
  }, {
    key: "add",
    value: function add(type, name) {
      var types = this._name_to_types.get(name) || [];
      var names = this._type_to_names.get(name) || [];
      if (!names.includes(name)) {
        names.push(name);
      }
      if (!types.includes(type)) {
        types.push(type);
      }
      this._name_to_types.set(name, types);
      this._type_to_names.set(type, names);
    }
  }, {
    key: "getTypes",
    value: function getTypes(name) {
      return this._name_to_types.get(name);
    }
  }, {
    key: "getSingleType",
    value: function getSingleType(name) {
      var types = this.getTypes(name);
      return types && types.length === 1 ? types[0] : null;
    }
  }, {
    key: "getNames",
    value: function getNames(type) {
      return this._type_to_names.get(type);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._name_to_types.clear();
      this._type_to_names.clear();
    }
  }, {
    key: "deleteName",
    value: function deleteName(name) {
      var types = this._name_to_types.get(name);
      this._name_to_types["delete"](name);
      if (types !== undefined) {
        var _iterator = _createForOfIteratorHelper(types),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var type = _step.value;
            this._type_to_names["delete"](type);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "deleteType",
    value: function deleteType(type) {
      var names = this._type_to_names.get(type);
      this._type_to_names["delete"](type);
      if (names !== undefined) {
        var _iterator2 = _createForOfIteratorHelper(names),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var name = _step2.value;
            this._name_to_types["delete"](name);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }, {
    key: "entries",
    value: function entries() {
      return this._name_to_types.entries();
    }
  }, {
    key: "hasName",
    value: function hasName(name) {
      return this._name_to_types.has(name);
    }
  }, {
    key: "hasType",
    value: function hasType(type) {
      return this._type_to_names.has(type);
    }
  }, {
    key: "names",
    value: function names() {
      return this._name_to_types.keys();
    }
  }, {
    key: "types",
    value: function types() {
      return this._type_to_names.keys();
    }
  }]);
}();
python.pythonGenerator.imports = new TypeRegistry();
python.pythonGenerator.variables = new TypesRegistry();

// Hook for cases where custom scrubbing needs to be undone
python.pythonGenerator.descrub_ = function (line) {
  return line;
};
python.pythonGenerator.finish = function (code) {
  var importRegExp = /^(from\s+\S+\s+)?import\s+\S+/;
  var lines = code.split('\n');
  var descrubbed_lines = lines.map(python.pythonGenerator.descrub_);
  var code_lines = [];
  var imports = [];
  var descrubbed_imports = [];
  var _iterator3 = _createForOfIteratorHelper(descrubbed_lines.entries()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = _slicedToArray(_step3.value, 2),
        index = _step3$value[0],
        descrubbed_line = _step3$value[1];
      if (descrubbed_line.match(importRegExp)) {
        descrubbed_imports.push(descrubbed_line);
        imports.push(lines[index]);
      } else {
        code_lines.push(lines[index]);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  var _iterator4 = _createForOfIteratorHelper(_toConsumableArray(this.imports.entries()).sort()),
    _step4;
  try {
    var _loop = function _loop() {
      var _step4$value = _slicedToArray(_step4.value, 2),
        name = _step4$value[0],
        type = _step4$value[1];
      // Only add imports from the registry if not already defined in code
      if (!descrubbed_imports.some(function (item) {
        return item.match(new RegExp("\\s+".concat(name, "\\s*(,.*)?$")));
      })) {
        if (name === type) {
          imports.push("import ".concat(type));
        } else {
          var lastIndexOfDot = type.lastIndexOf('.');
          var simpleType = type.substring(lastIndexOfDot + 1);
          if (simpleType === name) {
            // TODO gather from statements first
            var fromModule = type.substring(0, lastIndexOfDot);
            imports.push("from ".concat(fromModule, " import ").concat(name));
          } else {
            imports.push("import ".concat(type, " as ").concat(name));
          }
        }
      }
    };
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  this.definitions_ = Object.create(null);
  this.functionNames_ = Object.create(null);
  this.isInitialized = false;
  this.imports.clear();
  this.variables.clear();
  this.nameDB_.reset();
  // acbart: Don't actually inject initializations - we don't need 'em.
  var allDefs = _toConsumableArray(new Set(imports)).join('\n') + '\n\n';
  return allDefs.replace(/\n{3,}/g, '\n\n').replace(/\n*$/, '\n\n\n') + code_lines.join('\n').trimStart();
};
python.pythonGenerator.INDENT = '    ';
python.pythonGenerator.RESERVED_WORDS_ = "False,None,True,and,as,assert,break,class," + "continue,def,del,elif,else,except,finally,for," + "from,global,if,import,in,is,lambda,nonlocal," + "not,or,pass,raise,return,try,while,with,yield";

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

//******************************************************************************
// Hacks to make variable names case-sensitive

/**
 * A custom compare function for the VariableModel objects.
 * @param {Blockly.VariableModel} var1 First variable to compare.
 * @param {Blockly.VariableModel} var2 Second variable to compare.
 * @return {number} -1 if name of var1 is less than name of var2, 0 if equal,
 *     and 1 if greater.
 * @package
 */
Blockly.VariableModel.compareByName = function (var1, var2) {
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
Blockly.Names.prototype.getName = function (name, type) {
  if (type == Blockly.VARIABLE_CATEGORY_NAME) {
    var varName = null;
    var variable = this.variableMap.getVariableById(name);
    if (variable) {
      varName = variable.name;
    }
    if (varName) {
      name = varName;
    }
  }
  var normalized = name + '_' + type;
  var isVarType = type == Blockly.VARIABLE_CATEGORY_NAME || type == Blockly.Names.DEVELOPER_VARIABLE_TYPE;
  var prefix = isVarType ? this.variablePrefix : '';
  if (normalized in this.db) {
    return prefix + this.db[normalized];
  }
  var safeName = this.getDistinctName(name, type);
  this.db[normalized] = safeName.substr(prefix.length);
  return safeName;
};
Blockly.Names.equals = function (name1, name2) {
  return name1 == name2;
};
Blockly.Variables.nameUsedWithOtherType = function (name, type, workspace) {
  var allVariables = workspace.getVariableMap().getAllVariables();
  for (var i = 0, variable; variable = allVariables[i]; i++) {
    if (variable.name == name && variable.type != type) {
      return variable;
    }
  }
  return null;
};
Blockly.Variables.nameUsedWithAnyType = function (name, workspace) {
  var allVariables = workspace.getVariableMap().getAllVariables();
  for (var i = 0, variable; variable = allVariables[i]; i++) {
    if (variable.name == name) {
      return variable;
    }
  }
  return null;
};
Blockly.BlockSvg.prototype.translateText = function (identifier, defaultValue, namespace) {
  // Find the main workspace and call the function on that.
  return this.workspace.themeManager_.workspace.translateText(identifier, defaultValue, namespace);
};
Blockly.BlockSvg.prototype.convertColour = function (type, defaultValue, fromLibrary) {
  // Find the main workspace and call the function on that.
  return this.workspace.themeManager_.workspace.convertColour(type, defaultValue, fromLibrary);
};

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
  var _configuration$readOn, _configuration$height, _configuration$viewMo, _configuration$skipSk, _configuration$blockD, _configuration$toolbo, _configuration$render, _configuration$imageU, _configuration$imageD, _configuration$imageL, _configuration$imageD2, _configuration$imageM, _configuration$librar, _configuration$transl, _configuration$prefer, _configuration$showDe, _configuration$move, _configuration$zoom, _configuration$conver;
  this.configuration = {};

  // Container
  if ('container' in configuration) {
    this.configuration.container = configuration.container;
  } else {
    throw new Error('Invalid configuration: Missing "container" property.');
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
  this.configuration['readOnly'] = (_configuration$readOn = configuration['readOnly']) !== null && _configuration$readOn !== void 0 ? _configuration$readOn : false;

  // height
  this.configuration.height = (_configuration$height = configuration.height) !== null && _configuration$height !== void 0 ? _configuration$height : 500;

  // viewMode
  this.configuration.viewMode = (_configuration$viewMo = configuration.viewMode) !== null && _configuration$viewMo !== void 0 ? _configuration$viewMo : 'split';

  // Need to load skulpt?
  this.configuration.skipSkulpt = (_configuration$skipSk = configuration.skipSkulpt) !== null && _configuration$skipSk !== void 0 ? _configuration$skipSk : false;

  // Delay?
  this.configuration.blockDelay = (_configuration$blockD = configuration.blockDelay) !== null && _configuration$blockD !== void 0 ? _configuration$blockD : false;

  // Toolbox
  this.configuration.toolbox = (_configuration$toolbo = configuration.toolbox) !== null && _configuration$toolbo !== void 0 ? _configuration$toolbo : "normal";
  this.configuration.renderer = (_configuration$render = configuration.renderer) !== null && _configuration$render !== void 0 ? _configuration$render : 'Thrasos';

  // Convert image URLs?
  this.configuration.imageUploadHook = (_configuration$imageU = configuration.imageUploadHook) !== null && _configuration$imageU !== void 0 ? _configuration$imageU : function (old) {
    return Promise.resolve(old);
  };
  this.configuration.imageDownloadHook = (_configuration$imageD = configuration.imageDownloadHook) !== null && _configuration$imageD !== void 0 ? _configuration$imageD : function (old) {
    return old;
  };
  this.configuration.imageLiteralHook = (_configuration$imageL = configuration.imageLiteralHook) !== null && _configuration$imageL !== void 0 ? _configuration$imageL : function (old) {
    return old;
  };
  this.configuration.imageDetection = (_configuration$imageD2 = configuration.imageDetection) !== null && _configuration$imageD2 !== void 0 ? _configuration$imageD2 : 'string';
  this.configuration.imageMode = (_configuration$imageM = configuration.imageMode) !== null && _configuration$imageM !== void 0 ? _configuration$imageM : false;
  this.configuration.libraries = (_configuration$librar = configuration.libraries) !== null && _configuration$librar !== void 0 ? _configuration$librar : BlockMirror.LIBRARIES;
  this.configuration.translate = (_configuration$transl = configuration.translate) !== null && _configuration$transl !== void 0 ? _configuration$transl : function (identifier, defaultValue, _namespace) {
    return defaultValue === undefined || defaultValue === null ? identifier : defaultValue;
  };
  this.configuration.preferFullAttributeBlocks = (_configuration$prefer = configuration.preferFullAttributeBlocks) !== null && _configuration$prefer !== void 0 ? _configuration$prefer : false;
  this.configuration.showDefaultArguments = (_configuration$showDe = configuration.showDefaultArguments) !== null && _configuration$showDe !== void 0 ? _configuration$showDe : false;
  this.configuration.move = (_configuration$move = configuration.move) !== null && _configuration$move !== void 0 ? _configuration$move : {};
  this.configuration.zoom = (_configuration$zoom = configuration.zoom) !== null && _configuration$zoom !== void 0 ? _configuration$zoom : {
    controls: true
  };
  this.configuration.convertColour = (_configuration$conver = configuration.convertColour) !== null && _configuration$conver !== void 0 ? _configuration$conver : function (type, defaultValue, name) {
    return defaultValue;
  };
};
BlockMirror.prototype.initializeVariables = function () {
  this.tags = {
    'toolbar': document.createElement('div'),
    'blockContainer': document.createElement('div'),
    'blockEditor': document.createElement('div'),
    'blockArea': document.createElement('div'),
    'textSidebar': document.createElement('div'),
    'textContainer': document.createElement('div'),
    'textArea': document.createElement('textarea')
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
    read: function read(filename) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
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
  var index = this.listeners_.indexOf(callback);
  if (index !== -1) {
    this.listeners_.splice(index, 1);
  }
};
BlockMirror.prototype.addChangeListener = function (callback) {
  this.listeners_.push(callback);
};
BlockMirror.prototype.fireChangeListener = function (event) {
  for (var i = 0, func; func = this.listeners_[i]; i++) {
    func(event);
  }
};
BlockMirror.prototype.setCode = function (code, quietly) {
  this.code_ = code;
  if (!quietly) {
    this.blockEditor.setCode(code, true);
    this.textEditor.setCode(code, true);
  }
  this.fireChangeListener({
    'name': 'changed',
    'value': code
  });
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
BlockMirror.prototype.refresh = function () {
  this.blockEditor.resized();
  this.textEditor.codeMirror.refresh();
};
BlockMirror.prototype.forceBlockRefresh = function () {
  this.blockEditor.setCode(this.code_, true);
};
BlockMirror.prototype.VISIBLE_MODES = {
  'block': ['block', 'split'],
  'text': ['text', 'split']
};
BlockMirror.prototype.BREAK_WIDTH = 675;
BlockMirror.prototype.setHighlightedLines = function (lines, style) {
  this.textEditor.setHighlightedLines(lines, style);
  //this.blockEditor.highlightLines(lines, style);
};
BlockMirror.prototype.clearHighlightedLines = function () {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  this.textEditor.clearHighlightedLines(style);
  //this.blockEditor.unhighlightLines(lines, style);
};
function BlockMirrorTextEditor(blockMirror) {
  var _this = this;
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
  var codeMirrorOptions = {
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
      'Esc': function Esc(cm) {
        if (cm.getOption("fullScreen")) {
          cm.setOption("fullScreen", false);
        } else {
          cm.display.input.blur();
        }
      },
      "F11": function F11(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      }
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
  this.textContainer.style["float"] = 'left';
  this.updateWidth();
  this.textContainer.style.height = blockMirror.configuration.height;
  // Style sidebar
  this.textSidebar.style.height = '100%';
  this.textSidebar.style["float"] = 'left';
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
  this.codeMirror.on("beforeChange", function (cm, change) {
    if (_this.blockMirror.configuration.imageMode) {
      if (change.origin === "paste") {
        var oldText = change.text[0];
        if (_this.isImageUrl(oldText)) {
          var newText = _this.blockMirror.configuration.imageLiteralHook(oldText);
          change.update(null, null, [newText]);
        }
      }
    }
  });
  this.codeMirror.on("change", function (cm, change) {
    if (_this.blockMirror.configuration.imageMode) {
      var lastLine;
      if (change.origin === "paste" || change.origin === "setValue") {
        //"https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png"
        lastLine = change.from.line + change.text.length;
      } else {
        lastLine = Math.max(1 + change.to.line, change.text.length);
      }
      _this.updateImages(cm, change.from.line, lastLine);
    }
  });
  this.codeMirror.on("paste", function (cm, event) {
    if (_this.blockMirror.configuration.imageMode) {
      var items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (var index = 0; index < items.length; index += 1) {
        var item = items[index];
        if (item.kind === 'file') {
          var blob = item.getAsFile();
          var promise = _this.blockMirror.configuration.imageUploadHook(blob, item);
          promise.then(function (newUrl) {
            var doc = cm.getDoc();
            doc.replaceRange(newUrl, doc.getCursor("from"), doc.getCursor("to"));
          });
          event.preventDefault();
        }
      }
    }
  });
}
BlockMirrorTextEditor.prototype.enableImages = function () {
  var doc = this.codeMirror.getDoc();
  this.updateImages(this.codeMirror, doc.firstLine(), 1 + doc.lastLine());
};
BlockMirrorTextEditor.prototype.disableImages = function () {
  this.imageMarkers.map(function (imageMarker) {
    return imageMarker.clear();
  });
  this.imageMarkers = this.imageMarkers.filter(function (i) {
    return i.find();
  });
};
BlockMirrorTextEditor.prototype.makeImageWidget = function (url) {
  var newImage = document.createElement("IMG");
  newImage.setAttribute("src", url);
  newImage.style.display = "none";
  //newImage.setAttribute("height", "40");
  newImage.style.maxHeight = "100px";
  //newImage.setAttribute("width", "40");
  newImage.setAttribute("title", url);
  newImage.onclick = function (x) {
    if (newImage.hasAttribute('width')) {
      newImage.removeAttribute("height");
      newImage.removeAttribute("width");
    } else {
      newImage.setAttribute("height", "40");
      newImage.setAttribute("width", "40");
    }
  };
  var newSpan = document.createElement("span");
  newSpan.className = "cm-string";
  newSpan.innerText = JSON.stringify(url);
  newSpan.onmouseover = function (x) {
    newImage.style.display = "block";
  };
  newSpan.onmouseout = function (x) {
    newImage.style.display = "none";
  };
  newSpan.appendChild(newImage);
  return newSpan;
  //return newImage;
};
BlockMirrorTextEditor.prototype.updateImages = function (cm, from, to) {
  var _this2 = this;
  cm.doc.eachLine(from, to, function (line) {
    var match;
    var regex = BlockMirrorTextEditor.REGEX_PATTERNS[_this2.blockMirror.configuration.imageDetection];
    while ((match = regex.exec(line.text)) !== null) {
      var imageWidget = _this2.makeImageWidget(match[3]);
      var offset = match[0].length - match[1].length;
      //console.log(offset);
      var imageMarker = cm.markText({
        line: cm.doc.getLineNumber(line),
        ch: match.index + offset
      }, {
        line: cm.doc.getLineNumber(line),
        ch: match.index + match[1].length + offset
      }, {
        className: "bm-hyperlinked-image",
        attributes: {
          "data-url": match[3]
        },
        inclusiveLeft: false,
        inclusiveRight: false
      });
      console.log(imageMarker);
      //imageWidget.onclick = (x) => imageMarker.clear();
      _this2.imageMarkers.push(imageMarker);
    }
  });
};

//'https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png'
var FULL_IMAGE_URL = /^(?:https?:\/\/[-a-zA-Z0-9@:%._/\\+~#=]+(?:png|jpg|jpeg|gif|svg)+)$/;
//const BLOB_IMAGE_URL = /(["'])(blob:null\/[A-Fa-f0-9-]+)\1/g;
//const REGULAR_IMAGE_URL = /(["'])((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+)\1/g;
var STRING_IMAGE_URL = /((["'])(?:https?:\/\/[-a-zA-Z0-9@:%._\\/+~#=]+(?:png|jpg|jpeg|gif|svg)+)|(?:blob:null\/[A-Fa-f0-9-]+)|(?:data:image\/(?:png|jpg|jpeg|gif|svg\+xml|webp|bmp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}))/g;
//const CONSTRUCTOR_IMAGE_URL = /(?:^|\W)(Image\((["'])((?:blob:null\/[A-Fa-f0-9-]+)|(?:(?:https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+))\2\))/g;
var CONSTRUCTOR_IMAGE_URL = /(?:^|\W)(Image\((["'])(.+?)\2\))/g;
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
  var mode = this.blockMirror.mode_;
  var configuration = this.VIEW_CONFIGURATIONS[mode];
  var width = configuration.width;
  var height = this.blockMirror.configuration.height;
  if (mode === 'split') {
    if (window.innerWidth >= this.blockMirror.BREAK_WIDTH) {
      this.textContainer.style.width = width;
      this.textContainer.style.height = height + "px";
    } else {
      this.textContainer.style.width = '100%';
      this.textContainer.style.height = height / 2 + "px";
    }
  } else {
    this.textContainer.style.width = width;
    this.textContainer.style.height = height + "px";
  }
};
BlockMirrorTextEditor.prototype.setMode = function (mode) {
  mode = mode.toLowerCase();
  var configuration = this.VIEW_CONFIGURATIONS[mode];
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
    var mode = this.blockMirror.mode_.toLowerCase();
    configuration = this.VIEW_CONFIGURATIONS[mode];
  }
  var isBigWindow = window.innerWidth >= this.blockMirror.BREAK_WIDTH;
  if (configuration.indentSidebar && isBigWindow) {
    var gutters = this.textContainer.querySelector('.CodeMirror-gutters');
    var gutterWidth = gutters.offsetWidth;
    var toolbarWidth = this.blockMirror.blockEditor.getToolbarWidth();
    var newGutterWidth = toolbarWidth - gutterWidth - 2;
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
  code = code === undefined || code.trim() === "" ? "\n" : code;
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
  var _this3 = this;
  if (!this.silentEvents_) {
    var handleChange = function handleChange() {
      var newCode = _this3.getCode();
      _this3.blockMirror.blockEditor.setCode(newCode, true);
      _this3.blockMirror.setCode(newCode, true);
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
  var _this4 = this;
  var handles = lines.map(function (l) {
    return {
      "handle": _this4.codeMirror.doc.addLineClass(l - 1, "background", style),
      "style": style
    };
  });
  this.highlightedHandles = this.highlightedHandles.concat(handles);
};
BlockMirrorTextEditor.prototype.clearHighlightedLines = function (style) {
  var _this5 = this;
  if (this.highlightedHandles) {
    var kept = [];
    var removed = this.highlightedHandles.map(function (h) {
      _this5.codeMirror.doc.removeLineClass(h.handle, "background", style || h.style);
      var info = _this5.codeMirror.doc.lineInfo(h.handle);
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

/**
 * Worth noting - Blockly uses a setTimeOut of 0 steps to make events
 * wait. That has some confusing interaction with trying to make things percolate.
 * @param blockMirror
 * @constructor
 */

function BlockMirrorBlockEditor(blockMirror) {
  var _this6 = this;
  this.blockMirror = blockMirror;
  this.blockContainer = blockMirror.tags.blockContainer;
  this.blockEditor = blockMirror.tags.blockEditor;
  this.blockArea = blockMirror.tags.blockArea;

  // Null, or the source of the last update
  this.outOfDate_ = null;

  // Have to call BEFORE we inject, or Blockly will delete the css string!
  // this.loadBlocklyCSS();
  this.baseToolboxContent_ = this.makeBaseToolboxContent();

  // Inject Blockly
  var blocklyOptions = {
    media: blockMirror.configuration.blocklyMediaPath,
    comments: false,
    // We use special comment blocks
    disable: false,
    oneBasedIndex: false,
    readOnly: blockMirror.configuration.readOnly,
    scrollbars: true,
    toolbox: this.makeToolbox(),
    renderer: blockMirror.configuration.renderer,
    move: blockMirror.configuration.move,
    zoom: blockMirror.configuration.zoom
  };
  this.workspace = Blockly.inject(blockMirror.tags.blockEditor, blocklyOptions);
  this.workspace.registerToolboxCategoryCallback('VARIABLE', this.variableFlyoutCallback);
  this.workspace.convertColour = blockMirror.configuration.convertColour;
  this.workspace.translateText = blockMirror.configuration.translate;
  this.workspace.libraries = blockMirror.libraries;
  this.workspace.toolbox.flyout.workspace_.libraries = blockMirror.libraries;

  // Configure Blockly
  this.workspace.addChangeListener(this.changed.bind(this));

  // Configure Blockly DIV
  //blockMirror.tags.blockEditor.style.resize = 'horizontal';
  this.blockContainer.style["float"] = 'left';
  this.blockEditor.style.position = 'absolute';
  this.blockEditor.style.width = '100%';
  this.blockArea.style.height = blockMirror.configuration.height + "px";
  this.readOnlyDiv_ = null;
  window.addEventListener('resize', this.resized.bind(this), false);
  this.resized();

  // Needed for libraries with dynamic toolbox
  // TODO optimize
  this.blockMirror.addChangeListener(function (event) {
    return _this6.remakeToolbox();
  });
}

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
BlockMirrorBlockEditor.prototype.variableFlyoutCallback = function (workspace) {
  var xmlList = [];
  var button = document.createElement('button');
  button.setAttribute('text', '%{BKY_NEW_VARIABLE}');
  button.setAttribute('callbackKey', 'CREATE_VARIABLE');
  workspace.registerButtonCallback('CREATE_VARIABLE', function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace());
  });
  xmlList.push(button);
  var variableModelList = workspace.getVariableMap().getVariablesOfType('');
  if (variableModelList.length > 0) {
    // New variables are added to the end of the variableModelList.
    var mostRecentVariableState;
    for (var i = variableModelList.length - 1; i >= 0; i--) {
      var variable = variableModelList[i];
      if (variable.name !== python.pythonGenerator.blank) {
        mostRecentVariableState = variable;
        break;
      }
    }
    if (mostRecentVariableState && !Blockly.Variables._HIDE_GETTERS_SETTERS) {
      var mostRecentVariableFieldXmlString = '<field name="VAR"><shadow type="ast_Name">' + mostRecentVariableState.getName() + "</shadow></field>";
      xmlList.push(Blockly.utils.xml.textToDom(blockText = '<block type="ast_Assign" gap="8">' + mostRecentVariableFieldXmlString + "</block>"));
      var blockText = '<block type="ast_AugAssign" gap="8">' + mostRecentVariableFieldXmlString + '<value name="VALUE">' + '<shadow type="ast_Num">' + '<field name="NUM">1</field>' + "</shadow>" + "</value>" + '<mutation options="false" simple="true"></mutation>' + "</block>";
      xmlList.push(Blockly.utils.xml.textToDom(blockText));
    }
  }
  xmlList.push(Blockly.utils.xml.textToDom('<block type="ast_Assign" gap="8"><mutation targets="1" simple="false"></mutation></block>'));
  variableModelList.sort(Blockly.VariableModel.compareByName);
  for (var _i = 0, _variable; _variable = variableModelList[_i]; _i++) {
    if (_variable.name === python.pythonGenerator.blank) {
      continue;
    } else if (Blockly.Variables._HIDE_GETTERS_SETTERS) {
      block = Blockly.utils.xml.createElement('label');
      block.setAttribute('text', _variable.name);
      block.setAttribute('web-class', 'blockmirror-toolbox-variable');
      //block.setAttribute('gap', 8);
      xmlList.push(block);
    } else {
      var _block2 = Blockly.utils.xml.createElement('block');
      _block2.setAttribute('type', 'ast_Name');
      _block2.setAttribute('gap', 8);
      _block2.appendChild(Blockly.Variables.generateVariableFieldDom(_variable));
      xmlList.push(_block2);
    }
  }
  return xmlList;
};
BlockMirrorBlockEditor.prototype.resizeReadOnlyDiv = function () {
  if (this.readOnlyDiv_ !== null) {
    if (!this.isVisible()) {
      this.readOnlyDiv_.css("left", '0px');
      this.readOnlyDiv_.css("top", '0px');
      this.readOnlyDiv_.css("width", '0px');
      this.readOnlyDiv_.css("height", '0px');
    }
    var blockArea = this.blockMirror.tags.blockArea;
    var current = blockArea;
    var x = 0;
    var y = 0;
    do {
      x += current.offsetLeft;
      y += current.offsetTop;
      current = current.offsetParent;
    } while (current);
    // Position blocklyDiv over blockArea.
    this.readOnlyDiv_.css("left", x + 'px');
    this.readOnlyDiv_.css("top", y + 'px');
    this.readOnlyDiv_.css("width", blockArea.offsetWidth + 'px');
    this.readOnlyDiv_.css("height", blockArea.offsetHeight + 'px');
  }
};
BlockMirrorBlockEditor.prototype.setReadOnly = function (isReadOnly) {
  if (isReadOnly) {
    if (this.readOnlyDiv_ === null) {
      this.readOnlyDiv_ = $("<div class='blockly-readonly-layer'></div>");
      $("body").append(this.readOnlyDiv_);
    }
    this.resizeReadOnlyDiv();
  } else if (this.readOnlyDiv_ !== null) {
    this.readOnlyDiv_.remove();
    this.readOnlyDiv_ = null;
  }
};
BlockMirrorBlockEditor.prototype.updateWidth = function () {
  var newWidth = '0%';
  this.resized();
};
BlockMirrorBlockEditor.prototype.resized = function (e) {
  this.resizeResponsively();
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var blockArea = this.blockMirror.tags.blockArea;
  /*var current = blockArea;
  var x = 0;
  var y = 0;
  do {
      x += current.offsetLeft;
      y += current.offsetTop;
      current = current.offsetParent;
  } while (current);*/
  // Position blocklyDiv over blockArea.
  var blockEditor = this.blockMirror.tags.blockEditor;
  /*blockEditor.style.left = x + 'px';
  blockEditor.style.top = y + 'px';*/
  blockEditor.style.width = blockArea.offsetWidth + 'px';
  blockEditor.style.height = blockArea.offsetHeight + 'px';
  Blockly.svgResize(this.workspace);
  this.resizeReadOnlyDiv();
};
BlockMirrorBlockEditor.prototype.toolboxPythonToBlocks = function (toolboxPython) {
  var _this7 = this;
  Blockly.Variables._HIDE_GETTERS_SETTERS = false;
  return toolboxPython.map(function (category) {
    if (typeof category === "string") {
      return category;
    }
    var colour = _this7.blockMirror.configuration.convertColour("toolbox", BlockMirrorTextToBlocks.COLOR[category.colour], category.name);
    var header = "<category name=\"".concat(category.name, "\" colour=\"").concat(colour, "\"");
    if (category.custom) {
      header += " custom=\"".concat(category.custom, "\">");
    } else {
      header += ">";
    }
    var body = (category.blocks || []).map(function (code) {
      if (code === '') {
        return "<sep gap='50'></sep>";
      }
      var textToBlocks = _this7.blockMirror.textToBlocks;
      var originalVariables = textToBlocks.variables;
      try {
        textToBlocks.variables = new TypesRegistry();
        var result = _this7.blockMirror.textToBlocks.convertSource('toolbox.py', code);
        if (result.rawXml.firstElementChild.getAttribute('type') === 'ast_AnnAssignFull') {
          // In case the first line only specifies the class the attribute is defined on.
          var nextElements = result.rawXml.getElementsByTagName("next");
          if (nextElements.length > 0) {
            return nextElements.item(0).innerHTML.toString();
          }
        }
        return result.rawXml.innerHTML.toString();
      } finally {
        textToBlocks.variables = originalVariables;
      }
    }).join("\n");
    var footer = "</category>";
    if (category['hideGettersSetters']) {
      Blockly.Variables._HIDE_GETTERS_SETTERS = true;
    }
    return [header, body, footer].join("\n");
  }).join("\n");
};
BlockMirrorBlockEditor.prototype.makeBaseToolboxContent = function () {
  var toolbox = this.blockMirror.configuration.toolbox;
  // Use palette if it exists, otherwise assume it is a custom one.
  if (toolbox in this.TOOLBOXES) {
    toolbox = this.TOOLBOXES[toolbox];
  }
  // Convert if necessary
  if (typeof toolbox !== "string") {
    var textToBlocks = this.blockMirror.textToBlocks;
    var originalImports = textToBlocks.imports;
    var originalVariables = textToBlocks.variables;
    try {
      textToBlocks.imports = new TypeRegistry();
      textToBlocks.variables = new TypesRegistry();
      this.blockMirror.libraries.registerImports(textToBlocks.imports);
      toolbox = this.toolboxPythonToBlocks(toolbox);
    } finally {
      textToBlocks.imports = originalImports;
      textToBlocks.variables = originalVariables;
    }
  }
  // TODO: Fix Hack, this should be configurable by instance rather than by class
  for (var name in BlockMirrorBlockEditor.EXTRA_TOOLS) {
    toolbox += BlockMirrorBlockEditor.EXTRA_TOOLS[name];
  }
  return toolbox;
};
BlockMirrorBlockEditor.prototype.makeToolbox = function () {
  var toolbox = this.baseToolboxContent_;
  toolbox += this.blockMirror.libraries.toToolbox(this.blockMirror.textToBlocks);
  return '<xml id="toolbox" style="display:none">' + toolbox + '</xml>';
};
BlockMirrorBlockEditor.prototype.remakeToolbox = function () {
  this.workspace.updateToolbox(this.makeToolbox());
  this.resized();
};

/**
 * Retrieves the current width of the Blockly Toolbox, unless
 * we're in read-only mode (when there is no toolbox).
 * @returns {Number} The current width of the toolbox.
 */
BlockMirrorBlockEditor.prototype.getToolbarWidth = function () {
  if (this.blockMirror.configuration.readOnly) {
    return 0;
  } else {
    return this.workspace.toolbox.width_;
  }
};
BlockMirrorBlockEditor.prototype.VIEW_CONFIGURATIONS = {
  'split': {
    'width': '60%',
    'visible': true
  },
  'block': {
    'width': '100%',
    'visible': true
  },
  'text': {
    'width': '0%',
    'visible': false
  }
};
BlockMirrorBlockEditor.prototype.resizeResponsively = function () {
  var mode = this.blockMirror.mode_;
  var configuration = this.VIEW_CONFIGURATIONS[mode];
  if (mode === 'split') {
    if (window.innerWidth >= this.blockMirror.BREAK_WIDTH) {
      this.blockContainer.style.width = configuration.width;
      this.blockContainer.style.height = this.blockMirror.configuration.height + "px";
      this.blockArea.style.height = this.blockMirror.configuration.height + "px";
    } else {
      this.blockContainer.style.width = '100%';
      this.blockContainer.style.height = this.blockMirror.configuration.height / 2 + "px";
      this.blockArea.style.height = this.blockMirror.configuration.height / 2 + "px";
    }
  } else if (mode === 'block') {
    this.blockContainer.style.width = configuration.width;
    this.blockContainer.style.height = this.blockMirror.configuration.height + "px";
    this.blockArea.style.height = this.blockMirror.configuration.height + "px";
  }
};
BlockMirrorBlockEditor.prototype.setMode = function (mode) {
  mode = mode.toLowerCase();
  var configuration = this.VIEW_CONFIGURATIONS[mode];

  // Show/hide editor
  this.workspace.setVisible(configuration.visible);
  if (configuration.visible) {
    this.blockEditor.style.width = '100%';
    this.resized();
  } else {
    this.blockContainer.style.height = '0%';
    this.blockArea.style.height = '0%';
    this.resizeReadOnlyDiv();
  }

  // If there is an update waiting and we're visible, then update
  if (this.outOfDate_ !== null && this.isVisible()) {
    this.setCode(this.outOfDate_, true);
  }
};

/**
 * Attempts to update the model for the current code file from the
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.getCode = function () {
  python.pythonGenerator.libraries = this.blockMirror.libraries;
  return python.pythonGenerator.workspaceToCode(this.workspace);
};

// Simplified workspace cleanup, which can assume there are no immovable blocks.
BlockMirrorBlockEditor.prototype._cleanUpWorkspace = function () {
  this.workspace.setResizesEnabled(false);
  var topBlocks = this.workspace.getTopBlocks(true);
  var spacerHeight = this.workspace.renderer.getConstants().SPACER_DEFAULT_HEIGHT;
  // Not entirely clear why, but these are the minimum values needed to avoid most unwanted layout changes when dragging.
  var extraHeight = Math.round(this.workspace.renderer.getConstants().MIN_BLOCK_HEIGHT * 2.5);
  var cursorY = extraHeight;
  var _iterator5 = _createForOfIteratorHelper(topBlocks),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _block3 = _step5.value;
      var boundingRect = _block3.getBoundingRectangle();
      _block3.moveBy(-boundingRect.left + spacerHeight, Math.max(0, cursorY - boundingRect.top), ['cleanup']);
      cursorY = _block3.getRelativeToSurfaceXY().y + _block3.getHeightWidth().height + extraHeight;
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  this.workspace.setResizesEnabled(true);
};

/**
 * Attempts to update the model for the current code file from the
 * block workspace. Might be prevented if an update event was already
 * percolating.
 */
BlockMirrorBlockEditor.prototype.setCode = function (code, quietly) {
  if (this.isVisible()) {
    this.blockMirror.textToBlocks.imports.clear();
    this.blockMirror.textToBlocks.variables.clear();
    var result = this.blockMirror.textToBlocks.convertSource('__main__.py', code);
    if (quietly) {
      Blockly.Events.disable();
    }
    try {
      var minBlockHeight = this.workspace.renderer.getConstants().MIN_BLOCK_HEIGHT;
      var xml_code = Blockly.utils.xml.textToDom(result.xml);
      // Convert line numbers to y coordinates, to ensure proper ordering
      for (var i = 0, xmlChild; xmlChild = xml_code.childNodes[i]; i++) {
        var _xmlChild$getAttribut;
        xmlChild.setAttribute('y', (((_xmlChild$getAttribut = xmlChild.getAttribute('line_number')) !== null && _xmlChild$getAttribut !== void 0 ? _xmlChild$getAttribut : 1) - 1) * minBlockHeight);
      }
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xml_code, this.workspace);
      this._cleanUpWorkspace();
    } catch (error) {
      console.error(error);
    }
    if (quietly) {
      Blockly.Events.enable();
    } else {
      this.blockMirror.setCode(code, true);
    }
    this.outOfDate_ = null;
  } else {
    this.outOfDate_ = code;
  }
};
BlockMirrorBlockEditor.prototype.BLOCKLY_CHANGE_EVENTS = [Blockly.Events.CREATE, Blockly.Events.DELETE, Blockly.Events.CHANGE, Blockly.Events.MOVE, Blockly.Events.VAR_RENAME];
BlockMirrorBlockEditor.prototype.changed = function (event) {
  if ((event === undefined || this.BLOCKLY_CHANGE_EVENTS.indexOf(event.type) !== -1) && !this.workspace.isDragging()) {
    var newCode = this.getCode();
    this.blockMirror.textEditor.setCode(newCode, true);
    this.blockMirror.setCode(newCode, true);
  }
};
BlockMirrorBlockEditor.prototype.isVisible = function () {
  return this.blockMirror.VISIBLE_MODES.block.indexOf(this.blockMirror.mode_) !== -1;
};
BlockMirrorBlockEditor.prototype.DOCTYPE = '<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
BlockMirrorBlockEditor.prototype.BLOCKLY_LOADED_CSS = null;
BlockMirrorBlockEditor.prototype.loadBlocklyCSS = function () {
  if (this.BLOCKLY_LOADED_CSS === null) {
    var result = [".blocklyDraggable {}"];
    var blocklyCommonStyle = document.getElementById('blockly-common-style').getHTML();
    var thrasosStyle = document.getElementById('blockly-renderer-style-Thrasos-classic').getHTML();
    result = result.concat(blocklyCommonStyle, thrasosStyle);
    if (Blockly.FieldDate) {
      result = result.concat(Blockly.FieldDate.CSS);
    }
    result = result.join("\n");
    // Strip off any trailing slash (either Unix or Windows).
    result = result.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
    this.BLOCKLY_LOADED_CSS = result;
  }
};

/**
 * Generates a PNG version of the current workspace. This PNG is stored in a Base-64 encoded
 * string as part of a data URL (e.g., "data:image/png;base64,...").
 * TODO: There seems to be some problems capturing blocks that don't start with
 * statement level blocks (e.g., expression blocks).
 *
 * @param {Function} callback - A function to be called with the results.
 *  This function should take two parameters, the URL (as a string) of the generated
 *  base64-encoded PNG and the IMG tag.
 */
BlockMirrorBlockEditor.prototype.getPngFromBlocks = function (callback) {
  try {
    this.loadBlocklyCSS();
    // Retreive the entire canvas, strip some unnecessary tags
    var blocks = this.workspace.svgBlockCanvas_.cloneNode(true);
    blocks.removeAttribute("width");
    blocks.removeAttribute("height");
    // Ensure that we have some content
    if (blocks.childNodes[0] !== undefined) {
      // Remove tags that offset
      blocks.removeAttribute("transform");
      blocks.childNodes[0].removeAttribute("transform");
      blocks.childNodes[0].childNodes[0].removeAttribute("transform");
      // Add in styles
      var linkElm = document.createElementNS("http://www.w3.org/1999/xhtml", "style");
      linkElm.textContent = this.BLOCKLY_LOADED_CSS + "\n\n";
      blocks.insertBefore(linkElm, blocks.firstChild);
      // Get the bounding box
      var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
      // Create the XML representation of the SVG
      var xml = new XMLSerializer().serializeToString(blocks);
      var classes = 'class="' + this.blockMirror.configuration.renderer + '-renderer classic-theme" ';
      xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' + classes + ' width="' + bbox.width + '" height="' + bbox.height + '" viewBox="0 0 ' + bbox.width + " " + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>' + xml + "</svg>";
      console.log(xml);
      // create a file blob of our SVG.
      // Unfortunately, this crashes modern chrome for unknown reasons.
      //var blob = new Blob([ this.DOCTYPE + xml], { type: 'image/svg+xml' });
      //var url = window.URL.createObjectURL(blob);
      // Old method: this failed on IE
      var url = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
      // Create an IMG tag to hold the new element
      var img = document.createElement("img");
      img.style.display = "block";
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = bbox.width;
        canvas.height = bbox.height;
        if (!canvas.width || !canvas.height) {
          callback("", img);
          return;
        }
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var canvasUrl;
        try {
          canvasUrl = canvas.toDataURL("image/png");
        } catch (e) {
          canvasUrl = url;
        }
        img.onload = null;
        callback(canvasUrl, img);
      };
      img.onerror = function () {
        callback("", img);
      };
      img.setAttribute("src", url);
    } else {
      callback("", document.createElement("img"));
    }
  } catch (e) {
    callback("", document.createElement("img"));
    console.error("PNG image creation not supported!", e);
  }
};
BlockMirrorBlockEditor.prototype.highlightLines = function (lines, style) {
  // Make some kind of block map?
  /*this.workspace.getAllBlocks().map((block) => {
      block
  });*/
};
function BlockMirrorTextToBlocks(blockMirror) {
  this.blockMirror = blockMirror;
  this.hiddenImports = ["plt"];
  this.strictAnnotations = ['int', 'float', 'str', 'bool'];
  if (!BlockMirrorTextToBlocks.LOADED) {
    var _iterator6 = _createForOfIteratorHelper(BlockMirrorTextToBlocks.BLOCKS),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var blockElement = _step6.value;
        blockElement.colour = blockMirror.configuration.convertColour(blockElement.type, blockElement.colour);
        if (blockElement.message0) {
          blockElement.message0 = blockMirror.configuration.translate(blockElement.message0);
        }
        if (blockElement.args0) {
          var _iterator7 = _createForOfIteratorHelper(blockElement.args0),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var arg = _step7.value;
              if (arg.type === 'field_dropdown') {
                arg.options = arg.options.map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                    label = _ref2[0],
                    value = _ref2[1];
                  return [blockMirror.configuration.translate(label), value];
                });
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    Blockly.common.defineBlocksWithJsonArray(BlockMirrorTextToBlocks.BLOCKS);
    BlockMirrorTextToBlocks.LOADED = true;
  }
  this.imports = new TypeRegistry();
  this.variables = new TypesRegistry();
}
BlockMirrorTextToBlocks.xmlToString = function (xml) {
  return new XMLSerializer().serializeToString(xml);
};
BlockMirrorTextToBlocks.prototype.convertSourceToCodeBlock = function (python_source) {
  var xml = document.createElement("xml");
  xml.appendChild(BlockMirrorTextToBlocks.raw_block(python_source));
  return BlockMirrorTextToBlocks.xmlToString(xml);
};

/**
 * The main function for converting a string representation of Python
 * code to the Blockly XML representation.
 *
 * @param {string} filename - The filename being parsed.
 * @param {string} python_source - The string representation of Python
 *      code (e.g., "a = 0").
 * @returns {Object} An object which will either have the converted
 *      source code or an error message and the code as a code-block.
 */
BlockMirrorTextToBlocks.prototype.convertSource = function (filename, python_source) {
  var xml = document.createElement("xml");
  // Attempt parsing - might fail!
  var parse,
    ast = null,
    symbol_table,
    error;
  var badChunks = [];
  var originalSource = python_source;
  this.filename = filename;
  this.source = python_source.split("\n");
  var previousLine = 1 + this.source.length;
  var startLine = 1;
  while (ast === null) {
    if (python_source.trim() === "") {
      if (badChunks.length) {
        xml.appendChild(BlockMirrorTextToBlocks.raw_block(badChunks.join("\n"), startLine));
      }
      return {
        "xml": BlockMirrorTextToBlocks.xmlToString(xml),
        "error": null,
        rawXml: xml
      };
    }
    try {
      parse = Sk.parse(filename, python_source);
      ast = Sk.astFromParse(parse.cst, filename, parse.flags);
    } catch (e) {
      //console.error(e);
      error = e;
      // if (e.position && e.position.length && e.position[0].lineno &&
      //     e.position[0][0] < previousLine) {
      //     previousLine = e.position[0][0] - 1;
      if (e.lineno && e.lineno < previousLine) {
        previousLine = e.lineno - 1;
        badChunks = badChunks.concat(this.source.slice(previousLine));
        startLine += previousLine;
        this.source = this.source.slice(0, previousLine);
        python_source = this.source.join("\n");
      } else {
        //console.error(e);
        xml.appendChild(BlockMirrorTextToBlocks.raw_block(originalSource, startLine));
        return {
          "xml": BlockMirrorTextToBlocks.xmlToString(xml),
          "error": error,
          "rawXml": xml
        };
      }
    }
  }
  this.comments = {};
  for (var commentLocation in parse.comments) {
    var lineColumn = commentLocation.split(",");
    var yLocation = parseInt(lineColumn[0], 10);
    var xLocation = parseInt(lineColumn[1], 10);
    this.comments[yLocation] = xLocation + "|" + parse.comments[commentLocation];
  }
  this.highestLineSeen = 0;
  this.levelIndex = 0;
  this.nextExpectedLine = 0;
  this.measureNode(ast);
  var converted = this.convert(ast);
  if (converted !== null) {
    for (var block = 0; block < converted.length; block += 1) {
      xml.appendChild(converted[block]);
    }
  }
  if (badChunks.length) {
    xml.appendChild(BlockMirrorTextToBlocks.raw_block(badChunks.join("\n"), startLine));
  }
  return {
    "xml": BlockMirrorTextToBlocks.xmlToString(xml),
    "error": null,
    "lineMap": this.lineMap,
    'comments': this.comments,
    "rawXml": xml
  };
};
BlockMirrorTextToBlocks.prototype.recursiveMeasure = function (node, nextBlockLine) {
  if (node === undefined) {
    return;
  }
  var myNext = nextBlockLine;
  if ("orelse" in node && node.orelse.length > 0) {
    if (node.orelse.length === 1 && node.orelse[0]._astname === "If") {
      myNext = node.orelse[0].lineno - 1;
    } else {
      myNext = node.orelse[0].lineno - 1 - 1;
    }
  }
  this.heights.push(nextBlockLine);
  if ("body" in node) {
    for (var i = 0; i < node.body.length; i++) {
      var next = void 0;
      if (i + 1 === node.body.length) {
        next = myNext;
      } else {
        next = node.body[i + 1].lineno - 1;
      }
      this.recursiveMeasure(node.body[i], next);
    }
  }
  if ("orelse" in node) {
    for (var _i2 = 0; _i2 < node.orelse.length; _i2++) {
      var _next = void 0;
      if (_i2 === node.orelse.length) {
        _next = nextBlockLine;
      } else {
        _next = 1 + (node.orelse[_i2].lineno - 1);
      }
      this.recursiveMeasure(node.orelse[_i2], _next);
    }
  }
};
BlockMirrorTextToBlocks.prototype.measureNode = function (node) {
  this.heights = [];
  this.recursiveMeasure(node, this.source.length - 1);
  this.heights.shift();
};
BlockMirrorTextToBlocks.prototype.getSourceCode = function (frm, to) {
  var lines = this.source.slice(frm - 1, to);
  // Strip out any starting indentation.
  if (lines.length > 0) {
    var indentation = lines[0].search(/\S/);
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].substring(indentation);
    }
  }
  return lines.join("\n");
};
BlockMirrorTextToBlocks.prototype.convertBody = function (node, parent) {
  this.levelIndex += 1;
  var is_top_level = this.isTopLevel(parent);
  // Empty body, return nothing
  /*if (node.length === 0) {
      return null;
  }*/

  // Final result list
  var children = [],
    // The complete set of peers
    root = null,
    // The top of the current peer
    current = null,
    // The bottom of the current peer
    levelIndex = this.levelIndex;
  function addPeer(peer) {
    if (root == null) {
      children.push(peer);
    } else {
      children.push(root);
    }
    root = peer;
    current = peer;
  }
  function finalizePeers() {
    if (root != null) {
      children.push(root);
    }
  }
  function nestChild(child) {
    if (root == null) {
      root = child;
      current = child;
    } else if (current == null) {
      root = current;
    } else {
      var nextElement = document.createElement("next");
      nextElement.appendChild(child);
      current.appendChild(nextElement);
      current = child;
    }
  }
  var lineNumberInBody = 0,
    lineNumberInProgram,
    previousLineInProgram = null,
    distance,
    skipped_line,
    commentCount,
    previousHeight = null,
    previousWasStatement = false,
    visitedFirstLine = false,
    wasFirstLine = false;

  // Iterate through each node
  for (var i = 0; i < node.length; i++) {
    lineNumberInBody += 1;
    lineNumberInProgram = node[i].lineno;
    distance = 0;
    wasFirstLine = true;
    if (previousLineInProgram != null) {
      distance = lineNumberInProgram - previousLineInProgram - 1;
      wasFirstLine = false;
    }
    lineNumberInBody += distance;

    // Handle earlier comments
    commentCount = 0;
    for (var _commentLineInProgram in this.comments) {
      if (_commentLineInProgram <= lineNumberInProgram) {
        var comment = this.comments[_commentLineInProgram].split("|", 2);
        if (parseInt(comment[0], 10) / 4 == this.levelIndex - 1) {
          var commentLine = comment[1];
          var commentChild = this.ast_Comment(commentLine, _commentLineInProgram);
          this.highestLineSeen += 1;
          if (previousLineInProgram == null) {
            nestChild(commentChild);
          } else {
            var skipped_previous_line = Math.abs(previousLineInProgram - _commentLineInProgram) > 1;
            if (is_top_level && skipped_previous_line) {
              addPeer(commentChild);
            } else {
              nestChild(commentChild);
            }
          }
          previousLineInProgram = _commentLineInProgram;
          this.highestLineSeen = Math.max(this.highestLineSeen, parseInt(_commentLineInProgram, 10));
          distance = lineNumberInProgram - previousLineInProgram;
          delete this.comments[_commentLineInProgram];
          commentCount += 1;
        }
        visitedFirstLine = true;
        previousWasStatement = true;
      }
    }
    distance = lineNumberInProgram - this.highestLineSeen;
    this.highestLineSeen = Math.max(lineNumberInProgram, this.highestLineSeen);

    // Now convert the actual node
    var height = this.heights.shift();
    var originalSourceCode = this.getSourceCode(lineNumberInProgram, height);
    var newChild = this.convertStatement(node[i], originalSourceCode, parent);

    // Skip null blocks (e.g., imports)
    if (newChild == null) {
      continue;
    }
    skipped_line = distance > 1;
    previousLineInProgram = lineNumberInProgram;
    previousHeight = height;

    // Handle top-level expression blocks
    if (is_top_level && newChild.constructor === Array) {
      addPeer(newChild[0]);
      // Handle skipped line
    } else if (is_top_level && skipped_line && visitedFirstLine) {
      addPeer(newChild);
      // The previous line was not a Peer
    } else if (is_top_level && !previousWasStatement) {
      addPeer(newChild);
      // Otherwise, always embed it in there.
    } else {
      nestChild(newChild);
    }
    previousWasStatement = newChild.constructor !== Array;
    visitedFirstLine = true;
  }

  // Handle comments that are on the very last line
  var lastLineNumber = lineNumberInProgram + 1;
  if (lastLineNumber in this.comments) {
    var _comment = this.comments[lastLineNumber].split("|", 2);
    if (parseInt(_comment[0], 10) / 4 === this.levelIndex - 1) {
      var lastComment = _comment[1];
      var _commentChild = this.ast_Comment(lastComment, lastLineNumber);
      if (is_top_level && !previousWasStatement) {
        addPeer(_commentChild);
      } else {
        nestChild(_commentChild);
      }
      delete this.comments[lastLineNumber];
      this.highestLineSeen += 1;
    }
  }

  // Handle any extra comments that stuck around
  if (is_top_level) {
    for (var commentLineInProgram in this.comments) {
      var _comment2 = this.comments[commentLineInProgram].split("|", 2);
      if (parseInt(_comment2[0], 10) / 4 == this.levelIndex - 1) {
        var commentInProgram = _comment2[1];
        var _commentChild2 = this.ast_Comment(commentInProgram, commentLineInProgram);
        distance = commentLineInProgram - previousLineInProgram;
        if (previousLineInProgram == null) {
          addPeer(_commentChild2);
        } else if (distance > 1) {
          addPeer(_commentChild2);
        } else {
          nestChild(_commentChild2);
        }
        previousLineInProgram = commentLineInProgram;
        delete this.comments[lastLineNumber];
      }
    }
  }
  finalizePeers();
  this.levelIndex -= 1;
  return children;
};
BlockMirrorTextToBlocks.prototype.isTopLevel = function (ast) {
  return !ast || ast instanceof Sk.astnodes.Module || ast instanceof Sk.astnodes.Expression || ast instanceof Sk.astnodes.Interactive || ast instanceof Sk.astnodes.Suite;
};
BlockMirrorTextToBlocks.prototype.isStatementContainer = function (ast) {
  return this.isTopLevel(ast) || ast instanceof Sk.astnodes.FunctionDef || ast instanceof Sk.astnodes.Expr && this.isStatementContainer(ast._parent);
};
BlockMirrorTextToBlocks.prototype.isStatement = function (ast) {
  if (ast instanceof Sk.astnodes.FunctionDef) {
    return ast.decorator_list.includes(ast);
  }
  return this.isStatementContainer(ast._parent);
};
BlockMirrorTextToBlocks.prototype.convert = function (node, parent) {
  var functionName = 'ast_' + node._astname;
  if (this[functionName] === undefined) {
    throw new Error("Could not find function: " + functionName);
  }
  node._parent = parent;
  return this[functionName](node, parent);
};
function arrayMax(array) {
  return array.reduce(function (a, b) {
    return Math.max(a, b);
  });
}
function arrayMin(array) {
  return array.reduce(function (a, b) {
    return Math.min(a, b);
  });
}
BlockMirrorTextToBlocks.prototype.convertStatement = function (node, full_source, parent) {
  try {
    return this.convert(node, parent);
  } catch (e) {
    var heights = this.getChunkHeights(node);
    var extractedSource = this.getSourceCode(arrayMin(heights), arrayMax(heights));
    console.error(e);
    return BlockMirrorTextToBlocks.raw_block(extractedSource);
  }
};
BlockMirrorTextToBlocks.prototype.getChunkHeights = function (node) {
  var lineNumbers = [];
  if (Object.hasOwn(node, "lineno")) {
    lineNumbers.push(node.lineno);
  }
  if (Object.hasOwn(node, "body")) {
    for (var i = 0; i < node.body.length; i += 1) {
      var subnode = node.body[i];
      lineNumbers = lineNumbers.concat(this.getChunkHeights(subnode));
    }
  }
  if (Object.hasOwn(node, "orelse")) {
    for (var _i3 = 0; _i3 < node.orelse.length; _i3 += 1) {
      var _subnode = node.orelse[_i3];
      lineNumbers = lineNumbers.concat(this.getChunkHeights(_subnode));
    }
  }
  return lineNumbers;
};
BlockMirrorTextToBlocks.create_block = function (type, lineNumber, fields, values, settings, mutations, statements) {
  var newBlock = document.createElement("block");
  // Settings
  newBlock.setAttribute("type", type);
  newBlock.setAttribute("line_number", lineNumber);
  for (var setting in settings) {
    var settingValue = settings[setting];
    newBlock.setAttribute(setting, settingValue);
  }
  // Mutations
  if (mutations !== undefined && Object.keys(mutations).length > 0) {
    var newMutation = document.createElement("mutation");
    for (var mutation in mutations) {
      var mutationValue = mutations[mutation];
      if (mutation.charAt(0) === '@') {
        newMutation.setAttribute(mutation.substring(1), mutationValue);
      } else if (mutationValue != null && mutationValue.constructor === Array) {
        for (var i = 0; i < mutationValue.length; i++) {
          var mutationNode = document.createElement(mutation);
          mutationNode.setAttribute("name", mutationValue[i]);
          newMutation.appendChild(mutationNode);
        }
      } else {
        var _mutationNode = document.createElement("arg");
        if (mutation.charAt(0) === '!') {
          _mutationNode.setAttribute("name", "");
        } else {
          _mutationNode.setAttribute("name", mutation);
        }
        if (mutationValue !== null) {
          _mutationNode.appendChild(mutationValue);
        }
        newMutation.appendChild(_mutationNode);
      }
    }
    newBlock.appendChild(newMutation);
  }
  // Fields
  for (var field in fields) {
    var fieldValue = fields[field];
    var newField = document.createElement("field");
    newField.setAttribute("name", field);
    newField.appendChild(document.createTextNode(fieldValue));
    newBlock.appendChild(newField);
  }
  // Values
  for (var value in values) {
    var valueValue = values[value];
    var newValue = document.createElement("value");
    if (valueValue !== null) {
      newValue.setAttribute("name", value);
      newValue.appendChild(valueValue);
      newBlock.appendChild(newValue);
    }
  }
  // Statements
  if (statements !== undefined && Object.keys(statements).length > 0) {
    for (var statement in statements) {
      var statementValue = statements[statement];
      if (statementValue !== null) {
        for (var _i4 = 0; _i4 < statementValue.length; _i4 += 1) {
          // In most cases, you really shouldn't ever have more than
          //  one statement in this list. I'm not sure Blockly likes
          //  that.
          var newStatement = document.createElement("statement");
          newStatement.setAttribute("name", statement);
          newStatement.appendChild(statementValue[_i4]);
          newBlock.appendChild(newStatement);
        }
      }
    }
  }
  return newBlock;
};
BlockMirrorTextToBlocks.raw_block = function (txt) {
  var lineno = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return BlockMirrorTextToBlocks.create_block("ast_Raw", lineno, {
    "TEXT": txt
  });
};
BlockMirrorTextToBlocks.BLOCKS = [];
BlockMirrorTextToBlocks.prototype['ast_Module'] = function (node) {
  return this.convertBody(node.body, node);
};
BlockMirrorTextToBlocks.prototype['ast_Interactive'] = function (node) {
  return this.convertBody(node.body, node);
};
BlockMirrorTextToBlocks.prototype['ast_Expression'] = BlockMirrorTextToBlocks.prototype['ast_Interactive'];
BlockMirrorTextToBlocks.prototype['ast_Suite'] = BlockMirrorTextToBlocks.prototype['ast_Module'];
BlockMirrorTextToBlocks.prototype['ast_Pass'] = function () {
  return null; //block("controls_pass");
};
BlockMirrorTextToBlocks.prototype.convertElements = function (key, values, parent) {
  var output = {};
  for (var i = 0; i < values.length; i++) {
    output[key + i] = this.convert(values[i], parent);
  }
  return output;
};
python.pythonGenerator.blank = '___';
BlockMirrorTextToBlocks.prototype.LOCKED_BLOCK = {
  "inline": "true",
  'deletable': "false",
  "movable": "false"
};
BlockMirrorTextToBlocks.COLOR = {
  VARIABLES: 225,
  FUNCTIONS: 210,
  OO: 240,
  CONTROL: 270,
  MATH: 190,
  TEXT: 120,
  FILE: 170,
  PLOTTING: 140,
  LOGIC: 345,
  PYTHON: 60,
  EXCEPTIONS: 300,
  SEQUENCES: 15,
  LIST: 30,
  DICTIONARY: 0,
  SET: 10,
  TUPLE: 20
};
BlockMirrorTextToBlocks.prototype.getAsModule = function (node) {
  if (node._astname === 'Name') {
    return Sk.ffi.remapToJs(node.id);
  } else if (node._astname === 'Call') {
    return this.getAsModule(node.func);
  } else if (node._astname === 'Attribute') {
    var origin = this.getAsModule(node.value);
    if (origin !== null) {
      return origin + '.' + Sk.ffi.remapToJs(node.attr);
    }
  } else {
    return null;
  }
};
BlockMirrorTextToBlocks.prototype.resolveFromLibrary = function (node) {
  if (node._astname === 'Name') {
    var _this$imports$getType;
    var name = Sk.ffi.remapToJs(node.id);

    // First check if this may be a globally known variable
    var resolved = this.blockMirror.libraries.resolve(name);
    if (resolved) {
      return resolved;
    }
    var fullTypeName = (_this$imports$getType = this.imports.getType(name)) !== null && _this$imports$getType !== void 0 ? _this$imports$getType : name;
    return this.blockMirror.libraries.resolve(fullTypeName);
  } else if (node._astname === 'Call') {
    var _this$imports$getType2;
    var _name = Sk.ffi.remapToJs(node.func.id);
    var _fullTypeName = (_this$imports$getType2 = this.imports.getType(_name)) !== null && _this$imports$getType2 !== void 0 ? _this$imports$getType2 : _name;
    var _resolved = this.blockMirror.libraries.resolve(_fullTypeName);
    if (_resolved instanceof PythonClass) {
      return _resolved;
    } else if (_resolved instanceof PythonFunction && _resolved.typeHint) {
      return _resolved.typeHint.resolveSingleClass();
    }
  } else if (node._astname === 'Attribute') {
    var caller = node.value;
    var potentialModule = this.getAsModule(caller);
    if (potentialModule) {
      var _this$variables$getSi;
      var resolvedFromLibrary = (_this$variables$getSi = this.variables.getSingleType(potentialModule)) !== null && _this$variables$getSi !== void 0 ? _this$variables$getSi : this.blockMirror.libraries.resolve(potentialModule);
      var _fullTypeName2;
      if (resolvedFromLibrary instanceof PythonAttribute) {
        _fullTypeName2 = resolvedFromLibrary.typeHint.value;
      } else if (resolvedFromLibrary) {
        _fullTypeName2 = resolvedFromLibrary.fullName;
      } else {
        var _this$imports$getType3;
        _fullTypeName2 = (_this$imports$getType3 = this.imports.getType(potentialModule)) !== null && _this$imports$getType3 !== void 0 ? _this$imports$getType3 : potentialModule;
      }
      var attributeName = Sk.ffi.remapToJs(node.attr);
      return this.blockMirror.libraries.resolve(_fullTypeName2 + "." + attributeName);
    }
    var callerBlock = this.convert(caller, node._parent); // TODO caller node

    if (!(callerBlock !== null && callerBlock !== void 0 && callerBlock.children)) {
      return null;
    }
    var mutationElement = callerBlock.children[0];

    // TODO is this clean/reliable enough?
    if (mutationElement && /^mutation$/i.test(mutationElement.tagName)) {
      var _attributeName = Sk.ffi.remapToJs(node.attr);
      return this.blockMirror.libraries.resolve(mutationElement.getAttribute('returns') + "." + _attributeName);
    }
  }
  return null;
};
var __BLANK = "___"; // Mirrors python.pythonGenerator.blank

function _resolve_colour(colour) {
  if (typeof colour === "string" && !colour.startsWith('#') && typeof BlockMirrorTextToBlocks === "function") {
    return BlockMirrorTextToBlocks.COLOR[colour];
  }
  return colour;
}
var PythonModule = /*#__PURE__*/function () {
  function PythonModule(library, signature, comment, members) {
    _classCallCheck(this, PythonModule);
    this.library = library;
    var fullName;
    var _signature$split = signature.split(" as ", 2);
    var _signature$split2 = _slicedToArray(_signature$split, 2);
    fullName = _signature$split2[0];
    this.name = _signature$split2[1];
    this.fullName = fullName.trim();
    if (!this.name) {
      this.name = this.fullName.substring(this.fullName.lastIndexOf(".") + 1);
    }
    this.requiresImport = this.fullName === "" ? "" : this.name === this.fullName ? this.fullName : this.fullName + " as " + this.name;
    this.members = new Map();
    this.colour = library.colour;
    if (members !== undefined) {
      var _iterator8 = _createForOfIteratorHelper(members),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var input = _step8.value;
          if (_typeof(input) === "object") {
            if (input.__colour) {
              this.colour = this.library.libraries.convertColour("module", _resolve_colour(input.__colour), this.fullName);
            } else if (input.__color) {
              this.colour = this.library.libraries.convertColour("module", _resolve_colour(input.__color), this.fullName);
            } else if (input.signatures) {
              var _iterator9 = _createForOfIteratorHelper(input.signatures),
                _step9;
              try {
                for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                  var _signature = _step9.value;
                  this.addMember(_signature, input);
                }
              } catch (err) {
                _iterator9.e(err);
              } finally {
                _iterator9.f();
              }
            } else {
              this.addMember(input.signature, input);
            }
          } else {
            this.addMember(input);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }
  return _createClass(PythonModule, [{
    key: "addMember",
    value: function addMember(signature, inputObject) {
      var _signature$split3 = signature.split("//", 2),
        _signature$split4 = _slicedToArray(_signature$split3, 2),
        code = _signature$split4[0],
        comment = _signature$split4[1];
      var member;
      if (PythonTypeAliasType.isA(code)) {
        var translatedComment = this.translate(PythonTypeAliasType.extractName(code), comment);
        member = new PythonTypeAliasType(this, code, translatedComment, inputObject === null || inputObject === void 0 ? void 0 : inputObject.fieldFactory);
      } else if (PythonFunction.isA(code)) {
        var _inputObject$colour;
        var _translatedComment = this.translateFunctionComment(PythonFunction.extractName(code), comment);
        member = new PythonFunction(this, code, _translatedComment, (_inputObject$colour = inputObject === null || inputObject === void 0 ? void 0 : inputObject.colour) !== null && _inputObject$colour !== void 0 ? _inputObject$colour : inputObject === null || inputObject === void 0 ? void 0 : inputObject.color, inputObject === null || inputObject === void 0 ? void 0 : inputObject.custom);
        var _iterator0 = _createForOfIteratorHelper(member.aliases),
          _step0;
        try {
          for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
            var alias = _step0.value;
            this.members.set(alias.name, alias);
          }
        } catch (err) {
          _iterator0.e(err);
        } finally {
          _iterator0.f();
        }
      } else {
        var _inputObject$colour2;
        member = new PythonAttribute(this, code, this.translate(PythonAttribute.extractName(code), comment), (_inputObject$colour2 = inputObject === null || inputObject === void 0 ? void 0 : inputObject.colour) !== null && _inputObject$colour2 !== void 0 ? _inputObject$colour2 : inputObject === null || inputObject === void 0 ? void 0 : inputObject.color);
        var _iterator1 = _createForOfIteratorHelper(member.aliases),
          _step1;
        try {
          for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
            var _alias = _step1.value;
            this.members.set(_alias.name, _alias);
          }
        } catch (err) {
          _iterator1.e(err);
        } finally {
          _iterator1.f();
        }
      }
      this.members.set(member.name, member);
    }
  }, {
    key: "translate",
    value: function translate(memberName, defaultValue) {
      if (this.fullName === "") {
        return this.library.translate(memberName, defaultValue);
      }
      return this.library.translate(this.fullName + "." + memberName, defaultValue);
    }
  }, {
    key: "translateFunctionComment",
    value: function translateFunctionComment(memberName, defaultValue) {
      if (defaultValue) {
        var _defaultValue$split = defaultValue.split("(", 2),
          _defaultValue$split2 = _slicedToArray(_defaultValue$split, 2),
          toTranslate = _defaultValue$split2[0],
          tail = _defaultValue$split2[1];
        if (tail) {
          return this.translate(memberName, toTranslate) + "(" + tail;
        }
      }
      return this.translate(memberName, defaultValue);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.requiresImport;
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(textToBlocks) {
      var result = "";
      var _iterator10 = _createForOfIteratorHelper(this.members.values()),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var value = _step10.value;
          var resultItem = value.toToolbox(textToBlocks);
          if (resultItem) {
            result += resultItem;
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      return result;
    }
  }, {
    key: "resolve",
    value: function resolve(name) {
      var _member2;
      if (name === this.fullName) {
        return this;
      }
      var memberName;
      if (name.startsWith(this.fullName + ".") && this.fullName !== "") {
        memberName = name.substring(this.fullName.length + 1);
      } else {
        memberName = name;
      }
      var indexOfDot = memberName.lastIndexOf(".");
      if (indexOfDot === -1) {
        return this.members.get(memberName);
      }
      if (this.fullName === "" && indexOfDot === 0) {
        // Special case, look for a method in all builtin classes
        var methodName = memberName.substring(1);
        var _iterator11 = _createForOfIteratorHelper(this.members.values()),
          _step11;
        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _member = _step11.value;
            if (_member instanceof PythonClass) {
              var result = _member.resolve(methodName);
              if (result) {
                return result;
              }
            }
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
        return null;
      }
      var member = this.members.get(memberName.substring(0, indexOfDot));
      if (member instanceof PythonAttribute) {
        if (member.typeHint === null) {
          return null;
        }
        member = this.library.libraries.resolve(member.typeHint.toString());
      }
      return (_member2 = member) === null || _member2 === void 0 ? void 0 : _member2.resolve(memberName.substring(indexOfDot + 1));
    }
  }, {
    key: "registerImports",
    value: function registerImports(typeRegistry) {
      typeRegistry.set(this.fullName, this.name);
      var _iterator12 = _createForOfIteratorHelper(this.members.values()),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var member = _step12.value;
          if (member instanceof PythonClass) {
            typeRegistry.set(member.fullName, member.name);
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    }
  }], [{
    key: "isA",
    value: function isA(fullName) {
      return /^([a-z][a-zA-Z0-9_]*)(\.[a-z][a-zA-Z0-9_]*)*$/.test(fullName);
    }
  }, {
    key: "extractName",
    value: function extractName(signature) {
      if (signature.startsWith('class ')) {
        signature = signature.substring(6).split('(', 1)[0];
        var lastIndexOfDot = signature.lastIndexOf('.');
        return lastIndexOfDot === -1 ? null : signature.substring(0, lastIndexOfDot);
      }
      var moduleName = signature.split(/\.(_?[A-Z][^.]*)\.?.+$/, 1)[0];
      if (PythonModule.isA(moduleName)) {
        return moduleName;
      }
      return "";
    }
  }]);
}();
var PythonTypeHint = /*#__PURE__*/function () {
  function PythonTypeHint(libraries, signature) {
    _classCallCheck(this, PythonTypeHint);
    var unionTypes = splitParameters(signature.trim(), '|');
    if (unionTypes.length >= 2) {
      this.value = "typing.Union";
      this.typeParams = unionTypes;
    } else if (signature.trim().endsWith("]")) {
      var _signature$split5 = signature.split("[", 2),
        _signature$split6 = _slicedToArray(_signature$split5, 2),
        value = _signature$split6[0],
        typeParams = _signature$split6[1];
      typeParams = typeParams.trim();
      this.value = value.trim();
      this.typeParams = splitParameters(typeParams.substring(0, typeParams.length - 1));
    } else {
      this.value = signature.trim();
      this.typeParams = [];
    }
    this.libraries = libraries;
    this._referencedTypeAliases = null;
    this._flattened = null;
  }
  return _createClass(PythonTypeHint, [{
    key: "referencedTypeAliases",
    value: function referencedTypeAliases() {
      if (this._referencedTypeAliases == null) {
        this._referencedTypeAliases = [];
        if (this.isUnion() || this.isOptional()) {
          var _iterator13 = _createForOfIteratorHelper(this.typeParams),
            _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var typeParam = _step13.value;
              var resolved = this.libraries.resolve(typeParam);
              if (resolved instanceof PythonTypeAliasType) {
                this._referencedTypeAliases.push(resolved);
              }
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        } else {
          var _resolved2 = this.libraries.resolve(this.value);
          if (_resolved2 instanceof PythonTypeAliasType) {
            this._referencedTypeAliases.push(_resolved2);
          }
        }
      }
      return this._referencedTypeAliases;
    }

    /**
     * Without type alias types.
     */
  }, {
    key: "flattened",
    value: function flattened() {
      var _this8 = this;
      if (this._flattened == null) {
        var referencedTypeAliases = this.referencedTypeAliases();
        if (referencedTypeAliases.length) {
          if (this.isUnion() || this.isOptional()) {
            this._flattened = new PythonTypeHint(this.libraries, "");
            this._flattened.value = this.value;
            var _iterator14 = _createForOfIteratorHelper(this.typeParams),
              _step14;
            try {
              var _loop2 = function _loop2() {
                var item = _step14.value;
                var referencedTypeAlias = referencedTypeAliases.find(function (alias) {
                  return alias.fullName === item;
                });
                if (referencedTypeAlias) {
                  if (referencedTypeAlias.isUnion()) {
                    _this8._flattened.typeParams = _this8._flattened.typeParams.concat(_this8._flattened.typeParams, referencedTypeAlias.flattened().typeParams);
                  } else if (referencedTypeAlias.isOptional()) {
                    _this8._flattened.typeParams = _this8._flattened.typeParams.concat(_this8._flattened.typeParams, referencedTypeAlias.flattened().typeParams);
                    if (!_this8._flattened.typeParams.includes("None")) {
                      _this8._flattened.typeParams.push("None");
                    }
                  } else {
                    _this8._flattened.typeParams.push(referencedTypeAlias.flattened().toString());
                  }
                }
              };
              for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                _loop2();
              }
            } catch (err) {
              _iterator14.e(err);
            } finally {
              _iterator14.f();
            }
          } else {
            this._flattened = referencedTypeAliases[0].flattened();
          }
        } else {
          this._flattened = this;
        }
      }
      return this._flattened;
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(_textToBlocks) {
      // Not meant to be used as a toolbox block at this time.
      return null;
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.isUnion()) {
        return this.typeParams.join(' | ');
      } else if (this.isOptional()) {
        return this.typeParams.join(' | ') + " | None";
      } else if (this.typeParams.length) {
        return this.value + "[" + this.typeParams.join(', ') + "]";
      } else {
        return this.value;
      }
    }
  }, {
    key: "isLiteral",
    value: function isLiteral() {
      return this.value === 'typing.Literal';
    }
  }, {
    key: "isUnion",
    value: function isUnion() {
      return this.value === 'typing.Union';
    }
  }, {
    key: "isOptional",
    value: function isOptional() {
      return this.value === 'typing.Optional';
    }
  }, {
    key: "matches",
    value: function matches(typeString) {
      if (this.value === typeString) {
        return true;
      } else if (this.isUnion() || this.isOptional()) {
        return this.typeParams.some(function (typeParam) {
          return typeParam === typeString;
        });
      } else if (this.flattened() !== this) {
        return this.flattened().matches(typeString);
      }
      return false;
    }

    /**
     * Resolves to a single Python class.
     * @returns {PythonClass | null}
     */
  }, {
    key: "resolveSingleClass",
    value: function resolveSingleClass() {
      var flattened = this.flattened();
      if (flattened.isOptional()) {
        return this.libraries.resolve(flattened.typeParams[0]);
      } else if (!flattened.isUnion()) {
        return this.libraries.resolve(flattened.value);
      }
      return null;
    }
  }]);
}();
function _resolveFunction(identifier, fullName) {
  if (typeof identifier === "function") {
    return identifier;
  }
  if (identifier) {
    var result = globalThis;
    var _iterator15 = _createForOfIteratorHelper(identifier.split('.')),
      _step15;
    try {
      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
        var item = _step15.value;
        result = result[item];
        if (!result) {
          console.warn("Could not find function " + identifier + " for " + fullName);
          break;
        }
      }
    } catch (err) {
      _iterator15.e(err);
    } finally {
      _iterator15.f();
    }
    return result;
  }
  return null;
}
var PythonTypeAliasType = /*#__PURE__*/function (_PythonTypeHint) {
  function PythonTypeAliasType(pythonModule, signature, comment, fieldFactory) {
    var _comment$trim;
    var _this9;
    _classCallCheck(this, PythonTypeAliasType);
    _this9 = _callSuper(this, PythonTypeAliasType, [pythonModule.library.libraries, signature.substring(signature.indexOf('=') + 1).trim()]);
    if (signature.startsWith("type ")) {
      signature = signature.substring(5);
    }
    _this9.name = PythonTypeAliasType.extractName(signature);
    _this9.fullName = (pythonModule === null || pythonModule === void 0 ? void 0 : pythonModule.fullName) === "" ? _this9.name : (pythonModule === null || pythonModule === void 0 ? void 0 : pythonModule.fullName) + "." + _this9.name;
    _this9.comment = (_comment$trim = comment === null || comment === void 0 ? void 0 : comment.trim()) !== null && _comment$trim !== void 0 ? _comment$trim : "";
    _this9.resolvedFieldFactory = _resolveFunction(fieldFactory, _this9.fullName);
    _this9.fieldFactory = _this9.resolvedFieldFactory === null ? null : fieldFactory;
    return _this9;
  }
  _inherits(PythonTypeAliasType, _PythonTypeHint);
  return _createClass(PythonTypeAliasType, null, [{
    key: "isA",
    value: function isA(signature) {
      return signature.startsWith("type ");
    }
  }, {
    key: "extractName",
    value: function extractName(signature) {
      return signature.split('=', 1)[0].trim();
    }
  }]);
}(PythonTypeHint);
var _PythonParameter_brand = /*#__PURE__*/new WeakSet();
var PythonParameter = /*#__PURE__*/function () {
  function PythonParameter(pythonFunction, parameter, arg, positional, keyword) {
    _classCallCheck(this, PythonParameter);
    _classPrivateMethodInitSpec(this, _PythonParameter_brand);
    this.pythonFunction = pythonFunction;
    this.positional = positional;
    this.keyword = keyword;
    if (parameter.startsWith("*")) {
      this.variableLength = true;
      if (parameter.startsWith("**")) {
        parameter = parameter.substring(2);
        this.keyword = true;
        this.positional = false;
      } else {
        parameter = parameter.substring(1);
        this.keyword = false;
        this.positional = true;
      }
    } else {
      this.variableLength = false;
    }
    var _parameter$split = parameter.split("=", 2),
      _parameter$split2 = _slicedToArray(_parameter$split, 2),
      nameAndTypeHint = _parameter$split2[0],
      _defaultValue = _parameter$split2[1];
    var _nameAndTypeHint$spli = nameAndTypeHint.split(":", 2),
      _nameAndTypeHint$spli2 = _slicedToArray(_nameAndTypeHint$spli, 2),
      names = _nameAndTypeHint$spli2[0],
      typeHint = _nameAndTypeHint$spli2[1];
    this.name = null;
    this.aliases = null;
    this.names = names.split(' ');
    var _this$names = _toArray(this.names);
    this.name = _this$names[0];
    this.aliases = _this$names.slice(1);
    this.typeHint = typeHint ? new PythonTypeHint(pythonFunction.pythonModule.library.libraries, typeHint) : null;

    // Convert double quotes to single quotes for default string values
    this.defaultValue = (_defaultValue !== null && _defaultValue !== void 0 ? _defaultValue : "").trim().replace(/^"([^"]*)"$/, "'$1'");
    this.preferKeyword = this.positional && this.keyword;
    if (arg.includes("=")) {
      var _arg$split = arg.split("=", 2),
        _arg$split2 = _slicedToArray(_arg$split, 2),
        message = _arg$split2[0],
        value = _arg$split2[1];
      this.message = message.trim();
      this.value = value.trim();
    } else {
      this.message = this.name;
      this.value = arg.trim();
      if (this.value !== "") {
        this.preferKeyword = false;
      }
    }
    if (this.value === __BLANK) {
      // For consistency
      this.value = "";
    }
  }
  return _createClass(PythonParameter, [{
    key: "toPythonSource",
    value: function toPythonSource() {
      if (this.variableLength && this.keyword) {
        return "";
      }
      var processedValue = this.value;
      if (this.value === "") {
        if (this.defaultValue === "" && !(this.variableLength && this.positional)) {
          processedValue = __BLANK;
        } else {
          processedValue = this.defaultValue;
        }
      }
      if (this.positional && (!this.keyword || !this.preferKeyword)) {
        // Positional only or preferred
        return processedValue;
      }
      return "".concat(this.name, " = ").concat(processedValue);
    }
  }, {
    key: "applyShadow",
    value: function applyShadow(argBlock) {
      var shouldShadow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (argBlock) {
        if (shouldShadow == null) {
          shouldShadow = _assertClassBrand(_PythonParameter_brand, this, _shouldShadow).call(this, argBlock, this.defaultValue);
        }
        if (argBlock instanceof HTMLElement) {
          // Blockly XML
          var _iterator16 = _createForOfIteratorHelper(argBlock.children),
            _step16;
          try {
            for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
              var childElement = _step16.value;
              if (childElement.tagName === (shouldShadow ? 'BLOCK' : 'SHADOW')) {
                var replacementElement = _assertClassBrand(_PythonParameter_brand, this, _replaceTagName).call(this, childElement, shouldShadow ? 'SHADOW' : 'BLOCK');
                this.applyShadow(replacementElement, shouldShadow);
              } else {
                this.applyShadow(childElement, shouldShadow);
              }
            }
          } catch (err) {
            _iterator16.e(err);
          } finally {
            _iterator16.f();
          }
        } else if (argBlock.shadow !== shouldShadow) {
          // Blockly block
          argBlock.shadow = shouldShadow;
          argBlock.setStyle(argBlock.getStyleName()); // Re-apply the style
          var _iterator17 = _createForOfIteratorHelper(argBlock.getChildren()),
            _step17;
          try {
            for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
              var child = _step17.value;
              this.applyShadow(child, shouldShadow);
            }
          } catch (err) {
            _iterator17.e(err);
          } finally {
            _iterator17.f();
          }
        }
      }
    }
  }, {
    key: "defaultValueBlocks",
    value: function defaultValueBlocks(textToBlocks) {
      var _converted$0$children;
      var pythonSource, fictionalFilename;
      if (this.keyword || this.preferKeyword) {
        pythonSource = "k=" + this.defaultValue;
        fictionalFilename = "keywordDefaultValue.py";
      } else {
        pythonSource = "p=" + this.defaultValue;
        fictionalFilename = "positionalDefaultValue.py";
      }
      var parse = Sk.parse(fictionalFilename, pythonSource);
      var ast = Sk.astFromParse(parse.cst, fictionalFilename, parse.flags);
      var converted = textToBlocks.convert(ast);
      return (_converted$0$children = converted[0].children['VALUE']) === null || _converted$0$children === void 0 ? void 0 : _converted$0$children.children[0];
    }
  }]);
}();
function _replaceTagName(element, tagName) {
  if (element.tagName === tagName) {
    return element;
  }
  var replacementElement = document.createElement(tagName);
  for (var i = 0, l = element.attributes.length; i < l; ++i) {
    var attr = element.attributes.item(i);
    var nodeName = attr.nodeName;
    var nodeValue = attr.nodeValue;
    replacementElement.setAttribute(nodeName, nodeValue);
  }
  replacementElement.innerHTML = element.innerHTML;
  element.parentNode.replaceChild(replacementElement, element);
  return replacementElement;
}
function _matchesDefaultValue(type, value, defaultValue) {
  if (defaultValue === "") {
    return value === "";
  }
  switch (type) {
    case "ast_NameConstantBoolean":
      return defaultValue === value || defaultValue === "True" && value === "TRUE" || defaultValue === "False" && value === "FALSE";
    case "ast_NameConstantNone":
      return defaultValue === "None";
    case "ast_Num":
    case "ast_UnaryOpUSub":
      return parseFloat(defaultValue) === parseFloat(value);
    case "ast_Tuple":
      break;
    case "ast_Name":
    case "ast_Str":
    case "ast_StrChar":
  }
  return defaultValue === value;
}
function _shouldShadow(argBlock, defaultValue) {
  if (defaultValue === '') {
    return false;
  } else if (argBlock instanceof HTMLElement) {
    // Blockly XML
    var blockElement = argBlock.firstElementChild;
    var blockType = blockElement.getAttribute("type");
    if (blockType === "ast_Tuple") {
      var defaultValueParts = defaultValue.substring(1, defaultValue.length - 1).split(', ');
      var valueChildren = _toConsumableArray(blockElement.children).filter(function (child) {
        return child.localName === 'value';
      });
      if (defaultValueParts.length !== valueChildren.length) {
        return false;
      }
      for (var i = 0; i < defaultValueParts.length; i++) {
        if (!_assertClassBrand(_PythonParameter_brand, this, _shouldShadow).call(this, valueChildren[i], defaultValueParts[i])) {
          return false;
        }
      }
      return true;
    } else if (blockType === "ast_Attribute") {
      var valueElement = _toConsumableArray(blockElement.getElementsByTagName('value')).filter(function (child) {
        return child.getAttribute('name') === 'VALUE';
      })[0];
      var attrElement = _toConsumableArray(blockElement.getElementsByTagName('field')).filter(function (child) {
        return child.getAttribute('name') === 'ATTR';
      })[0];
      var mutationElement = (valueElement !== null && valueElement !== void 0 ? valueElement : blockElement).getElementsByTagName('mutation')[0];
      var importAttr = mutationElement === null || mutationElement === void 0 ? void 0 : mutationElement.getAttribute('import');
      if (importAttr) {
        var fullName = importAttr.split(' as ', 1)[0];
        var attrName = attrElement.textContent;
        return defaultValue === fullName + '.' + attrName;
      }
    }
    var value = blockElement.textContent;
    if (blockType === "ast_UnaryOpUSub") {
      value = "-" + value;
    } else if (blockType === "ast_Str" || blockType === "ast_StrChar") {
      value = "'" + value.replace("'", "\\'").replace('\n', '\\n') + "'";
    }
    return _assertClassBrand(_PythonParameter_brand, this, _matchesDefaultValue).call(this, blockType, value, defaultValue);
  } else {
    // Blockly block
    var _value3 = python.pythonGenerator.descrub_(python.pythonGenerator.blockToCode(argBlock)[0]);
    return _assertClassBrand(_PythonParameter_brand, this, _matchesDefaultValue).call(this, argBlock.type, _value3, defaultValue);
  }
}
var PythonParameters = /*#__PURE__*/function (_Array) {
  function PythonParameters(pythonFunction, signature, comment) {
    var _this0;
    _classCallCheck(this, PythonParameters);
    _this0 = _callSuper(this, PythonParameters);
    var parameters = signature.substring(signature.indexOf("(") + 1, signature.lastIndexOf(")")).trim();
    if (parameters !== "") {
      var args = comment.substring(comment.indexOf("(") + 1, comment.lastIndexOf(")"));
      var argParts = splitParameters(args);
      var parameterParts = splitParameters(parameters);

      // PEP 570 Python Positional-Only Parameters
      var positional = true;
      var keyword = !parameterParts.includes("/");
      var argIndex = 0;
      var _iterator18 = _createForOfIteratorHelper(parameterParts),
        _step18;
      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var _parameter = _step18.value;
          if (_parameter === "/") {
            keyword = true;
          } else if (_parameter === "*") {
            positional = false;
          } else {
            var _argParts$argIndex;
            var isSelfOrCls = argIndex === 0 && (_parameter === "self" || _parameter === "cls");
            var pythonParameter = new PythonParameter(pythonFunction, _parameter, isSelfOrCls ? "" : (_argParts$argIndex = argParts[argIndex]) !== null && _argParts$argIndex !== void 0 ? _argParts$argIndex : "", positional, keyword);
            _this0.push(pythonParameter);
            if (_parameter.length > 1 && _parameter[0] === '*' && _parameter[1] !== '*') {
              // No positional arguments after *args
              positional = false;
            }
            if (!isSelfOrCls) {
              argIndex++;
            }
          }
        }

        // Any parameter before *args should not be addressable by keyword
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
      var positionalOnly = false;
      for (var i = _this0.length - 1; i >= 0; i--) {
        var parameter = _this0[i];
        if (positionalOnly) {
          parameter.keyword = false;
        }
        positionalOnly = positionalOnly || parameter.variableLength && parameter.positional;
      }
    }
    return _this0;
  }
  _inherits(PythonParameters, _Array);
  return _createClass(PythonParameters, [{
    key: "toPythonSource",
    value: function toPythonSource() {
      return _toConsumableArray(this.entries().filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        return !(key === 0 && (value.name === "self" || value.name === "cls"));
      }).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          value = _ref6[1];
        return value.toPythonSource();
      })).filter(function (result) {
        return result !== "";
      }).join(", ");
    }
  }, {
    key: "findByKeyword",
    value: function findByKeyword(keyword) {
      return this.values().find(function (value) {
        return value.names.includes(keyword);
      });
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Array));
function splitParameters(input) {
  var splitChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  var result = [];
  var openParentheses = 0;
  var openBrackets = 0;
  var doubleQuoted = false;
  var singleQuoted = false;
  var item = '';
  var _iterator19 = _createForOfIteratorHelper(input),
    _step19;
  try {
    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
      var _char = _step19.value;
      if (_char === '"') {
        doubleQuoted = !doubleQuoted;
      } else if (_char === "'") {
        singleQuoted = !singleQuoted;
      } else if (_char === splitChar && openParentheses === 0 && openBrackets === 0 && !doubleQuoted && !singleQuoted) {
        result.push(item.trim());
        item = '';
        continue;
      } else if (_char === '(') {
        openParentheses++;
      } else if (_char === ')') {
        openParentheses--;
      } else if (_char === '[') {
        openBrackets++;
      } else if (_char === ']') {
        openBrackets--;
      }
      item += _char;
    }
  } catch (err) {
    _iterator19.e(err);
  } finally {
    _iterator19.f();
  }
  item = item.trim();
  if (item !== '') {
    result.push(item);
  }
  return result;
}
function splitPremessageMessage(toSplit) {
  var _toSplit$trim$split = toSplit.trim().split("{}", 2),
    _toSplit$trim$split2 = _slicedToArray(_toSplit$trim$split, 2),
    premessage = _toSplit$trim$split2[0],
    message = _toSplit$trim$split2[1];
  if (message === undefined) {
    return ["", premessage];
  }
  return [premessage, message];
}
function splitPremessageMessagePostmessage(toSplit) {
  var _toSplit$trim$split3 = toSplit.trim().split("{}", 3),
    _toSplit$trim$split4 = _slicedToArray(_toSplit$trim$split3, 3),
    premessage = _toSplit$trim$split4[0],
    message = _toSplit$trim$split4[1],
    postmessage = _toSplit$trim$split4[2];
  if (message === undefined) {
    return ["", premessage, ""];
  } else if (postmessage === undefined) {
    return [premessage, message, ""];
  }
  return [premessage, message, postmessage];
}
var PythonFunction = /*#__PURE__*/function () {
  function PythonFunction(pythonModuleOrFunction, signature, comment, colour, custom) {
    _classCallCheck(this, PythonFunction);
    this.isAliasOf = null;
    if (pythonModuleOrFunction instanceof PythonFunction) {
      var original = pythonModuleOrFunction;
      this.pythonModule = original.pythonModule;
      this.typeHint = original.typeHint;
      this.colour = original.colour;
      this.premessage = original.premessage;
      this.message = original.message;
      this.postmessage = original.postmessage;
      this.parameters = original.parameters;
      this.custom = original.custom;
      this.argumentOffset = original.argumentOffset;
      this.names = original.names;
      this.labels = original.labels;
      this.name = signature.split("(", 1)[0];
      this.fullName = this.pythonModule.fullName === "" ? this.name : this.pythonModule.fullName + "." + this.name;
    } else {
      var _resolve_colour2;
      this.name = null;
      this.names = signature.split("(", 1)[0].split(" ");
      this.name = this.names[0];
      this.label = this.name;
      this.pythonModule = pythonModuleOrFunction;
      var indexOfTypeHint = signature.indexOf(":", signature.indexOf(")") + 1);
      this.typeHint = indexOfTypeHint < 0 ? null : new PythonTypeHint(this.pythonModule.library.libraries, signature.substring(indexOfTypeHint + 1));
      if ((comment !== null && comment !== void 0 ? comment : "").trim() === "") {
        this.premessage = "";
        this.message = this.pythonModule.fullName === "" ? "" : ".";
        this.postmessage = "";

        // If no comment is in the specification, aliases should be made available.
        this.labels = _toConsumableArray(this.names);
      } else {
        var _splitPremessageMessa = splitPremessageMessage(comment.split("(", 1)[0]);
        var _splitPremessageMessa2 = _slicedToArray(_splitPremessageMessa, 2);
        this.premessage = _splitPremessageMessa2[0];
        this.message = _splitPremessageMessa2[1];
        this.postmessage = "";
        if (this.names.length === 1) {
          // If there are no aliases, accolades are optional in the specification.
          if (this.message.startsWith('.')) {
            this.label = this.message.substring(1);
            this.message = ".";
          } else {
            this.label = this.message;
            this.message = "";
          }
          this.labels = [this.label];
        } else {
          var messageParts = this.message.split(/\{([^}]+)\}/, 3);
          if (messageParts.length > 1) {
            this.message = messageParts[0];
            this.labels = _toConsumableArray(this.names);
            var labels = messageParts[1].split("|");
            var _iterator20 = _createForOfIteratorHelper(labels.entries()),
              _step20;
            try {
              for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                var _step20$value = _slicedToArray(_step20.value, 2),
                  index = _step20$value[0],
                  label = _step20$value[1];
                this.labels[index] = label.trim();
              }
            } catch (err) {
              _iterator20.e(err);
            } finally {
              _iterator20.f();
            }
            this.label = this.labels[0];
            this.postmessage = messageParts[2];
          } else {
            // If there are aliases, but no accolades in the specification,
            //  aliases are likely intended to be hidden.
            this.label = this.message;
            this.message = "";
            this.labels = [this.label];
          }
        }
      }
      this.parameters = new PythonParameters(this, signature, comment !== null && comment !== void 0 ? comment : "");
      this.fullName = this.pythonModule.fullName === "" ? this.name : this.pythonModule.fullName + "." + this.name;
      this.argumentOffset = 0;
      this.colour = (_resolve_colour2 = _resolve_colour(colour)) !== null && _resolve_colour2 !== void 0 ? _resolve_colour2 : this.pythonModule.library.colour;
      if (this.constructor === PythonFunction) {
        this.custom = _resolveFunction(custom, this.fullName);
        this.colour = this.pythonModule.library.libraries.convertColour("ast_Call", this.colour, this.fullName);
        this.createAliases();
      }
    }
  }
  return _createClass(PythonFunction, [{
    key: "createAliases",
    value: function createAliases() {
      var _this1 = this;
      this.aliases = this.names.slice(1).map(function (name) {
        return new _this1.constructor(_this1, name);
      });
      if (this.labels.length <= 1) {
        var _iterator21 = _createForOfIteratorHelper(this.aliases),
          _step21;
        try {
          for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
            var alias = _step21.value;
            alias.label = this.label;
          }
        } catch (err) {
          _iterator21.e(err);
        } finally {
          _iterator21.f();
        }
      } else {
        var _iterator22 = _createForOfIteratorHelper(this.aliases.entries()),
          _step22;
        try {
          for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
            var _step22$value = _slicedToArray(_step22.value, 2),
              index = _step22$value[0],
              _alias2 = _step22$value[1];
            _alias2.label = this.labels[index + 1];
          }
        } catch (err) {
          _iterator22.e(err);
        } finally {
          _iterator22.f();
        }
      }
      var _iterator23 = _createForOfIteratorHelper(this.aliases),
        _step23;
      try {
        var _loop3 = function _loop3() {
          var alias = _step23.value;
          alias.isAliasOf = _this1;
          alias.aliases = [_this1].concat(_toConsumableArray(_this1.aliases)).filter(function (item) {
            return item !== alias;
          });
          alias.names = _this1.names;
          alias.labels = _this1.labels;
        };
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          _loop3();
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
      }
    }
  }, {
    key: "toPythonSource",
    value: function toPythonSource() {
      return this.pythonModule.fullName + "." + this.name + "(" + this.parameters.toPythonSource() + ")";
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.toPythonSource();
    }
  }, {
    key: "applyShadow",
    value: function applyShadow(block) {
      if (block instanceof HTMLElement) {
        var mutationElement = block.firstElementChild;
        var blockChildren = block.children;
        for (var i = 0; i < mutationElement.children.length; i++) {
          var valueElement = blockChildren['ARG' + i];
          if (!valueElement) {
            continue;
          }
          var mutation = mutationElement.children[i].getAttribute('name');
          if (mutation.startsWith('KEYWORD:')) {
            var keywords = mutation.substring(8).split(' ');
            var parameter = this.parameters.findByKeyword(keywords[0]);
            if (parameter) {
              if (parameter.name === keywords[0]) {
                parameter.applyShadow(valueElement);
              } else {
                // Addressed by an alias, so may not be functionally the same
                parameter.applyShadow(valueElement, false);
              }
            }
          } else {
            var _this$parameters;
            (_this$parameters = this.parameters[i + this.argumentOffset]) === null || _this$parameters === void 0 || _this$parameters.applyShadow(valueElement);
          }
        }
      } else {
        for (var _i5 = 0; _i5 < block.arguments_.length; _i5++) {
          var _mutation = block.arguments_[_i5];
          var argBlock = block.getInputTargetBlock('ARG' + _i5);
          if (_mutation.startsWith('KEYWORD:')) {
            var keyword = block.getFieldValue('ARGNAME' + _i5);
            var _parameter2 = this.parameters.findByKeyword(keyword);
            if (_parameter2) {
              if (_parameter2.name === keyword) {
                _parameter2.applyShadow(argBlock);
              } else {
                // Addressed by an alias, so may not be functionally the same
                _parameter2.applyShadow(argBlock, false);
              }
            }
          } else {
            var _this$parameters2;
            (_this$parameters2 = this.parameters[_i5 + this.argumentOffset]) === null || _this$parameters2 === void 0 || _this$parameters2.applyShadow(argBlock);
          }
        }
      }
    }
  }, {
    key: "toToolboxBlock",
    value: function toToolboxBlock(textToBlocks) {
      var pythonSource = this.toPythonSource();
      var result = textToBlocks.convertSource("toolbox.py", pythonSource);
      var blockElement = result.rawXml.children[0];
      // TODO tooltip does not seem to show up
      // blockElement.setAttribute("tooltip", pythonSource);
      return blockElement;
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(textToBlocks) {
      if (this.isAliasOf) {
        return "";
      }
      var toolboxBlock = this.toToolboxBlock(textToBlocks);
      this.applyShadow(toolboxBlock);
      return toolboxBlock.parentNode.innerHTML.toString() + "\n";
    }
  }], [{
    key: "isA",
    value: function isA(signature) {
      return signature.includes("(");
    }
  }, {
    key: "extractName",
    value: function extractName(signature) {
      return signature.split(/[( ]/, 1)[0];
    }
  }]);
}();
var PythonClass = /*#__PURE__*/function () {
  function PythonClass(pythonModule, signature, comment, members) {
    _classCallCheck(this, PythonClass);
    this.pythonModule = pythonModule;
    var endOfSimpleName = signature.indexOf("(");
    if (endOfSimpleName === -1) {
      endOfSimpleName = signature.length;
      this.baseClass = "object";
    } else {
      this.baseClass = signature.substring(endOfSimpleName + 1, signature.indexOf(")")).trim();
    }
    var startOfSimpleName = signature.lastIndexOf(".", endOfSimpleName) + 1;
    if (startOfSimpleName === 0 && signature.startsWith("class ")) {
      startOfSimpleName = 6;
    }
    this.name = signature.substring(startOfSimpleName, endOfSimpleName);
    if (this.name === this.baseClass) {
      this.baseClass = "";
    }
    if (pythonModule.fullName === "") {
      this.fullName = this.name;
      this.requiresImport = "";
    } else {
      this.fullName = pythonModule.fullName + "." + this.name;
      this.requiresImport = this.fullName === this.name ? this.name : this.fullName + " as " + this.name;
    }
    this.colour = pythonModule.library.colour;
    this.members = new Map();

    // Default constructor
    this.members.set("__init__", new PythonConstructorMethod(this, "__init__()", "", null, null));
    var _iterator24 = _createForOfIteratorHelper(members),
      _step24;
    try {
      for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
        var input = _step24.value;
        if (_typeof(input) === "object") {
          if (input.signatures) {
            var _iterator25 = _createForOfIteratorHelper(input.signatures),
              _step25;
            try {
              for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                var _signature2 = _step25.value;
                this.addMember(_signature2, input);
              }
            } catch (err) {
              _iterator25.e(err);
            } finally {
              _iterator25.f();
            }
          } else {
            this.addMember(input.signature, input);
          }
        } else {
          this.addMember(input);
        }
      }
    } catch (err) {
      _iterator24.e(err);
    } finally {
      _iterator24.f();
    }
  }
  return _createClass(PythonClass, [{
    key: "addMember",
    value: function addMember(signature, inputObject) {
      var member;
      var _signature$split7 = signature.split("//", 2),
        _signature$split8 = _slicedToArray(_signature$split7, 2),
        code = _signature$split8[0],
        comment = _signature$split8[1];
      if (PythonFunction.isA(code)) {
        if (PythonConstructorMethod.isA(code)) {
          var _inputObject$colour3;
          member = new PythonConstructorMethod(this, code, this.pythonModule.translateFunctionComment(this.name, comment), (_inputObject$colour3 = inputObject === null || inputObject === void 0 ? void 0 : inputObject.colour) !== null && _inputObject$colour3 !== void 0 ? _inputObject$colour3 : inputObject === null || inputObject === void 0 ? void 0 : inputObject.color, inputObject === null || inputObject === void 0 ? void 0 : inputObject.custom);
          this.colour = member.colour;
        } else {
          var _inputObject$colour4;
          member = new PythonMethod(this, code, this.translateFunctionComment(PythonFunction.extractName(code), comment), (_inputObject$colour4 = inputObject === null || inputObject === void 0 ? void 0 : inputObject.colour) !== null && _inputObject$colour4 !== void 0 ? _inputObject$colour4 : inputObject === null || inputObject === void 0 ? void 0 : inputObject.color, inputObject === null || inputObject === void 0 ? void 0 : inputObject.custom);
          var _iterator26 = _createForOfIteratorHelper(member.aliases),
            _step26;
          try {
            for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
              var alias = _step26.value;
              this.members.set(alias.name, alias);
            }
          } catch (err) {
            _iterator26.e(err);
          } finally {
            _iterator26.f();
          }
        }
      } else {
        var _inputObject$colour5;
        member = new PythonAttribute(this, code, this.translate(PythonAttribute.extractName(code), comment), (_inputObject$colour5 = inputObject === null || inputObject === void 0 ? void 0 : inputObject.colour) !== null && _inputObject$colour5 !== void 0 ? _inputObject$colour5 : inputObject === null || inputObject === void 0 ? void 0 : inputObject.color);
        var _iterator27 = _createForOfIteratorHelper(member.aliases),
          _step27;
        try {
          for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
            var _alias3 = _step27.value;
            this.members.set(_alias3.name, _alias3);
          }
        } catch (err) {
          _iterator27.e(err);
        } finally {
          _iterator27.f();
        }
      }
      this.members.set(member.name, member);
    }
  }, {
    key: "translate",
    value: function translate(memberName, defaultValue) {
      if (memberName === "") {
        return this.pythonModule.translate(this.name, defaultValue);
      }
      return this.pythonModule.translate(this.name + "." + memberName, defaultValue);
    }
  }, {
    key: "translateFunctionComment",
    value: function translateFunctionComment(memberName, defaultValue) {
      if (defaultValue) {
        var _defaultValue$split3 = defaultValue.split("(", 2),
          _defaultValue$split4 = _slicedToArray(_defaultValue$split3, 2),
          toTranslate = _defaultValue$split4[0],
          tail = _defaultValue$split4[1];
        if (tail) {
          return this.translate(memberName, toTranslate) + "(" + tail;
        }
      }
      return this.translate(memberName, defaultValue);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.requiresImport;
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(textToBlocks) {
      var result = "";
      var _iterator28 = _createForOfIteratorHelper(this.members.values()),
        _step28;
      try {
        for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
          var member = _step28.value;
          result += member.toToolbox(textToBlocks);
        }
      } catch (err) {
        _iterator28.e(err);
      } finally {
        _iterator28.f();
      }
      return result;
    }
  }, {
    key: "resolve",
    value: function resolve(name) {
      if (name === this.fullName || name === this.name) {
        return this;
      }
      var memberName;
      if (name.startsWith(this.fullName + ".")) {
        memberName = name.substring(this.fullName.length + 1);
      } else if (name.startsWith(this.name + ".")) {
        memberName = name.substring(this.name.length + 1);
      } else {
        memberName = name;
      }
      var indexOfDot = memberName.indexOf("(");
      var result = this.members.get(indexOfDot === -1 ? memberName : memberName.substring(0, indexOfDot));
      if (!result && this.baseClass !== "") {
        result = this.pythonModule.library.libraries.resolve(this.baseClass + "." + memberName);
      }
      return result;
    }
  }], [{
    key: "isA",
    value: function isA(signature) {
      return signature.startsWith("class ");
    }
  }]);
}(); // TODO static class attributes
var PythonAttribute = /*#__PURE__*/function () {
  function PythonAttribute(pythonClassOrModule, signature, comment, colour) {
    var _resolve_colour3,
      _this10 = this;
    _classCallCheck(this, PythonAttribute);
    this.isAliasOf = null;
    if (pythonClassOrModule instanceof PythonClass) {
      this.pythonClass = pythonClassOrModule;
      this.pythonModule = pythonClassOrModule.pythonModule;
    } else {
      this.pythonClass = null;
      this.pythonModule = pythonClassOrModule;
    }
    var _signature$trim$split = signature.trim().split(":", 2),
      _signature$trim$split2 = _slicedToArray(_signature$trim$split, 2),
      names = _signature$trim$split2[0],
      typeHint = _signature$trim$split2[1];
    this.names = names.trim().split(" ");
    this.labels = _toConsumableArray(this.names);
    this.name = this.names[0];
    this.fullName = pythonClassOrModule.fullName === "" ? this.name : pythonClassOrModule.fullName + "." + this.name;
    this.typeHint = typeHint ? new PythonTypeHint(this.pythonModule.library.libraries, typeHint) : null;
    this.colour = this.pythonModule.library.libraries.convertColour("ast_Attribute", (_resolve_colour3 = _resolve_colour(colour)) !== null && _resolve_colour3 !== void 0 ? _resolve_colour3 : pythonClassOrModule.colour, this.fullName);
    if ((comment !== null && comment !== void 0 ? comment : "").trim() === "") {
      this.premessage = this.pythonClass == null ? "" : this.pythonClass.translate("", this.pythonClass.name);
      this.message = this.pythonClass == null && this.pythonModule.fullName === "" ? "" : ".";
      this.postmessage = "";
    } else {
      var _splitPremessageMessa3 = splitPremessageMessagePostmessage(comment);
      var _splitPremessageMessa4 = _slicedToArray(_splitPremessageMessa3, 3);
      this.premessage = _splitPremessageMessa4[0];
      this.message = _splitPremessageMessa4[1];
      this.postmessage = _splitPremessageMessa4[2];
      if (this.premessage === "" && this.pythonClass !== null) {
        this.premessage = this.pythonClass.translate("", this.pythonClass.name);
      }
      var messageParts = this.message.split(/\{([^}]+)\}/, 3);
      if (messageParts.length > 1) {
        this.message = messageParts[0];
        var labels = messageParts[1].split('|');
        var _iterator29 = _createForOfIteratorHelper(labels.entries()),
          _step29;
        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            var _step29$value = _slicedToArray(_step29.value, 2),
              index = _step29$value[0],
              label = _step29$value[1];
            this.labels[index] = label.trim();
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }
        this.postmessage = messageParts[2] + this.postmessage;
      }
    }
    this.label = this.labels[0];
    this.aliases = this.names.slice(1).map(function (name, index) {
      var _this10$typeHint;
      var result = new PythonAttribute(pythonClassOrModule, name + ':' + ((_this10$typeHint = _this10.typeHint) !== null && _this10$typeHint !== void 0 ? _this10$typeHint : ""), comment, colour);
      result.isAliasOf = _this10;
      result.names = _this10.names;
      result.labels = _this10.labels;
      result.label = _this10.labels[index + 1];
      return result;
    });
  }
  return _createClass(PythonAttribute, [{
    key: "toPythonSource",
    value: function toPythonSource() {
      if (this.pythonClass == null) {
        if (this.pythonModule.fullName === "") {
          return this.name;
        }
        return this.pythonModule.fullName + "." + this.name;
      }
      return __BLANK + "." + this.name;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.toPythonSource();
    }
  }, {
    key: "toToolboxBlock",
    value: function toToolboxBlock(textToBlocks) {
      var blockElement;
      if (this.pythonClass !== null) {
        var originalVariables = textToBlocks.variables;
        try {
          textToBlocks.variables = new TypesRegistry();
          textToBlocks.variables.add(this.pythonClass.fullName, python.pythonGenerator.blank);
          var result = textToBlocks.convertSource("toolbox.py", this.toPythonSource());
          blockElement = result.rawXml.children[0];
        } finally {
          textToBlocks.variables = originalVariables;
        }
      } else {
        var _result = textToBlocks.convertSource("toolbox.py", this.toPythonSource());
        blockElement = _result.rawXml.children[0];
      }
      if (this.typeHint) {
        blockElement.setAttribute("output", this.typeHint.flattened().toString());
      }
      return blockElement;
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(textToBlocks) {
      return this.toToolboxBlock(textToBlocks).parentNode.innerHTML.toString() + "\n";
    }
  }], [{
    key: "isA",
    value: function isA(signature) {
      return !signature.includes("(") && !signature.startsWith("type ");
    }
  }, {
    key: "extractName",
    value: function extractName(signature) {
      return signature.split(/[: ]/, 1)[0];
    }
  }]);
}();
var PythonMethod = /*#__PURE__*/function (_PythonFunction) {
  function PythonMethod(pythonClassOrMethod, signature, comment, colour, custom) {
    var _this11;
    _classCallCheck(this, PythonMethod);
    _this11 = _callSuper(this, PythonMethod, [pythonClassOrMethod instanceof PythonMethod ? pythonClassOrMethod : pythonClassOrMethod.pythonModule, signature, comment, colour, custom]);
    if (pythonClassOrMethod instanceof PythonMethod) {
      var original = pythonClassOrMethod;
      _this11.pythonClass = original.pythonClass;
      _this11.staticmethod = original.staticmethod;
      _this11.classmethod = original.classmethod;
      _this11.fullName = _this11.pythonClass.fullName + "." + _this11.name;
    } else {
      _this11.pythonClass = pythonClassOrMethod;
      _this11.fullName = _this11.pythonClass.fullName + "." + _this11.name;
      if ((comment !== null && comment !== void 0 ? comment : "").trim() === "") {
        _this11.message = ".";
      }
      if (_this11.parameters.length === 0) {
        _this11.staticmethod = true;
        _this11.classmethod = false;
      } else if (_this11.parameters[0].name === "self") {
        _this11.staticmethod = false;
        _this11.classmethod = false;
      } else if (_this11.parameters[0].name === "cls") {
        _this11.staticmethod = false;
        _this11.classmethod = true;
      } else {
        _this11.staticmethod = true;
        _this11.classmethod = false;
      }
      if (_this11.premessage === "" && !(_this11.classmethod || _this11.staticmethod)) {
        _this11.premessage = _this11.pythonClass.translate("", _this11.pythonClass.name);
      }
      _this11.argumentOffset = _this11.staticmethod ? 0 : 1;
      _this11.colour = _this11.pythonClass.pythonModule.library.libraries.convertColour("ast_Call", _this11.colour, _this11.fullName);
      if (_this11.constructor === PythonMethod) {
        _this11.custom = _resolveFunction(custom, _this11.fullName);
        _this11.createAliases();
      }
    }
    return _this11;
  }
  _inherits(PythonMethod, _PythonFunction);
  return _createClass(PythonMethod, [{
    key: "toPythonSource",
    value: function toPythonSource() {
      if (this.staticmethod || this.classmethod) {
        return this.pythonClass.fullName + "." + this.name + "(" + this.parameters.toPythonSource() + ")";
      }
      return __BLANK + "." + this.name + "(" + this.parameters.toPythonSource() + ")";
    }
  }, {
    key: "toToolboxBlock",
    value: function toToolboxBlock(textToBlocks) {
      var originalVariables = textToBlocks.variables;
      var blockElement;
      try {
        textToBlocks.variables = new TypesRegistry();
        textToBlocks.variables.add(this.pythonClass.fullName, __BLANK);
        blockElement = _superPropGet(PythonMethod, "toToolboxBlock", this, 3)([textToBlocks]);
      } finally {
        textToBlocks.variables = originalVariables;
      }
      return blockElement;
    }
  }]);
}(PythonFunction);
var PythonConstructorMethod = /*#__PURE__*/function (_PythonMethod) {
  function PythonConstructorMethod(pythonClass, signature, comment, colour, custom) {
    var _this12;
    _classCallCheck(this, PythonConstructorMethod);
    _this12 = _callSuper(this, PythonConstructorMethod, [pythonClass, signature, comment, colour, custom]);
    _this12.typeHint = new PythonTypeHint(pythonClass.pythonModule.library.libraries, pythonClass.fullName);
    if ((comment !== null && comment !== void 0 ? comment : "").trim() === "") {
      _this12.label = pythonClass === null || pythonClass === void 0 ? void 0 : pythonClass.name;
      _this12.message = "";
    }
    return _this12;
  }
  _inherits(PythonConstructorMethod, _PythonMethod);
  return _createClass(PythonConstructorMethod, [{
    key: "toPythonSource",
    value: function toPythonSource() {
      return this.pythonClass.fullName + "(" + this.parameters.toPythonSource() + ")";
    }
  }], [{
    key: "isA",
    value: function isA(signature) {
      return /^__init__\(\s*self\s*[,)]\s*/.test(signature);
    }
  }]);
}(PythonMethod);
var Library = /*#__PURE__*/function () {
  function Library(name, libraryConfiguration, libraries) {
    _classCallCheck(this, Library);
    this.name = name;
    this.libraries = libraries;
    this.modules = new Map();
    this.colour = libraries.defaultColor;
    this.toolbox = null;
    var classes = [];
    for (var classOrModuleDef in libraryConfiguration) {
      var _classOrModuleDef$spl = classOrModuleDef.split("//", 2),
        _classOrModuleDef$spl2 = _slicedToArray(_classOrModuleDef$spl, 2),
        _name2 = _classOrModuleDef$spl2[0],
        comment = _classOrModuleDef$spl2[1];
      if (_name2.startsWith("__")) {
        // Library metadata
        if (_name2 === "__colour" || _name2 === "__color") {
          this.colour = libraries.convertColour("library", _resolve_colour(libraryConfiguration[_name2]), _name2);
        } else if (_name2 === "__toolbox") {
          this.toolbox = libraryConfiguration[_name2];
        }
      } else if (PythonClass.isA(_name2)) {
        classes.push(classOrModuleDef);
      } else {
        var members = libraryConfiguration[classOrModuleDef];
        if (members.some(function (member) {
          return PythonConstructorMethod.isA(member);
        })) {
          classes.push(classOrModuleDef);
        } else {
          var _module = new PythonModule(this, _name2, comment, members);
          this.modules.set(_module.fullName, _module);
        }
      }
    }
    for (var _i6 = 0, _classes = classes; _i6 < _classes.length; _i6++) {
      var _PythonModule$extract;
      var classDef = _classes[_i6];
      var _classDef$split = classDef.split("//", 2),
        _classDef$split2 = _slicedToArray(_classDef$split, 2),
        signature = _classDef$split2[0],
        _comment3 = _classDef$split2[1];
      var moduleName = (_PythonModule$extract = PythonModule.extractName(signature)) !== null && _PythonModule$extract !== void 0 ? _PythonModule$extract : "";
      var pythonModule = this.modules.get(moduleName);
      if (!pythonModule) {
        pythonModule = new PythonModule(this, moduleName);
        this.modules.set(moduleName, pythonModule);
      }
      var pythonClass = new PythonClass(pythonModule, signature, _comment3, libraryConfiguration[classDef]);
      pythonModule.members.set(pythonClass.name, pythonClass);
    }
  }
  return _createClass(Library, [{
    key: "_shouldShowToolbox",
    value: function _shouldShowToolbox(imports) {
      if (this.toolbox === false || this.toolbox === true) {
        return this.toolbox;
      }
      if (imports) {
        var _iterator30 = _createForOfIteratorHelper(imports.types()),
          _step30;
        try {
          for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
            var importedType = _step30.value;
            var _iterator31 = _createForOfIteratorHelper(this.modules.values()),
              _step31;
            try {
              for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
                var _module2 = _step31.value;
                if (_module2.resolve(importedType) !== null) {
                  return true;
                }
              }
            } catch (err) {
              _iterator31.e(err);
            } finally {
              _iterator31.f();
            }
          }
        } catch (err) {
          _iterator30.e(err);
        } finally {
          _iterator30.f();
        }
        return false;
      }
      return true;
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(textToBlocks) {
      if (!this._shouldShowToolbox(textToBlocks.imports)) {
        return "";
      }
      var categoryXml = "<category name=\"".concat(this.name, "\">"); // TODO color
      var _iterator32 = _createForOfIteratorHelper(this.modules.values()),
        _step32;
      try {
        for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
          var _module3 = _step32.value;
          categoryXml += _module3.toToolbox(textToBlocks);
        }
      } catch (err) {
        _iterator32.e(err);
      } finally {
        _iterator32.f();
      }
      categoryXml += "</category>";
      return categoryXml;
    }
  }, {
    key: "registerImports",
    value: function registerImports(typeRegistry) {
      var _iterator33 = _createForOfIteratorHelper(this.modules.values()),
        _step33;
      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var _module4 = _step33.value;
          if (_module4.fullName === "") {
            continue;
          }
          _module4.registerImports(typeRegistry);
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
      }
    }
  }, {
    key: "translate",
    value: function translate(identifier, defaultValue) {
      return this.libraries.translate(identifier, defaultValue, this.name.split(" ", 1)[0]);
    }
  }]);
}();
var Libraries = /*#__PURE__*/function (_Map) {
  function Libraries(librariesConfiguration, translate, convertColour) {
    var _this13;
    _classCallCheck(this, Libraries);
    _this13 = _callSuper(this, Libraries);
    _this13.translate_from_config = translate !== null && translate !== void 0 ? translate : function (identifier, defaultValue) {
      return defaultValue;
    };
    _this13.convertColour = convertColour !== null && convertColour !== void 0 ? convertColour : function (type, defaultValue, fromLibrary) {
      return defaultValue;
    };
    _this13.defaultColor = _this13.convertColour("libraries", _resolve_colour("FUNCTIONS"));
    for (var name in librariesConfiguration) {
      _this13.set(name, new Library(name, librariesConfiguration[name], _this13));
    }
    return _this13;
  }
  _inherits(Libraries, _Map);
  return _createClass(Libraries, [{
    key: "findModulesByName",
    value: function findModulesByName(moduleName) {
      return Array.from(this.values()).map(function (library) {
        return library.modules.get(moduleName);
      }).filter(function (module) {
        return module;
      });
    }
  }, {
    key: "toToolbox",
    value: function toToolbox(textToBlocks) {
      var result = "";
      var _iterator34 = _createForOfIteratorHelper(this.values()),
        _step34;
      try {
        for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
          var library = _step34.value;
          result += library.toToolbox(textToBlocks);
        }
      } catch (err) {
        _iterator34.e(err);
      } finally {
        _iterator34.f();
      }
      return result;
    }
  }, {
    key: "resolve",
    value: function resolve(fullName) {
      var moduleName = PythonModule.extractName(fullName);
      var foundModules = this.findModulesByName(moduleName);
      if (!foundModules.length && moduleName.includes('.')) {
        // Last part may be an attribute
        foundModules = this.findModulesByName(moduleName.substring(0, moduleName.lastIndexOf('.')));
      }
      if (!foundModules.length) {
        // Might not contain a module name, check the built-ins
        foundModules = this.findModulesByName('');
      }
      var _iterator35 = _createForOfIteratorHelper(foundModules),
        _step35;
      try {
        for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
          var foundModule = _step35.value;
          var found = foundModule.resolve(fullName);
          if (found) {
            return found;
          }
        }
      } catch (err) {
        _iterator35.e(err);
      } finally {
        _iterator35.f();
      }
      return null;
    }
  }, {
    key: "registerImports",
    value: function registerImports(typeRegistry) {
      var _iterator36 = _createForOfIteratorHelper(this.values()),
        _step36;
      try {
        for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
          var library = _step36.value;
          library.registerImports(typeRegistry);
        }
      } catch (err) {
        _iterator36.e(err);
      } finally {
        _iterator36.f();
      }
    }
  }, {
    key: "translate",
    value: function translate(identifier, defaultValue, namespace) {
      return this.translate_from_config(identifier, defaultValue || " ", namespace).trim();
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Map));
function unquote(value) {
  if (value.length >= 2) {
    var firstChar = value.charAt(0);
    var lastChar = value.charAt(value.length - 1);
    if (firstChar === "'" && lastChar === "'" || firstChar === '"' && lastChar === '"') {
      return value.slice(1, -1);
    }
  }
  return value;
}
function fieldFactoryForLiteral(typeHint) {
  return function (block, fieldName) {
    return new Blockly.FieldDropdown(function () {
      var result = typeHint.flattened().typeParams.map(function (typeParam) {
        var unquotedTypeParam = unquote(typeParam);
        return [unquotedTypeParam, unquotedTypeParam];
      });
      var currentValue = block.getFieldValue(fieldName);
      if (!result.some(function (item) {
        return item[1] === currentValue;
      })) {
        result.unshift([currentValue, currentValue]);
      }
      return result;
    });
  };
}
function updateBlockFieldFactory(block, pythonTypeNames, render) {
  var fieldFactoryBefore = block.fieldFactory_;
  block.fieldFactory_ = "";
  if (block.parentBlock_ !== null && block.parentBlock_.fromLibrary_ !== "") {
    var argInput = block.parentBlock_.inputWithBlock = block.parentBlock_.getInputWithBlock(block);
    if (argInput) {
      var argName = argInput.name;
      if (argName.startsWith("ARG")) {
        var argIndex = Number(argName.substring(3));
        var argumentInfo = block.parentBlock_.argumentInfo[argIndex];
        var _argumentInfo$split = argumentInfo.split(" ", 2),
          _argumentInfo$split2 = _slicedToArray(_argumentInfo$split, 2),
          fullFunctionName = _argumentInfo$split2[0],
          parameterKeyword = _argumentInfo$split2[1];
        var pythonFunction = block.workspace.libraries.resolve(fullFunctionName);
        if (pythonFunction instanceof PythonFunction) {
          var _parameter3;
          var parameter;
          if (parameterKeyword) {
            parameter = pythonFunction.parameters.findByKeyword(parameterKeyword);
          } else {
            parameter = pythonFunction.parameters[argIndex + pythonFunction.argumentOffset];
          }
          var typeHint = (_parameter3 = parameter) === null || _parameter3 === void 0 ? void 0 : _parameter3.typeHint;
          if (typeHint) {
            var typeAliases = typeHint.referencedTypeAliases();
            var _iterator37 = _createForOfIteratorHelper(typeAliases),
              _step37;
            try {
              var _loop4 = function _loop4() {
                var typeAlias = _step37.value;
                if (pythonTypeNames.some(function (pythonTypeName) {
                  return typeAlias.matches(pythonTypeName);
                })) {
                  block.fieldFactory_ = typeAlias.fieldFactory;
                  return 1; // break
                }
              };
              for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
                if (_loop4()) break;
              }

              // TODO case with Literal[...] | None
            } catch (err) {
              _iterator37.e(err);
            } finally {
              _iterator37.f();
            }
            if (block.fieldFactory_ === "" && typeHint.flattened().isLiteral()) {
              block.fieldFactory_ = fieldFactoryForLiteral(typeHint);
            }
          }
        }
      }
    }
  }
  if (block.fieldFactory_ !== fieldFactoryBefore) {
    block.updateShape_();
    if (render) {
      block.render();
    }
  }
}
function initBlockFieldFactory(block, pythonTypeNames) {
  block.onchange = function (changeEvent) {
    if (changeEvent instanceof Blockly.Events.BlockMove) {
      updateBlockFieldFactory(block, pythonTypeNames, false);
    }
  };
  setTimeout(function () {
    updateBlockFieldFactory(block, pythonTypeNames, true);
  });
}
if (typeof module !== 'undefined') {
  module.exports = {
    Libraries: Libraries,
    Library: Library,
    PythonAttribute: PythonAttribute,
    PythonClass: PythonClass,
    PythonConstructorMethod: PythonConstructorMethod,
    PythonFunction: PythonFunction,
    PythonMethod: PythonMethod,
    PythonModule: PythonModule,
    PythonParameter: PythonParameter,
    PythonParameters: PythonParameters,
    PythonTypeHint: PythonTypeHint,
    PythonTypeAliasType: PythonTypeAliasType
  };
}
BlockMirrorTextToBlocks['ast_Image'] = function (node, parent, textToBlocks) {
  if (!textToBlocks.blockMirror.configuration.imageMode) {
    throw "Not using image constructor";
  }
  if (node.args.length !== 1) {
    throw "More than one argument to Image constructor";
  }
  if (node.args[0]._astname !== "Str") {
    throw "First argument for Image constructor must be string literal";
  }
  return BlockMirrorTextToBlocks.create_block("ast_Image", node.lineno, {}, {}, {}, {
    "@src": Sk.ffi.remapToJs(node.args[0].s)
  });
};

// TODO handle turtle when not in standard mode
var turtle_angle_units = new Set();
var state_for_source = "";
function _reset_source_state(textToBlocks) {
  if (textToBlocks.filename === '__main__.py' && textToBlocks.source !== state_for_source) {
    turtle_angle_units.clear();
    state_for_source = textToBlocks.source;
  }
}
BlockMirrorTextToBlocks['turtleDegrees'] = function (node, parent, textToBlocks) {
  if (textToBlocks.filename === '___main__.py') {
    _reset_source_state(textToBlocks);
    if (node.args.length === 1 && node.args[0]._astname === "Num") {
      turtle_angle_units.add(Sk.ffi.remapToJs(node.args[0].n));
    } else {
      turtle_angle_units.add(360);
    }
  }
};
BlockMirrorTextToBlocks['turtleRadians'] = function (node, parent, textToBlocks) {
  if (textToBlocks.filename === '___main__.py') {
    _reset_source_state(textToBlocks);
    turtle_angle_units.add(2 * Math.PI);
  }
};
if (typeof registerFieldAngle === "function") {
  var _turtleAngleField = function _turtleAngleField(block, clockwise) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 90;
    if (block.type === 'ast_Num' && turtle_angle_units.size <= 1) {
      if (turtle_angle_units.size === 0) {
        return new FieldAngle(0, null, {
          offset: offset,
          clockwise: clockwise,
          precision: .5
        });
      } else {
        var value = turtle_angle_units.values().next().value;

        // TODO other values not currently supported, defaults to standard field
        if (value === 360) {
          return new FieldAngle(0, null, {
            offset: offset,
            clockwise: clockwise,
            precision: .5
          });
        } else if (value === 2 * Math.PI) {
          return new FieldAngle(0, null, {
            offset: offset,
            clockwise: clockwise,
            min: 0,
            max: 2 * Math.PI,
            displayMin: 0,
            displayMax: 2 * Math.PI,
            minorTick: Math.PI / 16,
            majorTick: Math.PI / 8,
            symbol: ' rad',
            precision: 0.01
          });
        }
      }
    }
  };
  registerFieldAngle();
  BlockMirrorTextToBlocks['turtleAngleFieldLeft'] = function (block, _fieldName) {
    return _turtleAngleField(block, false);
  };
  BlockMirrorTextToBlocks['turtleAngleFieldRight'] = function (block, _fieldName) {
    return _turtleAngleField(block, true);
  };
  BlockMirrorTextToBlocks['turtleAngleFieldHeading'] = function (block, _fieldName) {
    return _turtleAngleField(block, false, 0);
  };
} else {
  BlockMirrorTextToBlocks['turtleAngleFieldLeft'] = function (_block, _fieldName) {};
  BlockMirrorTextToBlocks['turtleAngleFieldRight'] = function (_block, _fieldName) {};
  BlockMirrorTextToBlocks['turtleAngleFieldHeading'] = function (_block, _fieldName) {};
}
if (typeof FieldColourHsvSliders === "function") {
  BlockMirrorTextToBlocks['turtleColorField'] = function (block, _fieldName) {
    if (block.type === 'ast_Str') {
      return new FieldColourHsvSliders();
    }
  };
} else {
  BlockMirrorTextToBlocks['turtleColorField'] = function (_block, _fieldName) {};
}
var ZERO_BLOCK = BlockMirrorTextToBlocks.create_block('ast_Num', null, {
  'NUM': 0
});
BlockMirrorBlockEditor.EXTRA_TOOLS = {};
var TOOLBOX_CATEGORY = {};
TOOLBOX_CATEGORY.VARIABLES = {
  name: 'Variables',
  colour: 'VARIABLES',
  custom: 'VARIABLE'
};
TOOLBOX_CATEGORY.DECISIONS = {
  name: "Decisions",
  colour: "LOGIC",
  blocks: ['if ___: pass', 'if ___: pass\nelse: pass', '___ < ___', '___ and ___', 'not ___']
};
TOOLBOX_CATEGORY.CALCULATIONS = {
  name: "Calculation",
  colour: "MATH",
  blocks: ["___ + ___", "round(___)"]
};
TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING = {
  name: "Output",
  colour: "PLOTTING",
  blocks: ["print(___)", "plt.plot(___)", "plt.scatter(___, ___)", "plt.hist(___)", "plt.bar(___, ___)", "plt.boxplot(___)", "plt.show()", "plt.title(___)", "plt.xlabel(___)", "plt.ylabel(___)", "plt.hlines(___, ___, ___)", "plt.vlines(___, ___, ___)"]
};
TOOLBOX_CATEGORY.TURTLES = {
  name: "Turtles",
  colour: "PLOTTING",
  blocks: ["turtle.mainloop()", "turtle.forward(50)", "turtle.backward(50)", "turtle.right(90)", "turtle.left(90)", "turtle.goto(0, 0)", "turtle.setx(100)", "turtle.sety(100)", "turtle.setheading(270)", "turtle.pendown()", "turtle.penup()", "turtle.pencolor('blue')"]
};
TOOLBOX_CATEGORY.INPUT = {
  name: "Input",
  colour: "TEXT",
  blocks: ["input('')"]
};
TOOLBOX_CATEGORY.VALUES = {
  name: "Values",
  colour: "TEXT",
  blocks: ['""', "0", "True"]
};
TOOLBOX_CATEGORY.SEP = "<sep></sep>";
TOOLBOX_CATEGORY.CONVERSIONS = {
  name: "Conversion",
  colour: "TEXT",
  blocks: ["int(___)", "float(___)", "str(___)", "bool(___)"]
};
TOOLBOX_CATEGORY.DICTIONARIES = {
  name: "Dictionaries",
  colour: "DICTIONARY",
  blocks: ["{'1st key': ___, '2nd key': ___, '3rd key': ___}", "{}", "___['key']"]
};
BlockMirrorBlockEditor.prototype.TOOLBOXES = {
  //******************************************************
  'empty': [{
    "name": "Empty Toolbox",
    "colour": "PYTHON",
    "blocks": []
  }],
  //******************************************************
  'minimal': [
  // TODO: What should live in here?
  TOOLBOX_CATEGORY.VARIABLES],
  //******************************************************
  'normal': [TOOLBOX_CATEGORY.VARIABLES, TOOLBOX_CATEGORY.DECISIONS, {
    name: "Iteration",
    colour: "CONTROL",
    blocks: ['for ___ in ___: pass', 'while ___: pass', 'break']
  }, {
    name: "Functions",
    colour: "FUNCTIONS",
    blocks: ["def ___(___): pass", "def ___(___: int)->str: pass", "return ___"]
  }, TOOLBOX_CATEGORY.SEP, TOOLBOX_CATEGORY.CALCULATIONS, TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING, TOOLBOX_CATEGORY.INPUT, TOOLBOX_CATEGORY.TURTLES, TOOLBOX_CATEGORY.SEP, TOOLBOX_CATEGORY.VALUES, TOOLBOX_CATEGORY.CONVERSIONS, {
    name: "Lists",
    colour: "LIST",
    blocks: ["[0, 0, 0]", "[___, ___, ___]", "[]", "___.append(___)", "range(0, 10)"]
  }, TOOLBOX_CATEGORY.DICTIONARIES],
  //******************************************************
  'ct': [TOOLBOX_CATEGORY.VARIABLES, TOOLBOX_CATEGORY.DECISIONS, {
    name: "Iteration",
    colour: "CONTROL",
    blocks: ['for ___ in ___: pass']
  }, TOOLBOX_CATEGORY.SEP, TOOLBOX_CATEGORY.CALCULATIONS, TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING, TOOLBOX_CATEGORY.INPUT, TOOLBOX_CATEGORY.SEP, TOOLBOX_CATEGORY.VALUES, TOOLBOX_CATEGORY.CONVERSIONS, {
    name: "Lists",
    colour: "LIST",
    blocks: ["[0, 0, 0]", "[___, ___, ___]", "[]", "___.append(___)"]
  }],
  //******************************************************
  'full': [TOOLBOX_CATEGORY.VARIABLES, {
    name: "Literal Values",
    colour: "LIST",
    blocks: ["0", "''", "True", "None", "[___, ___, ___]", "(___, ___, ___)", "{___, ___, ___}", "{___: ___, ___: ___, ___: ___}"]
  }, {
    name: "Calculations",
    colour: "MATH",
    blocks: ["-___", "___ + ___", "___ >> ___", "abs(___)", "round(___)"]
  }, {
    name: "Logic",
    colour: "LOGIC",
    blocks: ['___ if ___ else ___', '___ == ___', '___ < ___', '___ in ___', '___ and ___', 'not ___']
  }, TOOLBOX_CATEGORY.SEP, {
    name: "Classes",
    colour: "OO",
    blocks: ["class ___: pass", "class ___(___): pass", "___.___", "___: ___", "super()"]
  }, {
    name: "Functions",
    colour: "FUNCTIONS",
    blocks: ["def ___(___): pass", "def ___(___: int)->str: pass", "return ___", "yield ___", "lambda ___: ___"]
  }, {
    name: "Imports",
    colour: "PYTHON",
    blocks: ["import ___", "from ___ import ___", "import ___ as ___", "from ___ import ___ as ___"]
  }, TOOLBOX_CATEGORY.SEP, {
    name: "Control Flow",
    colour: "CONTROL",
    blocks: ['if ___: pass', 'if ___: pass\nelse: pass', 'for ___ in ___: pass', 'while ___: pass', 'break', 'continue', 'try: pass\nexcept ___ as ___: pass', 'raise ___', 'assert ___', 'with ___ as ___: pass']
  }, TOOLBOX_CATEGORY.SEP, TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING, TOOLBOX_CATEGORY.INPUT, {
    name: "Files",
    colour: "FILE",
    blocks: ["with open('', 'r') as ___: pass", "___.read()", "___.readlines()", "___.write(___)", "___.writelines(___)"]
  }, TOOLBOX_CATEGORY.SEP, {
    name: "Conversion",
    colour: "TEXT",
    blocks: ["int(___)", "float(___)", "str(___)", "chr(___)", "bool(___)", "list(___)", "dict(___)", "tuple(___)", "set(___)", "type(___)", "isinstance(___)"]
  }, {
    name: "Builtin Functions",
    colour: "SEQUENCES",
    blocks: ["len(___)", "sorted(___)", "enumerate(___)", "reversed(___)", "range(0, 10)", "min(___, ___)", "max(___, ___)", "sum(___)", "all(___)", "any(___)", "zip(___, ___)", "map(___, ___)", "filter(___, ___)"]
  }, {
    name: "List Methods",
    colour: "LIST",
    blocks: ["___.append(___)", "___.pop()", "___.clear()"]
  }, {
    name: "String Methods",
    colour: "TEXT",
    blocks: ["___.startswith('')", "___.endswith('')", "___.replace('', '')", "___.lower('')", "___.upper('')", "___.title('')", "___.strip('')", "___.split('')", "''.join(___)", "___.format('')", "___.strip('')"]
  }, {
    name: "Subscripting",
    colour: "SEQUENCES",
    blocks: ["___[___]", "___[___:___]", "___[___:___:___]"]
  }, {
    name: "Generators",
    colour: "SEQUENCES",
    blocks: ["[___ for ___ in ___]", "(___ for ___ in ___)", "{___ for ___ in ___}", "{___: ___ for ___ in ___ if ___}", "[___ for ___ in ___ if ___]", "(___ for ___ in ___ if ___)", "{___ for ___ in ___ if ___}", "{___: ___ for ___ in ___ if ___}"]
  }, {
    name: "Comments",
    colour: "PYTHON",
    blocks: ["# ", '"""\n"""']
  } /*,
    {name: "Weird Stuff", colour: "PYTHON", blocks: [
      "delete ___",
      "global ___"
    ]}*/],
  //******************************************************
  'ct2': [{
    name: 'Memory',
    colour: 'VARIABLES',
    custom: 'VARIABLE',
    hideGettersSetters: true
  }, TOOLBOX_CATEGORY.SEP, '<category name="Expressions" expanded="true">', {
    name: "Constants",
    colour: "TEXT",
    blocks: ['""', "0", "True", "[0, 0, 0]", "[___, ___, ___]", "[]"]
  }, {
    name: "Variables",
    colour: "VARIABLES",
    blocks: ["VARIABLE"]
  }, TOOLBOX_CATEGORY.CALCULATIONS, TOOLBOX_CATEGORY.CONVERSIONS, {
    name: "Conditions",
    colour: "LOGIC",
    blocks: ['___ == ___', '___ and ___', 'not ___']
  }, TOOLBOX_CATEGORY.INPUT, '</category>', TOOLBOX_CATEGORY.SEP, '<category name="Operations" expanded="true">', {
    name: "Assignment",
    colour: "VARIABLES",
    blocks: ["VARIABLE = ___", "___.append(___)"]
  }, TOOLBOX_CATEGORY.OUTPUT_WITH_PLOTTING, '</category>', TOOLBOX_CATEGORY.SEP, '<category name="Control" expanded="true">', {
    name: "Decision",
    colour: "CONTROL",
    blocks: ['if ___: pass', 'if ___: pass\nelse: pass']
  }, {
    name: "Iteration",
    colour: "CONTROL",
    blocks: ['for ___ in ___: pass']
  }, '</category>']
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_For",
  "message0": "for each item %1 in list %2 : %3 %4",
  "args0": [{
    "type": "input_value",
    "name": "TARGET"
  }, {
    "type": "input_value",
    "name": "ITER"
  }, {
    "type": "input_dummy"
  }, {
    "type": "input_statement",
    "name": "BODY"
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_ForElse",
  "message0": "for each item %1 in list %2 : %3 %4 else: %5 %6",
  "args0": [{
    "type": "input_value",
    "name": "TARGET"
  }, {
    "type": "input_value",
    "name": "ITER"
  }, {
    "type": "input_dummy"
  }, {
    "type": "input_statement",
    "name": "BODY"
  }, {
    "type": "input_dummy"
  }, {
    "type": "input_statement",
    "name": "ELSE"
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL
});
python.pythonGenerator.forBlock['ast_For'] = function (block, generator) {
  // For each loop.
  var argument0 = python.pythonGenerator.valueToCode(block, 'TARGET', python.Order.RELATIONAL) || python.pythonGenerator.blank;
  var argument1 = python.pythonGenerator.valueToCode(block, 'ITER', python.Order.RELATIONAL) || python.pythonGenerator.blank;
  var branchBody = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  var code = 'for ' + argument0 + ' in ' + argument1 + ':\n' + branchBody;
  if (block.getInputTargetBlock('ELSE')) {
    var branchElse = python.pythonGenerator.statementToCode(block, 'ELSE');
    if (branchElse) {
      code += 'else:\n' + branchElse;
    }
  }
  return code;
};
BlockMirrorTextToBlocks.prototype['ast_For'] = function (node, parent) {
  var target = node.target;
  var iter = node.iter;
  var body = node.body;
  var orelse = node.orelse;
  var blockName = 'ast_For';
  var bodies = {
    'BODY': this.convertBody(body, node)
  };
  if (orelse.length > 0) {
    blockName = "ast_ForElse";
    bodies['ELSE'] = this.convertBody(orelse, node);
  }
  return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {}, {
    "ITER": this.convert(iter, node),
    "TARGET": this.convert(target, node)
  }, {}, {}, bodies);
};
python.pythonGenerator.forBlock['ast_ForElse'] = python.pythonGenerator.forBlock['ast_For'];
BlockMirrorTextToBlocks.prototype['ast_ForElse'] = BlockMirrorTextToBlocks.prototype['ast_For'];
Blockly.Blocks['ast_If'] = {
  init: function init() {
    this.orelse_ = 0;
    this.elifs_ = 0;
    this.appendValueInput('TEST').appendField(this.translateText("if"));
    this.appendStatementInput("BODY").setCheck(null).setAlign(Blockly.inputs.Align.RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.LOGIC));
    this.updateShape_();
  },
  // TODO: Not mutable currently
  updateShape_: function updateShape_() {
    var latestInput = "BODY";
    for (var i = 0; i < this.elifs_; i++) {
      if (!this.getInput('ELIF' + i)) {
        this.appendValueInput('ELIFTEST' + i).appendField('elif');
        this.appendStatementInput("ELIFBODY" + i).setCheck(null);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ELIFTEST' + i)) {
      this.removeInput('ELIFTEST' + i);
      this.removeInput('ELIFBODY' + i);
      i++;
    }
    if (this.orelse_ && !this.getInput('ELSE')) {
      this.appendDummyInput('ORELSETEST').appendField(this.translateText("else:"));
      this.appendStatementInput("ORELSEBODY").setCheck(null);
    } else if (!this.orelse_ && this.getInput('ELSE')) {
      block.removeInput('ORELSETEST');
      block.removeInput('ORELSEBODY');
    }
    for (i = 0; i < this.elifs_; i++) {
      if (this.orelse_) {
        this.moveInputBefore('ELIFTEST' + i, 'ORELSETEST');
        this.moveInputBefore('ELIFBODY' + i, 'ORELSETEST');
      } else if (i + 1 < this.elifs_) {
        this.moveInputBefore('ELIFTEST' + i, 'ELIFTEST' + (i + 1));
        this.moveInputBefore('ELIFBODY' + i, 'ELIFBODY' + (i + 1));
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('orelse', this.orelse_);
    container.setAttribute('elifs', this.elifs_);
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.orelse_ = "true" === xmlElement.getAttribute('orelse');
    this.elifs_ = parseInt(xmlElement.getAttribute('elifs'), 10) || 0;
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_If'] = function (block, generator) {
  // Test
  var test = "if " + (python.pythonGenerator.valueToCode(block, 'TEST', python.Order.NONE) || python.pythonGenerator.blank) + ":\n";
  // Body:
  var body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  // Elifs
  var elifs = new Array(block.elifs_);
  for (var i = 0; i < block.elifs_; i++) {
    var elif = block.elifs_[i];
    var clause = "elif " + (python.pythonGenerator.valueToCode(block, 'ELIFTEST' + i, python.Order.NONE) || python.pythonGenerator.blank);
    clause += ":\n" + (python.pythonGenerator.statementToCode(block, 'ELIFBODY' + i) || python.pythonGenerator.PASS);
    elifs[i] = clause;
  }
  // Orelse:
  var orelse = "";
  if (this.orelse_) {
    orelse = "else:\n" + (python.pythonGenerator.statementToCode(block, 'ORELSEBODY') || python.pythonGenerator.PASS);
  }
  return test + body + elifs.join("") + orelse;
};
BlockMirrorTextToBlocks.prototype['ast_If'] = function (node, parent) {
  var test = node.test;
  var body = node.body;
  var orelse = node.orelse;
  var hasOrelse = false;
  var elifCount = 0;
  var values = {
    "TEST": this.convert(test, node)
  };
  var statements = {
    "BODY": this.convertBody(body, node)
  };
  while (orelse !== undefined && orelse.length > 0) {
    if (orelse.length === 1) {
      if (orelse[0]._astname === "If") {
        // This is an ELIF
        this.heights.shift();
        values['ELIFTEST' + elifCount] = this.convert(orelse[0].test, node);
        statements['ELIFBODY' + elifCount] = this.convertBody(orelse[0].body, node);
        elifCount++;
      } else {
        hasOrelse = true;
        statements['ORELSEBODY'] = this.convertBody(orelse, node);
      }
    } else {
      hasOrelse = true;
      statements['ORELSEBODY'] = this.convertBody(orelse, node);
    }
    orelse = orelse[0].orelse;
  }
  return BlockMirrorTextToBlocks.create_block("ast_If", node.lineno, {}, values, {}, {
    "@orelse": hasOrelse,
    "@elifs": elifCount
  }, statements);
};
Blockly.Blocks['ast_While'] = {
  init: function init() {
    this.orelse_ = 0;
    this.appendValueInput('TEST').appendField(this.translateText("while"));
    this.appendStatementInput("BODY").setCheck(null).setAlign(Blockly.inputs.Align.RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.CONTROL));
    this.updateShape_();
  },
  // TODO: Not mutable currently
  updateShape_: function updateShape_() {
    var latestInput = "BODY";
    if (this.orelse_ && !this.getInput('ELSE')) {
      this.appendDummyInput('ORELSETEST').appendField(this.translateText("else:"));
      this.appendStatementInput("ORELSEBODY").setCheck(null);
    } else if (!this.orelse_ && this.getInput('ELSE')) {
      block.removeInput('ORELSETEST');
      block.removeInput('ORELSEBODY');
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('orelse', this.orelse_);
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.orelse_ = "true" === xmlElement.getAttribute('orelse');
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_While'] = function (block, generator) {
  // Test
  var test = "while " + (python.pythonGenerator.valueToCode(block, 'TEST', python.Order.NONE) || python.pythonGenerator.blank) + ":\n";
  // Body:
  var body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  // Orelse:
  var orelse = "";
  if (this.orelse_) {
    orelse = "else:\n" + (python.pythonGenerator.statementToCode(block, 'ORELSEBODY') || python.pythonGenerator.PASS);
  }
  return test + body + orelse;
};
BlockMirrorTextToBlocks.prototype['ast_While'] = function (node, parent) {
  var test = node.test;
  var body = node.body;
  var orelse = node.orelse;
  var values = {
    "TEST": this.convert(test, node)
  };
  var statements = {
    "BODY": this.convertBody(body, node)
  };
  var hasOrelse = false;
  if (orelse !== null && orelse.length > 0) {
    statements['ORELSEBODY'] = this.convertBody(orelse, node);
    hasOrelse = true;
  }
  return BlockMirrorTextToBlocks.create_block("ast_While", node.lineno, {}, values, {}, {
    "@orelse": hasOrelse
  }, statements);
};
Blockly.Blocks['ast_Num'] = {
  init: function init() {
    this.setOutput(true, "Number");
    this.appendDummyInput('INPUT').appendField(new Blockly.FieldNumber(0), 'NUM');
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.MATH));
    this.fieldFactory_ = "";
    // TODO perhaps more numeric types to check, but this handles the most common scenarios.
    initBlockFieldFactory(this, ["int", "float"]);
  },
  updateShape_: function updateShape_() {
    var input = this.getInput('INPUT');
    var field = null;
    if (this.fieldFactory_) {
      var resolvedFieldFactory = _resolveFunction(this.fieldFactory_);
      if (resolvedFieldFactory) {
        field = resolvedFieldFactory(this, 'NUM');
      }
    }
    if (!field) {
      field = new Blockly.FieldNumber(0);
    }
    var value = this.getFieldValue('NUM');
    input.removeField('NUM');
    field.setValue(value, false);
    input.appendField(field, 'NUM');
  }
};
python.pythonGenerator.forBlock['ast_Num'] = function (block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order;
  if (code === Infinity) {
    code = 'float("inf")';
    order = python.Order.FUNCTION_CALL;
  } else if (code === -Infinity) {
    code = '-float("inf")';
    order = python.Order.UNARY_SIGN;
  } else {
    order = code < 0 ? python.Order.UNARY_SIGN : python.Order.ATOMIC;
  }
  return [code, order];
};
BlockMirrorTextToBlocks.prototype['ast_Num'] = function (node, parent) {
  var n = node.n;
  return BlockMirrorTextToBlocks.create_block("ast_Num", node.lineno, {
    "NUM": Sk.ffi.remapToJs(n)
  });
};
BlockMirrorTextToBlocks.BINOPS = [["+", "Add", python.Order.ADDITIVE, 'Return the sum of the two numbers.', 'increase', 'by'], ["-", "Sub", python.Order.ADDITIVE, 'Return the difference of the two numbers.', 'decrease', 'by'], ["*", "Mult", python.Order.MULTIPLICATIVE, 'Return the product of the two numbers.', 'multiply', 'by'], ["/", "Div", python.Order.MULTIPLICATIVE, 'Return the quotient of the two numbers.', 'divide', 'by'], ["%", "Mod", python.Order.MULTIPLICATIVE, 'Return the remainder of the first number divided by the second number.', 'modulo', 'by'], ["**", "Pow", python.Order.EXPONENTIATION, 'Return the first number raised to the power of the second number.', 'raise', 'to'], ["//", "FloorDiv", python.Order.MULTIPLICATIVE, 'Return the truncated quotient of the two numbers.', 'floor divide', 'by'], ["<<", "LShift", python.Order.BITWISE_SHIFT, 'Return the left number left shifted by the right number.', 'left shift', 'by'], [">>", "RShift", python.Order.BITWISE_SHIFT, 'Return the left number right shifted by the right number.', 'right shift', 'by'], ["|", "BitOr", python.Order.BITWISE_OR, 'Returns the bitwise OR of the two values.', 'bitwise OR', 'using'], ["^", "BitXor", python.Order.BITWISE_XOR, 'Returns the bitwise XOR of the two values.', 'bitwise XOR', 'using'], ["&", "BitAnd", python.Order.BITWISE_AND, 'Returns the bitwise AND of the two values.', 'bitwise AND', 'using'], ["@", "MatMult", python.Order.MULTIPLICATIVE, 'Return the matrix multiplication of the two numbers.', 'matrix multiply', 'by']];
var BINOPS_SIMPLE = ['Add', 'Sub', 'Mult', 'Div', 'Mod', 'Pow'];
var BINOPS_BLOCKLY_DISPLAY_FULL = BlockMirrorTextToBlocks.BINOPS.map(function (binop) {
  return [binop[0], binop[1]];
});
var BINOPS_BLOCKLY_DISPLAY = BINOPS_BLOCKLY_DISPLAY_FULL.filter(function (binop) {
  return BINOPS_SIMPLE.indexOf(binop[1]) >= 0;
});
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL = BlockMirrorTextToBlocks.BINOPS.map(function (binop) {
  return [binop[4], binop[1]];
});
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY = BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL.filter(function (binop) {
  return BINOPS_SIMPLE.indexOf(binop[1]) >= 0;
});
var BINOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION = {};
BlockMirrorTextToBlocks.BINOPS.forEach(function (binop) {
  BINOPS_BLOCKLY_GENERATE[binop[1]] = [" " + binop[0], binop[2]];
  BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION[binop[1]] = binop[5];
  //Blockly.Constants.Math.TOOLTIPS_BY_OP[binop[1]] = binop[3];
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_BinOpFull",
  "message0": "%1 %2 %3",
  "args0": [{
    "type": "input_value",
    "name": "A"
  }, {
    "type": "field_dropdown",
    "name": "OP",
    "options": BINOPS_BLOCKLY_DISPLAY_FULL
  }, {
    "type": "input_value",
    "name": "B"
  }],
  "inputsInline": true,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.MATH
  //"extensions": ["math_op_tooltip"]
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_BinOp",
  "message0": "%1 %2 %3",
  "args0": [{
    "type": "input_value",
    "name": "A"
  }, {
    "type": "field_dropdown",
    "name": "OP",
    "options": BINOPS_BLOCKLY_DISPLAY
  }, {
    "type": "input_value",
    "name": "B"
  }],
  "inputsInline": true,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.MATH
  //"extensions": ["math_op_tooltip"]
});
python.pythonGenerator.forBlock['ast_BinOp'] = function (block, generator) {
  // Basic arithmetic operators, and power.
  var tuple = BINOPS_BLOCKLY_GENERATE[block.getFieldValue('OP')];
  var operator = tuple[0] + " ";
  var order = tuple[1];
  var argument0 = python.pythonGenerator.valueToCode(block, 'A', order) || python.pythonGenerator.blank;
  var argument1 = python.pythonGenerator.valueToCode(block, 'B', order) || python.pythonGenerator.blank;
  var code = argument0 + operator + argument1;
  return [code, order];
};
BlockMirrorTextToBlocks.prototype['ast_BinOp'] = function (node, parent) {
  var left = node.left;
  var op = node.op.name;
  var right = node.right;
  var blockName = BINOPS_SIMPLE.indexOf(op) >= 0 ? "ast_BinOp" : 'ast_BinOpFull';
  return BlockMirrorTextToBlocks.create_block(blockName, node.lineno, {
    "OP": op
  }, {
    "A": this.convert(left, node),
    "B": this.convert(right, node)
  }, {
    "inline": true
  });
};
python.pythonGenerator.forBlock['ast_BinOpFull'] = python.pythonGenerator.forBlock['ast_BinOp'];
BlockMirrorTextToBlocks.prototype['ast_BinOpFull'] = BlockMirrorTextToBlocks.prototype['ast_BinOp'];
Blockly.Blocks['ast_Name'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.appendDummyInput('NAME').appendField(new Blockly.FieldTextInput('default'), 'VAR');
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.import_ = "";
  },
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('import', this.import_);
    return container;
  },
  domToMutation: function domToMutation(xmlElement) {
    this.import_ = xmlElement.getAttribute('import');
  },
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function customContextMenu(options) {
    var name;
    if (!this.isInFlyout) {
      // Getter blocks have the option to create a setter block, and vice versa.
      var opposite_type, contextMenuMsg;
      if (this.type === 'ast_Name') {
        opposite_type = 'ast_Assign';
        contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
      } else {
        opposite_type = 'ast_Name';
        contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
      }
      var option = {
        enabled: this.workspace.remainingCapacity() > 0
      };
      name = this.getField('VAR').getText();
      option.text = contextMenuMsg.replace('%1', name);
      var xmlField = document.createElement('field');
      xmlField.setAttribute('name', 'VAR');
      xmlField.appendChild(document.createTextNode(name));
      var xmlBlock = document.createElement('block');
      xmlBlock.setAttribute('type', opposite_type);
      xmlBlock.appendChild(xmlField);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
      // Getter blocks have the option to rename or delete that variable.
    } else {
      if (this.type === 'ast_Name' || this.type === 'variables_get_reporter') {
        var renameOption = {
          text: Blockly.Msg.RENAME_VARIABLE,
          enabled: true,
          callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
        };
        name = this.getField('VAR').getText();
        var deleteOption = {
          text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
          enabled: true,
          callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
        };
        options.unshift(renameOption);
        options.unshift(deleteOption);
      }
    }
  }
};
python.pythonGenerator.forBlock['ast_Name'] = function (block, generator) {
  // Variable getter.
  if (block.import_) {
    var _block$import_$split = block.import_.split(' as ', 2),
      _block$import_$split2 = _slicedToArray(_block$import_$split, 2),
      type = _block$import_$split2[0],
      alias = _block$import_$split2[1];
    if (type && !python.pythonGenerator.imports.hasType(type)) {
      var name = alias !== null && alias !== void 0 ? alias : type;
      python.pythonGenerator.imports.set(type, name);
    }
  }
  var code = python.pythonGenerator.getVariableName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype['ast_Name'] = function (node, parent) {
  var id = node.id;
  if (id.v === python.pythonGenerator.blank) {
    return null;
  }
  var mutations = {};
  var fromLibrary = this.resolveFromLibrary(node);
  if (fromLibrary instanceof PythonClass || fromLibrary instanceof PythonModule) {
    mutations["@import"] = fromLibrary.requiresImport;
  }
  return BlockMirrorTextToBlocks.create_block('ast_Name', node.lineno, {
    "VAR": id.v
  }, {}, {}, mutations);
};
Blockly.Blocks['ast_Assign'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.targetCount_ = 1;
    this.simpleTarget_ = true;
    this.updateShape_();
    Blockly.Extensions.apply("contextMenu_variableSetterGetter", this, false);
  },
  updateShape_: function updateShape_() {
    if (!this.getInput('VALUE')) {
      this.appendDummyInput().appendField(this.translateText("set"));
      this.appendValueInput('VALUE').appendField('=');
    }
    var i = 0;
    if (this.targetCount_ === 1 && this.simpleTarget_) {
      this.setInputsInline(true);
      if (!this.getInput('VAR_ANCHOR')) {
        this.appendDummyInput('VAR_ANCHOR').appendField(new Blockly.FieldVariable("variable"), "VAR");
      }
      this.moveInputBefore('VAR_ANCHOR', 'VALUE');
    } else {
      this.setInputsInline(true);
      // Add new inputs.
      for (; i < this.targetCount_; i++) {
        if (!this.getInput('TARGET' + i)) {
          var input = this.appendValueInput('TARGET' + i);
          if (i !== 0) {
            input.appendField('and').setAlign(Blockly.inputs.Align.RIGHT);
          }
        }
        this.moveInputBefore('TARGET' + i, 'VALUE');
      }
      // Kill simple VAR
      if (this.getInput('VAR_ANCHOR')) {
        this.removeInput('VAR_ANCHOR');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('TARGET' + i)) {
      this.removeInput('TARGET' + i);
      i++;
    }
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('targets', this.targetCount_);
    container.setAttribute('simple', this.simpleTarget_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.targetCount_ = parseInt(xmlElement.getAttribute('targets'), 10);
    this.simpleTarget_ = "true" === xmlElement.getAttribute('simple');
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Assign'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
  var targets = new Array(block.targetCount_);
  if (block.targetCount_ === 1 && block.simpleTarget_) {
    targets[0] = python.pythonGenerator.getVariableName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  } else {
    for (var i = 0; i < block.targetCount_; i++) {
      targets[i] = python.pythonGenerator.valueToCode(block, 'TARGET' + i, python.Order.NONE) || python.pythonGenerator.blank;
    }
  }
  return targets.join(' = ') + " = " + value + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Assign'] = function (node, parent) {
  var targets = node.targets;
  var value = node.value;
  var values;
  var fields = {};
  var simpleTarget = targets.length === 1 && targets[0] instanceof Sk.astnodes.Name && targets[0].id.v !== python.pythonGenerator.blank;
  if (simpleTarget) {
    values = {};
    var variableName = Sk.ffi.remapToJs(targets[0].id);
    fields['VAR'] = variableName;
    var type = this.resolveFromLibrary(value);
    if (type) {
      this.variables.add(type, variableName);
    }
  } else {
    values = this.convertElements("TARGET", targets, node);
  }
  values['VALUE'] = this.convert(value, node);
  return BlockMirrorTextToBlocks.create_block("ast_Assign", node.lineno, fields, values, {
    "inline": "true"
  }, {
    "@targets": targets.length,
    "@simple": simpleTarget
  });
};
Blockly.Blocks['ast_AnnAssignFull'] = {
  init: function init() {
    this.appendValueInput("TARGET").setCheck(null).appendField("set");
    this.appendValueInput("ANNOTATION").setCheck(null).appendField(":");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.initialized_ = true;
    this.updateShape_();
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('initialized', this.initialized_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.initialized_ = "true" === xmlElement.getAttribute('initialized');
    this.updateShape_();
  },
  updateShape_: function updateShape_(block) {
    // Add new inputs.
    if (this.initialized_ && !this.getInput('VALUE')) {
      this.appendValueInput('VALUE').appendField('=').setAlign(Blockly.inputs.Align.RIGHT);
    }
    if (!this.initialized_ && this.getInput('VALUE')) {
      this.removeInput('VALUE');
    }
  }
};
BlockMirrorTextToBlocks.ANNOTATION_OPTIONS = [["int", "int"], ["float", "float"], ["str", "str"], ["bool", "bool"], ["None", "None"]];
BlockMirrorTextToBlocks.ANNOTATION_GENERATE = {};
BlockMirrorTextToBlocks.ANNOTATION_OPTIONS.forEach(function (ann) {
  BlockMirrorTextToBlocks.ANNOTATION_GENERATE[ann[1]] = ann[0];
});
Blockly.Blocks['ast_AnnAssign'] = {
  init: function init() {
    this.appendDummyInput().appendField("set").appendField(new Blockly.FieldVariable("item"), "TARGET").appendField(":").appendField(new Blockly.FieldDropdown(BlockMirrorTextToBlocks.ANNOTATION_OPTIONS), "ANNOTATION");
    this.appendValueInput("VALUE").setCheck(null).appendField("=");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.strAnnotations_ = false;
    this.initialized_ = true;
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('str', this.strAnnotations_);
    container.setAttribute('initialized', this.initialized_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.strAnnotations_ = "true" === xmlElement.getAttribute('str');
    this.initialized_ = "true" === xmlElement.getAttribute('initialized');
    this.updateShape_();
  },
  updateShape_: function updateShape_(block) {
    // Add new inputs.
    if (this.initialized_ && !this.getInput('VALUE')) {
      this.appendValueInput('VALUE').appendField('=').setAlign(Blockly.inputs.Align.RIGHT);
    }
    if (!this.initialized_ && this.getInput('VALUE')) {
      this.removeInput('VALUE');
    }
  }
};
python.pythonGenerator.forBlock['ast_AnnAssignFull'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var target = python.pythonGenerator.valueToCode(block, 'TARGET', python.Order.NONE) || python.pythonGenerator.blank;
  var annotation = python.pythonGenerator.valueToCode(block, 'ANNOTATION', python.Order.NONE) || python.pythonGenerator.blank;
  var value = "";
  if (this.initialized_) {
    value = " = " + python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
  }
  python.pythonGenerator.variables.add(annotation, target);
  return target + ": " + annotation + value + "\n";
};
python.pythonGenerator.forBlock['ast_AnnAssign'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var target = python.pythonGenerator.getVariableName(block.getFieldValue('TARGET'), Blockly.Variables.NAME_TYPE);
  var annotation = block.getFieldValue('ANNOTATION');
  if (block.strAnnotations_) {
    annotation = python.pythonGenerator.quote_(annotation);
  }
  var value = "";
  if (this.initialized_) {
    value = " = " + python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
  }
  python.pythonGenerator.variables.add(annotation, target);
  return target + ": " + annotation + value + "\n";
};
BlockMirrorTextToBlocks.prototype.getBuiltinAnnotation = function (annotation) {
  var result = false;
  // Can we turn it into a basic type?
  if (annotation._astname === 'Name') {
    result = Sk.ffi.remapToJs(annotation.id);
  } else if (annotation._astname === 'Str') {
    result = Sk.ffi.remapToJs(annotation.s);
  }

  // Potentially filter out unknown annotations
  if (result !== false && this.strictAnnotations) {
    if (this.strictAnnotations.indexOf(result) !== -1) {
      return result;
    } else {
      return false;
    }
  } else {
    return result;
  }
};
BlockMirrorTextToBlocks.prototype['ast_AnnAssign'] = function (node, parent) {
  var target = node.target;
  var annotation = node.annotation;
  var value = node.value;
  var values = {};
  var mutations = {
    '@initialized': false
  };
  if (value !== null) {
    values['VALUE'] = this.convert(value, node);
    mutations['@initialized'] = true;
  }

  // TODO: This controls whether the annotation is stored in __annotations__
  var simple = node.simple;
  var builtinAnnotation = this.getBuiltinAnnotation(annotation);
  if (target._astname === 'Name' && target.id.v !== python.pythonGenerator.blank && builtinAnnotation !== false) {
    mutations['@str'] = annotation._astname === 'Str';
    var variableName = target.id.v;
    this.variables.add(builtinAnnotation, variableName);
    return BlockMirrorTextToBlocks.create_block("ast_AnnAssign", node.lineno, {
      'TARGET': variableName,
      'ANNOTATION': builtinAnnotation
    }, values, {
      "inline": "true"
    }, mutations);
  } else {
    values['TARGET'] = this.convert(target, node);
    values['ANNOTATION'] = this.convert(annotation, node);
    if (target._astname === 'Name') {
      var fullVariableType = this.resolveFromLibrary(annotation);
      if (fullVariableType) {
        var _variableName = target.id.v;
        this.variables.add(fullVariableType, _variableName);
      }
    }
    return BlockMirrorTextToBlocks.create_block("ast_AnnAssignFull", node.lineno, {}, values, {
      "inline": "true"
    }, mutations);
  }
};
Blockly.Blocks['ast_AugAssign'] = {
  init: function init() {
    var block = this;
    this.simpleTarget_ = true;
    this.allOptions_ = false;
    this.initialPreposition_ = "by";
    this.appendDummyInput("OP").appendField(new Blockly.FieldDropdown(function () {
      return (block.allOptions_ ? BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY_FULL : BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_DISPLAY).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          label = _ref8[0],
          value = _ref8[1];
        return [block.translateText(label), value];
      });
    }, function (value) {
      var block = this.sourceBlock_;
      block.updatePreposition_(value);
    }), "OP_NAME").appendField(" ");
    this.appendDummyInput('PREPOSITION_ANCHOR').setAlign(Blockly.inputs.Align.RIGHT).appendField("by", 'PREPOSITION');
    this.appendValueInput('VALUE');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.updateShape_();
    this.updatePreposition_(this.initialPreposition_);
  },
  updatePreposition_: function updatePreposition_(value) {
    var preposition = BlockMirrorTextToBlocks.BINOPS_AUGASSIGN_PREPOSITION[value];
    this.setFieldValue(this.translateText(preposition), 'PREPOSITION');
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('simple', this.simpleTarget_);
    container.setAttribute('options', this.allOptions_);
    container.setAttribute('preposition', this.initialPreposition_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.simpleTarget_ = "true" === xmlElement.getAttribute('simple');
    this.allOptions_ = "true" === xmlElement.getAttribute('options');
    this.initialPreposition_ = xmlElement.getAttribute('preposition');
    this.updateShape_();
    this.updatePreposition_(this.initialPreposition_);
  },
  updateShape_: function updateShape_(block) {
    // Add new inputs.
    this.getField("OP_NAME").getOptions(false);
    if (this.simpleTarget_) {
      if (!this.getInput('VAR_ANCHOR')) {
        this.appendDummyInput('VAR_ANCHOR').appendField(new Blockly.FieldVariable("variable"), "VAR");
        this.moveInputBefore('VAR_ANCHOR', 'PREPOSITION_ANCHOR');
      }
      if (this.getInput('TARGET')) {
        this.removeInput('TARGET');
      }
    } else {
      if (this.getInput('VAR_ANCHOR')) {
        this.removeInput('VAR_ANCHOR');
      }
      if (!this.getInput('TARGET')) {
        this.appendValueInput('TARGET');
        this.moveInputBefore('TARGET', 'PREPOSITION_ANCHOR');
      }
    }
  }
};
python.pythonGenerator.forBlock['ast_AugAssign'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var target;
  if (block.simpleTarget_) {
    target = python.pythonGenerator.getVariableName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  } else {
    target = python.pythonGenerator.valueToCode(block, 'TARGET', python.Order.NONE) || python.pythonGenerator.blank;
  }
  var operator = BINOPS_BLOCKLY_GENERATE[block.getFieldValue('OP_NAME')][0];
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
  return target + operator + "= " + value + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_AugAssign'] = function (node, parent) {
  var target = node.target;
  var op = node.op.name;
  var value = node.value;
  var values = {
    'VALUE': this.convert(value, node)
  };
  var fields = {
    'OP_NAME': op
  };
  var simpleTarget = target._astname === 'Name';
  if (simpleTarget) {
    fields['VAR'] = Sk.ffi.remapToJs(target.id);
  } else {
    values['TARGET'] = this.convert(target, node);
  }
  var preposition = op;
  var allOptions = BINOPS_SIMPLE.indexOf(op) === -1;
  return BlockMirrorTextToBlocks.create_block("ast_AugAssign", node.lineno, fields, values, {
    "inline": "true"
  }, {
    "@options": allOptions,
    "@simple": simpleTarget,
    "@preposition": preposition
  });
};
Blockly.Blocks['ast_Str'] = {
  init: function init() {
    this.setOutput(true, "String");
    this.appendDummyInput('INPUT').appendField(new Blockly.FieldTextInput(''), 'TEXT');
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.fieldFactory_ = "";
    Blockly.Extensions.apply('text_quotes', this);
    initBlockFieldFactory(this, ["str", "typing.Literal"]);
  },
  updateShape_: function updateShape_() {
    var input = this.getInput('INPUT');
    var field = null;
    if (this.fieldFactory_) {
      var resolvedFieldFactory = _resolveFunction(this.fieldFactory_);
      if (resolvedFieldFactory) {
        field = resolvedFieldFactory(this, 'TEXT');
      }
    }
    if (!field) {
      field = new Blockly.FieldTextInput('');
    }
    var value = this.getFieldValue('TEXT');
    input.removeField('TEXT');
    input.insertFieldAt(1, field, 'TEXT');
    field.setValue(value, false);
  }
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_StrChar",
  "message0": "%1",
  "args0": [{
    "type": "field_dropdown",
    "name": "TEXT",
    "options": [["\\n", "\n"], ["\\t", "\t"]]
  }],
  "output": "String",
  "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
  "extensions": ["text_quotes"]
});
{
  var multiline_input_type = "field_multilinetext";
  if (!Blockly.registry.hasItem(Blockly.registry.Type.FIELD, multiline_input_type)) {
    if (typeof registerFieldMultilineInput === "function") {
      // Register if the field-multilineinput plugin is available
      registerFieldMultilineInput();
    } else {
      // Fallback in case plugin @blockly/field-multilineinput is not available
      multiline_input_type = "field_input";
    }
  }
  BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_StrMultiline",
    "message0": "%1",
    "args0": [{
      "type": multiline_input_type,
      "name": "TEXT",
      "value": ''
    }],
    "output": "String",
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
    "extensions": ["text_quotes"]
  });
  BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_StrDocstring",
    "message0": "Docstring: %1 %2",
    "args0": [{
      "type": "input_dummy"
    }, {
      "type": multiline_input_type,
      "name": "TEXT",
      "value": ''
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT
  });
}
Blockly.Blocks['ast_Image'] = {
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.src_ = "loading.png";
    this.updateShape_();
    this.setOutput(true);
  },
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('src', this.src_);
    return container;
  },
  domToMutation: function domToMutation(xmlElement) {
    this.src_ = xmlElement.getAttribute('src');
    this.updateShape_();
  },
  updateShape_: function updateShape_() {
    var image = this.getInput('IMAGE');
    if (!image) {
      image = this.appendDummyInput("IMAGE");
      image.appendField(new Blockly.FieldImage(this.src_, 40, 40, {
        alt: this.src_,
        flipRtl: "FALSE"
      }));
    }
    var imageField = image.fieldRow[0];
    imageField.setValue(this.src_);
  }
};

/*
"https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png"
BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_StrImage",
    "message0": "%1%2",
    "args0": [
        {"type": "field_image", "src": "https://game-icons.net/icons/ffffff/000000/1x1/delapouite/labrador-head.png", "width": 20, "height": 20, "alt": ""},
        //{"type": "field_label_serializable", "name": "SRC", "value": '', "visible": "false"}
    ],
    "output": "String",
    "colour": BlockMirrorTextToBlocks.COLOR.TEXT,
    //"extensions": ["text_quotes"]
});*/

python.pythonGenerator.forBlock['ast_Str'] = function (block, generator) {
  // Text value
  var code = python.pythonGenerator.quote_(block.getFieldValue('TEXT'));
  code = code.replace("\n", "n");
  return [code, python.Order.ATOMIC];
};
python.pythonGenerator.forBlock['ast_StrChar'] = function (block, generator) {
  // Text value
  var value = block.getFieldValue('TEXT');
  switch (value) {
    case "\n":
      return ["'\\n'", python.Order.ATOMIC];
    case "\t":
      return ["'\\t'", python.Order.ATOMIC];
  }
};
python.pythonGenerator.forBlock['ast_Image'] = function (block, generator) {
  // Text value
  //python.pythonGenerator.definitions_["import_image"] = "from image import Image";
  var code = python.pythonGenerator.quote_(block.src_);
  return [code, python.Order.FUNCTION_CALL];
};
var multiline_quote = function multiline_quote(string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/'''/g, '\\\'\\\'\\\'');
  return '\'\'\'' + string + '\'\'\'';
};
python.pythonGenerator.forBlock['ast_StrMultiline'] = function (block, generator) {
  // Text value
  var code = multiline_quote(block.getFieldValue('TEXT'));
  return [code, python.Order.ATOMIC];
};
python.pythonGenerator.forBlock['ast_StrDocstring'] = function (block, generator) {
  // Text value.
  var code = block.getFieldValue('TEXT');
  if (code.charAt(0) !== '\n') {
    code = '\n' + code;
  }
  if (code.charAt(code.length - 1) !== '\n') {
    code = code + '\n';
  }
  return multiline_quote(code) + "\n";
};
BlockMirrorTextToBlocks.prototype.isSingleChar = function (text) {
  return text === "\n" || text === "\t";
};
BlockMirrorTextToBlocks.prototype.isDocString = function (node, parent) {
  return (parent === null || parent === void 0 ? void 0 : parent._astname) === 'Expr' && parent._parent && ['FunctionDef', 'ClassDef'].indexOf(parent._parent._astname) !== -1 && parent._parent.body[0] === parent;
};
BlockMirrorTextToBlocks.prototype.isSimpleString = function (text) {
  return text.split("\n").length <= 2 && text.length <= 40;
};
BlockMirrorTextToBlocks.prototype.dedent = function (text, levels, isDocString) {
  console.log(text, levels, isDocString);
  if (!isDocString && text.charAt(0) === "\n") {
    return text;
  }
  var split = text.split("\n");
  var indentation = "    ".repeat(levels);
  var recombined = [];
  // Are all lines indented?
  for (var i = 0; i < split.length; i++) {
    // This was a blank line, add it unchanged unless its the first line
    if (split[i] === '') {
      if (i !== 0) {
        recombined.push("");
      }
      // If it has our ideal indentation, add it without indentation
    } else if (split[i].startsWith(indentation)) {
      var unindentedLine = split[i].substr(indentation.length);
      if (unindentedLine !== '' || i !== split.length - 1) {
        recombined.push(unindentedLine);
      }
      // If it's the first line, then add it unmodified
    } else if (i === 0) {
      recombined.push(split[i]);
      // This whole structure cannot be uniformly dedented, better give up.
    } else {
      return text;
    }
  }
  return recombined.join("\n");
};

// TODO: Handle indentation intelligently
BlockMirrorTextToBlocks.prototype['ast_Str'] = function (node, parent) {
  var s = node.s;
  var text = Sk.ffi.remapToJs(s);
  var regex = BlockMirrorTextEditor.REGEX_PATTERNS[this.blockMirror.configuration.imageDetection];
  //console.log(text, regex.test(JSON.stringify(text)));
  if (regex.test(JSON.stringify(text))) {
    //if (text.startsWith("http") && text.endsWith(".png")) {
    return BlockMirrorTextToBlocks.create_block("ast_Image", node.lineno, {}, {}, {}, {
      "@src": text
    });
  } else if (this.isSingleChar(text)) {
    return BlockMirrorTextToBlocks.create_block("ast_StrChar", node.lineno, {
      "TEXT": text
    });
  } else if (this.isDocString(node, parent)) {
    var dedented = this.dedent(text, this.levelIndex - 1, true);
    return [BlockMirrorTextToBlocks.create_block("ast_StrDocstring", node.lineno, {
      "TEXT": dedented
    })];
  } else if (text.indexOf('\n') === -1) {
    return BlockMirrorTextToBlocks.create_block("ast_Str", node.lineno, {
      "TEXT": text
    });
  } else {
    var _dedented = this.dedent(text, this.levelIndex - 1, false);
    console.log("DD", _dedented);
    return BlockMirrorTextToBlocks.create_block("ast_StrMultiline", node.lineno, {
      "TEXT": _dedented
    });
  }
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Expr",
  "message0": "do nothing with %1",
  "args0": [{
    "type": "input_value",
    "name": "VALUE"
  }],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.PYTHON
});
python.pythonGenerator.forBlock['ast_Expr'] = function (block, generator) {
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
  // TODO: Assemble JavaScript into code variable.
  return value + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Expr'] = function (node, parent) {
  var converted = this.convert(node.value, node);
  if ((converted === null || converted === void 0 ? void 0 : converted.constructor) === Array) {
    return converted[0];
  } else if (this.isTopLevel(parent) && this.filename === "toolbox.py") {
    // For toolbox only
    return converted;
  }
  return BlockMirrorTextToBlocks.create_block("ast_Expr", node.lineno, {}, {
    "VALUE": converted
  });
};
BlockMirrorTextToBlocks.UNARYOPS = [["+", "UAdd", 'Do nothing to the number'], ["-", "USub", 'Make the number negative'], ["not", "Not", 'Return the logical opposite of the value.'], ["~", "Invert", 'Take the bit inversion of the number']];
BlockMirrorTextToBlocks.UNARYOPS.forEach(function (unaryop) {
  //Blockly.Constants.Math.TOOLTIPS_BY_OP[unaryop[1]] = unaryop[2];

  var fullName = "ast_UnaryOp" + unaryop[1];
  BlockMirrorTextToBlocks.BLOCKS.push({
    "type": fullName,
    "message0": unaryop[0] + " %1",
    "args0": [{
      "type": "input_value",
      "name": "VALUE"
    }],
    "inputsInline": false,
    "output": unaryop[1] === 'Not' ? "Boolean" : null,
    "colour": unaryop[1] === 'Not' ? BlockMirrorTextToBlocks.COLOR.LOGIC : BlockMirrorTextToBlocks.COLOR.MATH
  });
  python.pythonGenerator.forBlock[fullName] = function (block) {
    // Basic arithmetic operators, and power.
    var order = unaryop[1] === 'Not' ? python.Order.LOGICAL_NOT : python.Order.UNARY_SIGN;
    var argument1 = python.pythonGenerator.valueToCode(block, 'VALUE', order) || python.pythonGenerator.blank;
    var code = unaryop[0] + (unaryop[1] === 'Not' ? ' ' : '') + argument1;
    return [code, order];
  };
});
BlockMirrorTextToBlocks.prototype['ast_UnaryOp'] = function (node, parent) {
  var op = node.op.name;
  var operand = node.operand;
  if (operand instanceof Sk.astnodes.Num && op === "USub") {
    // Do not make the blocks more complex than needed, just make the number negative:
    operand.n.v = -operand.n.v;
    return this.convert(operand, node);
  }
  return BlockMirrorTextToBlocks.create_block('ast_UnaryOp' + op, node.lineno, {}, {
    "VALUE": this.convert(operand, node)
  }, {
    "inline": false
  });
};
BlockMirrorTextToBlocks.BOOLOPS = [["and", "And", python.Order.LOGICAL_AND, 'Return whether the left and right both evaluate to True.'], ["or", "Or", python.Order.LOGICAL_OR, 'Return whether either the left or right evaluate to True.']];
var BOOLOPS_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.BOOLOPS.map(function (boolop) {
  return [boolop[0], boolop[1]];
});
var BOOLOPS_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.BOOLOPS.forEach(function (boolop) {
  BOOLOPS_BLOCKLY_GENERATE[boolop[1]] = [" " + boolop[0] + " ", boolop[2]];
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_BoolOp",
  "message0": "%1 %2 %3",
  "args0": [{
    "type": "input_value",
    "name": "A"
  }, {
    "type": "field_dropdown",
    "name": "OP",
    "options": BOOLOPS_BLOCKLY_DISPLAY
  }, {
    "type": "input_value",
    "name": "B"
  }],
  "inputsInline": true,
  "output": "Boolean",
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
python.pythonGenerator.forBlock['ast_BoolOp'] = function (block, generator) {
  // Operations 'and', 'or'.
  var operator = block.getFieldValue('OP') === 'And' ? 'and' : 'or';
  var order = operator === 'and' ? python.Order.LOGICAL_AND : python.Order.LOGICAL_OR;
  var argument0 = python.pythonGenerator.valueToCode(block, 'A', order) || python.pythonGenerator.blank;
  var argument1 = python.pythonGenerator.valueToCode(block, 'B', order) || python.pythonGenerator.blank;
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};
BlockMirrorTextToBlocks.prototype['ast_BoolOp'] = function (node, parent) {
  var op = node.op;
  var values = node.values;
  var result_block = this.convert(values[0], node);
  for (var i = 1; i < values.length; i += 1) {
    result_block = BlockMirrorTextToBlocks.create_block("ast_BoolOp", node.lineno, {
      "OP": op.name
    }, {
      "A": result_block,
      "B": this.convert(values[i], node)
    }, {
      "inline": "true"
    });
  }
  return result_block;
};
BlockMirrorTextToBlocks.COMPARES = [["==", "Eq", 'Return whether the two values are equal.'], ["!=", "NotEq", 'Return whether the two values are not equal.'], ["<", "Lt", 'Return whether the left value is less than the right value.'], ["<=", "LtE", 'Return whether the left value is less than or equal to the right value.'], [">", "Gt", 'Return whether the left value is greater than the right value.'], [">=", "GtE", 'Return whether the left value is greater than or equal to the right value.'], ["is", "Is", 'Return whether the left value is identical to the right value.'], ["is not", "IsNot", 'Return whether the left value is not identical to the right value.'], ["in", "In", 'Return whether the left value is in the right value.'], ["not in", "NotIn", 'Return whether the left value is not in the right value.']];
var COMPARES_BLOCKLY_DISPLAY = BlockMirrorTextToBlocks.COMPARES.map(function (boolop) {
  return [boolop[0], boolop[1]];
});
var COMPARES_BLOCKLY_GENERATE = {};
BlockMirrorTextToBlocks.COMPARES.forEach(function (boolop) {
  COMPARES_BLOCKLY_GENERATE[boolop[1]] = boolop[0];
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Compare",
  "message0": "%1 %2 %3",
  "args0": [{
    "type": "input_value",
    "name": "A"
  }, {
    "type": "field_dropdown",
    "name": "OP",
    "options": COMPARES_BLOCKLY_DISPLAY
  }, {
    "type": "input_value",
    "name": "B"
  }],
  "inputsInline": true,
  "output": "Boolean",
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
python.pythonGenerator.forBlock['ast_Compare'] = function (block, generator) {
  // Basic arithmetic operators, and power.
  var tuple = COMPARES_BLOCKLY_GENERATE[block.getFieldValue('OP')];
  var operator = ' ' + tuple + ' ';
  var order = python.Order.RELATIONAL;
  var argument0 = python.pythonGenerator.valueToCode(block, 'A', order) || python.pythonGenerator.blank;
  var argument1 = python.pythonGenerator.valueToCode(block, 'B', order) || python.pythonGenerator.blank;
  var code = argument0 + operator + argument1;
  return [code, order];
};
BlockMirrorTextToBlocks.prototype['ast_Compare'] = function (node, parent) {
  var ops = node.ops;
  var left = node.left;
  var values = node.comparators;
  var result_block = this.convert(left, node);
  for (var i = 0; i < values.length; i += 1) {
    result_block = BlockMirrorTextToBlocks.create_block("ast_Compare", node.lineno, {
      "OP": ops[i].name
    }, {
      "A": result_block,
      "B": this.convert(values[i], node)
    }, {
      "inline": "true"
    });
  }
  return result_block;
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_AssertFull",
  "message0": "assert %1 %2",
  "args0": [{
    "type": "input_value",
    "name": "TEST"
  }, {
    "type": "input_value",
    "name": "MSG"
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Assert",
  "message0": "assert %1",
  "args0": [{
    "type": "input_value",
    "name": "TEST"
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
python.pythonGenerator.forBlock['ast_Assert'] = function (block, generator) {
  var test = python.pythonGenerator.valueToCode(block, 'TEST', python.Order.ATOMIC) || python.pythonGenerator.blank;
  return "assert " + test + "\n";
};
python.pythonGenerator.forBlock['ast_AssertFull'] = function (block, generator) {
  var test = python.pythonGenerator.valueToCode(block, 'TEST', python.Order.ATOMIC) || python.pythonGenerator.blank;
  var msg = python.pythonGenerator.valueToCode(block, 'MSG', python.Order.ATOMIC) || python.pythonGenerator.blank;
  return "assert " + test + ", " + msg + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Assert'] = function (node, parent) {
  var test = node.test;
  var msg = node.msg;
  if (msg == null) {
    return BlockMirrorTextToBlocks.create_block("ast_Assert", node.lineno, {}, {
      "TEST": this.convert(test, node)
    });
  } else {
    return BlockMirrorTextToBlocks.create_block("ast_AssertFull", node.lineno, {}, {
      "TEST": this.convert(test, node),
      "MSG": this.convert(msg, node)
    });
  }
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_NameConstantNone",
  "message0": "None",
  "args0": [],
  "output": "None",
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_NameConstantBoolean",
  "message0": "%1",
  "args0": [{
    "type": "field_dropdown",
    "name": "BOOL",
    "options": [["True", "TRUE"], ["False", "FALSE"]]
  }],
  "output": "Boolean",
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
python.pythonGenerator.forBlock['ast_NameConstantBoolean'] = function (block, generator) {
  // Boolean values true and false.
  var code = block.getFieldValue('BOOL') === 'TRUE' ? 'True' : 'False';
  return [code, python.Order.ATOMIC];
};
python.pythonGenerator.forBlock['ast_NameConstantNone'] = function (block, generator) {
  var code = 'None';
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype['ast_NameConstant'] = function (node, parent) {
  var value = node.value;
  if (value === Sk.builtin.none.none$) {
    return BlockMirrorTextToBlocks.create_block('ast_NameConstantNone', node.lineno, {});
  } else if (value === Sk.builtin.bool.true$) {
    return BlockMirrorTextToBlocks.create_block('ast_NameConstantBoolean', node.lineno, {
      "BOOL": 'TRUE'
    });
  } else if (value === Sk.builtin.bool.false$) {
    return BlockMirrorTextToBlocks.create_block('ast_NameConstantBoolean', node.lineno, {
      "BOOL": 'FALSE'
    });
  }
};
Blockly.Blocks["ast_List"] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function init() {
    this.setHelpUrl(Blockly.Msg["LISTS_CREATE_WITH_HELPURL"]);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.LIST));
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "List");
    this.setMutator(new Blockly.icons.MutatorIcon(["ast_List_create_with_item"], this));
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function decompose(workspace) {
    var containerBlock = workspace.newBlock("ast_List_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("ast_List_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function compose(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var _i7 = 0; _i7 < this.itemCount_; _i7++) {
      var _connections$_i;
      (_connections$_i = connections[_i7]) === null || _connections$_i === void 0 || _connections$_i.reconnect(this, "ADD" + _i7);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function saveConnections(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function updateShape_() {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField(this.translateText("create empty list []"));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i);
        if (i == 0) {
          input.appendField(this.translateText("create list with ["));
        } else {
          input.appendField(",").setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
    // Add the trailing "]"
    if (this.getInput("TAIL")) {
      this.removeInput("TAIL");
    }
    if (this.itemCount_) {
      this.appendDummyInput("TAIL").appendField("]").setAlign(Blockly.inputs.Align.RIGHT);
    }
  }
};
Blockly.Blocks["ast_List_create_with_container"] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.LIST));
    this.appendDummyInput().appendField(this.translateText("Add new list elements below"));
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_List_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.LIST));
    this.appendDummyInput().appendField("Element");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
python.pythonGenerator.forBlock["ast_List"] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = python.pythonGenerator.valueToCode(block, "ADD" + i, python.Order.NONE) || python.pythonGenerator.blank;
  }
  var code = "[" + elements.join(", ") + "]";
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype["ast_List"] = function (node, parent) {
  var elts = node.elts;
  var ctx = node.ctx;
  return BlockMirrorTextToBlocks.create_block("ast_List", node.lineno, {}, this.convertElements("ADD", elts, node), {
    inline: elts.length > 3 ? "false" : "true"
  }, {
    "@items": elts.length
  });
};
Blockly.Blocks["ast_Tuple"] = {
  /**
   * Block for creating a tuple with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TUPLE));
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "Tuple");
    this.setMutator(new Blockly.icons.MutatorIcon(["ast_Tuple_create_with_item"], this));
  },
  /**
   * Create XML to represent tuple inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the tuple inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function decompose(workspace) {
    var containerBlock = workspace.newBlock("ast_Tuple_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("ast_Tuple_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function compose(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var _i8 = 0; _i8 < this.itemCount_; _i8++) {
      var _connections$_i2;
      (_connections$_i2 = connections[_i8]) === null || _connections$_i2 === void 0 || _connections$_i2.reconnect(this, "ADD" + _i8);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function saveConnections(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function updateShape_() {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("()");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i);
        if (i === 0) {
          input.appendField("(").setAlign(Blockly.inputs.Align.RIGHT);
        } else {
          input.appendField(",").setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
    // Add the trailing "]"
    if (this.getInput("TAIL")) {
      this.removeInput("TAIL");
    }
    if (this.itemCount_) {
      var tail = this.appendDummyInput("TAIL");
      if (this.itemCount_ === 1) {
        tail.appendField(",)");
      } else {
        tail.appendField(")");
      }
      tail.setAlign(Blockly.inputs.Align.RIGHT);
    }
  }
};
Blockly.Blocks["ast_Tuple_create_with_container"] = {
  /**
   * Mutator block for tuple container.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TUPLE));
    this.appendDummyInput().appendField("Add new tuple elements below");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_Tuple_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TUPLE));
    this.appendDummyInput().appendField("Element");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
python.pythonGenerator.forBlock["ast_Tuple"] = function (block, generator) {
  // Create a tuple with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = python.pythonGenerator.valueToCode(block, "ADD" + i, python.Order.NONE) || python.pythonGenerator.blank;
  }
  var requiredComma = "";
  if (block.itemCount_ === 1) {
    requiredComma = ", ";
  }
  var code = "(" + elements.join(", ") + requiredComma + ")";
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype["ast_Tuple"] = function (node, parent) {
  var elts = node.elts;
  var ctx = node.ctx;
  return BlockMirrorTextToBlocks.create_block("ast_Tuple", node.lineno, {}, this.convertElements("ADD", elts, node), {
    inline: elts.length > 4 ? "false" : "true"
  }, {
    "@items": elts.length
  });
};
Blockly.Blocks["ast_Set"] = {
  /**
   * Block for creating a set with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SET));
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "Set");
    this.setMutator(new Blockly.icons.MutatorIcon(["ast_Set_create_with_item"], this));
  },
  /**
   * Create XML to represent set inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the set inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function decompose(workspace) {
    var containerBlock = workspace.newBlock("ast_Set_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("ast_Set_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function compose(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var _i9 = 0; _i9 < this.itemCount_; _i9++) {
      var _connections$_i3;
      (_connections$_i3 = connections[_i9]) === null || _connections$_i3 === void 0 || _connections$_i3.reconnect(this, "ADD" + _i9);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function saveConnections(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function updateShape_() {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("create empty set");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i);
        if (i === 0) {
          input.appendField("create set with {").setAlign(Blockly.inputs.Align.RIGHT);
        } else {
          input.appendField(",").setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
    // Add the trailing "]"
    if (this.getInput("TAIL")) {
      this.removeInput("TAIL");
    }
    if (this.itemCount_) {
      this.appendDummyInput("TAIL").appendField("}").setAlign(Blockly.inputs.Align.RIGHT);
    }
  }
};
Blockly.Blocks["ast_Set_create_with_container"] = {
  /**
   * Mutator block for set container.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SET));
    this.appendDummyInput().appendField("Add new set elements below");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_Set_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SET));
    this.appendDummyInput().appendField("Element");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
python.pythonGenerator.forBlock["ast_Set"] = function (block, generator) {
  // Create a set with any number of elements of any type.
  if (block.itemCount_ === 0) {
    return ["set()", python.Order.FUNCTION_CALL];
  }
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = python.pythonGenerator.valueToCode(block, "ADD" + i, python.Order.NONE) || python.pythonGenerator.blank;
  }
  var code = "{" + elements.join(", ") + "}";
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype["ast_Set"] = function (node, parent) {
  var elts = node.elts;
  return BlockMirrorTextToBlocks.create_block("ast_Set", node.lineno, {}, this.convertElements("ADD", elts, node), {
    inline: elts.length > 3 ? "false" : "true"
  }, {
    "@items": elts.length
  });
};
Blockly.Blocks["ast_DictItem"] = {
  init: function init() {
    this.appendValueInput("KEY").setCheck(null);
    this.appendValueInput("VALUE").setCheck(null).appendField(":");
    this.setInputsInline(true);
    this.setOutput(true, "DictPair");
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
  }
};
Blockly.Blocks["ast_Dict"] = {
  /**
   * Block for creating a dict with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, "Dict");
    this.setMutator(new Blockly.icons.MutatorIcon(["ast_Dict_create_with_item"], this));
  },
  /**
   * Create XML to represent dict inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the dict inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function decompose(workspace) {
    var containerBlock = workspace.newBlock("ast_Dict_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock("ast_Dict_create_with_item");
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function compose(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        var key = connection.getSourceBlock().getInput("KEY");
        if (key.connection.targetConnection) {
          key.connection.targetConnection.getSourceBlock().unplug(true);
        }
        var value = connection.getSourceBlock().getInput("VALUE");
        if (value.connection.targetConnection) {
          value.connection.targetConnection.getSourceBlock().unplug(true);
        }
        connection.disconnect();
        connection.getSourceBlock().dispose();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var _i0 = 0; _i0 < this.itemCount_; _i0++) {
      var _connections$_i4;
      (_connections$_i4 = connections[_i0]) === null || _connections$_i4 === void 0 || _connections$_i4.reconnect(this, "ADD" + _i0);
      if (!connections[_i0]) {
        var _itemBlock = this.workspace.newBlock("ast_DictItem");
        _itemBlock.setDeletable(false);
        _itemBlock.setMovable(false);
        _itemBlock.initSvg();
        this.getInput("ADD" + _i0).connection.connect(_itemBlock.outputConnection);
        _itemBlock.render();
        //this.get(itemBlock, 'ADD'+i)
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function saveConnections(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function updateShape_() {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField(this.translateText("empty dictionary"));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i).setCheck("DictPair");
        if (i === 0) {
          input.appendField(this.translateText("create dict with")).setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
    // Add the trailing "}"
    /*
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            let tail = this.appendDummyInput('TAIL')
                .appendField('}');
            tail.setAlign(Blockly.inputs.Align.RIGHT);
        }*/
  }
};
Blockly.Blocks["ast_Dict_create_with_container"] = {
  /**
   * Mutator block for dict container.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
    this.appendDummyInput().appendField(this.translateText("Add new dict elements below"));
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_Dict_create_with_item"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.DICTIONARY));
    this.appendDummyInput().appendField("Element");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
python.pythonGenerator.forBlock["ast_Dict"] = function (block, generator) {
  // Create a dict with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    var child = block.getInputTargetBlock("ADD" + i);
    if (child === null || child.type !== "ast_DictItem") {
      elements[i] = python.pythonGenerator.blank + ": " + python.pythonGenerator.blank;
      continue;
    }
    var key = python.pythonGenerator.valueToCode(child, "KEY", python.Order.NONE) || python.pythonGenerator.blank;
    var value = python.pythonGenerator.valueToCode(child, "VALUE", python.Order.NONE) || python.pythonGenerator.blank;
    elements[i] = key + ": " + value;
  }
  var code = "{" + elements.join(", ") + "}";
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype["ast_Dict"] = function (node, parent) {
  var keys = node.keys;
  var values = node.values;
  if (keys === null) {
    return BlockMirrorTextToBlocks.create_block("ast_Dict", node.lineno, {}, {}, {
      inline: "false"
    }, {
      "@items": 0
    });
  }
  var elements = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = values[i];
    elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_DictItem", node.lineno, {}, {
      KEY: this.convert(key, node),
      VALUE: this.convert(value, node)
    }, this.LOCKED_BLOCK);
  }
  return BlockMirrorTextToBlocks.create_block("ast_Dict", node.lineno, {}, elements, {
    inline: "false"
  }, {
    "@items": keys.length
  });
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": 'ast_Starred',
  "message0": "*%1",
  "args0": [{
    "type": "input_value",
    "name": "VALUE"
  }],
  "inputsInline": false,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.VARIABLES
});
python.pythonGenerator.forBlock['ast_Starred'] = function (block, generator) {
  // Basic arithmetic operators, and power.
  var order = python.Order.NONE;
  var argument1 = python.pythonGenerator.valueToCode(block, 'VALUE', order) || python.pythonGenerator.blank;
  var code = "*" + argument1;
  return [code, order];
};
BlockMirrorTextToBlocks.prototype['ast_Starred'] = function (node, parent) {
  var value = node.value;
  var ctx = node.ctx;
  return BlockMirrorTextToBlocks.create_block('ast_Starred', node.lineno, {}, {
    "VALUE": this.convert(value, node)
  }, {
    "inline": true
  });
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_FormattedValue",
  "message0": "%1",
  "args0": [{
    "type": "input_value",
    "name": "VALUE"
  }],
  "output": "FormattedValueStr",
  "inputsInline": false,
  "colour": BlockMirrorTextToBlocks.COLOR.TEXT
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_JoinedStrStr",
  "message0": "%1",
  "args0": [{
    "type": "field_input",
    "name": "TEXT",
    "value": ''
  }],
  "output": "FormattedValueStr",
  "inputsInline": false,
  "colour": BlockMirrorTextToBlocks.COLOR.TEXT
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_FormattedValueFull",
  "tooltip": "",
  "helpUrl": "",
  "message0": "%1 : %2 ! %3 %4",
  "args0": [{
    "type": "input_value",
    "name": "VALUE"
  }, {
    "type": "field_input",
    "name": "FORMAT_SPEC",
    "text": ""
  }, {
    "type": "field_dropdown",
    "name": "CONVERSION",
    "options": [["plain", "-1"], ["repr", "r"], ["str", "s"], ["ascii", "a"]]
  }, {
    "type": "input_dummy",
    "name": "NAME"
  }],
  "output": "FormattedValueStr",
  "colour": BlockMirrorTextToBlocks.COLOR.TEXT
});
Blockly.Blocks["ast_JoinedStr"] = {
  /**
   * Block for JoinedStr and FormattedValue
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.itemCount_ = 3;
    this.updateShape_();
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setMutator(new Blockly.icons.MutatorIcon(["ast_JoinedStr_create_with_item_S", "ast_JoinedStr_create_with_item_FV", "ast_JoinedStr_create_with_item_FVF"], this));
  },
  /**
  * Create XML to represent dict inputs.
  * @return {!Element} XML storage element.
  * @this Blockly.Block
  */
  mutationToDom: function mutationToDom() {
    var container = document.createElement("mutation");
    container.setAttribute("items", this.itemCount_);
    return container;
  },
  /**
  * Parse XML to restore the dict inputs.
  * @param {!Element} xmlElement XML storage element.
  * @this Blockly.Block
  */
  domToMutation: function domToMutation(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
    this.updateShape_();
  },
  /**
  * Populate the mutator's dialog with this block's components.
  * @param {!Blockly.Workspace} workspace Mutator's workspace.
  * @return {!Blockly.Block} Root block in mutator.
  * @this Blockly.Block
  */
  decompose: function decompose(workspace) {
    var containerBlock = workspace.newBlock("ast_JoinedStr_create_with_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var piece = this.getInput("ADD" + i).connection;
      var pieceType = piece.targetConnection.getSourceBlock().type;
      console.log(piece, pieceType);
      var createName = pieceType === "ast_JoinedStrStr" ? "ast_JoinedStr_create_with_item_S" : pieceType === "ast_FormattedValueFull" ? "ast_JoinedStr_create_with_item_FVF" : "ast_JoinedStr_create_with_item_FV";
      var itemBlock = workspace.newBlock(createName);
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
  * Reconfigure this block based on the mutator dialog's components.
  * @param {!Blockly.Block} containerBlock Root block in mutator.
  * @this Blockly.Block
  */
  compose: function compose(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    // Count number of inputs.
    var connections = [];
    var blockTypes = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      blockTypes.push(itemBlock.type);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput("ADD" + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        var value = connection.getSourceBlock().getInput("VALUE");
        if (value && value.connection.targetConnection) {
          value.connection.targetConnection.getSourceBlock().unplug(true);
        }
        connection.disconnect();
        connection.getSourceBlock().dispose();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var _i1 = 0; _i1 < this.itemCount_; _i1++) {
      var _connections$_i5;
      (_connections$_i5 = connections[_i1]) === null || _connections$_i5 === void 0 || _connections$_i5.reconnect(this, "ADD" + _i1);
      if (!connections[_i1]) {
        var createName = blockTypes[_i1] === "ast_JoinedStr_create_with_item_S" ? "ast_JoinedStrStr" : blockTypes[_i1] === "ast_JoinedStr_create_with_item_FVF" ? "ast_FormattedValueFull" : "ast_FormattedValue";
        var _itemBlock2 = this.workspace.newBlock(createName);
        _itemBlock2.setDeletable(false);
        _itemBlock2.setMovable(false);
        _itemBlock2.initSvg();
        this.getInput("ADD" + _i1).connection.connect(_itemBlock2.outputConnection);
        _itemBlock2.render();
        //this.get(itemBlock, 'ADD'+i)
      }
    }
  },
  /**
  * Store pointers to any connected child blocks.
  * @param {!Blockly.Block} containerBlock Root block in mutator.
  * @this Blockly.Block
  */
  saveConnections: function saveConnections(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var i = 0;
    while (itemBlock) {
      var input = this.getInput("ADD" + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function updateShape_() {
    if (this.itemCount_ && this.getInput("EMPTY")) {
      this.removeInput("EMPTY");
    } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("empty string");
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput("ADD" + i)) {
        var input = this.appendValueInput("ADD" + i).setCheck("FormattedValueStr");
        if (i === 0) {
          input.appendField("Join:").setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput("ADD" + i)) {
      this.removeInput("ADD" + i);
      i++;
    }
    // Add the trailing "}"
    /*
        if (this.getInput('TAIL')) {
            this.removeInput('TAIL');
        }
        if (this.itemCount_) {
            let tail = this.appendDummyInput('TAIL')
                .appendField('}');
            tail.setAlign(Blockly.inputs.Align.RIGHT);
        }*/
  }
};
Blockly.Blocks["ast_JoinedStr_create_with_container"] = {
  /**
   * Mutator block for JoinedStr container.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.appendDummyInput().appendField("Add new values and strings below");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_JoinedStr_create_with_item_S"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.TEXT));
    this.appendDummyInput().appendField("Text");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_JoinedStr_create_with_item_FV"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.appendDummyInput().appendField("Expression");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_JoinedStr_create_with_item_FVF"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.appendDummyInput().appendField("Formatted Expression");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
python.pythonGenerator.forBlock["ast_JoinedStr"] = function (block, generator) {
  // Create a dict with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  var strings = [];
  var indices = [];
  for (var i = 0; i < block.itemCount_; i++) {
    var child = block.getInputTargetBlock("ADD" + i);
    if (child === null || child.type != "ast_JoinedStrStr" && child.type != "ast_FormattedValue" && child.type != "ast_FormattedValueFull") {
      elements[i] = python.pythonGenerator.blank;
      continue;
    }
    if (child.type === "ast_JoinedStrStr") {
      var value = child.getFieldValue("TEXT") || generator.blank;
      elements[i] = value;
      indices.push(i);
      strings.push(value);
    } else if (child.type === "ast_FormattedValue") {
      var _value = generator.valueToCode(child, "VALUE", generator.ORDER_NONE) || generator.blank;
      elements[i] = "{".concat(_value, "}");
    } else if (child.type === "ast_FormattedValueFull") {
      var _value2 = generator.valueToCode(child, "VALUE", generator.ORDER_NONE) || generator.blank;
      var formatSpec = child.getFieldValue("FORMAT_SPEC");
      formatSpec = formatSpec ? ":".concat(formatSpec) : "";
      var conversion = child.getFieldValue("CONVERSION");
      elements[i] = "{".concat(_value2).concat(formatSpec).concat(conversion === "-1" ? "" : "!".concat(conversion), "}");
    }
  }
  var code;
  if (strings.some(function (s) {
    return s.includes("\n");
  })) {
    indices.forEach(function (i) {
      elements[i] = elements[i].replace(/'''/g, '\\\'\\\'\\\'');
    });
    code = "f'''" + elements.join("") + "'''";
  } else {
    var quote = '"';
    if (strings.some(function (s) {
      return s.includes("'");
    })) {
      if (!strings.some(function (s) {
        return s.includes('"');
      })) {
        quote = "'";
      } else {
        indices.forEach(function (i) {
          elements[i] = elements[i].replace(/"/g, '\\"');
        });
      }
    }
    code = "f" + quote + elements.join("") + quote;
  }
  return [code, python.Order.ATOMIC];
};
BlockMirrorTextToBlocks.prototype["ast_JoinedStr"] = function (node, parent) {
  var _this14 = this;
  var values = node.values;
  var elements = {};
  values.forEach(function (v, i) {
    if (v._astname === "FormattedValue") {
      console.log(v);
      if (!v.conversion && !v.format_spec) {
        elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_FormattedValue", v.lineno, {}, {
          "VALUE": _this14.convert(v.value, node)
        }, _this14.LOCKED_BLOCK);
      } else {
        var format_spec = v.format_spec ? chompExclamation(v.format_spec.values[0].s.v) : "";
        // Can there ever be a non-1 length format_spec?
        elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_FormattedValueFull", v.lineno, {
          "FORMAT_SPEC": format_spec,
          "CONVERSION": v.conversion
        }, {
          "VALUE": _this14.convert(v.value, node)
        }, _this14.LOCKED_BLOCK);
      }
    } else if (v._astname === "Str") {
      var text = Sk.ffi.remapToJs(v.s);
      elements["ADD" + i] = BlockMirrorTextToBlocks.create_block("ast_JoinedStrStr", v.lineno, {
        "TEXT": text
      }, {}, _this14.LOCKED_BLOCK);
    }
  });
  return BlockMirrorTextToBlocks.create_block("ast_JoinedStr", node.lineno, {}, elements, {
    inline: values.length > 3 ? "false" : "true"
  }, {
    "@items": values.length
  });
};
function chompExclamation(text) {
  // Remove any text starting with an exclamation mark in the text
  return text.replace(/!.*$/, "");
}
function formattedValueConversion(conversion) {
  switch (conversion) {
    case -1:
      return "";
    case 115:
      return "s";
    case 114:
      return "r";
    case 97:
      return "a";
    default:
      return "";
  }
}
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_IfExp",
  "message0": "%1 if %2 else %3",
  "args0": [{
    "type": "input_value",
    "name": "BODY"
  }, {
    "type": "input_value",
    "name": "TEST"
  }, {
    "type": "input_value",
    "name": "ORELSE"
  }],
  "inputsInline": true,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.LOGIC
});
python.pythonGenerator.forBlock['ast_IfExp'] = function (block, generator) {
  var test = python.pythonGenerator.valueToCode(block, 'TEST', python.Order.CONDITIONAL) || python.pythonGenerator.blank;
  var body = python.pythonGenerator.valueToCode(block, 'BODY', python.Order.CONDITIONAL) || python.pythonGenerator.blank;
  var orelse = python.pythonGenerator.valueToCode(block, 'ORELSE', python.Order.CONDITIONAL) || python.pythonGenerator.blank;
  return [body + " if " + test + " else " + orelse + "\n", python.Order.CONDITIONAL];
};
BlockMirrorTextToBlocks.prototype['ast_IfExp'] = function (node, parent) {
  var test = node.test;
  var body = node.body;
  var orelse = node.orelse;
  return BlockMirrorTextToBlocks.create_block("ast_IfExp", node.lineno, {}, {
    "TEST": this.convert(test, node),
    "BODY": this.convert(body, node),
    "ORELSE": this.convert(orelse, node)
  });
};
var LibraryLabelFieldTextInput = /*#__PURE__*/function (_Blockly$FieldTextInp) {
  function LibraryLabelFieldTextInput(libraries, prefix, value, validator, config) {
    var _this15;
    _classCallCheck(this, LibraryLabelFieldTextInput);
    _this15 = _callSuper(this, LibraryLabelFieldTextInput, [value, validator, config]);
    _this15._libraries = libraries;
    _this15.prefix = prefix;
    return _this15;
  }
  _inherits(LibraryLabelFieldTextInput, _Blockly$FieldTextInp);
  return _createClass(LibraryLabelFieldTextInput, [{
    key: "getDisplayText_",
    value: function getDisplayText_() {
      var text = this.getText();
      var fromLibrary = this._libraries.resolve(this.prefix + text);
      if (fromLibrary instanceof PythonAttribute) {
        text = fromLibrary.label;
      }
      if (text.length > this.maxDisplayLength) {
        // Truncate displayed string and add an ellipsis ('...').
        text = text.substring(0, this.maxDisplayLength - 2) + '…';
      }
      // Replace whitespace with non-breaking spaces so the text doesn't collapse.
      text = text.replace(/\s/g, Blockly.Field.NBSP);
      if (this.sourceBlock_ && this.sourceBlock_.RTL) {
        // The SVG is LTR, force text to be RTL by adding an RLM.
        text += "\u200F";
      }
      return text;
    }
  }]);
}(Blockly.FieldTextInput);
Blockly.Blocks['ast_Attribute'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.premessage_ = "";
    this.message_ = "";
    this.postmessage_ = "";
    this.returns_ = 'Any';
    this.import_ = "";
    this.isFull_ = false;
    this.names_ = [];
    this.labels_ = [];
    this.fromLibrary_ = null;
    this.givenColour_ = BlockMirrorTextToBlocks.COLOR.OO;
    this.appendDummyInput('NAME').appendField(' ', 'premessage').appendField(new Blockly.FieldVariable('variable'), 'VALUE').appendField('.', 'message').appendField(new LibraryLabelFieldTextInput(this.workspace.libraries, "", 'attribute'), 'ATTR').appendField(' ', 'postmessage');
  },
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('premessage', this.premessage_);
    container.setAttribute('message', this.message_);
    container.setAttribute('postmessage', this.postmessage_);
    container.setAttribute('returns', this.returns_);
    container.setAttribute('import', this.import_);
    container.setAttribute('full', this.isFull_);
    container.setAttribute('names', this.names_.join('|'));
    container.setAttribute('labels', this.labels_.join('|'));
    container.setAttribute('fromlibrary', this.fromLibrary_);
    container.setAttribute('colour', this.givenColour_);
    return container;
  },
  domToMutation: function domToMutation(xmlElement) {
    this.premessage_ = xmlElement.getAttribute('premessage');
    this.message_ = xmlElement.getAttribute('message');
    this.postmessage_ = xmlElement.getAttribute('postmessage');
    this.returns_ = xmlElement.getAttribute('returns');
    this.import_ = xmlElement.getAttribute('import');
    this.isFull_ = "true" === xmlElement.getAttribute('full');
    this.names_ = xmlElement.getAttribute('names').split('|');
    this.labels_ = xmlElement.getAttribute('labels').split('|');
    this.fromLibrary_ = xmlElement.getAttribute('fromlibrary');
    var colour = xmlElement.getAttribute('colour');
    this.givenColour_ = parseInt(colour, 10);
    if (isNaN(this.givenColour_)) {
      this.givenColour_ = colour;
    }
    this.updateShape_();
  },
  updateShape_: function updateShape_() {
    var _this16 = this;
    if (this.isFull_) {
      var nameInput = this.getInput('NAME');
      if (nameInput.removeField('premessage', true)) {
        nameInput.removeField('VALUE');
        this.appendValueInput('VALUE').appendField(' ', 'premessage');
        this.moveInputBefore('VALUE', 'NAME');
      }
    } else {
      if (this.removeInput('VALUE', true)) {
        var _nameInput = this.getInput('NAME');
        _nameInput.insertFieldAt(0, new Blockly.FieldVariable('variable'), 'VALUE');
        _nameInput.insertFieldAt(0, new Blockly.FieldLabel(''), 'premessage');
      }
    }
    var attrField = this.getField('ATTR');
    if (attrField instanceof LibraryLabelFieldTextInput) {
      if (this.names_.length > 1) {
        var _nameInput2 = this.getInput('NAME');
        _nameInput2.removeField('ATTR');
        _nameInput2.insertFieldAt(this.isFull_ ? 1 : 3, new Blockly.FieldDropdown(this.names_.map(function (item, index) {
          return [_this16.labels_[index], item];
        })), 'ATTR');
      } else {
        attrField.prefix = this.fromLibrary_.replace(/[^.]+$/, '');
      }
    } else if (this.names_.length <= 1) {
      var _nameInput3 = this.getInput('NAME');
      _nameInput3.removeField('ATTR');
      _nameInput3.insertFieldAt(this.isFull_ ? 1 : 3, new LibraryLabelFieldTextInput(this.workspace.libraries, this.fromLibrary_.replace(/[^.]+$/, ''), 'attribute'), 'ATTR');
    }
    this.getField('premessage').setValue(this.premessage_);
    this.getField('message').setValue(this.message_);
    this.getField('postmessage').setValue(this.postmessage_);
    this.setColour(this.givenColour_);
  }
};
python.pythonGenerator.forBlock['ast_Attribute'] = function (block, generator) {
  if (block.import_) {
    var _block$import_$split3 = block.import_.split(' as ', 2),
      _block$import_$split4 = _slicedToArray(_block$import_$split3, 2),
      type = _block$import_$split4[0],
      alias = _block$import_$split4[1];
    if (type && !python.pythonGenerator.imports.hasType(type)) {
      var name = alias !== null && alias !== void 0 ? alias : type;
      python.pythonGenerator.imports.set(type, name);
    }
  }
  var value;
  if (block.isFull_) {
    value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.NONE) || python.pythonGenerator.blank;
  } else {
    value = python.pythonGenerator.getVariableName(block.getFieldValue('VALUE'), Blockly.Variables.NAME_TYPE);
  }
  var attr = block.getFieldValue('ATTR');
  var code = value + "." + attr;
  if (block.outputConnection && block.outputConnection.targetBlock()) {
    // Return as expression
    return [code, python.Order.MEMBER];
  }
  return code + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Attribute'] = function (node, parent) {
  var _fromLibrary$fullName;
  var value = node.value;
  var attrStr = Sk.ffi.remapToJs(node.attr);
  var returns = 'Any';
  var fromLibrary = this.resolveFromLibrary(node);
  var importAlias = null;
  var mutations = {
    "@returns": returns,
    "@premessage": '',
    "@message": '.',
    "@postmessage": '',
    "@import": '',
    "@full": false,
    "@names": '',
    "@labels": '',
    "@fromlibrary": (_fromLibrary$fullName = fromLibrary === null || fromLibrary === void 0 ? void 0 : fromLibrary.fullName) !== null && _fromLibrary$fullName !== void 0 ? _fromLibrary$fullName : ""
  };
  if (fromLibrary) {
    // TODO support for custom behavior?
    mutations["@colour"] = fromLibrary.colour;
    if (fromLibrary instanceof PythonAttribute) {
      var _fromLibrary$typeHint, _fromLibrary$typeHint2;
      mutations["@premessage"] = fromLibrary.premessage;
      mutations["@message"] = fromLibrary.message;
      mutations["@postmessage"] = fromLibrary.postmessage;
      mutations["@returns"] = (_fromLibrary$typeHint = (_fromLibrary$typeHint2 = fromLibrary.typeHint) === null || _fromLibrary$typeHint2 === void 0 ? void 0 : _fromLibrary$typeHint2.flattened().toString()) !== null && _fromLibrary$typeHint !== void 0 ? _fromLibrary$typeHint : returns;
      mutations["@names"] = fromLibrary.names.join("|");
      mutations["@labels"] = fromLibrary.labels.join("|");
      if (fromLibrary.pythonClass === null) {
        var _fromLibrary$pythonMo;
        mutations["@import"] = (_fromLibrary$pythonMo = fromLibrary.pythonModule.requiresImport) !== null && _fromLibrary$pythonMo !== void 0 ? _fromLibrary$pythonMo : "";
      }
    } else if (fromLibrary instanceof PythonClass || fromLibrary instanceof PythonModule) {
      if (fromLibrary.requiresImport) {
        mutations["@import"] = fromLibrary.requiresImport;
        var importType;
        var _fromLibrary$requires = fromLibrary.requiresImport.split(' as ', 2);
        var _fromLibrary$requires2 = _slicedToArray(_fromLibrary$requires, 2);
        importType = _fromLibrary$requires2[0];
        importAlias = _fromLibrary$requires2[1];
      }
    }
  } else {
    mutations["@colour"] = this.blockMirror.configuration.convertColour("ast_Attribute", BlockMirrorTextToBlocks.COLOR.OO);
  }
  var newBlock;
  if (importAlias !== null) {
    // TODO colour from fromLibrary?
    newBlock = BlockMirrorTextToBlocks.create_block('ast_Name', node.lineno, {
      "VAR": attrStr
    }, {}, {}, {
      "@import": mutations["@import"]
    });
  } else if (this.blockMirror.configuration.preferFullAttributeBlocks || value._astname !== "Name") {
    mutations["@full"] = true;
    newBlock = BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
      "ATTR": attrStr
    }, {
      "VALUE": this.convert(value, node)
    }, {}, mutations);
  } else {
    newBlock = BlockMirrorTextToBlocks.create_block("ast_Attribute", node.lineno, {
      "VALUE": Sk.ffi.remapToJs(value.id),
      "ATTR": attrStr
    }, {}, {}, mutations);
  }
  return newBlock;
};

// TODO: Support stuff like "append" where the message is after the value input
// TODO: Handle updating function/method definition -> update call
// TODO: Do a pretraversal to determine if a given function returns

Blockly.Blocks['ast_Call'] = {
  /**
   * Block for calling a procedure
   * @this Blockly.Block
   */
  init: function init() {
    this.givenColour_ = BlockMirrorTextToBlocks.COLOR.FUNCTIONS;
    this.setInputsInline(true);
    // Regular ('NAME') or Keyword (either '**' or '*NAME')
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    // acbart: Added count to keep track of unused parameters
    this.argumentCount_ = 0;
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    // acbart: Show parameter names, if they exist
    this.showParameterNames_ = false;
    // acbart: Whether this block returns
    this.returns_ = 'Any';
    // acbart: added simpleName to handle complex function calls (e.g., chained)
    this.isMethod_ = false;
    this.name_ = null;
    this.message_ = "function";
    this.premessage_ = "";
    this.postmessage_ = "";
    this.import_ = "";
    this.fromLibrary_ = null;
    var messageInput = this.appendDummyInput('MESSAGE_INPUT').setAlign(Blockly.inputs.Align.RIGHT);
    messageInput.appendField(new Blockly.FieldLabel(), 'MESSAGE');
  },
  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function getProcedureCall() {
    return this.name_;
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * Also rename if it was previously null.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function renameProcedure(oldName, newName) {
    if (this.name_ === null || Blockly.Names.equals(oldName, this.name_)) {
      this.name_ = newName;
      this.updateShape_();
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @private
   * @this Blockly.Block
   */
  setProcedureParameters_: function setProcedureParameters_(paramNames, paramIds) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(), this.workspace);
    var mutatorOpen = defBlock && defBlock.mutator && defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return false;
    }
    // Test arguments (arrays of strings) for changes. '\n' is not a valid
    // argument name character, so it is a valid delimiter here.
    if (paramNames.join('\n') === this.arguments_.join('\n')) {
      // No change.
      this.quarkIds_ = paramIds;
      return false;
    }
    if (paramIds.length !== paramNames.length) {
      throw RangeError('paramNames and paramIds must be the same length.');
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      this.quarkIds_ = [];
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var i = 0; i < this.arguments_.length; i++) {
      var input = this.getInput('ARG' + i);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (mutatorOpen && connection && paramIds.indexOf(this.quarkIds_[i]) === -1) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.argumentCount_ = this.arguments_.length;
    // And rebuild the argument model list.
    this.argumentVarModels_ = [];
    /*
    // acbart: Function calls don't create variables, what do they know?
    for (let i = 0; i < this.arguments_.length; i++) {
        let argumentName = this.arguments_[i];
        var variable = Blockly.Variables.getVariable(
            this.workspace, null, this.arguments_[i], '');
        if (variable) {
            this.argumentVarModels_.push(variable);
        }
    }*/

    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (var _i10 = 0; _i10 < this.arguments_.length; _i10++) {
        var quarkId = this.quarkIds_[_i10];
        if (quarkId in this.quarkConnections_) {
          var _connection = this.quarkConnections_[quarkId];
          if (!(_connection !== null && _connection !== void 0 && _connection.reconnect(this, 'ARG' + _i10))) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
    return true;
  },
  //defType_: 'procedures_defnoreturn',
  parseArgument_: function parseArgument_(argument) {
    if (argument.startsWith('KWARGS:')) {
      // KWARG
      return "unpack";
    } else if (argument.startsWith('KEYWORD:')) {
      var keywords = argument.substring(8);
      return keywords + "=";
    } else if (argument.startsWith("KNOWN_ARG:") && this.showParameterNames_) {
      // FIXME KNOWN_ARG is not set anywhere?
      return argument.substring(10) + "=";
    }
    return "";
  },
  updateShapeOfMessage: function updateShapeOfMessage(fromLibrary) {
    var messageInput = this.getInput('MESSAGE_INPUT');
    if (!fromLibrary) {
      this.setFieldValue(this.message_ + this.postmessage_ + " (", "MESSAGE");
      messageInput.removeField('MESSAGE_NAME', true);
      messageInput.removeField('MESSAGE_POST', true);
    } else {
      this.setFieldValue(this.message_, "MESSAGE");
      if (fromLibrary.labels.length === 1) {
        this.setFieldValue(this.message_ + fromLibrary.label + this.postmessage_ + " (", "MESSAGE");
        messageInput.removeField('MESSAGE_NAME', true);
        messageInput.removeField('MESSAGE_POST', true);
      } else if (messageInput.fieldRow.length === 1) {
        this.setFieldValue(this.message_, "MESSAGE");
        messageInput.appendField(new Blockly.FieldDropdown([[fromLibrary.label, fromLibrary.name]].concat(_toConsumableArray(fromLibrary.aliases.map(function (alias) {
          return [alias.label, alias.name];
        })))), "MESSAGE_NAME");
        messageInput.appendField(new Blockly.FieldLabel(this.postmessage_ + " ("), "MESSAGE_POST");
      }
    }
  },
  updateShapeOfArguments: function updateShapeOfArguments(fromLibrary) {
    // Process arguments
    var drawnArgumentCount = this.getDrawnArgumentCount_();
    var translateArgumentLabel = fromLibrary ? function (item) {
      return fromLibrary.pythonModule.library.translate(item, item);
    } : function (item) {
      return item;
    };
    for (var i = 0; i < drawnArgumentCount; i++) {
      var argument = this.arguments_[i];
      var argumentName = this.parseArgument_(argument);
      var argumentNames = [];
      var postfix = '';
      if (argumentName.endsWith('=')) {
        argumentNames = argumentName.substring(0, argumentName.length - 1).split(' ');
        argumentName = argumentNames[0];
        postfix = '=';
      }
      var field = this.getField('ARGNAME' + i);
      var postfixField = this.getField('ARGPOSTFIX' + i);
      if (field) {
        if (argumentNames.length > 1) {
          if (field instanceof Blockly.FieldLabel) {
            field = new Blockly.FieldDropdown(argumentNames.map(function (item) {
              return [translateArgumentLabel(item), item];
            }));
            var input = input.getInput('ARG' + i);
            input.removeField('ARGNAME' + i);
            input.insertFieldAt(0, field);
          } else {
            field.setOptions(argumentNames.map(function (item) {
              return [translateArgumentLabel(item), item];
            }));
          }
          field.setValue(argumentName, false);
        } else if (!(field instanceof Blockly.FieldLabel)) {
          var label = postfix === "=" ? translateArgumentLabel(argumentName) : argumentName;
          field = new Blockly.FieldLabel(label);
          var _input = _input.getInput('ARG' + i);
          _input.removeField('ARGNAME' + i);
          _input.insertFieldAt(0, field);
        }
      } else {
        // Add new input.
        // For now, this assumes the function definition does not change.
        if (argumentNames.length > 1) {
          field = new Blockly.FieldDropdown(argumentNames.map(function (item) {
            return [translateArgumentLabel(item), item];
          }));
        } else if (postfix === '=') {
          field = new Blockly.FieldLabel(translateArgumentLabel(argumentName));
        } else {
          field = new Blockly.FieldLabel(argumentName);
        }
        postfixField = new Blockly.FieldLabel(postfix);
        this.appendValueInput('ARG' + i).setAlign(Blockly.inputs.Align.RIGHT).appendField(field, 'ARGNAME' + i).appendField(postfixField, 'ARGPOSTFIX' + i).init();
      }
      field.setVisible(!!argumentName);
      postfixField.setVisible(!!postfix);
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function updateShape_() {
    // If it's a method, add in the caller
    if (this.isMethod_ && !this.getInput('FUNC')) {
      var func = this.appendValueInput('FUNC');
      // If there's a premessage, add it in
      if (this.premessage_ !== "") {
        func.appendField(this.premessage_);
      }
    } else if (!this.isMethod_ && this.getInput('FUNC')) {
      this.removeInput('FUNC');
    }
    var fromLibrary = this.fromLibrary_ === "" ? null : this.workspace.libraries.resolve(this.fromLibrary_);
    this.updateShapeOfMessage(fromLibrary);
    this.updateShapeOfArguments(fromLibrary);
    var i = this.getDrawnArgumentCount_();

    // Closing parentheses
    if (!this.getInput('CLOSE_PAREN')) {
      this.appendDummyInput('CLOSE_PAREN').setAlign(Blockly.inputs.Align.RIGHT).appendField(new Blockly.FieldLabel(")"));
    }

    // Move everything into place
    if (this.isMethod_) {
      this.moveInputBefore('FUNC', 'MESSAGE_INPUT');
    }
    this.moveInputBefore('MESSAGE_INPUT', 'CLOSE_PAREN');
    for (var j = 0; j < i; j++) {
      this.moveInputBefore('ARG' + j, 'CLOSE_PAREN');
    }

    // Set return state
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    if (this.returns_ === 'None') {
      this.setOutput(false);
    } else if (this.returns_ === 'bool') {
      this.setOutput(true, 'Boolean');
    } else {
      this.setOutput(true);
    }

    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    this.setColour(this.givenColour_);
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    var name = this.getProcedureCall();
    container.setAttribute('name', name === null ? '*' : name);
    container.setAttribute('arguments', this.argumentCount_);
    container.setAttribute('returns', this.returns_);
    container.setAttribute('parameters', this.showParameterNames_);
    container.setAttribute('method', this.isMethod_);
    container.setAttribute('message', this.message_);
    container.setAttribute('premessage', this.premessage_);
    container.setAttribute('postmessage', this.postmessage_);
    container.setAttribute('import', this.import_);
    container.setAttribute('fromlibrary', this.fromLibrary_);
    container.setAttribute('colour', this.givenColour_);
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      container.appendChild(parameter);
      parameter.textContent = this.argumentInfo[i];
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.name_ = xmlElement.getAttribute('name');
    if (this.name_ === '*') {
      this.name_ = null;
    }
    this.argumentCount_ = parseInt(xmlElement.getAttribute('arguments'), 10);
    this.showParameterNames_ = "true" === xmlElement.getAttribute('parameters');
    this.returns_ = xmlElement.getAttribute('returns');
    this.isMethod_ = "true" === xmlElement.getAttribute('method');
    this.message_ = xmlElement.getAttribute('message');
    this.premessage_ = xmlElement.getAttribute('premessage');
    this.postmessage_ = xmlElement.getAttribute('postmessage');
    this.import_ = xmlElement.getAttribute('import');
    this.fromLibrary_ = xmlElement.getAttribute('fromlibrary');
    var colour = xmlElement.getAttribute('colour');
    this.givenColour_ = parseInt(colour, 10);
    if (isNaN(this.givenColour_)) {
      this.givenColour_ = colour;
    }
    var args = [];
    var paramIds = [];
    this.argumentInfo = [];
    for (var i = 0; i < xmlElement.childNodes.length; i++) {
      var childNode = xmlElement.childNodes[i];
      if (childNode.nodeName.toLowerCase() === 'arg') {
        args.push(childNode.getAttribute('name'));
        paramIds.push(childNode.getAttribute('paramId'));
        this.argumentInfo.push(childNode.textContent);
      }
    }
    var result = this.setProcedureParameters_(args, paramIds);
    if (!result) {
      this.updateShape_();
    }
    if (this.name_ !== null) {
      this.renameProcedure(this.getProcedureCall(), this.name_);
    }
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this Blockly.Block
   */
  getVarModels: function getVarModels() {
    return this.argumentVarModels_;
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function customContextMenu(options) {
    if (!this.workspace.isMovable()) {
      // If we center on the block and the workspace is not movable,
      // we could lose blocks at the edges of the workspace.
      return;
    }
    var workspace = this.workspace;
    var block = this;

    // Highlight Definition
    var option = {
      enabled: true
    };
    option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
    var name = this.getProcedureCall();
    option.callback = function () {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);

    // Show Parameter Names
    options.push({
      enabled: true,
      text: "Show/Hide parameters",
      callback: function callback() {
        block.showParameterNames_ = !block.showParameterNames_;
        block.updateShape_();
        block.render();
      }
    });
  },
  getDrawnArgumentCount_: function getDrawnArgumentCount_() {
    return Math.min(this.argumentCount_, this.arguments_.length);
  }
};
python.pythonGenerator.forBlock['ast_Call'] = function (block, generator) {
  var _block$getField;
  if (block.import_) {
    var _block$import_$split5 = block.import_.split(' as ', 2),
      _block$import_$split6 = _slicedToArray(_block$import_$split5, 2),
      type = _block$import_$split6[0],
      alias = _block$import_$split6[1];
    if (type && !python.pythonGenerator.imports.hasType(type)) {
      var _name3 = alias !== null && alias !== void 0 ? alias : type;
      python.pythonGenerator.imports.set(type, _name3);
    }
  }
  // Get the caller
  var funcName, fromLibrary;
  var name = (_block$getField = block.getField('MESSAGE_NAME')) === null || _block$getField === void 0 ? void 0 : _block$getField.getValue();
  if (name) {
    name = this.name_.substring(0, this.name_.lastIndexOf('.') + 1) + name;
  } else {
    name = this.name_;
  }
  if (block.isMethod_) {
    var caller = python.pythonGenerator.valueToCode(block, 'FUNC', python.Order.FUNCTION_CALL) || python.pythonGenerator.blank;
    var funcInputTargetBlock = block.getInputTargetBlock('FUNC');
    if (funcInputTargetBlock !== null && funcInputTargetBlock !== void 0 && funcInputTargetBlock.returns_) {
      fromLibrary = generator.libraries.resolve(funcInputTargetBlock.returns_ + name);
      funcName = caller + name;
    } else {
      var _python$pythonGenerat, _python$pythonGenerat2;
      var resolvedCaller = (_python$pythonGenerat = python.pythonGenerator.variables.getSingleType(caller)) !== null && _python$pythonGenerat !== void 0 ? _python$pythonGenerat : caller;
      resolvedCaller = (_python$pythonGenerat2 = python.pythonGenerator.imports.getType(resolvedCaller)) !== null && _python$pythonGenerat2 !== void 0 ? _python$pythonGenerat2 : resolvedCaller;
      fromLibrary = generator.libraries.resolve(resolvedCaller + name);
      funcName = resolvedCaller + name;
    }
  } else {
    funcName = name;
    fromLibrary = generator.libraries.resolve(name);
  }
  if (fromLibrary) {
    // Save library item to the block, in case it changed
    block.fromLibrary_ = fromLibrary.fullName;
  } else if (block.fromLibrary_) {
    // Fall back to previously resolved library item
    fromLibrary = generator.libraries.resolve(block.fromLibrary_);
  }
  if (fromLibrary instanceof PythonClass) {
    var _fromLibrary$members$;
    fromLibrary = (_fromLibrary$members$ = fromLibrary.members.get("__init__")) !== null && _fromLibrary$members$ !== void 0 ? _fromLibrary$members$ : fromLibrary;
  }
  if (fromLibrary instanceof PythonFunction) {
    // Needed in case values were modified, but no blocks dragged.
    fromLibrary.applyShadow(block);
  }

  // Build the arguments
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    var argBlock = block.getInputTargetBlock('ARG' + i);
    if (argBlock !== null && argBlock !== void 0 && argBlock.shadow) {
      continue;
    }
    var value = python.pythonGenerator.valueToCode(block, 'ARG' + i, python.Order.NONE) || python.pythonGenerator.blank;
    var argument = block.arguments_[i];
    if (argument.startsWith('KWARGS:')) {
      args.push("**" + value);
    } else if (argument.startsWith('KEYWORD:')) {
      var keyword = void 0;
      if (block.getField('ARGNAME' + i) instanceof Blockly.FieldLabel) {
        keyword = argument.substring(8);
      } else {
        keyword = block.getFieldValue('ARGNAME' + i);
      }
      args.push(keyword + "=" + value);
    } else {
      args.push(value);
    }
  }

  // Return the result
  var code = funcName + '(' + args.join(', ') + ')';
  if (block.outputConnection && block.outputConnection.targetBlock()) {
    // Return as expression
    return [code, python.Order.FUNCTION_CALL];
  }
  return code + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Call'] = function (node, parent) {
  var _fromLibrary$fullName2,
    _fromLibrary,
    _this17 = this;
  var func = node.func;
  var args = node.args;
  var keywords = node.keywords;
  var isMethod = false;
  var import_ = null;
  var premessage = "";
  var postmessage = "";
  var message;
  var name;
  var caller = null;
  var returns = 'Any';
  var fromLibrary = this.resolveFromLibrary(func);
  if (func._astname === 'Name') {
    message = name = Sk.ffi.remapToJs(func.id);
  } else if (func._astname === 'Attribute') {
    isMethod = true;
    caller = func.value;
    var attributeName = Sk.ffi.remapToJs(func.attr);
    name = "." + attributeName;
    message = name;
  } else {
    isMethod = true;
    caller = func;
    message = "";
    name = "";
    // (lambda x: x)()
  }
  if (fromLibrary) {
    if (fromLibrary instanceof PythonClass) {
      var _fromLibrary$members$2;
      fromLibrary = (_fromLibrary$members$2 = fromLibrary.members.get("__init__")) !== null && _fromLibrary$members$2 !== void 0 ? _fromLibrary$members$2 : fromLibrary;
    }
    if (fromLibrary instanceof PythonFunction) {
      if (fromLibrary instanceof PythonMethod && !(fromLibrary instanceof PythonConstructorMethod) && !(fromLibrary.classmethod || fromLibrary.staticmethod)) {
        // Regular instance method, no import needed
        import_ = "";
      } else {
        var _fromLibrary$pythonCl, _fromLibrary$pythonCl2;
        import_ = (_fromLibrary$pythonCl = (_fromLibrary$pythonCl2 = fromLibrary.pythonClass) === null || _fromLibrary$pythonCl2 === void 0 ? void 0 : _fromLibrary$pythonCl2.requiresImport) !== null && _fromLibrary$pythonCl !== void 0 ? _fromLibrary$pythonCl : fromLibrary.pythonModule.requiresImport;
      }
      name = fromLibrary.name;
      premessage = fromLibrary.premessage;
      postmessage = fromLibrary.postmessage;
      message = fromLibrary.message;
      if (fromLibrary.typeHint) {
        returns = fromLibrary.typeHint.flattened().toString();
      }
      if (fromLibrary instanceof PythonConstructorMethod) {
        // For constructor methods, the caller is fixed.
        isMethod = false;
        name = fromLibrary.pythonClass.name;
        returns = fromLibrary.pythonClass.fullName;
      } else if (fromLibrary instanceof PythonMethod) {
        // For static and class methods, the caller is fixed.
        isMethod = !fromLibrary.staticmethod && !fromLibrary.classmethod;
        if (isMethod) {
          caller = func.value;
          name = "." + fromLibrary.name;
        } else {
          name = fromLibrary.pythonClass.name + "." + fromLibrary.name;
        }
      } else {
        // For functions, the caller is fixed.
        isMethod = false;
        if (fromLibrary.pythonModule.name === "") {
          name = fromLibrary.name;
        } else {
          name = fromLibrary.pythonModule.name + "." + fromLibrary.name;
          if (message === ".") {
            var _this$imports$getName;
            var moduleName = (_this$imports$getName = this.imports.getName(fromLibrary.pythonModule.fullName)) !== null && _this$imports$getName !== void 0 ? _this$imports$getName : fromLibrary.pythonModule.name;
            message = moduleName + message;
          }
        }
      }
    } else {
      throw new TypeError("Unexpected type from library: " + fromLibrary.constructor.name + " for " + this.getAsModule(func.value));
    }
  }
  var colour;
  if (fromLibrary) {
    if (fromLibrary.custom) {
      try {
        var result = fromLibrary.custom(node, parent, this);
        if (result !== null && result !== undefined) {
          return result;
        }
      } catch (e) {
        console.error(e);
        // We tried to be fancy and failed, better fall back to default behavior!
      }
    }
    colour = fromLibrary.colour;
  } else {
    colour = this.blockMirror.configuration.convertColour("ast_Call", BlockMirrorTextToBlocks.COLOR.FUNCTIONS);
  }
  var argumentsNormal = {};
  // TODO: do I need to be limiting only the *args* length, not keywords?
  var argumentsMutation = {
    "@arguments": (args !== null ? args.length : 0) + (keywords !== null ? keywords.length : 0),
    "@returns": returns,
    "@parameters": true,
    "@method": isMethod,
    "@name": name,
    "@message": message,
    "@premessage": premessage,
    "@postmessage": postmessage,
    "@colour": colour,
    "@import": import_ !== null && import_ !== void 0 ? import_ : "",
    "@fromlibrary": (_fromLibrary$fullName2 = (_fromLibrary = fromLibrary) === null || _fromLibrary === void 0 ? void 0 : _fromLibrary.fullName) !== null && _fromLibrary$fullName2 !== void 0 ? _fromLibrary$fullName2 : ""
  };
  // Handle arguments
  var overallI = 0;
  if (args !== null) {
    for (var i = 0; i < args.length; i += 1, overallI += 1) {
      argumentsNormal["ARG" + i] = this.convert(args[i], node);
      argumentsMutation["UNKNOWN_ARG:" + i] = null;
    }
  }
  if (fromLibrary instanceof PythonFunction) {
    if (args !== null) {
      for (var _i11 = 0; _i11 < args.length; _i11 += 1) {
        argumentsMutation["UNKNOWN_ARG:" + _i11] = document.createTextNode(fromLibrary.fullName);
      }
    }
    if (this.blockMirror.configuration.showDefaultArguments) {
      for (var _i12 = overallI; _i12 < fromLibrary.parameters.length - fromLibrary.argumentOffset; _i12 += 1) {
        var pythonParameter = fromLibrary.parameters[_i12 + fromLibrary.argumentOffset];
        if (pythonParameter.keyword || pythonParameter.preferKeyword) {
          break;
        }
        if (pythonParameter.defaultValue !== "") {
          argumentsNormal["ARG" + _i12] = pythonParameter.defaultValueBlocks(this);
        }
        argumentsMutation["UNKNOWN_ARG:" + _i12] = document.createTextNode(fromLibrary.fullName);
        overallI += 1;
      }
    }
  }
  var foundKeywords = new Set();
  var overallIBeforeKeywords = overallI;
  if (keywords !== null) {
    var _loop5 = function _loop5() {
      var keyword = keywords[_i13];
      var arg = keyword.arg;
      var value = keyword.value;
      if (arg === null) {
        argumentsNormal["ARG" + overallI] = _this17.convert(value, node);
        argumentsMutation["KWARGS:" + overallI] = null;
      } else {
        argumentsNormal["ARG" + overallI] = _this17.convert(value, node);
        var keywordName = Sk.ffi.remapToJs(arg);
        if (fromLibrary instanceof PythonFunction) {
          var parameter = fromLibrary.parameters.findByKeyword(keywordName);
          foundKeywords.add(keywordName);
          var keywordNames = keywordName;
          if ((parameter === null || parameter === void 0 ? void 0 : parameter.names.length) > 1) {
            var otherNames = _toConsumableArray(parameter.names).filter(function (item) {
              return item !== keywordName;
            });
            keywordNames = keywordName + ' ' + otherNames;
            otherNames.forEach(foundKeywords.add, foundKeywords);
          }
          argumentsMutation["KEYWORD:" + keywordNames] = document.createTextNode(fromLibrary.fullName + " " + keywordName);
        } else {
          argumentsMutation["KEYWORD:" + keywordName] = null;
        }
      }
    };
    for (var _i13 = 0; _i13 < keywords.length; _i13 += 1, overallI += 1) {
      _loop5();
    }
  }
  if (this.blockMirror.configuration.showDefaultArguments && fromLibrary instanceof PythonFunction) {
    for (var _i14 = overallIBeforeKeywords; _i14 < fromLibrary.parameters.length - fromLibrary.argumentOffset; _i14 += 1) {
      var _pythonParameter = fromLibrary.parameters[_i14 + fromLibrary.argumentOffset];
      if (!(_pythonParameter.keyword || _pythonParameter.preferKeyword) || foundKeywords.has(_pythonParameter.name)) {
        continue;
      }
      if (_pythonParameter.variableLength) {
        continue;
      }
      if (_pythonParameter.defaultValue !== "") {
        argumentsNormal["ARG" + overallI] = _pythonParameter.defaultValueBlocks(this);
      }
      argumentsMutation["KEYWORD:" + _pythonParameter.names.join(' ')] = document.createTextNode(fromLibrary.fullName + " " + _pythonParameter.name);
      overallI += 1;
    }
  }
  if (isMethod) {
    argumentsNormal['FUNC'] = this.convert(caller, node);
  }

  // Build actual block
  var newBlock = BlockMirrorTextToBlocks.create_block("ast_Call", node.lineno, {}, argumentsNormal, {
    inline: true
  }, argumentsMutation);
  if (fromLibrary instanceof PythonFunction) {
    fromLibrary.applyShadow(newBlock);
  }
  if (returns === 'None' || this.isStatement(node)) {
    // Return as statement
    return [newBlock];
  } else {
    // Return as expression
    return newBlock;
  }
};
Blockly.Blocks['ast_Raise'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.EXCEPTIONS));
    this.exc_ = true;
    this.cause_ = false;
    this.appendDummyInput().appendField("raise");
    this.updateShape_();
  },
  updateShape_: function updateShape_() {
    if (this.exc_ && !this.getInput('EXC')) {
      this.appendValueInput("EXC").setCheck(null);
    } else if (!this.exc_ && this.getInput('EXC')) {
      this.removeInput('EXC');
    }
    if (this.cause_ && !this.getInput('CAUSE')) {
      this.appendValueInput("CAUSE").setCheck(null).appendField("from");
    } else if (!this.cause_ && this.getInput('CAUSE')) {
      this.removeInput('CAUSE');
    }
    if (this.cause_ && this.exc_) {
      this.moveInputBefore('EXC', 'CAUSE');
    }
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('exc', this.exc_);
    container.setAttribute('cause', this.cause_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.exc_ = "true" === xmlElement.getAttribute('exc');
    this.cause_ = "true" === xmlElement.getAttribute('cause');
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Raise'] = function (block, generator) {
  if (this.exc_) {
    var exc = python.pythonGenerator.valueToCode(block, 'EXC', python.Order.NONE) || python.pythonGenerator.blank;
    if (this.cause_) {
      var cause = python.pythonGenerator.valueToCode(block, 'CAUSE', python.Order.NONE) || python.pythonGenerator.blank;
      return "raise " + exc + " from " + cause + "\n";
    } else {
      return "raise " + exc + "\n";
    }
  } else {
    return "raise" + "\n";
  }
};
BlockMirrorTextToBlocks.prototype['ast_Raise'] = function (node, parent) {
  var exc = node.exc;
  var cause = node.cause;
  var values = {};
  var hasExc = false,
    hasCause = false;
  if (exc !== null) {
    values['EXC'] = this.convert(exc, node);
    hasExc = true;
  }
  if (cause !== null) {
    values['CAUSE'] = this.convert(cause, node);
    hasCause = true;
  }
  return BlockMirrorTextToBlocks.create_block("ast_Raise", node.lineno, {}, values, {}, {
    '@exc': hasExc,
    '@cause': hasCause
  });
};
Blockly.Blocks['ast_Delete'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.targetCount_ = 1;
    this.appendDummyInput().appendField(this.translateText("delete"));
    this.updateShape_();
  },
  updateShape_: function updateShape_() {
    // Add new inputs.
    for (var i = 0; i < this.targetCount_; i++) {
      if (!this.getInput('TARGET' + i)) {
        var input = this.appendValueInput('TARGET' + i);
        if (i !== 0) {
          input.appendField(',').setAlign(Blockly.inputs.Align.RIGHT);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('TARGET' + i)) {
      this.removeInput('TARGET' + i);
      i++;
    }
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('targets', this.targetCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.targetCount_ = parseInt(xmlElement.getAttribute('targets'), 10);
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Delete'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.targetCount_);
  for (var i = 0; i < block.targetCount_; i++) {
    elements[i] = python.pythonGenerator.valueToCode(block, 'TARGET' + i, python.Order.NONE) || python.pythonGenerator.blank;
  }
  var code = 'del ' + elements.join(', ') + "\n";
  return code;
};
BlockMirrorTextToBlocks.prototype['ast_Delete'] = function (node, parent) {
  var targets = node.targets;
  return BlockMirrorTextToBlocks.create_block("ast_Delete", node.lineno, {}, this.convertElements("TARGET", targets, node), {
    "inline": "true"
  }, {
    "@targets": targets.length
  });
};
Blockly.Blocks['ast_Subscript'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setOutput(true);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.sliceKinds_ = ["I"];
    this.appendValueInput("VALUE").setCheck(null);
    this.appendDummyInput('OPEN_BRACKET').appendField("[");
    this.appendDummyInput('CLOSE_BRACKET').appendField("]");
    this.updateShape_();
  },
  setExistence: function setExistence(label, exist, isDummy) {
    if (exist && !this.getInput(label)) {
      if (isDummy) {
        return this.appendDummyInput(label);
      } else {
        return this.appendValueInput(label);
      }
    } else if (!exist && this.getInput(label)) {
      this.removeInput(label);
    }
    return null;
  },
  createSlice_: function createSlice_(i, kind) {
    // ,
    var input = this.setExistence('COMMA' + i, i !== 0, true);
    if (input) {
      input.appendField(",");
    }
    // Single index
    var isIndex = kind.charAt(0) === 'I';
    input = this.setExistence('INDEX' + i, isIndex, false);
    // First index
    input = this.setExistence('SLICELOWER' + i, !isIndex && "1" === kind.charAt(1), false);
    // First colon
    input = this.setExistence('SLICECOLON' + i, !isIndex, true);
    if (input) {
      input.appendField(':').setAlign(Blockly.inputs.Align.RIGHT);
    }
    // Second index
    input = this.setExistence('SLICEUPPER' + i, !isIndex && "1" === kind.charAt(2), false);
    // Second colon and third index
    input = this.setExistence('SLICESTEP' + i, !isIndex && "1" === kind.charAt(3), false);
    if (input) {
      input.appendField(':').setAlign(Blockly.inputs.Align.RIGHT);
    }
  },
  updateShape_: function updateShape_() {
    // Add new inputs.
    for (var i = 0; i < this.sliceKinds_.length; i++) {
      this.createSlice_(i, this.sliceKinds_[i]);
    }
    for (var j = 0; j < i; j++) {
      if (j !== 0) {
        this.moveInputBefore('COMMA' + j, 'CLOSE_BRACKET');
      }
      var kind = this.sliceKinds_[j];
      if (kind.charAt(0) === "I") {
        this.moveInputBefore('INDEX' + j, 'CLOSE_BRACKET');
      } else {
        if (kind.charAt(1) === "1") {
          this.moveInputBefore("SLICELOWER" + j, 'CLOSE_BRACKET');
        }
        this.moveInputBefore("SLICECOLON" + j, 'CLOSE_BRACKET');
        if (kind.charAt(2) === "1") {
          this.moveInputBefore("SLICEUPPER" + j, 'CLOSE_BRACKET');
        }
        if (kind.charAt(3) === "1") {
          this.moveInputBefore("SLICESTEP" + j, 'CLOSE_BRACKET');
        }
      }
    }

    // Remove deleted inputs.
    while (this.getInput('TARGET' + i) || this.getInput('SLICECOLON')) {
      this.removeInput('COMMA' + i, true);
      if (this.getInput('INDEX' + i)) {
        this.removeInput('INDEX' + i);
      } else {
        this.removeInput('SLICELOWER' + i, true);
        this.removeInput('SLICECOLON' + i, true);
        this.removeInput('SLICEUPPER' + i, true);
        this.removeInput('SLICESTEP' + i, true);
      }
      i++;
    }
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    for (var i = 0; i < this.sliceKinds_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.sliceKinds_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.sliceKinds_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() === 'arg') {
        this.sliceKinds_.push(childNode.getAttribute('name'));
      }
    }
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Subscript'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.MEMBER) || python.pythonGenerator.blank;
  var slices = new Array(block.sliceKinds_.length);
  for (var i = 0; i < block.sliceKinds_.length; i++) {
    var kind = block.sliceKinds_[i];
    if (kind.charAt(0) === 'I') {
      slices[i] = python.pythonGenerator.valueToCode(block, 'INDEX' + i, python.Order.MEMBER) || python.pythonGenerator.blank;
    } else {
      slices[i] = "";
      if (kind.charAt(1) === '1') {
        slices[i] += python.pythonGenerator.valueToCode(block, 'SLICELOWER' + i, python.Order.MEMBER) || python.pythonGenerator.blank;
      }
      slices[i] += ":";
      if (kind.charAt(2) === '1') {
        slices[i] += python.pythonGenerator.valueToCode(block, 'SLICEUPPER' + i, python.Order.MEMBER) || python.pythonGenerator.blank;
      }
      if (kind.charAt(3) === '1') {
        slices[i] += ":" + python.pythonGenerator.valueToCode(block, 'SLICESTEP' + i, python.Order.MEMBER) || python.pythonGenerator.blank;
      }
    }
  }
  var code = value + '[' + slices.join(', ') + "]";
  return [code, python.Order.MEMBER];
};
var isWeirdSliceCase = function isWeirdSliceCase(slice) {
  return slice.lower == null && slice.upper == null && slice.step !== null && slice.step._astname === 'NameConstant' && slice.step.value === Sk.builtin.none.none$;
};
BlockMirrorTextToBlocks.prototype.addSliceDim = function (slice, i, values, mutations, node) {
  var sliceKind = slice._astname;
  if (sliceKind === "Index") {
    values['INDEX' + i] = this.convert(slice.value, node);
    mutations.push("I");
  } else if (sliceKind === "Slice") {
    var L = "0",
      U = "0",
      S = "0";
    if (slice.lower !== null) {
      values['SLICELOWER' + i] = this.convert(slice.lower, node);
      L = "1";
    }
    if (slice.upper !== null) {
      values['SLICEUPPER' + i] = this.convert(slice.upper, node);
      U = "1";
    }
    if (slice.step !== null && !isWeirdSliceCase(slice)) {
      values['SLICESTEP' + i] = this.convert(slice.step, node);
      S = "1";
    }
    mutations.push("S" + L + U + S);
  }
};
BlockMirrorTextToBlocks.prototype['ast_Subscript'] = function (node, parent) {
  var value = node.value;
  var slice = node.slice;
  var ctx = node.ctx;
  var values = {
    'VALUE': this.convert(value, node)
  };
  var mutations = [];
  var sliceKind = slice._astname;
  if (sliceKind === "ExtSlice") {
    for (var i = 0; i < slice.dims.length; i += 1) {
      var dim = slice.dims[i];
      this.addSliceDim(dim, i, values, mutations, node);
    }
  } else {
    this.addSliceDim(slice, 0, values, mutations, node);
  }
  return BlockMirrorTextToBlocks.create_block("ast_Subscript", node.lineno, {}, values, {
    "inline": "true"
  }, {
    "arg": mutations
  });
};
BlockMirrorTextToBlocks.BLOCKS.push({
  type: "ast_comprehensionFor",
  message0: "for %1 in %2",
  args0: [{
    type: "input_value",
    name: "TARGET"
  }, {
    type: "input_value",
    name: "ITER"
  }],
  inputsInline: true,
  output: "ComprehensionFor",
  colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES
});
BlockMirrorTextToBlocks.BLOCKS.push({
  type: "ast_comprehensionIf",
  message0: "if %1",
  args0: [{
    type: "input_value",
    name: "TEST"
  }],
  inputsInline: true,
  output: "ComprehensionIf",
  colour: BlockMirrorTextToBlocks.COLOR.SEQUENCES
});
Blockly.Blocks["ast_Comp_create_with_container"] = {
  /**
   * Mutator block for dict container.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.appendDummyInput().appendField("Add new comprehensions below");
    this.appendDummyInput().appendField("   For clause");
    this.appendStatementInput("STACK");
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_Comp_create_with_for"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.appendDummyInput().appendField("For clause");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
Blockly.Blocks["ast_Comp_create_with_if"] = {
  /**
   * Mutator block for adding items.
   * @this Blockly.Block
   */
  init: function init() {
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
    this.appendDummyInput().appendField("If clause");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};
BlockMirrorTextToBlocks.COMP_SETTINGS = {
  ListComp: {
    start: "[",
    end: "]",
    color: BlockMirrorTextToBlocks.COLOR.LIST
  },
  SetComp: {
    start: "{",
    end: "}",
    color: BlockMirrorTextToBlocks.COLOR.SET
  },
  GeneratorExp: {
    start: "(",
    end: ")",
    color: BlockMirrorTextToBlocks.COLOR.SEQUENCES
  },
  DictComp: {
    start: "{",
    end: "}",
    color: BlockMirrorTextToBlocks.COLOR.DICTIONARY
  }
};
["ListComp", "SetComp", "GeneratorExp", "DictComp"].forEach(function (kind) {
  Blockly.Blocks["ast_" + kind] = {
    /**
     * Block for creating a dict with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function init() {
      this.setStyle("loop_blocks");
      this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COMP_SETTINGS[kind].color));
      this.itemCount_ = 3;
      var input = this.appendValueInput("ELT").appendField(BlockMirrorTextToBlocks.COMP_SETTINGS[kind].start);
      if (kind === "DictComp") {
        input.setCheck("DictPair");
      }
      this.appendDummyInput("END_BRACKET").appendField(BlockMirrorTextToBlocks.COMP_SETTINGS[kind].end);
      this.updateShape_();
      this.setOutput(true);
      this.setMutator(new Blockly.icons.MutatorIcon(["ast_Comp_create_with_for", "ast_Comp_create_with_if"], this));
    },
    /**
     * Create XML to represent dict inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function mutationToDom() {
      var container = document.createElement("mutation");
      container.setAttribute("items", this.itemCount_);
      return container;
    },
    /**
     * Parse XML to restore the dict inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function domToMutation(xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
      this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function decompose(workspace) {
      var containerBlock = workspace.newBlock("ast_Comp_create_with_container");
      containerBlock.initSvg();
      var connection = containerBlock.getInput("STACK").connection;
      var generators = [];
      for (var i = 1; i < this.itemCount_; i++) {
        var generator = this.getInput("GENERATOR" + i).connection;
        var createName = void 0;
        if (generator.targetConnection.getSourceBlock().type === "ast_comprehensionIf") {
          createName = "ast_Comp_create_with_if";
        } else if (generator.targetConnection.getSourceBlock().type === "ast_comprehensionFor") {
          createName = "ast_Comp_create_with_for";
        } else {
          throw Error("Unknown block type: " + generator.targetConnection.getSourceBlock().type);
        }
        var itemBlock = workspace.newBlock(createName);
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
        generators.push(itemBlock);
      }
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function compose(containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock("STACK");
      // Count number of inputs.
      var connections = [containerBlock.valueConnection_];
      var blockTypes = ["ast_Comp_create_with_for"];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        blockTypes.push(itemBlock.type);
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (var i = 1; i < this.itemCount_; i++) {
        var connection = this.getInput("GENERATOR" + i).connection.targetConnection;
        if (connection && connections.indexOf(connection) === -1) {
          var connectedBlock = connection.getSourceBlock();
          if (connectedBlock.type === "ast_comprehensionIf") {
            var testField = connectedBlock.getInput("TEST");
            if (testField.connection.targetConnection) {
              testField.connection.targetConnection.getSourceBlock().unplug(true);
            }
          } else if (connectedBlock.type === "ast_comprehensionFor") {
            var iterField = connectedBlock.getInput("ITER");
            if (iterField.connection.targetConnection) {
              iterField.connection.targetConnection.getSourceBlock().unplug(true);
            }
            var targetField = connectedBlock.getInput("TARGET");
            if (targetField.connection.targetConnection) {
              targetField.connection.targetConnection.getSourceBlock().unplug(true);
            }
          } else {
            throw Error("Unknown block type: " + connectedBlock.type);
          }
          connection.disconnect();
          connection.getSourceBlock().dispose();
        }
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      // Reconnect any child blocks.
      for (var _i15 = 1; _i15 < this.itemCount_; _i15++) {
        var _connections$_i6;
        (_connections$_i6 = connections[_i15]) === null || _connections$_i6 === void 0 || _connections$_i6.reconnect(this, "GENERATOR" + _i15);
        // TODO: glitch when inserting into middle, deletes children values
        if (!connections[_i15]) {
          var createName = void 0;
          if (blockTypes[_i15] === "ast_Comp_create_with_if") {
            createName = "ast_comprehensionIf";
          } else if (blockTypes[_i15] === "ast_Comp_create_with_for") {
            createName = "ast_comprehensionFor";
          } else {
            throw Error("Unknown block type: " + blockTypes[_i15]);
          }
          var _itemBlock3 = this.workspace.newBlock(createName);
          _itemBlock3.setDeletable(false);
          _itemBlock3.setMovable(false);
          _itemBlock3.initSvg();
          this.getInput("GENERATOR" + _i15).connection.connect(_itemBlock3.outputConnection);
          _itemBlock3.render();
          //this.get(itemBlock, 'ADD'+i)
        }
      }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function saveConnections(containerBlock) {
      containerBlock.valueConnection_ = this.getInput("GENERATOR0").connection.targetConnection;
      var itemBlock = containerBlock.getInputTargetBlock("STACK");
      var i = 1;
      while (itemBlock) {
        var input = this.getInput("GENERATOR" + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function updateShape_() {
      // Add new inputs.
      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput("GENERATOR" + i)) {
          var input = this.appendValueInput("GENERATOR" + i);
          if (i === 0) {
            input.setCheck("ComprehensionFor");
          } else {
            input.setCheck(["ComprehensionFor", "ComprehensionIf"]);
          }
          this.moveInputBefore("GENERATOR" + i, "END_BRACKET");
        }
      }
      // Remove deleted inputs.
      while (this.getInput("GENERATOR" + i)) {
        this.removeInput("GENERATOR" + i);
        i++;
      }
    }
  };
  python.pythonGenerator.forBlock["ast_" + kind] = function (block) {
    // elt
    var elt;
    if (kind === "DictComp") {
      var child = block.getInputTargetBlock("ELT");
      if (child === null || child.type !== "ast_DictItem") {
        elt = python.pythonGenerator.blank + ": " + python.pythonGenerator.blank;
      } else {
        var key = python.pythonGenerator.valueToCode(child, "KEY", python.Order.NONE) || python.pythonGenerator.blank;
        var value = python.pythonGenerator.valueToCode(child, "VALUE", python.Order.NONE) || python.pythonGenerator.blank;
        elt = key + ": " + value;
      }
    } else {
      elt = python.pythonGenerator.valueToCode(block, "ELT", python.Order.NONE) || python.pythonGenerator.blank;
    }
    // generators
    var elements = new Array(block.itemCount_);
    var BAD_DEFAULT = elt + " for " + python.pythonGenerator.blank + " in" + python.pythonGenerator.blank;
    for (var i = 0; i < block.itemCount_; i++) {
      var _child = block.getInputTargetBlock("GENERATOR" + i);
      if (_child === null) {
        elements[i] = BAD_DEFAULT;
      } else if (_child.type === "ast_comprehensionIf") {
        var test = python.pythonGenerator.valueToCode(_child, "TEST", python.Order.NONE) || python.pythonGenerator.blank;
        elements[i] = "if " + test;
      } else if (_child.type === "ast_comprehensionFor") {
        var target = python.pythonGenerator.valueToCode(_child, "TARGET", python.Order.NONE) || python.pythonGenerator.blank;
        var iter = python.pythonGenerator.valueToCode(_child, "ITER", python.Order.NONE) || python.pythonGenerator.blank;
        elements[i] = "for " + target + " in " + iter;
      } else {
        elements[i] = BAD_DEFAULT;
      }
    }
    // Put it all together
    var code = BlockMirrorTextToBlocks.COMP_SETTINGS[kind].start + elt + " " + elements.join(" ") + BlockMirrorTextToBlocks.COMP_SETTINGS[kind].end;
    return [code, python.Order.ATOMIC];
  };
  BlockMirrorTextToBlocks.prototype["ast_" + kind] = function (node, parent) {
    var generators = node.generators;
    var elements = {};
    if (kind === "DictComp") {
      var key = node.key;
      var value = node.value;
      elements["ELT"] = BlockMirrorTextToBlocks.create_block("ast_DictItem", node.lineno, {}, {
        KEY: this.convert(key, node),
        VALUE: this.convert(value, node)
      }, {
        inline: "true",
        deletable: "false",
        movable: "false"
      });
    } else {
      var elt = node.elt;
      elements["ELT"] = this.convert(elt, node);
    }
    var DEFAULT_SETTINGS = {
      inline: "true",
      deletable: "false",
      movable: "false"
    };
    var g = 0;
    for (var i = 0; i < generators.length; i++) {
      var target = generators[i].target;
      var iter = generators[i].iter;
      var ifs = generators[i].ifs;
      var is_async = generators[i].is_async;
      elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block("ast_comprehensionFor", node.lineno, {}, {
        ITER: this.convert(iter, node),
        TARGET: this.convert(target, node)
      }, DEFAULT_SETTINGS);
      g += 1;
      if (ifs) {
        for (var j = 0; j < ifs.length; j++) {
          elements["GENERATOR" + g] = BlockMirrorTextToBlocks.create_block("ast_comprehensionIf", node.lineno, {}, {
            TEST: this.convert(ifs[j], node)
          }, DEFAULT_SETTINGS);
          g += 1;
        }
      }
    }
    return BlockMirrorTextToBlocks.create_block("ast_" + kind, node.lineno, {}, elements, {
      inline: "false"
    }, {
      "@items": g
    });
  };
});

// TODO: what if a user deletes a parameter through the context menu?

// The mutator container
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_FunctionHeaderMutator",
  "message0": "Setup parameters below: %1 %2 returns %3",
  "args0": [{
    "type": "input_dummy"
  }, {
    "type": "input_statement",
    "name": "STACK",
    "align": "RIGHT"
  }, {
    "type": "field_checkbox",
    "name": "RETURNS",
    "checked": true,
    "align": "RIGHT"
  }],
  "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
  "enableContextMenu": false
});

// The elements you can put into the mutator
[['Parameter', 'Parameter', '', false, false], ['ParameterType', 'Parameter with type', '', true, false], ['ParameterDefault', 'Parameter with default value', '', false, true], ['ParameterDefaultType', 'Parameter with type and default value', '', true, true], ['ParameterVararg', 'Variable length parameter', '*', false, false], ['ParameterVarargType', 'Variable length parameter with type', '*', true, false], ['ParameterKwarg', 'Keyworded Variable length parameter', '**', false], ['ParameterKwargType', 'Keyworded Variable length parameter with type', '**', true, false]].forEach(function (parameterTypeTuple) {
  var _parameterTypeTuple = _slicedToArray(parameterTypeTuple, 5),
    parameterType = _parameterTypeTuple[0],
    parameterDescription = _parameterTypeTuple[1],
    parameterPrefix = _parameterTypeTuple[2],
    parameterTyped = _parameterTypeTuple[3],
    parameterDefault = _parameterTypeTuple[4];
  BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_FunctionMutant" + parameterType,
    "message0": parameterDescription,
    "previousStatement": null,
    "nextStatement": null,
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
    "enableContextMenu": false
  });
  var realParameterBlock = {
    "type": "ast_Function" + parameterType,
    "output": "Parameter",
    "message0": parameterPrefix + (parameterPrefix ? ' ' : '') + "%1",
    "args0": [{
      "type": "field_variable",
      "name": "NAME",
      "variable": "param"
    }],
    "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS,
    "enableContextMenu": false,
    "inputsInline": parameterTyped && parameterDefault
  };
  if (parameterTyped) {
    realParameterBlock['message0'] += " : %2";
    realParameterBlock['args0'].push({
      "type": "input_value",
      "name": "TYPE"
    });
  }
  if (parameterDefault) {
    realParameterBlock['message0'] += " = %" + (parameterTyped ? 3 : 2);
    realParameterBlock['args0'].push({
      "type": "input_value",
      "name": "DEFAULT"
    });
  }
  BlockMirrorTextToBlocks.BLOCKS.push(realParameterBlock);
  python.pythonGenerator.forBlock["ast_Function" + parameterType] = function (block) {
    var name = python.pythonGenerator.getVariableName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var typed = "";
    if (parameterTyped) {
      typed = ": " + (python.pythonGenerator.valueToCode(block, 'TYPE', python.Order.NONE) || python.pythonGenerator.blank);
    }
    var defaulted = "";
    if (parameterDefault) {
      defaulted = "=" + (python.pythonGenerator.valueToCode(block, 'DEFAULT', python.Order.NONE) || python.pythonGenerator.blank);
    }
    return [parameterPrefix + name + typed + defaulted, python.Order.ATOMIC];
  };
});

// TODO: Figure out an elegant "complexity" flag feature to allow different levels of Mutators

Blockly.Blocks['ast_FunctionDef'] = {
  init: function init() {
    this.appendDummyInput().appendField(this.translateText("define")).appendField(new Blockly.FieldTextInput("function"), "NAME");
    this.decoratorsCount_ = 0;
    this.parametersCount_ = 0;
    this.hasReturn_ = false;
    this.mutatorComplexity_ = 0;
    this.appendStatementInput("BODY").setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.FUNCTIONS));
    this.updateShape_();
    this.setMutator(new Blockly.icons.MutatorIcon(['ast_FunctionMutantParameter', 'ast_FunctionMutantParameterType'], this));
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('decorators', this.decoratorsCount_);
    container.setAttribute('parameters', this.parametersCount_);
    container.setAttribute('returns', this.hasReturn_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.decoratorsCount_ = parseInt(xmlElement.getAttribute('decorators'), 10);
    this.parametersCount_ = parseInt(xmlElement.getAttribute('parameters'), 10);
    this.hasReturn_ = "true" === xmlElement.getAttribute('returns');
    this.updateShape_();
  },
  setReturnAnnotation_: function setReturnAnnotation_(status) {
    var currentReturn = this.getInput('RETURNS');
    if (status) {
      if (!currentReturn) {
        this.appendValueInput("RETURNS").setCheck(null).setAlign(Blockly.inputs.Align.RIGHT).appendField(this.translateText("returns"));
      }
      this.moveInputBefore('RETURNS', 'BODY');
    } else if (!status && currentReturn) {
      this.removeInput('RETURNS');
    }
    this.hasReturn_ = status;
  },
  updateShape_: function updateShape_() {
    // Set up decorators and parameters
    var block = this;
    var position = 1;
    [['DECORATOR', 'decoratorsCount_', null, 'decorated by'], ['PARAMETER', 'parametersCount_', 'Parameter', 'parameters:']].forEach(function (childTypeTuple) {
      var childTypeName = childTypeTuple[0],
        countVariable = childTypeTuple[1],
        inputCheck = childTypeTuple[2],
        childTypeMessage = childTypeTuple[3];
      for (var i = 0; i < block[countVariable]; i++) {
        if (!block.getInput(childTypeName + i)) {
          var input = block.appendValueInput(childTypeName + i).setCheck(inputCheck).setAlign(Blockly.inputs.Align.RIGHT);
          if (i === 0) {
            input.appendField(childTypeMessage);
          }
        }
        block.moveInputBefore(childTypeName + i, 'BODY');
      }
      // Remove deleted inputs.
      while (block.getInput(childTypeName + i)) {
        block.removeInput(childTypeName + i);
        i++;
      }
    });
    // Set up optional Returns annotation
    this.setReturnAnnotation_(this.hasReturn_);
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function decompose(workspace) {
    var containerBlock = workspace.newBlock('ast_FunctionHeaderMutator');
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    if (this.getInput('RETURNS')) {
      containerBlock.setFieldValue(this.hasReturn_ ? 'TRUE' : 'FALSE', 'RETURNS');
    } else {
      // TODO: set up "canReturns" for lambda mode
      //containerBlock.getField('RETURNS').setVisible(false);
    }

    // Set up parameters
    var connection = containerBlock.getInput('STACK').connection;
    var parameters = [];
    for (var i = 0; i < this.parametersCount_; i++) {
      var parameter = this.getInput('PARAMETER' + i).connection;
      var sourceType = parameter.targetConnection.getSourceBlock().type;
      var createName = 'ast_FunctionMutant' + sourceType.substring('ast_Function'.length);
      var itemBlock = workspace.newBlock(createName);
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
      parameters.push(itemBlock);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function compose(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    var blockTypes = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      blockTypes.push(itemBlock.type);
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.parametersCount_; i++) {
      var connection = this.getInput('PARAMETER' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        // Disconnect all children of this block
        var connectedBlock = connection.getSourceBlock();
        for (var j = 0; j < connectedBlock.inputList.length; j++) {
          var field = connectedBlock.inputList[j].connection;
          if (field && field.targetConnection) {
            field.targetConnection.getSourceBlock().unplug(true);
          }
        }
        connection.disconnect();
        connection.getSourceBlock().dispose();
      }
    }
    this.parametersCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var _i16 = 0; _i16 < this.parametersCount_; _i16++) {
      var _connections$_i7;
      (_connections$_i7 = connections[_i16]) === null || _connections$_i7 === void 0 || _connections$_i7.reconnect(this, 'PARAMETER' + _i16);
      if (!connections[_i16]) {
        var createName = 'ast_Function' + blockTypes[_i16].substring('ast_FunctionMutant'.length);
        var _itemBlock4 = this.workspace.newBlock(createName);
        _itemBlock4.setDeletable(false);
        _itemBlock4.setMovable(false);
        _itemBlock4.initSvg();
        this.getInput('PARAMETER' + _i16).connection.connect(_itemBlock4.outputConnection);
        _itemBlock4.render();
        //this.get(itemBlock, 'ADD'+i)
      }
    }
    // Show/hide the returns annotation
    var hasReturns = containerBlock.getFieldValue('RETURNS');
    if (hasReturns !== null) {
      hasReturns = hasReturns === 'TRUE';
      if (this.hasReturn_ != hasReturns) {
        if (hasReturns) {
          var _this$returnConnectio;
          this.setReturnAnnotation_(true);
          (_this$returnConnectio = this.returnConnection_) === null || _this$returnConnectio === void 0 || _this$returnConnectio.reconnect(this, 'RETURNS');
          this.returnConnection_ = null;
        } else {
          var returnConnection = this.getInput('RETURNS').connection;
          this.returnConnection_ = returnConnection.targetConnection;
          if (this.returnConnection_) {
            var returnBlock = returnConnection.targetBlock();
            returnBlock.unplug();
            returnBlock.bumpNeighbours();
          }
          this.setReturnAnnotation_(false);
        }
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function saveConnections(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('PARAMETER' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  }
};
python.pythonGenerator.forBlock['ast_FunctionDef'] = function (block, generator) {
  // Name
  var name = python.pythonGenerator.getVariableName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // Decorators
  var decorators = new Array(block.decoratorsCount_);
  for (var i = 0; i < block.decoratorsCount_; i++) {
    var decorator = python.pythonGenerator.valueToCode(block, 'DECORATOR' + i, python.Order.NONE) || python.pythonGenerator.blank;
    decorators[i] = "@" + decorator + "\n";
  }
  // Parameters
  var parameters = new Array(block.parametersCount_);
  for (var _i17 = 0; _i17 < block.parametersCount_; _i17++) {
    parameters[_i17] = python.pythonGenerator.valueToCode(block, 'PARAMETER' + _i17, python.Order.NONE) || python.pythonGenerator.blank;
  }
  // Return annotation
  var returns = "";
  if (this.hasReturn_) {
    returns = " -> " + python.pythonGenerator.valueToCode(block, 'RETURNS', python.Order.NONE) || python.pythonGenerator.blank;
  }
  // Body
  var body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  return decorators.join('') + "def " + name + "(" + parameters.join(', ') + ")" + returns + ":\n" + body;
};
BlockMirrorTextToBlocks.prototype.parseArg = function (arg, type, lineno, values, node) {
  var settings = {
    "movable": false,
    "deletable": false
  };
  if (arg.annotation === null) {
    return BlockMirrorTextToBlocks.create_block(type, lineno, {
      'NAME': Sk.ffi.remapToJs(arg.arg)
    }, values, settings);
  } else {
    values['TYPE'] = this.convert(arg.annotation, node);
    return BlockMirrorTextToBlocks.create_block(type + "Type", lineno, {
      'NAME': Sk.ffi.remapToJs(arg.arg)
    }, values, settings);
  }
};
BlockMirrorTextToBlocks.prototype.parseArgs = function (args, values, lineno, node) {
  var positional = args.args,
    vararg = args.vararg,
    kwonlyargs = args.kwonlyargs,
    kwarg = args.kwarg,
    defaults = args.defaults,
    kw_defaults = args.kw_defaults;
  var totalArgs = 0;
  // args (positional)
  if (positional !== null) {
    // "If there are fewer defaults, they correspond to the last n arguments."
    var defaultOffset = defaults ? defaults.length - positional.length : 0;
    for (var i = 0; i < positional.length; i++) {
      var childValues = {};
      var type = 'ast_FunctionParameter';
      if (defaults[defaultOffset + i]) {
        childValues['DEFAULT'] = this.convert(defaults[defaultOffset + i], node);
        type += "Default";
      }
      values['PARAMETER' + totalArgs] = this.parseArg(positional[i], type, lineno, childValues, node);
      totalArgs += 1;
    }
  }
  // *arg
  if (vararg !== null) {
    values['PARAMETER' + totalArgs] = this.parseArg(vararg, 'ast_FunctionParameterVararg', lineno, {}, node);
    totalArgs += 1;
  }
  // keyword arguments that must be referenced by name
  if (kwonlyargs !== null) {
    for (var _i18 = 0; _i18 < kwonlyargs.length; _i18++) {
      var _childValues = {};
      var _type = 'ast_FunctionParameter';
      if (kw_defaults[_i18]) {
        _childValues['DEFAULT'] = this.convert(kw_defaults[_i18], node);
        _type += "Default";
      }
      values['PARAMETER' + totalArgs] = this.parseArg(kwonlyargs[_i18], _type, lineno, _childValues, node);
      totalArgs += 1;
    }
  }
  // **kwarg
  if (kwarg) {
    values['PARAMETER' + totalArgs] = this.parseArg(kwarg, 'ast_FunctionParameterKwarg', lineno, {}, node);
    totalArgs += 1;
  }
  return totalArgs;
};
BlockMirrorTextToBlocks.prototype['ast_FunctionDef'] = function (node, parent) {
  var name = node.name;
  var args = node.args;
  var body = node.body;
  var decorator_list = node.decorator_list;
  var returns = node.returns;
  var values = {};
  if (decorator_list !== null) {
    for (var i = 0; i < decorator_list.length; i++) {
      var converted = this.convert(decorator_list[i], node);
      if (converted.constructor === Array) {
        converted = converted[0];
      }
      values['DECORATOR' + i] = converted;
    }
  }
  var parsedArgs = 0;
  if (args !== null) {
    parsedArgs = this.parseArgs(args, values, node.lineno, node);
  }
  var hasReturn = returns !== null && (returns._astname !== 'NameConstant' || returns.value !== Sk.builtin.none.none$);
  if (hasReturn) {
    values['RETURNS'] = this.convert(returns, node);
  }
  return BlockMirrorTextToBlocks.create_block("ast_FunctionDef", node.lineno, {
    'NAME': Sk.ffi.remapToJs(name)
  }, values, {
    "inline": "false"
  }, {
    "@decorators": decorator_list === null ? 0 : decorator_list.length,
    "@parameters": parsedArgs,
    "@returns": hasReturn
  }, {
    'BODY': this.convertBody(body, node)
  });
};
Blockly.Blocks['ast_Lambda'] = {
  init: function init() {
    this.appendDummyInput().appendField("lambda").setAlign(Blockly.inputs.Align.RIGHT);
    this.decoratorsCount_ = 0;
    this.parametersCount_ = 0;
    this.hasReturn_ = false;
    this.appendValueInput("BODY").appendField("body").setAlign(Blockly.inputs.Align.RIGHT).setCheck(null);
    this.setInputsInline(false);
    this.setOutput(true);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.FUNCTIONS));
    this.updateShape_();
  },
  mutationToDom: Blockly.Blocks['ast_FunctionDef'].mutationToDom,
  domToMutation: Blockly.Blocks['ast_FunctionDef'].domToMutation,
  updateShape_: Blockly.Blocks['ast_FunctionDef'].updateShape_,
  setReturnAnnotation_: Blockly.Blocks['ast_FunctionDef'].setReturnAnnotation_
};
python.pythonGenerator.forBlock['ast_Lambda'] = function (block, generator) {
  // Parameters
  var parameters = new Array(block.parametersCount_);
  for (var i = 0; i < block.parametersCount_; i++) {
    parameters[i] = python.pythonGenerator.valueToCode(block, 'PARAMETER' + i, python.Order.NONE) || python.pythonGenerator.blank;
  }
  // Body
  var body = python.pythonGenerator.valueToCode(block, 'BODY', python.Order.LAMBDA) || python.pythonGenerator.PASS;
  return ["lambda " + parameters.join(', ') + ": " + body, python.Order.LAMBDA];
};
BlockMirrorTextToBlocks.prototype['ast_Lambda'] = function (node, parent) {
  var args = node.args;
  var body = node.body;
  var values = {
    'BODY': this.convert(body, node)
  };
  var parsedArgs = 0;
  if (args !== null) {
    parsedArgs = this.parseArgs(args, values, node.lineno);
  }
  return BlockMirrorTextToBlocks.create_block("ast_Lambda", node.lineno, {}, values, {
    "inline": "false"
  }, {
    "@decorators": 0,
    "@parameters": parsedArgs,
    "@returns": false
  });
};
Blockly.Blocks['ast_ReturnFull'] = {
  init: function init() {
    this.appendValueInput('VALUE').appendField(this.translateText('return'));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.FUNCTIONS));
  }
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Return",
  "message0": "return",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS
});
python.pythonGenerator.forBlock['ast_Return'] = function (block, generator) {
  return "return\n";
};
python.pythonGenerator.forBlock['ast_ReturnFull'] = function (block, generator) {
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.ATOMIC) || python.pythonGenerator.blank;
  return "return " + value + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Return'] = function (node, parent) {
  var value = node.value;
  if (value == null) {
    return BlockMirrorTextToBlocks.create_block("ast_Return", node.lineno);
  } else {
    return BlockMirrorTextToBlocks.create_block("ast_ReturnFull", node.lineno, {}, {
      "VALUE": this.convert(value, node)
    });
  }
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_YieldFull",
  "message0": "yield %1",
  "args0": [{
    "type": "input_value",
    "name": "VALUE"
  }],
  "inputsInline": false,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS
});
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Yield",
  "message0": "yield",
  "inputsInline": false,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS
});
python.pythonGenerator.forBlock['ast_Yield'] = function (block, generator) {
  return ["yield", python.Order.LAMBDA];
};
python.pythonGenerator.forBlock['ast_YieldFull'] = function (block, generator) {
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.LAMBDA) || python.pythonGenerator.blank;
  return ["yield " + value, python.Order.LAMBDA];
};
BlockMirrorTextToBlocks.prototype['ast_Yield'] = function (node, parent) {
  var value = node.value;
  if (value == null) {
    return BlockMirrorTextToBlocks.create_block("ast_Yield", node.lineno);
  } else {
    return BlockMirrorTextToBlocks.create_block("ast_YieldFull", node.lineno, {}, {
      "VALUE": this.convert(value, node)
    });
  }
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_YieldFrom",
  "message0": "yield from %1",
  "args0": [{
    "type": "input_value",
    "name": "VALUE"
  }],
  "inputsInline": false,
  "output": null,
  "colour": BlockMirrorTextToBlocks.COLOR.FUNCTIONS
});
python.pythonGenerator.forBlock['ast_YieldFrom'] = function (block, generator) {
  var value = python.pythonGenerator.valueToCode(block, 'VALUE', python.Order.LAMBDA) || python.pythonGenerator.blank;
  return ["yield from " + value, python.Order.LAMBDA];
};
BlockMirrorTextToBlocks.prototype['ast_YieldFrom'] = function (node, parent) {
  var value = node.value;
  return BlockMirrorTextToBlocks.create_block("ast_YieldFrom", node.lineno, {}, {
    "VALUE": this.convert(value, node)
  });
};
Blockly.Blocks['ast_Global'] = {
  init: function init() {
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.VARIABLES));
    this.nameCount_ = 1;
    this.appendDummyInput('GLOBAL').appendField("make global", "START_GLOBALS");
    this.updateShape_();
  },
  updateShape_: function updateShape_() {
    var input = this.getInput("GLOBAL");
    // Update pluralization
    if (this.getField('START_GLOBALS')) {
      this.setFieldValue(this.nameCount_ > 1 ? "make globals" : "make global", "START_GLOBALS");
    }
    // Update fields
    for (var i = 0; i < this.nameCount_; i++) {
      if (!this.getField('NAME' + i)) {
        if (i !== 0) {
          input.appendField(',').setAlign(Blockly.inputs.Align.RIGHT);
        }
        input.appendField(new Blockly.FieldVariable("variable"), 'NAME' + i);
      }
    }
    // Remove deleted fields.
    while (this.getField('NAME' + i)) {
      input.removeField('NAME' + i);
      i++;
    }
    // Delete and re-add ending field
    if (this.getField("END_GLOBALS")) {
      input.removeField("END_GLOBALS");
    }
    input.appendField("available", "END_GLOBALS");
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('names', this.nameCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.nameCount_ = parseInt(xmlElement.getAttribute('names'), 10);
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Global'] = function (block, generator) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.nameCount_);
  for (var i = 0; i < block.nameCount_; i++) {
    elements[i] = python.pythonGenerator.getVariableName(block.getFieldValue('NAME' + i), Blockly.Variables.NAME_TYPE);
  }
  return 'global ' + elements.join(', ') + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Global'] = function (node, parent) {
  var names = node.names;
  var fields = {};
  for (var i = 0; i < names.length; i++) {
    fields["NAME" + i] = Sk.ffi.remapToJs(names[i]);
  }
  return BlockMirrorTextToBlocks.create_block("ast_Global", node.lineno, fields, {}, {
    "inline": "true"
  }, {
    "@names": names.length
  });
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Break",
  "message0": "break",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL
});
python.pythonGenerator.forBlock['ast_Break'] = function (block, generator) {
  return "break\n";
};
BlockMirrorTextToBlocks.prototype['ast_Break'] = function (node, parent) {
  return BlockMirrorTextToBlocks.create_block("ast_Break", node.lineno);
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Continue",
  "message0": "continue",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL
});
python.pythonGenerator.forBlock['ast_Continue'] = function (block, generator) {
  return "continue\n";
};
BlockMirrorTextToBlocks.prototype['ast_Continue'] = function (node, parent) {
  return BlockMirrorTextToBlocks.create_block("ast_Continue", node.lineno);
};
BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL = 0;
BlockMirrorTextToBlocks.HANDLERS_NO_AS = 1;
BlockMirrorTextToBlocks.HANDLERS_COMPLETE = 3;
Blockly.Blocks['ast_Try'] = {
  init: function init() {
    this.handlersCount_ = 0;
    this.handlers_ = [];
    this.hasElse_ = false;
    this.hasFinally_ = false;
    this.appendDummyInput().appendField("try:");
    this.appendStatementInput("BODY").setCheck(null).setAlign(Blockly.inputs.Align.RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.EXCEPTIONS));
    this.updateShape_();
  },
  // TODO: Not mutable currently
  updateShape_: function updateShape_() {
    for (var i = 0; i < this.handlersCount_; i++) {
      if (this.handlers_[i] === BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL) {
        this.appendDummyInput().appendField('except');
      } else {
        this.appendValueInput("TYPE" + i).setCheck(null).appendField("except");
        if (this.handlers_[i] === BlockMirrorTextToBlocks.HANDLERS_COMPLETE) {
          this.appendDummyInput().appendField("as").appendField(new Blockly.FieldVariable("item"), "NAME" + i);
        }
      }
      this.appendStatementInput("HANDLER" + i).setCheck(null);
    }
    if (this.hasElse_) {
      this.appendDummyInput().appendField("else:");
      this.appendStatementInput("ORELSE").setCheck(null);
    }
    if (this.hasFinally_) {
      this.appendDummyInput().appendField("finally:");
      this.appendStatementInput("FINALBODY").setCheck(null);
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('orelse', this.hasElse_);
    container.setAttribute('finalbody', this.hasFinally_);
    container.setAttribute('handlers', this.handlersCount_);
    for (var i = 0; i < this.handlersCount_; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.handlers_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.hasElse_ = "true" === xmlElement.getAttribute('orelse');
    this.hasFinally_ = "true" === xmlElement.getAttribute('finalbody');
    this.handlersCount_ = parseInt(xmlElement.getAttribute('handlers'), 10);
    this.handlers_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() === 'arg') {
        this.handlers_.push(parseInt(childNode.getAttribute('name'), 10));
      }
    }
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Try'] = function (block, generator) {
  // Try:
  var body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  // Except clauses
  var handlers = new Array(block.handlersCount_);
  for (var i = 0; i < block.handlersCount_; i++) {
    var level = block.handlers_[i];
    var clause = "except";
    if (level !== BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL) {
      clause += " " + python.pythonGenerator.valueToCode(block, 'TYPE' + i, python.Order.NONE) || python.pythonGenerator.blank;
      if (level === BlockMirrorTextToBlocks.HANDLERS_COMPLETE) {
        clause += " as " + python.pythonGenerator.getVariableName(block.getFieldValue('NAME' + i), Blockly.Variables.NAME_TYPE);
      }
    }
    clause += ":\n" + (python.pythonGenerator.statementToCode(block, 'HANDLER' + i) || python.pythonGenerator.PASS);
    handlers[i] = clause;
  }
  // Orelse:
  var orelse = "";
  if (this.hasElse_) {
    orelse = "else:\n" + (python.pythonGenerator.statementToCode(block, 'ORELSE') || python.pythonGenerator.PASS);
  }
  // Finally:
  var finalbody = "";
  if (this.hasFinally_) {
    finalbody = "finally:\n" + (python.pythonGenerator.statementToCode(block, 'FINALBODY') || python.pythonGenerator.PASS);
  }
  return "try:\n" + body + handlers.join("") + orelse + finalbody;
};
BlockMirrorTextToBlocks.prototype['ast_Try'] = function (node, parent) {
  var body = node.body;
  var handlers = node.handlers;
  var orelse = node.orelse;
  var finalbody = node.finalbody;
  var fields = {};
  var values = {};
  var mutations = {
    "@ORELSE": orelse !== null && orelse.length > 0,
    "@FINALBODY": finalbody !== null && finalbody.length > 0,
    "@HANDLERS": handlers.length
  };
  var statements = {
    "BODY": this.convertBody(body, node)
  };
  if (orelse !== null) {
    statements['ORELSE'] = this.convertBody(orelse, node);
  }
  if (finalbody !== null && finalbody.length) {
    statements['FINALBODY'] = this.convertBody(finalbody, node);
  }
  var handledLevels = [];
  for (var i = 0; i < handlers.length; i++) {
    var handler = handlers[i];
    statements["HANDLER" + i] = this.convertBody(handler.body, node);
    if (handler.type === null) {
      handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_CATCH_ALL);
    } else {
      values["TYPE" + i] = this.convert(handler.type, node);
      if (handler.name === null) {
        handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_NO_AS);
      } else {
        handledLevels.push(BlockMirrorTextToBlocks.HANDLERS_COMPLETE);
        fields["NAME" + i] = Sk.ffi.remapToJs(handler.name.id);
      }
    }
  }
  mutations["ARG"] = handledLevels;
  return BlockMirrorTextToBlocks.create_block("ast_Try", node.lineno, fields, values, {}, mutations, statements);
};
Blockly.Blocks['ast_ClassDef'] = {
  init: function init() {
    this.decorators_ = 0;
    this.bases_ = 0;
    this.keywords_ = 0;
    this.appendDummyInput('HEADER').appendField("Class").appendField(new Blockly.FieldVariable("item"), "NAME");
    this.appendStatementInput("BODY").setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.OO));
    this.updateShape_();
  },
  // TODO: Not mutable currently
  updateShape_: function updateShape_() {
    for (var i = 0; i < this.decorators_; i++) {
      var input = this.appendValueInput("DECORATOR" + i).setCheck(null).setAlign(Blockly.inputs.Align.RIGHT);
      if (i === 0) {
        input.appendField("decorated by");
      }
      this.moveInputBefore('DECORATOR' + i, 'BODY');
    }
    for (var _i19 = 0; _i19 < this.bases_; _i19++) {
      var _input2 = this.appendValueInput("BASE" + _i19).setCheck(null).setAlign(Blockly.inputs.Align.RIGHT);
      if (_i19 === 0) {
        _input2.appendField("inherits from");
      }
      this.moveInputBefore('BASE' + _i19, 'BODY');
    }
    for (var _i20 = 0; _i20 < this.keywords_; _i20++) {
      this.appendValueInput("KEYWORDVALUE" + _i20).setCheck(null).setAlign(Blockly.inputs.Align.RIGHT).appendField(new Blockly.FieldTextInput("metaclass"), "KEYWORDNAME" + _i20).appendField("=");
      this.moveInputBefore('KEYWORDVALUE' + _i20, 'BODY');
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('decorators', this.decorators_);
    container.setAttribute('bases', this.bases_);
    container.setAttribute('keywords', this.keywords_);
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.decorators_ = parseInt(xmlElement.getAttribute('decorators'), 10);
    this.bases_ = parseInt(xmlElement.getAttribute('bases'), 10);
    this.keywords_ = parseInt(xmlElement.getAttribute('keywords'), 10);
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_ClassDef'] = function (block, generator) {
  // Name
  var name = python.pythonGenerator.getVariableName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // Decorators
  var decorators = new Array(block.decorators_);
  for (var i = 0; i < block.decorators_; i++) {
    var decorator = python.pythonGenerator.valueToCode(block, 'DECORATOR' + i, python.Order.NONE) || python.pythonGenerator.blank;
    decorators[i] = "@" + decorator + "\n";
  }
  // Bases
  var bases = new Array(block.bases_);
  for (var _i21 = 0; _i21 < block.bases_; _i21++) {
    bases[_i21] = python.pythonGenerator.valueToCode(block, 'BASE' + _i21, python.Order.NONE) || python.pythonGenerator.blank;
  }
  // Keywords
  var keywords = new Array(block.keywords_);
  for (var _i22 = 0; _i22 < block.keywords_; _i22++) {
    var _name4 = block.getFieldValue('KEYWORDNAME' + _i22);
    var value = python.pythonGenerator.valueToCode(block, 'KEYWORDVALUE' + _i22, python.Order.NONE) || python.pythonGenerator.blank;
    if (_name4 == '**') {
      keywords[_i22] = '**' + value;
    } else {
      keywords[_i22] = _name4 + '=' + value;
    }
  }
  // Body:
  var body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  // Put it together
  var args = bases.concat(keywords);
  args = args.length === 0 ? "" : "(" + args.join(', ') + ")";
  return decorators.join('') + "class " + name + args + ":\n" + body;
};
BlockMirrorTextToBlocks.prototype['ast_ClassDef'] = function (node, parent) {
  var name = node.name;
  var bases = node.bases;
  var keywords = node.keywords;
  var body = node.body;
  var decorator_list = node.decorator_list;
  var values = {};
  var fields = {
    'NAME': Sk.ffi.remapToJs(name)
  };
  if (decorator_list !== null) {
    for (var i = 0; i < decorator_list.length; i++) {
      values['DECORATOR' + i] = this.convert(decorator_list[i], node);
    }
  }
  if (bases !== null) {
    for (var _i23 = 0; _i23 < bases.length; _i23++) {
      values['BASE' + _i23] = this.convert(bases[_i23], node);
    }
  }
  if (keywords !== null) {
    for (var _i24 = 0; _i24 < keywords.length; _i24++) {
      values['KEYWORDVALUE' + _i24] = this.convert(keywords[_i24].value, node);
      var arg = keywords[_i24].arg;
      if (arg === null) {
        fields['KEYWORDNAME' + _i24] = "**";
      } else {
        fields['KEYWORDNAME' + _i24] = Sk.ffi.remapToJs(arg);
      }
    }
  }
  return BlockMirrorTextToBlocks.create_block("ast_ClassDef", node.lineno, fields, values, {
    "inline": "false"
  }, {
    "@decorators": decorator_list === null ? 0 : decorator_list.length,
    "@bases": bases === null ? 0 : bases.length,
    "@keywords": keywords === null ? 0 : keywords.length
  }, {
    'BODY': this.convertBody(body, node)
  });
};

// TODO: direct imports are not variables, because you can do stuff like:
//         import os.path
//       What should the variable be? Blockly will mangle it, but we should really be
//       doing something more complicated here with namespaces (probably make `os` the
//       variable and have some kind of list of attributes. But that's in the fading zone.
Blockly.Blocks['ast_Import'] = {
  init: function init() {
    this.nameCount_ = 1;
    this.from_ = false;
    this.regulars_ = [true];
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.PYTHON));
    this.updateShape_();
  },
  // TODO: Not mutable currently
  updateShape_: function updateShape_() {
    // Possible FROM part
    if (this.from_ && !this.getInput('FROM')) {
      this.appendDummyInput('FROM').setAlign(Blockly.inputs.Align.RIGHT).appendField('from').appendField(new Blockly.FieldTextInput("module"), "MODULE");
    } else if (!this.from_ && this.getInput('FROM')) {
      this.removeInput('FROM');
    }
    // Import clauses
    for (var i = 0; i < this.nameCount_; i++) {
      var input = this.getInput('CLAUSE' + i);
      if (!input) {
        input = this.appendDummyInput('CLAUSE' + i).setAlign(Blockly.inputs.Align.RIGHT);
        if (i === 0) {
          input.appendField("import");
        }
        input.appendField(new Blockly.FieldTextInput("default"), "NAME" + i);
      }
      if (this.regulars_[i] && this.getField('AS' + i)) {
        input.removeField('AS' + i);
        input.removeField('ASNAME' + i);
      } else if (!this.regulars_[i] && !this.getField('AS' + i)) {
        input.appendField("as", 'AS' + i).appendField(new Blockly.FieldVariable("alias"), "ASNAME" + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('CLAUSE' + i)) {
      this.removeInput('CLAUSE' + i);
      i++;
    }
    // Reposition everything
    if (this.from_ && this.nameCount_ > 0) {
      this.moveInputBefore('FROM', 'CLAUSE0');
    }
    for (i = 0; i + 1 < this.nameCount_; i++) {
      this.moveInputBefore('CLAUSE' + i, 'CLAUSE' + (i + 1));
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('names', this.nameCount_);
    container.setAttribute('from', this.from_);
    for (var i = 0; i < this.nameCount_; i++) {
      var parameter = document.createElement('regular');
      parameter.setAttribute('name', this.regulars_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.nameCount_ = parseInt(xmlElement.getAttribute('names'), 10);
    this.from_ = "true" === xmlElement.getAttribute('from');
    this.regulars_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() === 'regular') {
        this.regulars_.push("true" === childNode.getAttribute('name'));
      }
    }
    this.updateShape_();
  }
};
python.pythonGenerator.forBlock['ast_Import'] = function (block, generator) {
  // Optional from part
  var from = "";
  var moduleName = "";
  if (this.from_) {
    moduleName = block.getFieldValue('MODULE');
    from = "from " + moduleName + " ";
  }
  // Create a list with any number of elements of any type.
  var elements = new Array(block.nameCount_);
  for (var i = 0; i < block.nameCount_; i++) {
    var type = block.getFieldValue('NAME' + i);
    var name = type;
    elements[i] = name;
    if (!this.regulars_[i]) {
      name = python.pythonGenerator.getVariableName(block.getFieldValue('ASNAME' + i), Blockly.Variables.NAME_TYPE);
      elements[i] += " as " + name;
    }
    python.pythonGenerator.imports.set(moduleName + (moduleName ? '.' : '') + type, name);
  }
  return from + 'import ' + elements.join(', ') + "\n";
};
BlockMirrorTextToBlocks.prototype['ast_Import'] = function (node, parent) {
  var names = node.names;
  var fields = {};
  var mutations = {
    '@names': names.length
  };
  var regulars = [];
  var simpleName = "";
  var fromModule = "";
  if (node._astname === 'ImportFrom') {
    // acbart: GTS suggests module can be None for '.' but it's an empty string in Skulpt
    mutations['@from'] = true;
    fromModule = '.'.repeat(node.level) + Sk.ffi.remapToJs(node.module);
    fields['MODULE'] = fromModule;
  } else {
    mutations['@from'] = false;
  }
  for (var i = 0; i < names.length; i++) {
    var type = Sk.ffi.remapToJs(names[i].name);
    fields["NAME" + i] = type;
    var isRegular = names[i].asname === null;
    if (!isRegular) {
      fields["ASNAME" + i] = Sk.ffi.remapToJs(names[i].asname);
      simpleName = fields["ASNAME" + i];
    } else {
      simpleName = type;
    }
    this.imports.set(fromModule + (fromModule ? '.' : '') + type, simpleName);
    regulars.push(isRegular);
  }
  mutations['regular'] = regulars;
  if (this.hiddenImports.indexOf(simpleName) !== -1) {
    return null;
  }
  return BlockMirrorTextToBlocks.create_block("ast_Import", node.lineno, fields, {}, {
    "inline": true
  }, mutations);
};

// Alias ImportFrom because of big overlap
BlockMirrorTextToBlocks.prototype['ast_ImportFrom'] = BlockMirrorTextToBlocks.prototype['ast_Import'];
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_WithItem",
  "output": "WithItem",
  "message0": "context %1",
  "args0": [{
    "type": "input_value",
    "name": "CONTEXT"
  }],
  "enableContextMenu": false,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
  "inputsInline": false
});
python.pythonGenerator.forBlock["ast_WithItem"] = function (block) {
  var context = python.pythonGenerator.valueToCode(block, 'CONTEXT', python.Order.NONE) || python.pythonGenerator.blank;
  return [context, python.Order.NONE];
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_WithItemAs",
  "output": "WithItem",
  "message0": "context %1 as %2",
  "args0": [{
    "type": "input_value",
    "name": "CONTEXT"
  }, {
    "type": "input_value",
    "name": "AS"
  }],
  "enableContextMenu": false,
  "colour": BlockMirrorTextToBlocks.COLOR.CONTROL,
  "inputsInline": true
});
python.pythonGenerator.forBlock["ast_WithItemAs"] = function (block) {
  var context = python.pythonGenerator.valueToCode(block, 'CONTEXT', python.Order.NONE) || python.pythonGenerator.blank;
  var as = python.pythonGenerator.valueToCode(block, 'AS', python.Order.NONE) || python.pythonGenerator.blank;
  return [context + " as " + as, python.Order.NONE];
};
Blockly.Blocks['ast_With'] = {
  init: function init() {
    this.appendValueInput('ITEM0').appendField("with");
    this.appendStatementInput("BODY").setCheck(null);
    this.itemCount_ = 1;
    this.renames_ = [false];
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.CONTROL));
    this.updateShape_();
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function mutationToDom() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    for (var i = 0; i < this.itemCount_; i++) {
      var parameter = document.createElement('as');
      parameter.setAttribute('name', this.renames_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function domToMutation(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.renames_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() === 'as') {
        this.renames_.push("true" === childNode.getAttribute('name'));
      }
    }
    this.updateShape_();
  },
  updateShape_: function updateShape_() {
    // With clauses
    for (var i = 1; i < this.itemCount_; i++) {
      var input = this.getInput('ITEM' + i);
      if (!input) {
        input = this.appendValueInput('ITEM' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ITEM' + i)) {
      this.removeInput('ITEM' + i);
      i++;
    }
    // Reposition everything
    for (i = 0; i < this.itemCount_; i++) {
      this.moveInputBefore('ITEM' + i, 'BODY');
    }
  }
};
python.pythonGenerator.forBlock['ast_With'] = function (block, generator) {
  // Contexts
  var items = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    items[i] = python.pythonGenerator.valueToCode(block, 'ITEM' + i, python.Order.NONE) || python.pythonGenerator.blank;
  }
  // Body
  var body = python.pythonGenerator.statementToCode(block, 'BODY') || python.pythonGenerator.PASS;
  return "with " + items.join(', ') + ":\n" + body;
};
BlockMirrorTextToBlocks.prototype['ast_With'] = function (node, parent) {
  var items = node.items;
  var body = node.body;
  var values = {};
  var mutations = {
    "@items": items.length
  };
  var renamedItems = [];
  for (var i = 0; i < items.length; i++) {
    var hasRename = items[i].optional_vars;
    renamedItems.push(hasRename);
    var innerValues = {
      'CONTEXT': this.convert(items[i].context_expr, node)
    };
    if (hasRename) {
      innerValues['AS'] = this.convert(items[i].optional_vars, node);
      values['ITEM' + i] = BlockMirrorTextToBlocks.create_block("ast_WithItemAs", node.lineno, {}, innerValues, this.LOCKED_BLOCK);
    } else {
      values['ITEM' + i] = BlockMirrorTextToBlocks.create_block("ast_WithItem", node.lineno, {}, innerValues, this.LOCKED_BLOCK);
    }
  }
  mutations['as'] = renamedItems;
  return BlockMirrorTextToBlocks.create_block("ast_With", node.lineno, {}, values, {
    "inline": "false"
  }, mutations, {
    'BODY': this.convertBody(body, node)
  });
};
BlockMirrorTextToBlocks.BLOCKS.push({
  "type": "ast_Comment",
  "message0": "# Comment: %1",
  "args0": [{
    "type": "field_input",
    "name": "BODY",
    "text": "will be ignored"
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockMirrorTextToBlocks.COLOR.PYTHON
});
python.pythonGenerator.forBlock['ast_Comment'] = function (block) {
  var text_body = block.getFieldValue('BODY');
  return '#' + text_body + '\n';
};
BlockMirrorTextToBlocks.prototype['ast_Comment'] = function (txt, lineno) {
  var commentText = txt.slice(1);
  /*if (commentText.length && commentText[0] === " ") {
      commentText = commentText.substring(1);
  }*/
  return BlockMirrorTextToBlocks.create_block("ast_Comment", lineno, {
    "BODY": commentText
  });
};
{
  var _multiline_input_type = "field_multilinetext";
  if (!Blockly.registry.hasItem(Blockly.registry.Type.FIELD, _multiline_input_type)) {
    if (typeof registerFieldMultilineInput === "function") {
      // Register if the field-multilineinput plugin is available
      registerFieldMultilineInput();
    } else {
      // Fallback in case plugin @blockly/field-multilineinput is not available
      _multiline_input_type = "field_input";
    }
  }
  BlockMirrorTextToBlocks.BLOCKS.push({
    "type": "ast_Raw",
    "message0": "Code Block: %1 %2",
    "args0": [{
      "type": "input_dummy"
    }, {
      "type": _multiline_input_type,
      "name": "TEXT",
      "value": ''
    }],
    "colour": BlockMirrorTextToBlocks.COLOR.PYTHON,
    "previousStatement": null,
    "nextStatement": null
  });
}
python.pythonGenerator.forBlock['ast_Raw'] = function (block, generator) {
  var code = block.getFieldValue('TEXT') + "\n";
  return code;
};
BlockMirror.LIBRARIES['cisc108'] = {
  "__colour": "PYTHON",
  "__toolbox": false,
  "cisc108": [
    "assert_equal(x: Any, y: Any, precision: int = 4, exact_strings: bool = False, *args): bool"
  ]
};

BlockMirror.LIBRARIES['image'] = {
  "__toolbox": false,
  "class Image": [
    {
      "signature": "__init__(self, src: str, /): None",
      "custom": "BlockMirrorTextToBlocks.ast_Image"
    }
  ]
};

BlockMirror.LIBRARIES['matplotlib'] = {
  "__toolbox": false,
  "__colour": "PLOTTING",
  "matplotlib.pyplot as plt": [
    "show(*, block: bool | None = None): None // show plot canvas",
    "hist(x, bins=None, *, range=None, density=False, weights=None, cumulative: bool = False, bottom=None, histtype: str = 'bar', align: str = 'mid', orientation: str = 'vertical', rwidth: float | None = None, log: bool = False, color=None, label=None, stacked: bool = False, data=None, **kwargs): Any // plot histogram",
    "bar(x, height, width=0.8, bottom=None, *, align: typing.Literal['center', 'edge'] = 'center', data=None, tick_label: str | list[str] | None = None, **kwargs): Any // plot bar chart",
    "plot(*args, scalex: bool = True, scaley: bool = True, data=None, **kwargs): list // plot line",
    "boxplot(x, *, notch=None, sym=None, vert=None, orientation='vertical', whis=None, positions=None, widths=None, patch_artist=None, bootstrap=None, usermedians=None, conf_intervals=None, meanline=None, showmeans=None, showcaps=None, showbox=None, showfliers=None, boxprops=None, tick_labels=None, flierprops=None, medianprops=None, meanprops=None, capprops=None, whiskerprops=None, manage_ticks=True, autorange=False, zorder=None, capwidths=None, label=None, data=None): dict // plot boxplot",
    "hlines(y, xmin, xmax, colors=None, linestyles='solid', *, label='', data=None, **kwargs): Any // plot horizontal line",
    "vlines(x, ymin, ymax, colors=None, linestyles='solid', *, label='', data=None, **kwargs): Any // plot vertical line",
    "scatter(x, y, s=None, c=None, *, marker=None, cmap=None, norm=None, vmin=None, vmax=None, alpha=None, linewidths=None, edgecolors=None, colorizer=None, plotnonfinite=False, data=None, **kwargs) // plot scatter",
    "title(label: str, fontdict=None, loc=None, pad=None, *, y=None, **kwargs): Any // make plot's title",
    "xlabel(xlabel: str, fontdict=None, labelpad=None, *, loc=None, **kwargs): None // make plot's x-axis label",
    "ylabel(ylabel, fontdict=None, labelpad=None, *, loc=None, **kwargs) // make plot's y-axis label",
    "xticks(ticks=None, labels=None, *, minor=False, **kwargs) // make x ticks",
    "yticks(ticks=None, labels=None, *, minor=False, **kwargs) // make y ticks"
  ]
};

BlockMirror.LIBRARIES['turtle'] = {
    "__toolbox": false,
    "__colour": "PLOTTING",
    "turtle": [
      {
        "signature": "type _AngleLeft = float",
        "fieldFactory": "BlockMirrorTextToBlocks.turtleAngleFieldLeft"
      },
      {
        "signature": "type _AngleRight = float",
        "fieldFactory": "BlockMirrorTextToBlocks.turtleAngleFieldRight"
      },
      {
        "signature": "type _AngleHeading = float",
        "fieldFactory": "BlockMirrorTextToBlocks.turtleAngleFieldHeading"
      },
      {
        "signature": "type _Color = str | tuple[float, float, float]",
        "fieldFactory": "BlockMirrorTextToBlocks.turtleColorField"
      },
        "forward fd(amount: float): None // move turtle forward by(50)",
        "backward bd(amount: float): None // move turtle backward by(50)",
        "left lt(angle: turtle._AngleLeft): None // turn turtle left by(90)",
        "right rt(angle: turtle._AngleRight): None // turn turtle right by(90)",
        "goto setpos setposition(x: float, y: float | None = None): None // move turtle to position(0, 0)",
        "teleport(x: float, y: float | None = None, *, fill_gap: bool = False): None // teleport turtle to position(0, 0)",
        "setx(x: float): None // set turtle's x position to(100)",
        "sety(y: float): None // set turtle's y position to(100)",
        "setheading seth(angle: turtle._AngleHeading): None // set turtle's heading to(270)",
        "home(): None // move turtle to origin",
        "circle(radius: float, extent: float | None = None, steps: int | None=None): None // move the turtle in a circle",
        "dot(size: float | None = None, color: turtle._Color | None=None): None // turtle draws a dot(0)",
        "stamp(): int // stamp a copy of the turtle shape",
        "clearstamp(stampid: int): None // delete stamp with id",
        "clearstamps(n: int | None = None): None // delete all stamps",
        "undo(): None // undo last turtle action",
        "speed(speed: int | None = None): int | None // set or get turtle speed",

        "position pos(): tuple[float, float] // get turtle's position",
        "towards(x: float, y: float): float // get the angle from the turtle to the point",
        "xcor(): float // get turtle's x position",
        "ycor(): float // get turtle's y position",
        "heading(): float // get turtle's heading",
        "distance(x: float, y: float): float // get the distance from turtle's position to",

        {
          "signature": "degrees(fullcircle: float = 360.0): None // set turtle mode to degrees",
          "custom": "BlockMirrorTextToBlocks.turtleDegrees"
        },

        {
          "signature": "radians(): None // set turtle mode to radians",
          "custom": "BlockMirrorTextToBlocks.turtleRadians"
        },

        "pendown pd down(): None // pull turtle pen down",
        "penup pu up(): None // pull turtle pen up",
        "pensize(width: float | None = None): float | None // set or get the pen size",
        "isdown(): bool // check if the pen is down",

        "pencolor(color: turtle._Color | None = None): turtle._Color | None // set or get the pen color('blue')",
        "fillcolor(color: turtle._Color | None = None): turtle._Color | None // set or get the fill color('yellow')",

        "reset(): None // reset drawing",
        "clear(): None // clear drawing",
        "write(arg: str, move: bool = False, align: typing.Literal['left', 'center', 'right'] = 'left', font: tuple[str, int, str] = ('Arial', 8, 'normal')): None // write text(___)",

        "bgpic(picname: str | None = None): None // set background to(___)",
        "done mainloop(): None // start the turtle loop",
        "setup(width: float, height: float): None // set drawing area size",
        "title(titlestring: str): None // set title of drawing area(___)",
        "bye(): None // say goodbye to turtles"
    ]
}
;

BlockMirror.LIBRARIES['builtin dict'] = {
  "__colour": "DICTIONARY",
  "__toolbox": false,
  "class collections.abc.Mapping": [
    "get(self, key, default=None, /): Any",
    "items(self): Any",
    "keys(self): Any",
    "values(self): Any"
  ],
  "class collections.abc.MutableMapping(collections.abc.Mapping)": [
    "popitem(self): Any",
    "setdefault(self, key, default=None, /): Any"
  ],
  "class dict(collections.abc.MutableMapping)": [
    "__init__(self, mapping=None, /, **kwargs)",
    "fromkeys(cls, iterable, value=None, /): dict"
  ]
}
;

BlockMirror.LIBRARIES['builtin file'] = {
  "__colour": "FILE",
  "__toolbox": false,
  "": [
    "input(prompt: str | None = None, /): str",
    "open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None): Any",
    "print(*objects, sep: str = ' ', end: str ='\\n', file=None, flush: bool = False): None"
  ]
}
;

BlockMirror.LIBRARIES['builtin list'] = {
  "__colour": "LIST",
  "__toolbox": false,
  "class collections.abc.Sequence": [
    "count(self, item, /): int",
    "index(self, item, /): int"
  ],
  "class collections.abc.MutableSequence(collections.abc.Sequence)": [
    "append(self, value, /): None // to list {} append (___)",
    "extend(self, other: collections.abc.Sequence, /): None",
    "insert(self, pos, elmnt, /): None // to list {} insert at (___, ___)",
    "reverse(self): collections.abc.MutableSequence"
  ],
  "class list(collections.abc.MutableSequence)": [
    "__init__(self, iterable = None, /)",
    "copy(self): list",
    "sort(self, *, reverse: bool = False, key = None)",
    {
      "signatures": [
        "clear(self): None",
        "pop(self, pos: int = -1, /): Any",
        "remove(self, value: Any, /): None"
      ],
      "colour": "SEQUENCES"
    }
  ]
};

BlockMirror.LIBRARIES['builtin math'] = {
  "__colour": "MATH",
  "__toolbox": false,
  "": [
    "abs(x: numbers.Number, /): numbers.Number",
    "bin(x: Any, /): str",
    "hash(object, /): int",
    "hex(int, /): str",
    "min(iterable, /, *, key=None): Any",
    "max(iterable, /, *, key=None): Any",
    "oct(int, /): str",
    "pow(base, exp, mod=None): Any",
    "round(number: float | int, ndigits: int | None = None): float | int // round(___)",
    "sum(iterable, /, start: float | int = 0): float | int",
    "divmod(a: float | int, b: float | int, /): tuple[int, float]"
  ],
  "random": [
    "choice(seq: collections.abc.Sequence): Any",
    "shuffle(x: collections.abc.Sequence): None",
    "randrange(start: int, stop: int, step: int=1, /): int",
    "randint(a: int, b: int): int",
    "getrandbits(k: int, /): int"
  ],
  "math": [
    "e: numbers.Number",
    "exp(x: numbers.Number): numbers.Number",
    "ceil floor(x): numbers.Integral",
    "sin cos tan asin acos atan(x: numbers.Number): numbers.Number",
    "log(x: numbers.Number, base=math.e): numbers.Number"
  ],
  "class numbers.Number": [],
  "class numbers.Complex(numbers.Number)": [
    "conjugate(self): numbers.Complex"
  ],
  "class numbers.Real(numbers.Complex)": [],
  "class numbers.Rational(numbers.Real)": [],
  "class numbers.Integral(numbers.Rational)": [],
  "class complex(numbers.Complex)": [
    "__init__(self, real=0, /, imag=0): "
  ],
  "class float(numbers.Real)": [
    "__init__(self, value: float | str = 0.0, /): None",
    "as_integer_ratio(self): tuple[int, int]",
    "fromhex(cls, string: str, /): float",
    "hex(): str",
    "is_integer(self): bool"
  ],
  "class int(numbers.Integral)": [
    "__init__(self, value: int | str = 0, /, base: int = 10): None",
    "as_integer_ratio(self): tuple[int, int]",
    "bit_length(self): int",
    "from_bytes(cls, bytes, byteorder: typing.Literal['big', 'little'] = 'big', *, signed: bool = False): int // {}.from_bytes(___)",
    "to_bytes(self, length: int = 1, byteorder: typing.Literal['big', 'little'] = 'big', *, signed: bool = False): bytes",
    "is_integer(self): bool"
  ]
};

BlockMirror.LIBRARIES['builtin oo'] = {
  "__colour": "OO",
  "__toolbox": false,
  "": [
    "callable(object: Any, /): bool",
    "classmethod(method, /): Any",
    "getattr(object, name: str, /): Any",
    "hasattr(object, name: str, /): bool",
    "isinstance(object, classinfo, /): bool",
    "issubclass(object, classinfo, /): bool",
    "setattr(object, name, value, /): None",
    "staticmethod(method, /): Any",
    {
      "signatures": [
        "all(iterable, /): bool",
        "any(iterable, /): bool"
      ],
      "colour": "LOGIC"
    }
  ],
  "class bool": [
    {
      "signature": "__init__(self, object: Any = False, /): None",
      "colour": "LOGIC"
    }
  ],
  "class object": [
    {
      "signatures": [
        "__enter__(self): Any",
        "__exit__(self, exc_type, exc_value, traceback): None"
      ],
      "color": "CONTROL"
    },
    {
      "signature": "__iter__(self): iterator",
      "color": "SEQUENCES"
    },
    {
      "signatures": [
        "__lt__(self, other): bool",
        "__le__(self, other): bool",
        "__eq__(self, other): bool",
        "__ne__(self, other): bool",
        "__gt__(self, other): bool",
        "__ge__(self, other): bool"
      ],
      "color": "LOGIC"
    }
  ],
  "class property": [
    "__init__(self, fget=None, fset=None, fdel=None, doc=None): None"
  ],
  "class super": [
    "__init__(self, type, object_or_type=None, /): None"
  ],
  "class type": [
    "mro(): Any",
    "__subclasses__(): None"
  ]
};

BlockMirror.LIBRARIES['builtin python'] = {
  "__colour": "PYTHON",
  "__toolbox": false,
  "": [
    "breakpoint(*args, **kws): None",
    "compile(source, filename, mode, flags: int = 0, dont_inherit: bool = False, optimize: int = -1)",
    "dir(object = None, /): list",
    "eval(source, globals: dict | None = None, locals=None, /): Any",
    "exec(source, globals: dict | None = None, locals=None, *, closure=None, /): None",
    "help(request = None): Any",
    "id(object, /): int",
    "__import__(name, globals=None, locals=None, fromlist=(), level: int = 0)"
  ],
  "class memoryview": [
    "__init__(self, object): None",
    "tobytes(self, order: str = \"C\"): bytes",
    "tolist(self): list",
    "release(self): None",
    "cast(self, format: str, shape: list[int] | None = None, /): list"
  ]
};

BlockMirror.LIBRARIES['builtin sequences'] = {
  "__colour": "SEQUENCES",
  "__toolbox": false,
  "": [
    "enumerate(iterable, start: int = 0): iterator",
    "filter(function, iterable, /): iterator",
    "iter(object, sentinel = ___, /): iterator",
    "len(s, /): int",
    "map(function, iterable, *iterables): iterator",
    "next(iterator, default = ___, /): Any",
    "reversed(seq, /): iterator",
    "sorted(iterable, /, *, key = None, reverse: boolean = False): list",
    "zip(*iterables, strict: boolean = False): iterator"
  ],
  "class bytes": [
    {
      "signatures": [
        "__init__(self, source, encoding = None, errors = None): None",
        "decode(encoding: str = \"utf-8\", errors: str = \"strict\"): str"
      ],
      "colour": "TEXT"
    },
    {
      "signature": "fromhex(cls, string: str, /): bytes",
      "colour": "MATH"
    }
  ],
  "class iterator": [
    "__next__(self): Any"
  ],
  "class range": [
    "__init__(self, startOrStop: int, stop: int | None = None, step: int = 1, /): None"
  ],
  "class slice": [
    "__init__(self, startOrStop: int, stop: int | None = None, step:int | None = None, /): None"
  ]
}
;

BlockMirror.LIBRARIES['builtin set'] = {
  "__colour": "SET",
  "__toolbox": false,
  "class collections.abc.Collection": [],
  "class collections.abc.Set(collections.abc.Collection)": [
    "isdisjoint(self, other, /): bool",
    "issubset(self, other, /): bool",
    "issuperset(self, other, /): bool"
  ],
  "class collections.abc.MutableSet(collections.abc.Set)": [
  ],
  "class set(collections.abc.MutableSet)": [
    "__init__(self, iterable = None, /): None",
    "add(self, elem, /): None",
    "difference(self, *others, /): set",
    "difference_update(self, *others, /): None",
    "discard(self, elem, /): None",
    "intersection(self, *others, /): set",
    "intersection_update(self, *others, /): None",
    "symmetric_difference(self, others, /): set",
    "symmetric_difference_update(self, others, /): None",
    "union(self, *others, /): set",
    "update(self, *others, /): None"
  ],
  "class frozenset(collections.abc.Set)": [
    {
      "signature": "__init__(self, iterable = None, /): None",
      "colour": "SEQUENCES"
    }
  ]
};

BlockMirror.LIBRARIES['builtin text'] = {
  "__colour": "TEXT",
  "__toolbox": false,
  "": [
    "ascii(object: Any, /): str",
    "chr(i: int, /): str",
    "format(value: Any, format_spec='', /): Any",
    "ord(c: str, /): int",
    "repr(object: Any, /): str"
  ],
  "class bytearray": [
    "__init__(self, source = None, encoding = None, errors = None, /): None"
  ],
  "class str": [
    "__init__(self, object: str = '', encoding: str = 'utf-8', errors: str = 'strict'): None // str(___)",
    "capitalize(self): str",
    "casefold(self): str",
    "center(self, width: int, fillchar: str = \" \", /): str",
    "count(self, sub, start: int | None = None, end: int | None = None, /): int",
    "encode(self, encoding: str = \"utf-8\", errors: str = \"strict\"): str",
    "endswith(self, suffix, start: int | None = None, end: int | None = None, /): bool",
    "expandtabs(self, tabsize: int = 8): self",
    "find(self, sub, start: int | None = None, end: int | None = None, /): int",
    "format(self, *args, **kwargs): str",
    "format_map(self, mapping, /): str",
    "index(self, sub, start: int | None = None, end: int | None = None, /): int",
    "isalnum(self): bool",
    "isalpha(self): bool",
    "isdecimal(self): bool",
    "isdigit(self): bool",
    "isidentifier(self): bool",
    "islower(self): bool",
    "isnumeric(self): bool",
    "isprintable(self): bool",
    "isspace(self): bool",
    "istitle(self): bool",
    "isupper(self): bool",
    "join(self, iterable, /): str",
    "ljust(self, width: int, fillchar: str = \" \", /): str",
    "lower(self): str",
    "lstrip(self, chars: str | None = None, /): str",
    "maketrans(self, x, y: str | None = None, z: str | None = None, /): str",
    "partition(self, sep: str, /): tuple[str, str, str]",
    "replace(self, old: str, new: str, count: int = -1, /): str",
    "rfind(self, sub, start: int | None = None, end: int | None = None, /): int",
    "rindex(self, sub, start: int | None = None, end: int | None = None, /): int",
    "rjust(self, width: int, fillchar: str = \" \", /): str",
    "rpartition(self, sep: str, /): tuple[str, str, str]",
    "rsplit(self, sep: str | None = None, maxsplit: int = -1): list[str]",
    "rstrip(self, chars: str | None = None, /): str",
    "split(self, sep: str | None = None, maxsplit: int = -1): list[str]",
    "splitlines(self, keepends: bool = False): list[str]",
    "startswith(self, prefix, start: int | None = None, end: int | None = None, /): bool",
    "strip(self, chars: str | None = None, /): str",
    "swapcase(self): str",
    "title(self): str",
    "translate(self, table, /): str",
    "upper(self): str",
    "zfill(self, width: int, /): str"
  ]
};

BlockMirror.LIBRARIES['builtin tuple'] = {
  "__colour": "TUPLE",
  "__toolbox": false,
  "class tuple": [
    "__init__(self, iterable = None, /): None"
  ]
}
;

BlockMirror.LIBRARIES['builtin variables'] = {
  "__colour": "VARIABLES",
  "__toolbox": false,
  "": [
    "delattr(object, name: str, /): None",
    "globals(): dict",
    "locals(): dict",
    "vars(object = None, /): dict"
  ]
}
;
