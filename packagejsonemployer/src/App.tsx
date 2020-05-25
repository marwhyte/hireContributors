import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Marketing from "./screens/Marketing";
import { store } from "./store/configureStore";
import Jsonupload from "./screens/Jsonupload";
import Login from "./screens/Login";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route path="/try-it" component={Jsonupload} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

// import { ThunkResult } from "../store";

// export enum UserTypes {
//   GET_USER_START = "GET_USER_START",
//   GET_USER_SUCCESS = "GET_USER_SUCCESS",
//   GET_USER_FAILURE = "GET_USER_FAILURE",
// }

// export interface GetUserStartAction {
//   type: UserTypes.GET_USER_START;
// }
// export interface GetUserSuccessAction {
//   type: UserTypes.GET_USER_SUCCESS;
// }
// export interface GetUserFailureAction {
//   type: UserTypes.GET_USER_FAILURE;
// }

// export type UserActionTypes =
//   | GetUserStartAction
//   | GetUserSuccessAction
//   | GetUserFailureAction;

// export const getUser = (accessToken: string): ThunkResult<void> => async (
//   dispatch
// ) => {
//   console.log("HIIIII");
//   dispatch({
//     type: UserTypes.GET_USER_START,
//   });
//   try {
//     const results = await fetch("https://api.github.com/user", {
//       headers: {
//         Authorization: "token " + accessToken,
//       },
//     });
//     dispatch({
//       type: UserTypes.GET_USER_SUCCESS,
//     });
//     console.log(results);
//   } catch (err) {
//     dispatch({
//       type: UserTypes.GET_USER_FAILURE,
//     });
//   }
// };
