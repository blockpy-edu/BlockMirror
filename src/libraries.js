const __BLANK = "___" // Mirrors python.pythonGenerator.blank

function _resolve_colour(colour) {
  if (typeof colour === "string" && !colour.startsWith('#') && typeof BlockMirrorTextToBlocks === "function") {
    return BlockMirrorTextToBlocks.COLOR[colour]
  }
  return colour
}

class PythonModule {
  static isA(fullName) {
    return (
      /^([a-z][a-zA-Z0-9_]*)(\.[a-z][a-zA-Z0-9_]*)*$/.test(fullName)
    );
  }

  static extractName(signature) {
    if (signature.startsWith('class ')) {
      signature = signature.substring(6).split('(', 1)[0];
      let lastIndexOfDot = signature.lastIndexOf('.')
      return lastIndexOfDot === -1 ? null : signature.substring(0, lastIndexOfDot);
    }

    let moduleName = signature.split(/\.(_?[A-Z][^.]*)\.?.+$/, 1)[0];

    if (PythonModule.isA(moduleName)) {
      return moduleName;
    }

    return "";
  }

  addMember(signature, inputObject) {
    const [code, comment] = signature.split("//", 2);
    let member;

    if (PythonTypeAliasType.isA(code)) {
      const translatedComment = this.translate(PythonTypeAliasType.extractName(code), comment);
      member = new PythonTypeAliasType(this, code, translatedComment, inputObject?.fieldFactory)
    } else if (PythonFunction.isA(code)) {
      const translatedComment = this.translateFunctionComment(PythonFunction.extractName(code), comment);
      member = new PythonFunction(
          this,
          code,
          translatedComment,
          inputObject?.colour ?? inputObject?.color,
          inputObject?.custom
      );

      for (let alias of member.aliases) {
        this.members.set(alias.name, alias);
      }
    } else {
      member = new PythonAttribute(
          this,
          code,
          this.translate(PythonAttribute.extractName(code), comment),
          inputObject?.colour ?? inputObject?.color,
      );

      for (let alias of member.aliases) {
        this.members.set(alias.name, alias);
      }
    }

    this.members.set(member.name, member);
  }

  translate(memberName, defaultValue) {
    if (this.fullName === "") {
      return this.library.translate(memberName, defaultValue);
    }
    return this.library.translate(this.fullName + "." + memberName, defaultValue);
  }

  translateFunctionComment(memberName, defaultValue) {
    if (defaultValue) {
      const [toTranslate, tail] = defaultValue.split("(", 2);

      if (tail) {
        return this.translate(memberName, toTranslate) + "(" + tail;
      }
    }
    return this.translate(memberName, defaultValue);
  }

  constructor(library, signature, comment, members) {
    this.library = library;
    let fullName
    [fullName, this.name] = signature.split(" as ", 2);
    this.fullName = fullName.trim()
    if (!this.name) {
      this.name = this.fullName.substring(this.fullName.lastIndexOf(".") + 1);
    }
    this.requiresImport = this.fullName === "" ? "" : this.name === this.fullName ? this.fullName : (this.fullName + " as " + this.name);
    this.members = new Map();
    this.colour = library.colour

    if (members !== undefined) {
      for (let input of members) {
        if (typeof input === "object") {
          if (input.__colour) {
            this.colour = this.library.libraries.convertColour(
              "module", _resolve_colour(input.__colour), this.fullName
            )
          } else if (input.__color) {
            this.colour = this.library.libraries.convertColour(
              "module", _resolve_colour(input.__color), this.fullName
            )
          } else if (input.signatures) {
            for (const signature of input.signatures) {
              this.addMember(signature, input)
            }
          } else {
            this.addMember(input.signature, input)
          }
        } else {
          this.addMember(input)
        }
      }
    }
  }

  toString() {
    return this.requiresImport;
  }

  toToolbox(textToBlocks) {
    let result = "";

    for (let value of this.members.values()) {
      let resultItem = value.toToolbox(textToBlocks)

      if (resultItem) {
        result += resultItem
      }
    }

    return result;
  }

  resolve(name) {
    if (name === this.fullName) {
      return this;
    }

    let memberName;

    if (name.startsWith(this.fullName + ".") && this.fullName !== "") {
      memberName = name.substring(this.fullName.length + 1);
    } else {
      memberName = name;
    }

    let indexOfDot = memberName.lastIndexOf(".");

    if (indexOfDot === -1) {
      return this.members.get(memberName);
    }

    if (this.fullName === "" && indexOfDot === 0) {
      // Special case, look for a method in all builtin classes
      let methodName = memberName.substring(1);

      for (let member of this.members.values()) {
        if (member instanceof PythonClass) {
          let result = member.resolve(methodName)

          if (result) {
            return result
          }
        }
      }

      return null;
    }

    let member = this.members.get(memberName.substring(0, indexOfDot))

    if (member instanceof PythonAttribute) {
      if (member.typeHint === null) {
        return null;
      }
      member = this.library.libraries.resolve(member.typeHint.toString());
    }

    return member?.resolve(memberName.substring(indexOfDot + 1));
  }

  registerImports(typeRegistry) {
    typeRegistry.set(this.fullName, this.name)

    for (const member of this.members.values()) {
      if (member instanceof PythonClass) {
        typeRegistry.set(member.fullName, member.name)
      }
    }
  }
}

