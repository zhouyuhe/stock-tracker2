import { BOOTSTRAP } from "../../../store/constants";
import { updateLatestNewsAction, LatestNewsData } from "./actions";
import { SocketService } from "../../../services/socketService";
import { Middleware } from "redux";
import { AppState } from "../../../store";

type Dependencies = {
  socketService: SocketService;
};

export type LatestNewsMiddleware = (
  dependencies: Dependencies
) => Middleware<{}, AppState>;
export const latestNewsMiddleware: LatestNewsMiddleware = ({
  socketService
}) => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("latestNews", (payload: LatestNewsData[]) => {
      store.dispatch(updateLatestNewsAction(payload));
    });
  }
  return next(action);
};