import { AppState } from "./../store/configureStore";
import {
  AppActions,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../types/AppActions";
import { Dispatch } from "redux";

export const getUser = (token: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(getUserStart());
    console.log("token", token);

    const results = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: "token " + token,
      },
    });
    if (results.status !== 200) {
      console.log("theres an error");
      dispatch(getUserFailure());
    } else {
      const data = await results.json();
      console.log(data);
      dispatch(getUserSuccess(data.login, data.avatar_url));
    }
    // dispatch({type: GET_USER_START);
  };
};
export const getUserFailure = (): AppActions => ({
  type: GET_USER_FAILURE,
});
export const getUserStart = (): AppActions => ({
  type: GET_USER_START,
});
export const getUserSuccess = (
  userName: string,
  userPic: string
): AppActions => ({
  type: GET_USER_SUCCESS,
  name: userName,
  profilePic: userPic,
});