class PythonTypeHint {
  constructor(libraries, signature) {
    let unionTypes = splitParameters(signature.trim(), '|');

    if (unionTypes.length >= 2) {
      this.value = "typing.Union"
      this.typeParams = unionTypes
    } else if (signature.trim().endsWith("]")) {
      let [value, typeParams] = signature.split("[", 2);
      typeParams = typeParams.trim()
      this.value = value.trim()
      this.typeParams = splitParameters(typeParams.substring(0, typeParams.length - 1))
    } else {
      this.value = signature.trim()
      this.typeParams = []
    }

    this.libraries = libraries;
    this._referencedTypeAliases = null;
    this._flattened = null;
  }

  referencedTypeAliases() {
      if (this._referencedTypeAliases == null) {
          this._referencedTypeAliases = []

          if (this.isUnion() || this.isOptional()) {
              for (let typeParam of this.typeParams) {
                  let resolved = this.libraries.resolve(typeParam)

                  if (resolved instanceof PythonTypeAliasType) {
                      this._referencedTypeAliases.push(resolved)
                  }
              }
          } else {
              let resolved = this.libraries.resolve(this.value)

              if (resolved instanceof PythonTypeAliasType) {
                  this._referencedTypeAliases.push(resolved)
              }
          }
      }

      return this._referencedTypeAliases;
  }

  /**
   * Without type alias types.
   */
  flattened() {
    if (this._flattened == null) {
        let referencedTypeAliases = this.referencedTypeAliases()

        if (referencedTypeAliases.length) {
            if (this.isUnion() || this.isOptional()) {
                this._flattened = new PythonTypeHint(this.libraries, "")
                this._flattened.value = this.value

                for (let item of this.typeParams) {
                    let referencedTypeAlias = referencedTypeAliases.find(alias => alias.fullName === item)

                    if (referencedTypeAlias) {
                        if (referencedTypeAlias.isUnion()) {
                            this._flattened.typeParams = this._flattened.typeParams.concat(this._flattened.typeParams, referencedTypeAlias.flattened().typeParams)
                        } else if (referencedTypeAlias.isOptional()) {
                            this._flattened.typeParams = this._flattened.typeParams.concat(this._flattened.typeParams, referencedTypeAlias.flattened().typeParams)

                            if (!this._flattened.typeParams.includes("None")) {
                                this._flattened.typeParams.push("None")
                            }
                        } else {
                            this._flattened.typeParams.push(referencedTypeAlias.flattened().toString())
                        }
                    }
                }
            } else {
                this._flattened = referencedTypeAliases[0].flattened()
            }
        } else {
            this._flattened = this
        }
    }
    return this._flattened
  }

  toToolbox(_textToBlocks) {
    // Not meant to be used as a toolbox block at this time.
    return null;
  }

  toString() {
    if (this.isUnion()) {
      return this.typeParams.join(' | ')
    } else if (this.isOptional()) {
      return this.typeParams.join(' | ') + " | None";
    } else if (this.typeParams.length) {
      return this.value + "[" + this.typeParams.join(', ') + "]";
    } else {
      return this.value
    }
  }

  isLiteral() {
      return this.value === 'typing.Literal'
  }

  isUnion() {
      return this.value === 'typing.Union'
  }

  isOptional() {
      return this.value === 'typing.Optional'
  }

  matches(typeString) {
      if (this.value === typeString) {
          return true;
      } else if (this.isUnion() || this.isOptional()) {
          return this.typeParams.some(typeParam => typeParam === typeString)
      } else if (this.flattened() !== this) {
          return this.flattened().matches(typeString)
      }
      return false
  }

    /**
     * Resolves to a single Python class.
     * @returns {PythonClass | null}
     */
  resolveSingleClass() {
    let flattened = this.flattened()

    if (flattened.isOptional()) {
      return this.libraries.resolve(flattened.typeParams[0])
    } else if (!flattened.isUnion()) {
      return this.libraries.resolve(flattened.value)
    }

    return null
  }
}

function _resolveFunction(identifier, fullName) {
    if (typeof identifier === "function") {
        return identifier;
    }

    if (identifier) {
        let result = globalThis;

        for (let item of identifier.split('.')) {
            result = result[item];

            if (!result) {
                console.warn("Could not find function " + identifier + " for " + fullName)
                break
            }
        }

        return result;
    }

    return null;
}

class PythonTypeAliasType extends PythonTypeHint {

  static isA(signature) {
    return signature.startsWith("type ");
  }

  static extractName(signature) {
    return signature.split('=', 1)[0].trim();
  }

  constructor(pythonModule, signature, comment, fieldFactory) {
    super(pythonModule.library.libraries, signature.substring(signature.indexOf('=') + 1).trim());

    if (signature.startsWith("type ")) {
      signature = signature.substring(5);
    }

    this.name = PythonTypeAliasType.extractName(signature);
    this.fullName = pythonModule?.fullName === "" ? this.name : (pythonModule?.fullName + "." + this.name);
    this.comment = comment?.trim() ?? ""
    this.resolvedFieldFactory = _resolveFunction(fieldFactory, this.fullName);
    this.fieldFactory = this.resolvedFieldFactory === null ? null : fieldFactory
  }
}

class PythonParameter {
  constructor(pythonFunction, parameter, arg, positional, keyword) {
    this.pythonFunction = pythonFunction
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
    let [nameAndTypeHint, defaultValue] = parameter.split("=", 2);
    let [names, typeHint] = nameAndTypeHint.split(":", 2);
    this.name = null;
    this.aliases = null;
    this.names = names.split(' ');
    [this.name, ...this.aliases] = this.names;
    this.typeHint = typeHint ? new PythonTypeHint(pythonFunction.pythonModule.library.libraries, typeHint) : null;

    // Convert double quotes to single quotes for default string values
    this.defaultValue = (defaultValue ?? "").trim().replace(/^"([^"]*)"$/, "'$1'");
    this.preferKeyword = this.positional && this.keyword

