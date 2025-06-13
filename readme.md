we will start working on it tomorrow

to do in this project :
| Feature                 | Status                           |
| ----------------------- | -------------------------------- |
| ❌ TodoMVC example       | making to do list with minifra  |
| ❌ JSX-style DOM         | styling the elemnts using our fr|
| ❌ State (`useState`)    | add usestate hooks              |
| ❌ Effects (`useEffect`) | adding useEffect hooks          |
| ❌ Routing               | 🔧 Add `useRoute()` or similar   |
| ❌ Custom Event System   | 🔧 Add `on()` / `emit()` pattern |
| ❌ Documentation         | 📝 Add `README.md`               |
| ⚠️ Smarter DOM updates  | 💡 Optional but ideal            |
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

