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
    return BlockMirrorTextToBlocks.create_block("ast_Image", node.lineno, {}, {}, {},
        {"@src": Sk.ffi.remapToJs(node.args[0].s)});
};

// TODO handle turtle when not in standard mode
let turtle_angle_units = new Set()
let state_for_source = ""

function _reset_source_state(textToBlocks) {
    if (textToBlocks.filename === '__main__.py' && textToBlocks.source !== state_for_source) {
        turtle_angle_units.clear()
        state_for_source = textToBlocks.source
    }
}

BlockMirrorTextToBlocks['turtleDegrees'] = function (node, parent, textToBlocks) {
    if (textToBlocks.filename === '___main__.py') {
        _reset_source_state(textToBlocks);

        if (node.args.length === 1 && node.args[0]._astname === "Num") {
            turtle_angle_units.add(Sk.ffi.remapToJs(node.args[0].n))
        } else {
            turtle_angle_units.add(360)
        }
    }
};

BlockMirrorTextToBlocks['turtleRadians'] = function (node, parent, textToBlocks) {
    if (textToBlocks.filename === '___main__.py') {
        _reset_source_state(textToBlocks);
        turtle_angle_units.add(2 * Math.PI)
    }
};

if (typeof registerFieldAngle === "function") {
    registerFieldAngle();

    function _turtleAngleField(block, clockwise, offset=90) {
        if (block.type === 'ast_Num' && turtle_angle_units.size <= 1) {
            if (turtle_angle_units.size === 0) {
                return new FieldAngle(0, null, {
                    offset: offset,
                    clockwise: clockwise,
                    precision: .5,
                })
            } else {
                let value = turtle_angle_units.values().next().value

                // TODO other values not currently supported, defaults to standard field
                if (value === 360) {
                    return new FieldAngle(0, null, {
                        offset: offset,
                        clockwise: clockwise,
                        precision: .5,
                    })
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
                    })
                }
            }
        }
    }
    BlockMirrorTextToBlocks['turtleAngleFieldLeft'] = function (block, _fieldName) {
        return _turtleAngleField(block, false)
    }
    BlockMirrorTextToBlocks['turtleAngleFieldRight'] = function (block, _fieldName) {
        return _turtleAngleField(block, true)
    }
    BlockMirrorTextToBlocks['turtleAngleFieldHeading'] = function (block, _fieldName) {
        return _turtleAngleField(block, false, 0)
    }
} else {
    BlockMirrorTextToBlocks['turtleAngleFieldLeft'] = function (_block, _fieldName) {}
    BlockMirrorTextToBlocks['turtleAngleFieldRight'] = function (_block, _fieldName) {}
    BlockMirrorTextToBlocks['turtleAngleFieldHeading'] = function (_block, _fieldName) {}
}

if (typeof FieldColourHsvSliders === "function") {
    BlockMirrorTextToBlocks['turtleColorField'] = function (block, _fieldName) {
        if (block.type === 'ast_Str') {
            return new FieldColourHsvSliders()
        }
    }
} else {
    BlockMirrorTextToBlocks['turtleColorField'] = function (_block, _fieldName) {}
}
