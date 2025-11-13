class TypeRegistry {
  constructor() {
    this._name_to_type = new Map();
    this._type_to_name = new Map();
  }

  get size() {
    return this._name_to_type.size;
  }

  set(type, name) {
    this._name_to_type.set(name, type);
    this._type_to_name.set(type, name);
  }

  getType(name) {
    return this._name_to_type.get(name);
  }

  getName(type) {
    return this._type_to_name.get(type);
  }

  clear() {
    this._name_to_type.clear();
    this._type_to_name.clear();
  }

  deleteName(name) {
    let type = this._name_to_type.get(name);
    this._name_to_type.delete(name);
    this._type_to_name.delete(type);
  }

  deleteType(type) {
    let name = this._type_to_name.get(type);
    this._name_to_type.delete(name);
    this._type_to_name.delete(type);
  }

  entries() {
    return this._name_to_type.entries();
  }

  hasName(name) {
    return this._name_to_type.has(name);
  }

  hasType(type) {
    return this._type_to_name.has(type);
  }

  names() {
    return this._name_to_type.keys();
  }

  types() {
    return this._type_to_name.keys();
  }
}

// A type may be used by multiple names.
// A name may have multiple types, as Python is not typed.
class TypesRegistry {
  constructor() {
    this._name_to_types = new Map();
    this._type_to_names = new Map();
  }

  get size() {
    return this._name_to_types.size;
  }

  add(type, name) {
    let types = this._name_to_types.get(name) || []
    let names = this._type_to_names.get(name) || []
    if (!names.includes(name)) {
      names.push(name);
    }
    if (!types.includes(type)) {
      types.push(type);
    }
    this._name_to_types.set(name, types);
    this._type_to_names.set(type, names);
  }

  getTypes(name) {
    return this._name_to_types.get(name);
  }

  getSingleType(name) {
    let types = this.getTypes(name)
    return types && types.length === 1 ? types[0] : null
  }

  getNames(type) {
    return this._type_to_names.get(type);
  }

  clear() {
    this._name_to_types.clear();
    this._type_to_names.clear();
  }

  deleteName(name) {
    let types = this._name_to_types.get(name);
    this._name_to_types.delete(name);

    if (types !== undefined) {
      for (let type of types) {
        this._type_to_names.delete(type);
      }
    }
  }

  deleteType(type) {
    let names = this._type_to_names.get(type);
    this._type_to_names.delete(type);

    if (names !== undefined) {
      for (let name of names) {
        this._name_to_types.delete(name);
      }
    }
  }

  entries() {
    return this._name_to_types.entries();
  }

  hasName(name) {
    return this._name_to_types.has(name);
  }

  hasType(type) {
    return this._type_to_names.has(type);
  }

  names() {
    return this._name_to_types.keys();
  }

  types() {
    return this._type_to_names.keys();
  }
}
