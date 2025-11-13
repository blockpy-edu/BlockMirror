Blockly.Blocks['ast_Subscript'] = {
    init: function () {
        this.setInputsInline(true);
        this.setOutput(true);
        this.setColour(this.convertColour(this.type, BlockMirrorTextToBlocks.COLOR.SEQUENCES));
        this.sliceKinds_ = ["I"];

        this.appendValueInput("VALUE")
            .setCheck(null);
        this.appendDummyInput('OPEN_BRACKET')
            .appendField("[",);
        this.appendDummyInput('CLOSE_BRACKET')
            .appendField("]",);
        this.updateShape_();
    },
    setExistence: function (label, exist, isDummy) {
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
    createSlice_: function (i, kind) {
        // ,
        let input = this.setExistence('COMMA' + i, i !== 0, true);
        if (input) {
            input.appendField(",")
        }
        // Single index
        let isIndex = (kind.charAt(0) === 'I');
        input = this.setExistence('INDEX' + i, isIndex, false);
        // First index
        input = this.setExistence('SLICELOWER' + i, !isIndex && "1" === kind.charAt(1), false);
        // First colon
        input = this.setExistence('SLICECOLON' + i, !isIndex , true);
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
    updateShape_: function () {
        // Add new inputs.
        for (var i = 0; i < this.sliceKinds_.length; i++) {
            this.createSlice_(i, this.sliceKinds_[i]);
        }

        for (let j = 0; j < i; j++) {
            if (j !== 0) {
                this.moveInputBefore('COMMA' + j, 'CLOSE_BRACKET');
            }
            let kind = this.sliceKinds_[j];
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
            this.removeInput('COMMA'+i, true);
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
    mutationToDom: function () {
        let container = document.createElement('mutation');
        for (let i = 0; i < this.sliceKinds_.length; i++) {
            let parameter = document.createElement('arg');
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
    domToMutation: function (xmlElement) {
        this.sliceKinds_ = [];
        for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                this.sliceKinds_.push(childNode.getAttribute('name'));
            }
        }
        this.updateShape_();
    },
};

python.pythonGenerator.forBlock['ast_Subscript'] = function(block, generator) {
    // Create a list with any number of elements of any type.
    let value = python.pythonGenerator.valueToCode(block, 'VALUE',
        python.Order.MEMBER) || python.pythonGenerator.blank;
    var slices = new Array(block.sliceKinds_.length);
    for (let i = 0; i < block.sliceKinds_.length; i++) {
        let kind = block.sliceKinds_[i];
        if (kind.charAt(0) === 'I') {
            slices[i] = python.pythonGenerator.valueToCode(block, 'INDEX' + i,
                python.Order.MEMBER) || python.pythonGenerator.blank;
        } else {
            slices[i] = "";
            if (kind.charAt(1) === '1') {
                slices[i] += python.pythonGenerator.valueToCode(block, 'SLICELOWER' + i,
                    python.Order.MEMBER) || python.pythonGenerator.blank;
            }
            slices[i] += ":";
            if (kind.charAt(2) === '1') {
                slices[i] += python.pythonGenerator.valueToCode(block, 'SLICEUPPER' + i,
                    python.Order.MEMBER) || python.pythonGenerator.blank;
            }
            if (kind.charAt(3) === '1') {
                slices[i] += ":" + python.pythonGenerator.valueToCode(block, 'SLICESTEP' + i,
                    python.Order.MEMBER) || python.pythonGenerator.blank;
            }
        }
    }
    var code = value + '[' + slices.join(', ') + "]";
    return [code, python.Order.MEMBER];
};

var isWeirdSliceCase = function(slice) {
    return (slice.lower == null && slice.upper == null &&
        slice.step !== null && slice.step._astname === 'NameConstant' &&
        slice.step.value === Sk.builtin.none.none$);
}

BlockMirrorTextToBlocks.prototype.addSliceDim = function (slice, i, values, mutations, node) {
    let sliceKind = slice._astname;
    if (sliceKind === "Index") {
        values['INDEX' + i] = this.convert(slice.value, node);
        mutations.push("I");
    } else if (sliceKind === "Slice") {
        let L = "0", U = "0", S = "0";
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
}

BlockMirrorTextToBlocks.prototype['ast_Subscript'] = function (node, parent) {
    let value = node.value;
    let slice = node.slice;
    let ctx = node.ctx;

    let values = {'VALUE': this.convert(value, node)};
    let mutations = [];

    let sliceKind = slice._astname;
    if (sliceKind === "ExtSlice") {
        for (let i = 0; i < slice.dims.length; i += 1) {
            let dim = slice.dims[i];
            this.addSliceDim(dim, i, values, mutations, node);
        }
    } else {
        this.addSliceDim(slice, 0, values, mutations, node);
    }
    return BlockMirrorTextToBlocks.create_block("ast_Subscript", node.lineno, {},
        values, {"inline": "true"}, {"arg": mutations});
};