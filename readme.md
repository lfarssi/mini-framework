we will start working on it tomorrow

to do in this project :
| Feature                 | Status                           |
| ----------------------- | -------------------------------- |
| ❌ TodoMVC example       | making to do list with minifra  |
| ❌ JSX-style DOM         | styling the elemnts using our fr|
| ✅ State (`useState`)    | add usestate hooks              |
| ✅ Effects (`useEffect`) | adding useEffect hooks          |
| ❌ Routing               | 🔧 Add `useRoute()` or similar   |
| ❌ Custom Event System   | 🔧 Add `on()` / `emit()` pattern |
| ❌ Documentation         | 📝 Add `README.md`               |
| ⚠️ Smarter DOM updates  | 💡 Optional but ideal            |
must add  hoock cleanup global function instead of each hook 
✅
❌


the structure of the framwork :

MINI-FRAMEWORK

 ┣ public
 ┃  ┣ resources
 ┃  ┃  ┗ styles
 ┃  ┃     ┗ index.css
 ┃  ┣ scripts
 ┃  ┃  ┣ app.js
 ┃  ┃  ┗ miniframwork.js
 ┃  ┗ index.html
 ┣ .gitignore
 ┣ readme.md
 ┗ server.js


 for now this is the struct of the framework the puplic consist of the scripts and resources 
 - scripts have the framwork script and the app is for the todolist 
 - resources for styles images 
 - ive deleted the server.js because its for the node to serve the frmawork not now !!!


### 📦 1. What is this code?

```js
const MiniFramwork = (function() {
    function UseEffect() { };
    function UseState() { };
    function Jsx() { };
    function CreateElement() { };
    function Render() { };

    return { UseEffect, UseState, Jsx, CreateElement, Render };
})();
```

This is a **self-invoking function expression (IIFE)** that:

1. **Defines a mini framework** (like a simple React).
2. **Encapsulates internal logic** in its own scope.
3. **Returns an object** that gives access to its public functions.

---

### 🧠 2. Why use `(function() { ... })()`?

This pattern is used to:

* **Encapsulate** private variables/functions (none here yet, but you can add them).
* **Avoid polluting the global scope**.
* **Return only the needed public API**.

So it’s like creating your own **module or class**.

---


Then this line:

```js
return { UseEffect, UseState, Jsx, CreateElement, Render };
```

returns them in an **object**, so you can access them later.

---

### 📦 4. Why assign it to `const MiniFramwork`?

Because now `MiniFramwork` holds the returned object:

```js
MiniFramwork = {
  UseEffect: function() { ... },
  UseState: function() { ... },
  Jsx: function() { ... },
  CreateElement: function() { ... },
  Render: function() { ... },
}
```

---

### 🔓 5. And this line:

```js
const { UseEffect, UseState, Jsx, CreateElement, Render } = MiniFramwork;
```

This is **destructuring**. It creates **individual variables** for each function so you can use them like:

```js
const [count, setCount] = UseState(0);
const app = Jsx('div', null, 'Hello');
Render();
```

Instead of writing:

```js
MiniFramwork.UseState();
MiniFramwork.Jsx();
```


| Part                           | Purpose                                     |
| ------------------------------ | ------------------------------------------- |
| `(function() { ... })()`       | Creates a private scope (like a module)     |
| `return { ... }`               | Exposes specific functions publicly         |
| `const MiniFramwork = ...`     | Stores the framework in a variable          |
| `const { ... } = MiniFramwork` | Makes it easy to use the functions directly |


### USEState 


### ✅ What This Function Tries to Do

This function mimics React’s `useState` behavior in a very simplified way:

1. **Keeps track of a "state slot"** using `stateIndex`.

   * Each `UseState` call gets a unique index (`currentIndex`).

2. **Checks if that state already exists** in the `state` array.

   * If it does, it returns the existing value.
   * If not, it tries to initialize it.

3. **`setState(newValue)` updates the state value** in the correct index and calls `Render()` to re-render the UI.

4. Finally, it returns the state value and the setter as a tuple: `[value, setValue]`.

---


### 🧠 Is It Like React's `useState`?

Yes, it **tries to do what React does**, in a simpler way:

| Feature            | React `useState`        | Your `UseState`       |
| ------------------ | ----------------------- | --------------------- |
| Persistent state   | ✅ Yes (via hook system) | ✅ Yes (via `state[]`) |
| Scoped state slot  | ✅ Yes (via call order)  | ✅ Yes (`stateIndex`)  |
| Triggers re-render | ✅ Yes                   | ✅ Yes (`Render()`)    |
| Memoization        | ✅ Yes                   | ❌ No                  |
| Batched updates    | ✅ Yes                   | ❌ No                  |

So yes — it’s **a working minimal version** of `useState`. Very useful for learning and even for small UI frameworks.

---

### 💬 My Honest Opinion

**Pros:**

* ✅ You understand the core idea of how `useState` works internally.
* ✅ It's clean and almost functional with a small fix.
* ✅ The `Render()` trigger is a smart idea for re-rendering.

**Needs Improvement:**

* ❌ Incorrect initialization line.
* ❌ No isolation per component — state is **global**, so more complex UIs will have bugs unless you design a scoped component system.
* ❌ No support for functional updates or lazy initial state.

---


### 🔧 `UseEffect(callback, dependencies)`

**Purpose:**
`UseEffect` lets you run side effects in your app (like data fetching, timers, DOM manipulation) **when certain data changes** — just like React’s `useEffect`.

---

### 📌 How It Works:

* Keeps track of all effects and their **dependencies**.
* Only runs `callback()` **when dependencies change**.
* Supports **cleanup functions** to remove or reset side effects before running the effect again.

---

### 🧠 Internal Behavior:

1. Compares current dependencies to the previous ones.
2. If dependencies have changed:

   * Runs the previous cleanup function (if provided).
   * Executes the new effect (`callback()`).
   * Stores the new cleanup (if the callback returns one).
3. Updates the internal list of dependencies for the next render.
4. `effectIndex` ensures each `UseEffect` call is tracked correctly and separately.

---

### 🧽 Cleanup Function:

You can return a function from the `callback` to **clean up** before re-running the effect or when the component "unmounts".

---

### ✅ Usage Example:

```js
UseEffect(() => {
    const interval = setInterval(() => {
        console.log("Running...");
    }, 1000);

    return () => {
        clearInterval(interval);
        console.log("Cleanup before re-run");
    };
}, [someState]);
```

---

### 🔁 Important:

Call `ResetEffectIndex()` **once before each render**, to reset the internal pointer (`effectIndex`), ensuring effects run in the right order.

---
