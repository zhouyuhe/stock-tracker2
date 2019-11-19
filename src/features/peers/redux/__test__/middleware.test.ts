import { PeersDependencies, topPeersMiddleware } from "../middleware";
import { Store, Dispatch } from "redux";
import { AppState, BOOTSTRAP } from "store";
import { updateTopPeersAction, PeersData } from "../actions";
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
    const payload = [{ symbol: "AAPL", name: "APPLE" }];
    topPeersMiddleware(mockSocket)(store)(next)(action);

    expect(on).toHaveBeenCalledWith(topPeers, expect.anything());
  });

  test.only("can we test on emitting event", () => {
    let theName = undefined;
    let on = (name: string, callback: (payload: any) => void) => {
      console.log("Test");
      theName = name;
    };
    const topPeers = "topPeers";
    const payload = [{ symbol: "AAPL", name: "APPLE" }];
    topPeersMiddleware(mockSocket)(store)(next)(action);
    console.log("Hello");
    expect(theName).toBe(topPeers);
  });
});
