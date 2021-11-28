import React ,{useContext} from "react";
import Home from "./pages/home/Home";
import {AuthContext} from "./authContext/AuthContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
const App = () => {
  const {user} =useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
          {/* <Register /> */}
        </Route>
        <Route path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
          {/* <Login /> */}
        </Route>

        {user && (
          <>
            <Route path="/movie">
              <Home type="movie" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
