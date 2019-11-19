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
    on = jest.fn();
    emit = jest.fn();

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

  test("Should call On and next function", () => {
    topPeersMiddleware(mockSocket)(store)(next)({
      type: BOOTSTRAP
    });
    expect(on).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(getState).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test("with correct payload", () => {
    const topPeers = "topPeers";
    topPeersMiddleware(mockSocket)(store)(next)(action);
    expect(on).toHaveBeenCalledWith(topPeers, expect.anything());
  });

  test("can we test on emitting event", () => {
    const topPeers = "topPeers";
    const payload = [{ symbol: "AAPL", name: "APPLE" }];
    const updateAction = {
      payload: [{ name: "APPLE", symbol: "AAPL" }],
      type: "UPDATE_TOP_PEERS"
    };
    const newOn = jest.fn(
      (name: string, callback: (payload: PeersData[]) => any): any => {
        callback(payload);
      }
    );
    mockSocket = {
      socketService: {
        get: () => ({ on: newOn, emit })
      }
    };
    topPeersMiddleware(mockSocket)(store)(next)(action);
    expect(newOn).toHaveBeenCalledWith(topPeers, expect.anything());

    expect(dispatch).toHaveBeenCalledWith(updateAction);
  });
});