    if (arg.includes("=")) {
      let [message, value] = arg.split("=", 2);
      this.message = message.trim();
      this.value = value.trim();
    } else {
      this.message = this.name;
      this.value = arg.trim();

      if (this.value !== "") {
        this.preferKeyword = false
      }
    }

    if (this.value === __BLANK) {
      // For consistency
      this.value = ""
    }
  }

  toPythonSource() {
    if (this.variableLength && this.keyword) {
      return ""
    }

    let processedValue = this.value

    if (this.value === "") {
      if (this.defaultValue === "" && !(this.variableLength && this.positional)) {
        processedValue = __BLANK;
      } else {
        processedValue = this.defaultValue
      }
    }

    if (this.positional && (!this.keyword || !this.preferKeyword)) {
      // Positional only or preferred
      return processedValue;
    }
    return `${this.name} = ${processedValue}`;
  }

  #replaceTagName(element, tagName) {
    if (element.tagName === tagName) {
      return element
    }

    let replacementElement = document.createElement(tagName);

    for (let i = 0, l = element.attributes.length; i < l; ++i) {
      let attr = element.attributes.item(i)
      let nodeName = attr.nodeName;
      let nodeValue = attr.nodeValue;
      replacementElement.setAttribute(nodeName, nodeValue);
    }

    replacementElement.innerHTML = element.innerHTML;
    element.parentNode.replaceChild(replacementElement, element);
    return replacementElement
  };

  #matchesDefaultValue(type, value, defaultValue) {
    if (defaultValue === "") {
      return value === ""
    }

    switch (type) {
      case "ast_NameConstantBoolean":
        return defaultValue === value || defaultValue === "True" && value === "TRUE" || defaultValue === "False" && value === "FALSE"
      case "ast_NameConstantNone":
        return defaultValue === "None"
      case "ast_Num":
      case "ast_UnaryOpUSub":
        return parseFloat(defaultValue) === parseFloat(value)
      case "ast_Tuple":
          break
      case "ast_Name":
      case "ast_Str":
      case "ast_StrChar":
    }
    return defaultValue === value
  }

  #shouldShadow(argBlock, defaultValue) {
    if (defaultValue === '') {
      return false
    } else if (argBlock instanceof HTMLElement) {
      // Blockly XML
      let blockElement = argBlock.firstElementChild;
      let blockType = blockElement.getAttribute("type")

      if (blockType === "ast_Tuple") {
        let defaultValueParts = defaultValue.substring(1, defaultValue.length -1).split(', ')
        let valueChildren = [...blockElement.children].filter(child => child.localName === 'value')

        if (defaultValueParts.length !== valueChildren.length) {
          return false
        }

        for (let i = 0; i < defaultValueParts.length; i++) {
          if (!this.#shouldShadow(valueChildren[i], defaultValueParts[i])) {
            return false
          }
        }

        return true
      } else if (blockType === "ast_Attribute") {
        let valueElement = [...blockElement.getElementsByTagName('value')].filter(child => child.getAttribute('name') === 'VALUE')[0]
        let attrElement = [...blockElement.getElementsByTagName('field')].filter(child => child.getAttribute('name') === 'ATTR')[0]
        let mutationElement = (valueElement ?? blockElement).getElementsByTagName('mutation')[0]
        let importAttr = mutationElement?.getAttribute('import')

        if (importAttr) {
          let fullName = importAttr.split(' as ', 1)[0];
          let attrName = attrElement.textContent;
          return defaultValue === fullName + '.' + attrName;
        }
      }

      let value = blockElement.textContent

      if (blockType === "ast_UnaryOpUSub") {
        value = "-" + value
      } else if (blockType === "ast_Str" || blockType === "ast_StrChar") {
        value = "'" + value.replace("'", "\\'").replace('\n', '\\n') + "'"
      }

      return this.#matchesDefaultValue(blockType, value, defaultValue)
    } else {
      // Blockly block
      let value = python.pythonGenerator.descrub_(python.pythonGenerator.blockToCode(argBlock)[0])
      return this.#matchesDefaultValue(argBlock.type, value, defaultValue)
    }
  }

  applyShadow(argBlock, shouldShadow=null) {
    if (argBlock) {
      if (shouldShadow == null) {
        shouldShadow = this.#shouldShadow(argBlock, this.defaultValue)
      }

      if (argBlock instanceof HTMLElement) {
        // Blockly XML
        for (let childElement of argBlock.children) {
          if (childElement.tagName === (shouldShadow ? 'BLOCK' : 'SHADOW')) {
            let replacementElement = this.#replaceTagName(childElement, shouldShadow ? 'SHADOW' : 'BLOCK')
            this.applyShadow(replacementElement, shouldShadow)
          } else {
            this.applyShadow(childElement, shouldShadow)
          }
        }
      } else if (argBlock.shadow !== shouldShadow) {
        // Blockly block
        argBlock.shadow = shouldShadow
        argBlock.setStyle(argBlock.getStyleName()) // Re-apply the style

        for (let child of argBlock.getChildren()) {
          this.applyShadow(child, shouldShadow)
        }
      }
    }
  }

  defaultValueBlocks(textToBlocks) {
      let pythonSource, fictionalFilename

      if (this.keyword || this.preferKeyword) {
          pythonSource = "k=" + this.defaultValue
          fictionalFilename = "keywordDefaultValue.py"
      } else {
          pythonSource = "p=" + this.defaultValue
          fictionalFilename = "positionalDefaultValue.py"
      }

      let parse = Sk.parse(fictionalFilename, pythonSource);
      let ast = Sk.astFromParse(parse.cst, fictionalFilename, parse.flags);
      let converted = textToBlocks.convert(ast);
      return converted[0].children['VALUE']?.children[0]
  }
}

