import { topPeersMiddleware } from "../middleware";
import { BOOTSTRAP } from "store";
import { PeersData } from "../actions";

describe("Testing the Peers Middleware", () => {
  let mockSocket: any;
  let socketService: any;
  let store: any;
  let next: jest.Mock;

  beforeEach(() => {
    mockSocket = {
      on: jest.fn((name: string, callback: (payload: PeersData[]) => void) => {
        callback(peerState.selectedTopPeers);
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

  test("socket.on been called", () => {
    const action = { type: BOOTSTRAP };
    const peerMiddleware = topPeersMiddleware({ socketService });
    peerMiddleware(store)(next)(action);
    expect(mockSocket.on).toHaveBeenCalledWith("topPeers", expect.anything());
  });

  test("within socket.on, dispatch has been called", () => {
    const action = { type: BOOTSTRAP };
    const peerMiddleware = topPeersMiddleware({ socketService });
    const updateAction = {
      payload: [{ name: "APPLE", symbol: "AAPL" }],
      type: "UPDATE_TOP_PEERS"
    };
    peerMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledWith(updateAction);
  });

  test("should call the next middleware", () => {
    const action = { type: BOOTSTRAP };
    const peerMiddleware = topPeersMiddleware({ socketService });
    peerMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
