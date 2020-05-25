import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { userReducer } from "../reducers/user";
import { AppActions } from "../types/AppActions";
import { dataReducer } from "../reducers/data";

export const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
