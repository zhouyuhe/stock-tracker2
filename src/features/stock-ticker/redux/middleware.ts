import { BOOTSTRAP } from "store/constants";
import { updateStockTickerAction, StockTickerData } from "./actions";
import { SocketService } from "services/socketService";
import { Middleware } from "redux";
import { AppState } from "store";

type Dependencies = {
  socketService: SocketService;
};

export const stockTickerMiddleware = ({
  socketService
}: Dependencies): Middleware<{}, AppState> => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("stockTicker", (payload: StockTickerData) => {
      store.dispatch(updateStockTickerAction(payload));
    });
  }
  return next(action);
};
