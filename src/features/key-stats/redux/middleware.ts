import { BOOTSTRAP } from "store/constants";
import { updateKeyStatsAction, KeyStatsData } from "./actions";
import { SocketService } from "services/socketService";
import { Middleware } from "redux";
import { AppState } from "store";

export type Dependencies = {
  socketService: SocketService;
};

export type KeyStatsMiddleware = (
  dependencies: Dependencies
) => Middleware<{}, AppState>;

export const keyStatsMiddleware: KeyStatsMiddleware = ({
  socketService
}) => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("keyStats", (payload: KeyStatsData) => {
      store.dispatch(updateKeyStatsAction(payload));
    });
  }
  return next(action);
};
