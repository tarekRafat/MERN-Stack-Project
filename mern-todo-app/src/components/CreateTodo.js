import React, { useState } from "react";
import axios from "axios";
function EditTodo() {
  const [state, setState] = useState({
    todo_description: "",
    todo_responsible: "",
    todo_priority: "",
    todo_completed: false,
  });
  const onChangeTodo = e => {
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log(state);
    console.log(`Description: ${state.todo_description}`);
    console.log(`responsible: ${state.todo_responsible}`);
    console.log(`priority: ${state.todo_priority}`);
    console.log(`isCompleted: ${state.todo_completed}`);
    axios
      .post("http://localhost:5050/todos/add", {
        todo_description: state.todo_description,
        todo_responsible: state.todo_responsible,
        todo_priority: state.todo_priority,
        todo_completed: state.todo_completed,
      })
      .then(res => console.log(res.data));
    setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="des">Description</label>
          <input
            type="text"
            name="todo_description"
            id="des"
            value={state.todo_description}
            onChange={onChangeTodo}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="res">Responsible</label>
          <input
            type="text"
            name="todo_responsible"
            id="res"
            value={state.todo_responsible}
            onChange={onChangeTodo}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="todo_priority"
              value="Medium"
              checked={state.todo_priority === "Medium"}
              onChange={onChangeTodo}
            />
            <label className="form-check-label">Medium</label>
          </div>
        </div>

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="todo_priority"
              value="High"
              checked={state.todo_priority === "High"}
              onChange={onChangeTodo}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              name="todo_priority"
              value="Low"
              checked={state.todo_priority === "Low"}
              onChange={onChangeTodo}
            />
            <label className="form-check-label">Low</label>
          </div>
        </div>

        <button type="submit" onClick={onSubmit} className="btn btn-primary">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
