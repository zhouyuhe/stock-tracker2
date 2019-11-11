import { UPDATE_TOP_PEERS } from "./constants";
import { ActionWithPayload } from "store/actions";

export type PeersData = {
  symbol: string;
  name: string;
};
export type UpdateTopPeersAction = ActionWithPayload<
  typeof UPDATE_TOP_PEERS,
  PeersData[]
>;
export const updateTopPeersAction = (
  topPeers: PeersData[]
): UpdateTopPeersAction => ({
  type: UPDATE_TOP_PEERS,
  payload: topPeers
});