class PythonParameters extends Array {

  constructor(pythonFunction, signature, comment) {
    super();
    const parameters = signature
      .substring(signature.indexOf("(") + 1, signature.lastIndexOf(")"))
      .trim();

    if (parameters !== "") {
      const args = comment.substring(
        comment.indexOf("(") + 1,
        comment.lastIndexOf(")"),
      );
      const argParts = splitParameters(args);
      const parameterParts = splitParameters(parameters);

      // PEP 570 Python Positional-Only Parameters
      let positional = true;
      let keyword = !parameterParts.includes("/");
      let argIndex = 0;

      for (const parameter of parameterParts) {
        if (parameter === "/") {
          keyword = true;
        } else if (parameter === "*") {
          positional = false;
        } else {
          let isSelfOrCls = argIndex === 0 && (parameter === "self" || parameter === "cls")

          let pythonParameter = new PythonParameter(
              pythonFunction,
              parameter,
              isSelfOrCls ? "" : (argParts[argIndex] ?? ""),
              positional,
              keyword,
          )
          this.push(
            pythonParameter
          );

          if (parameter.length > 1 && parameter[0] === '*' && parameter[1] !== '*') {
            // No positional arguments after *args
            positional = false;
          }

          if (!isSelfOrCls) {
            argIndex++;
          }
        }
      }

      // Any parameter before *args should not be addressable by keyword
      let positionalOnly = false

      for (let i = this.length - 1; i >= 0; i--) {
        let parameter = this[i]

        if (positionalOnly) {
          parameter.keyword = false
        }

        positionalOnly = positionalOnly || (parameter.variableLength && parameter.positional)
      }
    }
  }

  toPythonSource() {
    return [
      ...this.entries()
        .filter(([key, value]) => !(key === 0 && (value.name === "self" || value.name === "cls")))
        .map(([, value]) => value.toPythonSource()),
    ]
      .filter((result) => result !== "")
      .join(", ");
  }

  findByKeyword(keyword) {
    return this.values().find((value) => value.names.includes(keyword));
  }
}

function splitParameters(input, splitChar=',') {
  let result = []
  let openParentheses = 0
  let openBrackets = 0
  let doubleQuoted = false;
  let singleQuoted = false;
  let item = ''

  for (let char of input) {
    if (char === '"') {
      doubleQuoted = !doubleQuoted;
    } else if (char === "'") {
      singleQuoted = !singleQuoted;
    } else if (char === splitChar && openParentheses === 0 && openBrackets === 0 && !doubleQuoted && !singleQuoted) {
      result.push(item.trim())
      item = ''
      continue
    } else if (char === '(') {
      openParentheses++;
    } else if (char === ')') {
      openParentheses--;
    } else if (char === '[') {
      openBrackets++;
    } else if (char === ']') {
      openBrackets--;
    }
    item += char;
  }

  item = item.trim()

  if (item !== '') {
    result.push(item)
  }
  return result;
}

function splitPremessageMessage(toSplit) {
  let [premessage, message] = toSplit.trim().split("{}", 2);

  if (message === undefined) {
    return ["", premessage];
  }
  return [premessage, message];
}

function splitPremessageMessagePostmessage(toSplit) {
  let [premessage, message, postmessage] = toSplit.trim().split("{}", 3);

  if (message === undefined) {
    return ["", premessage, ""];
  } else if (postmessage === undefined) {
    return [premessage, message, ""];
  }
  return [premessage, message, postmessage];
}

class PythonFunction {
  static isA(signature) {
    return signature.includes("(");
  }

