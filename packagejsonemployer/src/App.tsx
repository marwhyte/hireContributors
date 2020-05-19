import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Marketing from "./screens/Marketing";
import { store } from "./store/store";
import Jsonupload from "./screens/Jsonupload";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route path="/try-it" component={Jsonupload} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
