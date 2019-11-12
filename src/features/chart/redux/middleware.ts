import { BOOTSTRAP } from "store/constants";
import { UPDATE_CHART_RANGE } from "./constants";
import { updateChartDataAction, ChartData } from "./actions";
import { Middleware } from "redux";
import { AppState } from "store";
import { SocketService } from "services/socketService";

export type Dependencies = {
  socketService: SocketService;
};

export type ChartMiddleware = (
  dependencies: Dependencies
) => Middleware<{}, AppState>;

export const chartMiddleware: ChartMiddleware = ({
  socketService
}) => store => next => action => {
  if (action.type === UPDATE_CHART_RANGE) {
    const {
      stockData: { selectedStock }
    } = store.getState();
    if (selectedStock === undefined) {
      throw new Error("selectedStock is undefined");
    }
    socketService.get().emit("timeRange", selectedStock.symbol, action.payload);
  }
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("chartData", (payload: ChartData[]) => {
      store.dispatch(updateChartDataAction(payload));
    });
  }
  return next(action);
};
