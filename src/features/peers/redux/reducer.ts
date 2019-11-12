import { RESET } from "store/constants";
import { UPDATE_TOP_PEERS } from "./constants";
import { PeersData, UpdateTopPeersAction } from "./actions";
import { ResetAction } from "store/actions";
import { Reducer } from "redux";

export type PeersState = {
  selectedTopPeers: PeersData[] | null;
};
const initialState = { selectedTopPeers: null };
export const peerReducer: Reducer<
  Readonly<PeersState>,
  UpdateTopPeersAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOP_PEERS:
      return {
        ...state,
        selectedTopPeers: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};
