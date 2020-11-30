import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TodosList from "./components/TodosList";
import EditTodo from "./components/EditTodo";
import CreateTodo from "./components/CreateTodo";
import DeleteTodo from "./components/DeleteTodo";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  MEARN Stack App
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create TodosList
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Route path="/" component={TodosList} exact />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/delete/:id" component={DeleteTodo} />
      </div>
    </Router>
  );
}

export default App;
