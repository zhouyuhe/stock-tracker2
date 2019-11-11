import { RESET } from "store/constants";
import { UPDATE_LATEST_NEWS } from "./constants";
import { LatestNewsData, UpdateLatestNewsAction } from "./actions";
import { Reducer } from "redux";
import { ResetAction } from "store/actions";

export type LatestNewsState = {
  selectedLatestNews: LatestNewsData[] | null;
};

const initialState = { selectedLatestNews: null };
export const latestNewsReducer: Reducer<
  LatestNewsState,
  UpdateLatestNewsAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LATEST_NEWS:
      return {
        ...state,
        selectedLatestNews: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};
