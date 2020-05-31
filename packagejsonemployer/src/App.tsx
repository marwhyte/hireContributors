import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Marketing from "./screens/Marketing";
import { store } from "./store/configureStore";
import Jsonupload from "./screens/Jsonupload";
import Login from "./screens/Login";
import Home from "./screens/Home";
import EmailTemplate from "./screens/EmailTemplate";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route path="/try-it" component={Jsonupload} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/email-template" component={EmailTemplate} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
