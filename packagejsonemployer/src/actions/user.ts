import { AppState } from "./../store/configureStore";
import { UserActions } from "./../types/UserActions";
import { Dispatch } from "redux";

export const getUser = (token: string) => {
  return (dispatch: Dispatch<UserActions>, getState: () => AppState) => {
    // dispatch();
  };
};
