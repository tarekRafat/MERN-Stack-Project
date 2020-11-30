import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Todo = ({ item }) => (
  <>
    <td scope="col" className={item.todo_completed ? "completed" : ""}>
      {item.todo_description}
    </td>
    <td scope="col" className={item.todo_completed ? "completed" : ""}>
      {item.todo_responsible}
    </td>
    <td scope="col" className={item.todo_completed ? "completed" : ""}>
      {item.todo_priority}
    </td>
    <td>
      <Link
        to={`/edit/${item._id}`}
        className="btn btn-outline-primary"
        scope="col"
      >
        edit
      </Link>
    </td>
    <td>
      <Link
        to={`/delete/${item._id}`}
        className="btn btn-outline-danger"
        scope="col"
      >
        delete
      </Link>
    </td>
  </>
);
function TodosList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:5050/todos")
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Description</th>
              <th>Responisble</th>
              <th>Priority</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <Todo item={item} />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default TodosList;
