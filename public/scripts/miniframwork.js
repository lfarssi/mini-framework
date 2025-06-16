const MiniFramwork = (function () {
    let state = [];
    let stateIndex = 0;


    let effects = [];
    let cleanups = [];
    let effectIndex = 0;


    function ResetHook() {
        effectIndex = 0;
        stateIndex = 0;
    }

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
    function Jsx(tags,props,...children) {
        if(typeof tags =="function"){
            return {...props,children}
        }
        return {tags,props:props||{},children}
    };
    function CreateElement(node) {
        if (typeof node === 'string'|| typeof node === 'number') {
            return document.createTextNode(node);
        }
        const element = document.createElement(node.tags);
        for (const [key, value] of Object.entries(node.props)) {
            if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else if (key === 'className')  {
                element.className = value;
               
            }else if (key=="id"){
                element.id = value;
            } else {
                element.setAttribute(key, value);
            }
        }
        for (let child of node.children.flat()){
             if (typeof node === 'string'|| typeof node === 'number') {
                element.appendChild(document.createTextNode(string(child)));
            } else{
            element.appendChild(CreateElement(child));
            }
        }

        return element;
    };
    function Render() {

    };
    return { UseEffect, ResetHook, UseState, Jsx, CreateElement, Render }

})()
const { UseEffect, ResetHook, UseState, Jsx, CreateElement, Render } = MiniFramwork




















