var Sk = {};

Sk.exportSymbol = (name, module) => {
    let parts = name.split(".");
    let submodule = Sk;
    let i;
    for (i = 1; i < parts.length-1; i++) {
        if (!(parts[i] in submodule)) {
            submodule[parts[i]] = {};
        }
    }
    submodule[parts[i]] = module;
};
Sk.configure = (options) => {};
Sk.builtin = {
    SyntaxError: function(message, filename, lineno, position) {
        this.message = message;
        this.filename = filename;
        this.lineno = lineno;
        this.position = position;
    },
    str: function(x) {
        if (x instanceof Sk.builtin.str) {
            return x;
        }
        if (!(this instanceof Sk.builtin.str)) {
            return new Sk.builtin.str(x);
        }
        this.v = x;
    },
    int_: function(n) {
        this.v = n;
    },
    float_: function(n) {
        this.v = n;
    },
    bool: {
        "true$": { v: true },
        "false$": { v: true },
    },
    none: { "none$": { v: null }}
};
Sk.builtin.int_.threshold$ = Infinity;
Sk.builtin.str.prototype.sq$concat = function(other) {
    return new Sk.builtin.str(this.v + other.v);
};
Sk.__future__ = {
    print_function: true,
    division: true,
    absolute_import: null,
    unicode_literals: true,
    // skulpt specific
    python3: true,
    set_repr: true,
    class_repr: true,
    inherit_from_object: true,
    super_args: true,
    octal_number_literal: true,
    bankers_rounding: true,
    python_version: true,
    dunder_next: true,
    dunder_round: true,
    list_clear: true,
    exceptions: true,
    no_long_type: true,
    ceil_floor_int: true,
    l_suffix: false,
    silent_octal_literal: false
};
Sk.asserts = {
    assert: (condition) => { if (!condition) { console.error(condition)}}
};
Sk.ffi = {
    remapToJs: (data) => {
        return data.v;
    }
};