  static extractName(signature) {
    return signature.split(/[( ]/, 1)[0];
  }

  constructor(pythonModuleOrFunction, signature, comment, colour, custom) {
    this.isAliasOf = null;

    if (pythonModuleOrFunction instanceof PythonFunction) {
      let original = pythonModuleOrFunction;
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
      this.name = signature.split("(", 1)[0]
      this.fullName = this.pythonModule.fullName === ""
        ? this.name
        : this.pythonModule.fullName + "." + this.name;
    } else {
      this.name = null;
      this.names = signature.split("(", 1)[0].split(" ");
      this.name = this.names[0];
      this.label = this.name;
      this.pythonModule = pythonModuleOrFunction;
      let indexOfStart = signature.indexOf(")") + 1
      let indexOfTypeHint = signature.indexOf("->", indexOfStart);

      if (indexOfTypeHint < 0) {
        indexOfTypeHint = signature.indexOf(":", indexOfStart);
      }

      this.typeHint = indexOfTypeHint < 0 ? null : new PythonTypeHint(
        this.pythonModule.library.libraries,
        signature.substring(indexOfTypeHint + 1),
      );

      if ((comment ?? "").trim() === "") {
        this.premessage = "";
        this.message = this.pythonModule.fullName === ""
          ? ""
          : ".";
        this.postmessage = "";

        // If no comment is in the specification, aliases should be made available.
        this.labels = [...this.names]
      } else {
        [this.premessage, this.message] = splitPremessageMessage(
          comment.split("(", 1)[0],
        );

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
          this.labels = [this.label]
        } else {
          let messageParts = this.message.split(/\{([^}]+)\}/, 3);

          if (messageParts.length > 1) {
            this.message = messageParts[0];
            this.labels = [...this.names]
            let labels = messageParts[1].split("|");

            for (const [index, label] of labels.entries()) {
              this.labels[index] = label.trim();
            }

            this.label = this.labels[0]
            this.postmessage = messageParts[2];
          } else {
            // If there are aliases, but no accolades in the specification,
            //  aliases are likely intended to be hidden.
            this.label = this.message;
            this.message = "";
            this.labels = [this.label]
          }
        }
      }
      this.parameters = new PythonParameters(this, signature, comment ?? "");
      this.fullName = this.pythonModule.fullName === ""
          ? this.name
          : this.pythonModule.fullName + "." + this.name;
      this.argumentOffset = 0;
      this.colour = _resolve_colour(colour) ?? this.pythonModule.library.colour

      if (this.constructor === PythonFunction) {
        this.custom = _resolveFunction(custom, this.fullName);
        this.colour = this.pythonModule.library.libraries.convertColour(
          "ast_Call", this.colour, this.fullName
        );
        this.createAliases();
      }
    }
  }

  createAliases() {
    this.aliases = this.names.slice(1).map(name => new this.constructor(this, name));

    if (this.labels.length <= 1) {
      for (const alias of this.aliases) {
        alias.label = this.label;
      }
    } else {
      for (const [index, alias] of this.aliases.entries()) {
        alias.label = this.labels[index + 1];
      }
    }

    for (const alias of this.aliases) {
      alias.isAliasOf = this;
      alias.aliases = [this, ...this.aliases].filter(item => item !== alias);
      alias.names = this.names;
      alias.labels = this.labels;
    }
  }

  toPythonSource() {
    return (
      this.pythonModule.fullName + "." +
      this.name +
      "(" +
      this.parameters.toPythonSource() +
      ")"
    );
  }

  toString() {
    return this.toPythonSource();
  }

  applyShadow(block) {
    if (block instanceof HTMLElement) {
      let mutationElement = block.firstElementChild
      let blockChildren = block.children

      for (let i = 0; i < mutationElement.children.length; i++) {
        let valueElement = blockChildren['ARG' + i]

        if (!valueElement) {
          continue
        }

        let mutation = mutationElement.children[i].getAttribute('name')

        if (mutation.startsWith('KEYWORD:')) {
          let keywords = mutation.substring(8).split(' ')
          let parameter = this.parameters.findByKeyword(keywords[0])

          if (parameter) {
              if (parameter.name === keywords[0]) {
                parameter.applyShadow(valueElement);
              } else {
                // Addressed by an alias, so may not be functionally the same
                parameter.applyShadow(valueElement, false);
              }
          }
        } else {
          this.parameters[i + this.argumentOffset]?.applyShadow(valueElement);
        }
      }
    } else {
      for (let i = 0; i < block.arguments_.length; i++) {
        let mutation = block.arguments_[i]
        let argBlock = block.getInputTargetBlock('ARG' + i);

        if (mutation.startsWith('KEYWORD:')) {
          let keyword = block.getFieldValue('ARGNAME' + i)
          let parameter = this.parameters.findByKeyword(keyword)

          if (parameter) {
            if (parameter.name === keyword) {
              parameter.applyShadow(argBlock);
          } else {
              // Addressed by an alias, so may not be functionally the same
              parameter.applyShadow(argBlock, false);
            }
          }
        } else {
          this.parameters[i + this.argumentOffset]?.applyShadow(argBlock);
        }
      }
    }
  }

  toToolboxBlock(textToBlocks) {
    let pythonSource = this.toPythonSource();
    let result = textToBlocks.convertSource("toolbox.py", pythonSource);
    let blockElement = result.rawXml.children[0];
    // TODO tooltip does not seem to show up
    // blockElement.setAttribute("tooltip", pythonSource);
    return blockElement;
  }

  toToolbox(textToBlocks) {
    if (this.isAliasOf) {
      return "";
    }

    let toolboxBlock = this.toToolboxBlock(textToBlocks)
    this.applyShadow(toolboxBlock)

    return (
        toolboxBlock.parentNode.innerHTML.toString() + "\n"
    );
  }
}

class PythonClass {
  static isA(signature) {
    return signature.startsWith("class ");
  }

  addMember(signature, inputObject) {
    let member;
    const [code, comment] = signature.split("//", 2);

    if (PythonFunction.isA(code)) {
      if (PythonConstructorMethod.isA(code)) {
        member = new PythonConstructorMethod(
            this,
            code,
            this.pythonModule.translateFunctionComment(this.name, comment),
            inputObject?.colour ?? inputObject?.color,
            inputObject?.custom
        );
        this.colour = member.colour;
      } else {
        member = new PythonMethod(
            this,
            code,
            this.translateFunctionComment(PythonFunction.extractName(code), comment),
            inputObject?.colour ?? inputObject?.color,
            inputObject?.custom
        );

        for (let alias of member.aliases) {
          this.members.set(alias.name, alias);
        }
      }
    } else {
      member = new PythonAttribute(
          this,
          code,
          this.translate(PythonAttribute.extractName(code), comment),
          inputObject?.colour ?? inputObject?.color,
      );

      for (let alias of member.aliases) {
        this.members.set(alias.name, alias);
      }
    }

    this.members.set(member.name, member);
  }

  translate(memberName, defaultValue) {
    if (memberName === "") {
      return this.pythonModule.translate(this.name, defaultValue);
    }
    return this.pythonModule.translate(this.name + "." + memberName, defaultValue);
  }

  translateFunctionComment(memberName, defaultValue) {
    if (defaultValue) {
      const [toTranslate, tail] = defaultValue.split("(", 2);

      if (tail) {
        return this.translate(memberName, toTranslate) + "(" + tail;
      }
    }
    return this.translate(memberName, defaultValue);
  }

