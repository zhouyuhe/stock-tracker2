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
    socketService
      .get()
      .emit(
        "stockName",
        action.payload.symbol,
        store.getState().chartData.selectedChartRange
      );
  }
  return next(action);
};
