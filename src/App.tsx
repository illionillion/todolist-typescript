import {
  Button,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Delete as DeleteIcon } from "@mui/icons-material";

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
    const deepCopy = returnDeepCopy();

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
    const deepCopy = returnDeepCopy();

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
    const deepCopy = returnDeepCopy();

    // 該当するものを取り除く
    const newTodos = deepCopy.filter((todo: Todo) => todo.id !== id);
    console.log(newTodos);

    setTodos(newTodos);
  };

  // useEffect(()=>{ console.log(todos);
  //  },todos)

  return (
    <div className="App">
      <div>
        <Typography variant="h3" style={{margin:"20px"}}>To Do List with TypeScript</Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
            value={inputValue}
            ref={inputRef}
          /> */}
          <TextField 
            id="filled-basic"
            label="Input To Do"
            variant="outlined"
            onChange={handleChange}
            className="inputText"
            value={inputValue}
            />
          {/* <input type="submit" value="追加" className="submitButton" /> */}
          <Button variant="contained" type="submit" className="submitButton" style={{margin:"10px"}}>追加</Button>
        </form>
        {/* <ul>
        <ListItemButton>
          <ListItemText primary="Spam" />
        </ListItemButton>
        </ul> */}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {/* <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                ref={inputRef}
                disabled={todo.checked}
              /> */}
              <TextField
                id="standard-basic"
                label="To Do"
                variant="standard" 
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                ref={inputRef}
                disabled={todo.checked}
                />
              {/* <input
                type="checkbox"
                onChange={() => handleChecked(todo.id, todo.checked)}
                className="inputText"
                checked={todo.checked}
                ref={inputRef}
              /> */}
              <Checkbox 
                onChange={() => handleChecked(todo.id, todo.checked)}
                className="inputText"
                checked={todo.checked}
                size="small" />
              {/* <input
                type="button"
                onClick={() => handleDelete(todo.id)}
                value="消"
              /> */}
              <Button variant="outlined" onClick={ () => handleDelete(todo.id)}><DeleteIcon /></Button>
            </li>
          ))}
        </ul>
        {/* <ListItem sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton  edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={e=>{}} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </ListItem> */}
      </div>
    </div>
  );
}

export default App;