  constructor(pythonModule, signature, comment, members) {
    this.pythonModule = pythonModule;
    let endOfSimpleName = signature.indexOf("(")

    if (endOfSimpleName === -1) {
      endOfSimpleName = signature.length
      this.baseClass = "object"
    } else {
      this.baseClass = signature.substring(endOfSimpleName + 1, signature.indexOf(")")).trim()
    }

    let startOfSimpleName = signature.lastIndexOf(".", endOfSimpleName) + 1

    if (startOfSimpleName === 0 && signature.startsWith("class ")) {
      startOfSimpleName = 6
    }

    this.name = signature.substring(startOfSimpleName, endOfSimpleName);

    if (this.name === this.baseClass) {
      this.baseClass = ""
    }

    if (pythonModule.fullName === "") {
      this.fullName = this.name;
      this.requiresImport = "";
    } else {
      this.fullName = pythonModule.fullName + "." + this.name;
      this.requiresImport = this.fullName === this.name ? this.name: this.fullName + " as " + this.name;
    }

    this.colour = pythonModule.library.colour;
    this.members = new Map();

    // Default constructor
    this.members.set("__init__", new PythonConstructorMethod(
        this,
        "__init__()",
        "",
        null,
        null
    ));

    for (let input of members) {
      if (typeof input === "object") {
        if (input.signatures) {
          for (const signature of input.signatures) {
            this.addMember(signature, input)
          }
        } else {
          this.addMember(input.signature, input)
        }
      } else {
        this.addMember(input)
      }
    }
  }

  toString() {
    return this.requiresImport;
  }

  toToolbox(textToBlocks) {
    let result = "";

    for (const member of this.members.values()) {
      result += member.toToolbox(textToBlocks);
    }

    return result;
  }

  resolve(name) {
    if (name === this.fullName || name === this.name) {
      return this;
    }

    let memberName;

    if (name.startsWith(this.fullName + ".")) {
      memberName = name.substring(this.fullName.length + 1);
    } else if (name.startsWith(this.name + ".")) {
      memberName = name.substring(this.name.length + 1);
    } else {
      memberName = name;
    }

    let indexOfDot = memberName.indexOf("(");
    let result = this.members.get(
      indexOfDot === -1 ? memberName : memberName.substring(0, indexOfDot)
    );

    if (!result && this.baseClass !== "") {
      result = this.pythonModule.library.libraries.resolve(this.baseClass + "." + memberName);
    }

    return result
  }
}

// TODO static class attributes
class PythonAttribute {
  static isA(signature) {
    return !signature.includes("(") && !signature.startsWith("type ");
  }

  static extractName(signature) {
    return signature.split(/[: ]/, 1)[0];
  }

  constructor(pythonClassOrModule, signature, comment, colour) {
    this.isAliasOf = null

    if (pythonClassOrModule instanceof PythonClass) {
        this.pythonClass = pythonClassOrModule
        this.pythonModule = pythonClassOrModule.pythonModule
    } else {
        this.pythonClass = null
        this.pythonModule = pythonClassOrModule
    }
    let [names, typeHint] = signature.trim().split(":", 2)
    this.names = names.trim().split(" ")
    this.labels = [...this.names]
    this.name = this.names[0]
    this.fullName = pythonClassOrModule.fullName === "" ? this.name : pythonClassOrModule.fullName + "." + this.name;
    this.typeHint = typeHint ? new PythonTypeHint(this.pythonModule.library.libraries, typeHint) : null
    this.colour = this.pythonModule.library.libraries.convertColour(
      "ast_Attribute", _resolve_colour(colour) ?? pythonClassOrModule.colour, this.fullName
    );

    if ((comment ?? "").trim() === "") {
      this.premessage = this.pythonClass == null ? "" : this.pythonClass.translate("", this.pythonClass.name);
      this.message = this.pythonClass == null && this.pythonModule.fullName === "" ? "" : "."
      this.postmessage = ""
    } else {
      [this.premessage, this.message, this.postmessage] = splitPremessageMessagePostmessage(comment);

      if (this.premessage === "" && this.pythonClass !== null) {
        this.premessage = this.pythonClass.translate("", this.pythonClass.name);
      }

      let messageParts = this.message.split(/\{([^}]+)\}/, 3)

      if (messageParts.length > 1) {
        this.message = messageParts[0]

        let labels = messageParts[1].split('|')
        for (const [index, label] of labels.entries()) {
          this.labels[index] = label.trim()
        }

        this.postmessage = messageParts[2] + this.postmessage
      }
    }

    this.label = this.labels[0]

    this.aliases = this.names.slice(1).map((name, index) => {
      let result = new PythonAttribute(pythonClassOrModule, name + ':' + (this.typeHint ?? ""), comment, colour);
      result.isAliasOf = this
      result.names = this.names
      result.labels = this.labels
      result.label = this.labels[index + 1]
      return result
    });
  }

  toPythonSource() {
    if (this.pythonClass == null) {
      if (this.pythonModule.fullName === "") {
          return this.name
      }
      return this.pythonModule.fullName + "." + this.name;
    }

    return __BLANK + "." + this.name;
  }

  toString() {
    return this.toPythonSource();
  }

  toToolboxBlock(textToBlocks) {
    let blockElement

    if (this.pythonClass !== null) {
      let originalVariables = textToBlocks.variables
      try {
        textToBlocks.variables = new TypesRegistry()
        textToBlocks.variables.add(this.pythonClass.fullName, python.pythonGenerator.blank)
        let result = textToBlocks.convertSource(
          "toolbox.py",
          this.toPythonSource(),
        );
        blockElement = result.rawXml.children[0];
      } finally {
        textToBlocks.variables = originalVariables
      }
    } else {
      let result = textToBlocks.convertSource(
         "toolbox.py",
         this.toPythonSource(),
      );
      blockElement = result.rawXml.children[0];
    }

    if (this.typeHint) {
      blockElement.setAttribute("output", this.typeHint.flattened().toString());
    }
    return blockElement;
  }

  toToolbox(textToBlocks) {
    return (
      this.toToolboxBlock(textToBlocks).parentNode.innerHTML.toString() + "\n"
    );
  }
}

