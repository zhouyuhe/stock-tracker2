import { UPDATE_TOP_PEERS } from "../constants";
import { peerReducer, PeersState } from "../reducer";
import { UpdateTopPeersAction } from "../actions";

describe("with an UPDATE_TOP_PEERS action", () => {
  let newState: PeersState;

  beforeAll(() => {
    const initialState: PeersState = {
      selectedTopPeers: null
    };
    const action: UpdateTopPeersAction = {
      type: UPDATE_TOP_PEERS,
      payload: [{ name: "Peers", symbol: "a" }]
    };
    newState = peerReducer(initialState, action);
  });

  it('it updates top peers to "Peers"', () => {
    expect(newState.selectedTopPeers).toEqual([{ name: "Peers", symbol: "a" }]);
  });
});
