import { RESET } from "store/constants";
import { UPDATE_KEY_STATS } from "./constants";
import { Reducer } from "redux";
import { UpdateKeyStatsAction, KeyStatsData } from "./actions";
import { ResetAction } from "store/actions";

export type KeyStatsState = {
  selectedKeyStats: KeyStatsData | null;
};
const initialState: KeyStatsState = { selectedKeyStats: null };
export const keyStatsReducer: Reducer<
  KeyStatsState,
  UpdateKeyStatsAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_KEY_STATS:
      return {
        ...state,
        selectedKeyStats: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};
