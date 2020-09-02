import { graphData } from "./../types/DataObject";
import { DataActionTypes } from "../types/AppActions";
import { dataObject } from "../types/DataObject";

const initialDataState: {
  data?: dataObject[];
  isLoading: boolean;
  gridData?: graphData[];
} = {
  isLoading: false,
};

const dataReducer = (
  state = initialDataState,
  action: DataActionTypes
): { data?: dataObject[]; isLoading: boolean; gridData?: graphData[] } => {
  switch (action.type) {
    case "POST_DATA_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "POST_DATA_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        data: action.allData,
        gridData: action.gridData,
      };
    }
    case "POST_DATA_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
export { dataReducer };
