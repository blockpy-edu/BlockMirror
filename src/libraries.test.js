import {Libraries, PythonClass, PythonConstructorMethod, PythonParameters, PythonAttribute, PythonTypeHint} from './libraries.js';

test('constructor with default string tuple values', () => {
    let libraries = new Libraries({'pgzero':{"class pgzero.actor.Actor(pgzero.rect.ZRect)": [
            "__init__(self, image: str, pos: tuple(int, int), anchor: tuple(float | str, float | str) = ('center', 'center')): None",
    ]}})
    let actor = libraries.resolve('pgzero.actor.Actor')
    expect(actor).toBeInstanceOf(PythonClass);
    expect(actor.name).toBe('Actor');
    expect(actor.fullName).toBe('pgzero.actor.Actor');

    let actorInit = actor.members.get('__init__')
    expect(actorInit).toBeInstanceOf(PythonConstructorMethod);
    let actorInitParams = actorInit.parameters;
    expect(actorInitParams).toBeInstanceOf(PythonParameters);
    expect(actorInitParams.length).toBe(4);

    expect(actorInitParams[0].name).toBe('self');
    expect(actorInitParams[1].name).toBe('image');
    expect(actorInitParams[2].name).toBe('pos');
    expect(actorInitParams[3].name).toBe('anchor');

    expect(actorInitParams[0].typeHint).toBe(null);
    expect(actorInitParams[1].typeHint.toString()).toBe('str');
    expect(actorInitParams[2].typeHint.toString()).toBe('tuple(int, int)');
    expect(actorInitParams[3].typeHint.toString()).toBe('tuple(float | str, float | str)');
});

test('builtin class without package', () =>
{
    const libraries = new Libraries({
        'builtin math': {
            "class int(numbers.Integral)": [
                "__init__(self, value: int | str = 0, /, base: int = 10): None",
            ]
        }
    });

    let intClass = libraries.resolve('int')
    expect(intClass).toBeInstanceOf(PythonClass);
    expect(intClass.name).toBe('int');
    expect(intClass.fullName).toBe('int');
    let int_init = intClass.members.get('__init__')
    expect(int_init.name).toBe('__init__');
    expect(int_init.fullName).toBe('int.__init__');
});

test('class attribute', () =>
{
    let libraries = new Libraries({
        'lib': {
            "class pgzero.actor.Actor(pgzero.rect.ZRect)": [
                "size: tuple[float, float]",
            ]
        }
    });

    const actor = libraries.resolve('pgzero.actor.Actor')
    expect(actor).toBeInstanceOf(PythonClass);
    expect(actor.name).toBe('Actor');
    expect(actor.fullName).toBe('pgzero.actor.Actor');

    const actorSize = actor.members.get('size')
    expect(actorSize).toBeInstanceOf(PythonAttribute);
    const typeHint = actorSize.typeHint
    expect(typeHint).toBeInstanceOf(PythonTypeHint);
    expect(typeHint.value).toBe("tuple");
    expect(typeHint.typeParams).toStrictEqual(["float", "float"]);

});
