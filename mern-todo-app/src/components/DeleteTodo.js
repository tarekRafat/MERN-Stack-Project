import React, { useEffect, useState } from "react";
import axios from "axios";
function DeleteTodo(props) {
  const [source, setSource] = useState(null);
  useEffect(() => {
    axios
      .delete(`http://localhost:5050/todos/delete/${props.match.params.id}`)
      .then(res => {
        console.log(res);
        setSource(res);
      });
  }, []);

  if (source === null) {
    return <span>Loading....</span>;
  } else {
    return (
      <p>{`item with responsible name of ${source.data.todo_responsible} has been deleted`}</p>
    );
  }
}

export default DeleteTodo;
