import { PeersDependencies, topPeersMiddleware } from "../middleware";
import { Store, Dispatch } from "redux";
import { AppState, BOOTSTRAP } from "store";
import { PeersData } from "../actions";
import { BootstrapAction } from "store/actions";

describe.only("Testing the Peers Middleware", () => {
  let mockSocket: PeersDependencies;
  let store: Pick<Store<Pick<AppState, "peerData">>, "dispatch" | "getState">;
  let next: Dispatch;
  let on: jest.Mock;
  let emit: jest.Mock;
  let action: BootstrapAction;
  let dispatch: jest.Mock;
  let getState: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
    emit = jest.fn();

    const payload = [{ symbol: "AAPL", name: "APPLE" }];
    on = jest.fn((name: string, callback: (payload: PeersData[]) => void) => {
      callback(payload);
    });
    mockSocket = {
      socketService: {
        get: () => ({ on, emit })
      }
    };
    store = {
      dispatch,
      getState
    };
    next = jest.fn();
    action = {
      type: BOOTSTRAP
    };
  });

  test("with correct payload", () => {
    const topPeers = "topPeers";
    const updateAction = {
      payload: [{ name: "APPLE", symbol: "AAPL" }],
      type: "UPDATE_TOP_PEERS"
    };
    topPeersMiddleware(mockSocket)(store)(next)(action);
    expect(next).toHaveBeenCalled();
    expect(on).toHaveBeenCalledWith(topPeers, expect.anything());
    expect(getState).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledWith(updateAction);
  });
});
