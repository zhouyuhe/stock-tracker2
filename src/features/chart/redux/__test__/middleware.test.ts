import { ChartData } from "../actions";
import { BOOTSTRAP } from "store";
import { chartMiddleware } from "../middleware";
import { UPDATE_CHART_RANGE } from "../constants";

describe("Testing Chart Middleware", () => {
  let mockSocket: any;
  let socketService: any;
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
    socketService = {
      get: () => mockSocket
    };

    const stockState = {
      stockData: { selectedStock: { name: "APPLE", symbol: "AAPL" } }
    };

    store = {
      getState: jest.fn(() => stockState),
      dispatch: jest.fn()
    };
    next = jest.fn();
  });

  test("socket.on been called with a function", () => {
    const action = { type: BOOTSTRAP };
    const mockChartMiddleware = chartMiddleware({ socketService });
    mockChartMiddleware(store)(next)(action);
    expect(mockSocket.on).toHaveBeenCalledWith("chartData", expect.anything());
  });

  test("dispatch has been called with updateAction", () => {
    const action = { type: BOOTSTRAP };
    const mockChartMiddleware = chartMiddleware({ socketService });
    const updateAction = {
      payload: [{ date: "123", close: 23 }],
      type: "UPDATE_CHART_DATA"
    };
    mockChartMiddleware(store)(next)(action);
    expect(store.dispatch).toBeCalledWith(updateAction);
  });

  test("socket.emit been called with timeRange,AAPL, 1Y", () => {
    const action = { type: UPDATE_CHART_RANGE, payload: "1Y" };
    const mockChartMiddleware = chartMiddleware({ socketService });
    mockChartMiddleware(store)(next)(action);
    expect(mockSocket.emit).toBeCalledWith("timeRange", "AAPL", "1Y");
  });
});
