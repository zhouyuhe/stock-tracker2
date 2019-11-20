import { ChartData } from "../actions";

describe("Testing Chart Middleware", () => {
  let mockSocket: any;
  let sockService: any;
  let store: any;
  let next: jest.Mock;

  beforeEach(() => {
    const payload = [{ date: "123", close: 23 }];
    mockSocket = {
      on: jest.fn((name: string, callback: (payload: ChartData[]) => void) => {
        callback(payload);
      }),
      emit: jest.fn()
    };
    sockService = {
      get: () => mockSocket
    };

    const stockState = { selectedStock: { name: "APPLE", symbol: "AAPL" } };

    store = {
      getState: jest.fn(() => stockState),
      dispatch: jest.fn()
    };
    next = jest.fn();
  });
});
