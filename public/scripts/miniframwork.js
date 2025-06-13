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
    function UseEffect() {

    };
    function Jsx() {

    };
    function CreateElement() {

    };
    function Render() {

    };
    return { UseEffect, UseState, Jsx, CreateElement, Render }

})()
const { UseEffect, UseState, Jsx, CreateElement, Render } = MiniFramwork




















