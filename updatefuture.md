const MiniFramework = (function () {
    let state = [];
    let stateIndex = 0;
    let currentComponent = null;

    function resetHooks() {
        stateIndex = 0;
    }

    function UseState(initialValue) {
        const componentKey = currentComponent || "global";
        state[componentKey] = state[componentKey] || [];
        const currentIndex = stateIndex;

        if (state[componentKey][currentIndex] === undefined) {
            // Lazy initialization
            state[componentKey][currentIndex] = 
                typeof initialValue === 'function' ? initialValue() : initialValue;
        }

        function setState(newValue) {
            const valueToSet =
                typeof newValue === 'function'
                    ? newValue(state[componentKey][currentIndex]) // functional update
                    : newValue;

            state[componentKey][currentIndex] = valueToSet;
            Render(); // Re-render the component tree
        }

        stateIndex++;
        return [state[componentKey][currentIndex], setState];
    }
})();
function Counter() {
    const [count, setCount] = MiniFramework.UseState(0);

    console.log("Count:", count);

    // simulate interaction
    setTimeout(() => {
        setCount(prev => prev + 1);
    }, 1000);
}

// Simulate render cycle
MiniFramework.Render("Counter");
Counter();
