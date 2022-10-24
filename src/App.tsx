import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]); // Todo型の配列を持つように指定した

  // 型
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const returnDeepCopy = () => todos.map((todo) => ({ ...todo }));
  const handleEdit = (id: number, inputValue: string) => {
    /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
    const deepCopy = returnDeepCopy()

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    console.log(newTodos);

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const deepCopy = returnDeepCopy()

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    console.log(newTodos);

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const deepCopy = returnDeepCopy()

    // 該当するものを取り除く
    const newTodos = deepCopy.filter((todo:Todo) => todo.id !== id);
    console.log(newTodos);

    setTodos(newTodos);
  }

  // useEffect(()=>{ console.log(todos);
  //  },todos)

  return (
    <div className="App">
      <div>
        <h2>To Do List with TypeScript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
            value={inputValue}
            ref={inputRef}
          />
          <input type="submit" value="追加" className="submitButton" />
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                ref={inputRef}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={() => handleChecked(todo.id, todo.checked)}
                className="inputText"
                checked={todo.checked}
                ref={inputRef}
              />
              <input type="button" onClick={()=>handleDelete(todo.id)} value="消" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
