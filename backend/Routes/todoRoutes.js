const express = require("express");
const router = express.Router();
const Todo = require("../model/todoModel");

//Get All Data From Database
router.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
//Get Specific on with id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

//adding todos
router.post("/add", (req, res) => {
  let newTodo = new Todo(req.body);
  newTodo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch(err => {
      res.status(400).send("Adding new todo Failed");
    });
});

//updating todo

router.post("/update/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;
    todo
      .save()
      .then(todo => {
        res.send("Todo updated");
      })
      .catch(err => {
        res.status(400).send("update todo are failed");
      });
  });
});
router.delete("/delete/:id", (req, res) => {
  Todo.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log("error while deleting a todo");
    }
  );
});

module.exports = router;