class PythonMethod extends PythonFunction {
  constructor(pythonClassOrMethod, signature, comment, colour, custom) {
    super(
      pythonClassOrMethod instanceof PythonMethod ? pythonClassOrMethod : pythonClassOrMethod.pythonModule,
      signature, comment, colour, custom
    );

    if (pythonClassOrMethod instanceof PythonMethod) {
      let original = pythonClassOrMethod
      this.pythonClass = original.pythonClass;
      this.staticmethod = original.staticmethod;
      this.classmethod = original.classmethod;
      this.fullName = this.pythonClass.fullName + "." + this.name;
    } else {
      this.pythonClass = pythonClassOrMethod;
      this.fullName = this.pythonClass.fullName + "." + this.name;

      if ((comment ?? "").trim() === "") {
        this.message = ".";
      }

      if (this.parameters.length === 0) {
        this.staticmethod = true;
        this.classmethod = false;
      } else if (this.parameters[0].name === "self") {
        this.staticmethod = false;
        this.classmethod = false;
      } else if (this.parameters[0].name === "cls") {
        this.staticmethod = false;
        this.classmethod = true;
      } else {
        this.staticmethod = true;
        this.classmethod = false;
      }

      if (this.premessage === "" && !(this.classmethod || this.staticmethod)) {
        this.premessage = this.pythonClass.translate("", this.pythonClass.name);
      }

      this.argumentOffset = this.staticmethod ? 0 : 1;
      this.colour = this.pythonClass.pythonModule.library.libraries.convertColour(
        "ast_Call", this.colour, this.fullName
      );

      if (this.constructor === PythonMethod) {
        this.custom = _resolveFunction(custom, this.fullName);
        this.createAliases();
      }
    }
  }

  toPythonSource() {
    if (this.staticmethod || this.classmethod) {
      return (
          this.pythonClass.fullName + "." +
          this.name +
          "(" +
          this.parameters.toPythonSource() +
          ")"
      );
    }
    return (
        __BLANK +
        "." +
        this.name +
        "(" +
        this.parameters.toPythonSource() +
        ")"
    );
  }

  toToolboxBlock(textToBlocks) {
      let originalVariables = textToBlocks.variables
      let blockElement
      try {
        textToBlocks.variables = new TypesRegistry()
        textToBlocks.variables.add(this.pythonClass.fullName, __BLANK)
        blockElement = super.toToolboxBlock(textToBlocks);
      } finally {
        textToBlocks.variables = originalVariables
      }

      return blockElement
    }
}

class PythonConstructorMethod extends PythonMethod {
  static isA(signature) {
    return /^__init__\(\s*self\s*[,)]\s*/.test(signature);
  }

  constructor(pythonClass, signature, comment, colour, custom) {
    super(pythonClass, signature, comment, colour, custom);
    this.typeHint = new PythonTypeHint(pythonClass.pythonModule.library.libraries, pythonClass.fullName);

    if ((comment ?? "").trim() === "") {
      this.label = pythonClass?.name
      this.message = "";
    }
  }

  toPythonSource() {
    return (
      this.pythonClass.fullName +
      "(" +
      this.parameters.toPythonSource() +
      ")"
    );
  }
}

class Library {
  constructor(name, libraryConfiguration, libraries) {
    this.name = name;
    this.libraries = libraries;
    this.modules = new Map();
    this.colour = libraries.defaultColor
    this.toolbox = null;
    let classes = [];

    for (let classOrModuleDef in libraryConfiguration) {
      const [name, comment] = classOrModuleDef.split("//", 2);

      if (name.startsWith("__")) {
        // Library metadata
        if (name === "__colour" || name === "__color") {
          this.colour = libraries.convertColour(
            "library", _resolve_colour(libraryConfiguration[name]), name
          );
        } else if (name === "__toolbox") {
          this.toolbox = libraryConfiguration[name];
        }
      } else if (PythonClass.isA(name)) {
        classes.push(classOrModuleDef);
      } else {
        let members = libraryConfiguration[classOrModuleDef]

        if (members.some(member => PythonConstructorMethod.isA(member))) {
          classes.push(classOrModuleDef);
        } else {
          let module = new PythonModule(
              this,
              name,
              comment,
              members,
          )
          this.modules.set(module.fullName, module);
        }
      }
    }

    for (let classDef of classes) {
      const [signature, comment] = classDef.split("//", 2);
      let moduleName = PythonModule.extractName(signature) ?? "";
      let pythonModule = this.modules.get(moduleName);

      if (!pythonModule) {
        pythonModule = new PythonModule(this, moduleName);
        this.modules.set(moduleName, pythonModule);
      }

      let pythonClass = new PythonClass(
        pythonModule,
        signature,
        comment,
        libraryConfiguration[classDef],
      );
      pythonModule.members.set(pythonClass.name, pythonClass);
    }
  }

  _shouldShowToolbox(imports) {
    if (this.toolbox === false || this.toolbox === true) {
      return this.toolbox;
    }

    if (imports) {
      for (const importedType of imports.types()) {
        for (const module of this.modules.values()) {
          if (module.resolve(importedType) !== null) {
            return true;
          }
        }
      }

      return false;
    }

    return true;
  }

  toToolbox(textToBlocks) {
    if (!this._shouldShowToolbox(textToBlocks.imports)) {
      return "";
    }

    let categoryXml = `<category name="${this.name}">`; // TODO color

    for (const module of this.modules.values()) {
      categoryXml += module.toToolbox(textToBlocks);
    }

    categoryXml += "</category>";
    return categoryXml;
  }

