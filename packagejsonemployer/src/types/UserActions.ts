export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export interface GetUserStartAction {
  type: typeof GET_USER_START;
  token: string;
}
export interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
}
export interface GetUserFailureAction {
  type: typeof GET_USER_FAILURE;
}

export type UserActionTypes =
  | GetUserStartAction
  | GetUserSuccessAction
  | GetUserFailureAction;

export type UserActions = UserActionTypes;

//Add more types! with |
