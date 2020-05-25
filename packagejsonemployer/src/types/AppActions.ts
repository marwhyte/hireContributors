import { dataObject, graphData } from "./DataObject";
//User Types
export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export interface GetUserStartAction {
  type: typeof GET_USER_START;
}
export interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  name: string;
  profilePic: string;
}
export interface GetUserFailureAction {
  type: typeof GET_USER_FAILURE;
}

export type UserActionTypes =
  | GetUserStartAction
  | GetUserSuccessAction
  | GetUserFailureAction;

//Data Types
export const POST_DATA_START = "POST_DATA_START";
export const POST_DATA_SUCCESS = "POST_DATA_SUCCESS";
export const POST_DATA_FAILURE = "POST_DATA_FAILURE";

export interface CreateDataStartAction {
  type: typeof POST_DATA_START;
}

export interface CreateDataSuccessAction {
  type: typeof POST_DATA_SUCCESS;
  allData: dataObject[];
  gridData: graphData[];
}

export interface CreateDataFailureAction {
  type: typeof POST_DATA_FAILURE;
}

export type DataActionTypes =
  | CreateDataStartAction
  | CreateDataSuccessAction
  | CreateDataFailureAction;

//All Actions
export type AppActions = UserActionTypes | DataActionTypes;

//Add more Action types! with |
