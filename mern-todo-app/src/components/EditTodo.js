import React, { useState, useEffect } from "react";
import axios from "axios";

function EditTodo(props) {
  const onChangeTodo = e => {
    const name = e.target.name;
    setSource({
      ...source,
      [name]: e.target.value,
    });
  };
  const onChangeCompleted = () => {
    setSource({
      ...source,
      todo_completed: !source.todo_completed,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5050/todos/update/${props.match.params.id}`, {
        todo_description: source.todo_description,
        todo_responsible: source.todo_responsible,
        todo_priority: source.todo_priority,
        todo_completed: source.todo_completed,
      })
      .then(res => console.log(res.data));
    setSource({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    });
  };

  const [source, setSource] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5050/todos/" + props.match.params.id)
      .then(res => {
        setSource(res.data);
      });
  }, []);
  if (source === null) {
    return <span>Loading....</span>;
  } else {
    {
      return (
        <div className="container">
          <h3>Updating data</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="des">Description</label>
              <input
                type="text"
                name="todo_description"
                id="des"
                value={source.todo_description}
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
                value={source.todo_responsible}
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
                  checked={source.todo_priority === "Medium"}
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
                  checked={source.todo_priority === "High"}
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
                  checked={source.todo_priority === "Low"}
                  onChange={onChangeTodo}
                />
                <label className="form-check-label">Low</label>
              </div>
            </div>
            {/* completed  */}

            <div className="form-check ">
              <input
                type="checkbox"
                className="form-check-input"
                name="todo_completed"
                value={source.todo_completed}
                onChange={onChangeCompleted}
                checked={source.todo_completed}
              />
              <label className="form-check-label" htmlFor="todo_priority">
                Completed
              </label>
            </div>

            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-primary"
            >
              Update
            </button>
          </form>
        </div>
      );
    }
  }
}
export default EditTodo;
