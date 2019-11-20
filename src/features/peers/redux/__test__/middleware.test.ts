import { topPeersMiddleware } from "../middleware";
import { BOOTSTRAP } from "store";
import { PeersData } from "../actions";

describe.only("Testing the Peers Middleware", () => {
  let mockSocket: any;
  let socketService: any;
  let store: any;
  let next: jest.Mock;

  beforeEach(() => {
    const payload = [{ symbol: "AAPL", name: "APPLE" }];
    mockSocket = {
      on: jest.fn((name: string, callback: (payload: PeersData[]) => void) => {
        callback(payload);
      })
    };
    socketService = {
      get: () => mockSocket
    };

    const peerState = { selectedTopPeers: [{ symbol: "AAPL", name: "APPLE" }] };

    store = {
      getState: jest.fn(() => peerState),
      dispatch: jest.fn()
    };

    next = jest.fn();
  });

  test.only("socket.on and dispatch been called", () => {
    const action = { type: BOOTSTRAP };
    const peerMiddleware = topPeersMiddleware({ socketService });
    const updateAction = {
      payload: [{ name: "APPLE", symbol: "AAPL" }],
      type: "UPDATE_TOP_PEERS"
    };
    peerMiddleware(store)(next)(action);
    expect(mockSocket.on).toHaveBeenCalledWith("topPeers", expect.anything());
    expect(store.dispatch).toHaveBeenCalledWith(updateAction);
  });

  test.only("should call the next middleware", () => {
    const action = { type: BOOTSTRAP };
    const peerMiddleware = topPeersMiddleware({ socketService });
    peerMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
