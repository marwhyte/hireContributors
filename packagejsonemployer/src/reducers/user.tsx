import { User } from "../types/User";
import { UserActionTypes } from "../types/UserActions";

const userReducerInitialState: User = {
  authenticated: false,
};

const userReducer = (
  state = userReducerInitialState,
  action: UserActionTypes
): User => {
  switch (action.type) {
    case "GET_USER_START":
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};

export { userReducer };
