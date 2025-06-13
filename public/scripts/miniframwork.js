const MiniFramwork = (function () {
    let state = [];
    let stateIndex = 0;
    function UseState(initialValue) {

        const currentIndex = stateIndex;

        if (state[currentIndex] === undefined) {
            state[currentIndex] = initialValue;
        }
        function setState(newValue) {
            state[currentIndex] = newValue
            Render()

        }
        stateIndex++;
        return [state[currentIndex], setState]
    };

    let effects = [];
    let cleanups = [];
    let effectIndex = 0;
    function ResetEffectIndex() {
        effectIndex = 0;
    }
    function UseEffect(callback, dependencies) {
        const oldDepend = effects[effectIndex]
        let changed = true
        if (oldDepend) {
            changed = dependencies.some((dep, i) => !Object.is(dep, oldDepend[i]));
        }
        if (changed) {
            if (typeof cleanups[currentIndex] === 'function') {
                cleanups[currentIndex]();
            }

            const cleanup = callback();
            if (typeof cleanup === 'function') {
                cleanups[currentIndex] = cleanup;
            }
        }
        effects[effectIndex] = dependencies
        effectIndex++
    }
    function Jsx() {

    };
    function CreateElement() {

    };
    function Render() {

    };
    return { UseEffect, ResetEffectIndex, UseState, Jsx, CreateElement, Render }

})()
const { UseEffect, ResetEffectIndex, UseState, Jsx, CreateElement, Render } = MiniFramwork




















