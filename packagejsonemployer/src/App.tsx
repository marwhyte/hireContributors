import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Marketing from "./screens/Marketing";
import { store } from "./store/configureStore";
import Jsonupload from "./screens/Jsonupload";
import Home from "./screens/Home";
import EmailTemplate from "./screens/EmailTemplate";
import SingleView from "./screens/SingleView";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route path="/try-it" component={Jsonupload} />
            <Route path="/home" component={Home} />
            <Route path="/email-template" component={EmailTemplate} />
            <Route path="/find-canidates" component={SingleView} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
