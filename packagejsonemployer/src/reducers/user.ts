import { User } from "../types/User";
import { UserActionTypes } from "../types/AppActions";

const userReducerInitialState: User = {
  authenticated: false,
  loading: true,
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
        loading: true,
      };
    case "GET_USER_FAILURE":
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        authenticated: true,
        name: action.name,
        profilePicture: action.profilePic,
        loading: false,
      };
    default:
      return state;
  }
};

export { userReducer };