  registerImports(typeRegistry) {
    for (const module of this.modules.values()) {
      if (module.fullName === "") {
        continue
      }

      module.registerImports(typeRegistry)
    }
  }

  translate(identifier, defaultValue) {
    return this.libraries.translate(identifier, defaultValue, this.name.split(" ", 1)[0]);
  }
}

class Libraries extends Map {
  constructor(librariesConfiguration, translate, convertColour) {
    super()
    this.translate_from_config = translate ?? ((identifier, defaultValue) => defaultValue)
    this.convertColour = convertColour ?? ((type, defaultValue, fromLibrary) => defaultValue)
    this.defaultColor = this.convertColour(
      "libraries", _resolve_colour("FUNCTIONS")
    );
    for (let name in librariesConfiguration) {
      this.set(name, new Library(name, librariesConfiguration[name], this))
    }
  }

  findModulesByName(moduleName) {
    return  Array.from(this.values())
      .map((library) => library.modules.get(moduleName))
      .filter((module) => module);
  }

  toToolbox(textToBlocks) {
    let result = "";
    for (const library of this.values()) {
      result += library.toToolbox(textToBlocks);
    }
    return result;
  }

  resolve(fullName) {
    let moduleName = PythonModule.extractName(fullName);
    let foundModules = this.findModulesByName(moduleName);

    if (!foundModules.length && moduleName.includes('.')) {
      // Last part may be an attribute
      foundModules = this.findModulesByName(moduleName.substring(0, moduleName.lastIndexOf('.')));
    }

    if (!foundModules.length) {
      // Might not contain a module name, check the built-ins
      foundModules = this.findModulesByName('');
    }

    for (let foundModule of foundModules) {
      let found = foundModule.resolve(fullName);

      if (found) {
        return found;
      }
    }

    return null;
  }

  registerImports(typeRegistry) {
    for (const library of this.values()) {
      library.registerImports(typeRegistry)
    }
  }

  translate(identifier, defaultValue, namespace) {
    return this.translate_from_config(identifier, defaultValue || " ", namespace).trim();
  }
}

function unquote(value) {
    if (value.length >= 2) {
        let firstChar = value.charAt(0);
        let lastChar = value.charAt(value.length - 1)
        if (firstChar === "'" && lastChar === "'" || firstChar === '"' && lastChar === '"') {
            return value.slice(1, -1)
        }
    }
    return value
}

function fieldFactoryForLiteral(typeHint) {
    return function (block, fieldName) {
        return new Blockly.FieldDropdown(
            () => {
                let result = typeHint.flattened().typeParams.map(
                    typeParam => {
                        let unquotedTypeParam = unquote(typeParam)
                        return [unquotedTypeParam, unquotedTypeParam]
                    }
                )

                let currentValue = block.getFieldValue(fieldName)

                if (!result.some(item => item[1] === currentValue)) {
                    result.unshift([currentValue, currentValue]);
                }

                return result
            }
        )
    };
}

function updateBlockFieldFactory(block, pythonTypeNames, render) {
    let fieldFactoryBefore = block.fieldFactory_;
    block.fieldFactory_ = "";

    if (block.parentBlock_ !== null && block.parentBlock_.fromLibrary_ !== "") {
        let argInput = block.parentBlock_.inputWithBlock = block.parentBlock_.getInputWithBlock(block)

        if (argInput) {
            let argName = argInput.name

            if (argName.startsWith("ARG")) {
                let argIndex = Number(argName.substring(3));
                let argumentInfo = block.parentBlock_.argumentInfo[argIndex];
                let [fullFunctionName, parameterKeyword] = argumentInfo.split(" ", 2)
                let pythonFunction = block.workspace.libraries.resolve(fullFunctionName);

                if (pythonFunction instanceof PythonFunction) {
                    let parameter

                    if (parameterKeyword) {
                        parameter = pythonFunction.parameters.findByKeyword(parameterKeyword);
                    } else {
                        parameter = pythonFunction.parameters[argIndex + pythonFunction.argumentOffset];
                    }

                    let typeHint = parameter?.typeHint

                    if (typeHint) {
                        let typeAliases = typeHint.referencedTypeAliases()

                        for (let typeAlias of typeAliases) {
                            if (pythonTypeNames.some(pythonTypeName => typeAlias.matches(pythonTypeName))) {
                                block.fieldFactory_ = typeAlias.fieldFactory;
                                break
                            }
                        }

                        // TODO case with Literal[...] | None
                        if (block.fieldFactory_ === "" && typeHint.flattened().isLiteral()) {
                            block.fieldFactory_ = fieldFactoryForLiteral(typeHint);
                        }
                    }
                }
            }
        }
    }

    if (block.fieldFactory_ !== fieldFactoryBefore) {
        block.updateShape_()

        if (render) {
            block.render();
        }
    }
}

function initBlockFieldFactory(block, pythonTypeNames) {
    block.onchange = function(changeEvent) {
        if (changeEvent instanceof Blockly.Events.BlockMove) {
            updateBlockFieldFactory(block, pythonTypeNames, false);
        }
    }
    setTimeout(() => { updateBlockFieldFactory(block, pythonTypeNames, true) });
}

if (typeof module !== 'undefined') {
  module.exports = {
      Libraries,
      Library,
      PythonAttribute,
      PythonClass,
      PythonConstructorMethod,
      PythonFunction,
      PythonMethod,
      PythonModule,
      PythonParameter,
      PythonParameters,
      PythonTypeHint,
      PythonTypeAliasType
  };
}
