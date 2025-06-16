function Counter({ start }) {
  const [count, setCount] = UseState(start);

  UseEffect(() => {
    console.log('Count has changed:', count);
  }, [count]);

  return Jsx(
    'div',
    null,
    Jsx('p', null, `Count: ${count}`),
    Jsx('button', { onclick: () => setCount(count + 1) }, 'Increment')
  );
}

function App() {
  const [text, setText] = UseState('Hello');

  return Jsx(
    'div',
    null,
    Jsx('h1', null, 'SimpleReact'),
    Jsx(Counter, { start: 0 }),
    Jsx('button', { onclick: () => setText('Hello, SimpleReact!') }, 'Update Text'),
    Jsx('p', null, text),
  );
}
Render()