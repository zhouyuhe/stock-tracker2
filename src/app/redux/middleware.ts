import { UPDATE_SELECTED_STOCK } from "../redux/constants";
import { resetAction } from "store/actions";
import { SocketService } from "services/socketService";
import { Middleware } from "redux";
import { AppState } from "store";

type Dependencies = {
  socketService: SocketService;
};

export const stockMiddleware = ({
  socketService
}: Dependencies): Middleware<{}, AppState> => store => next => action => {
  if (action.type === UPDATE_SELECTED_STOCK) {
    store.dispatch(resetAction());
    const socket = socketService.get();
    const chartRange = store.getState().chartData.selectedChartRange;
    const symbol = action.payload.symbol;
    socket.emit("getSectorInformation", symbol);
    socket.emit("getChartData", symbol, chartRange);
    socket.emit("getPeersData", symbol);
    socket.emit("getCompanyOverview", symbol);
    socket.emit("getLatestNews", symbol);
    socket.emit("getKeyStats", symbol);
    socket.emit("getStockTicker", symbol);
  }
  return next(action);
};
