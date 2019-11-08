import { BOOTSTRAP } from "../../../store/constants";
import { updateTopPeersAction, PeersData } from "./actions";
import { SocketService } from "../../../services/socketService";
import { Middleware } from "redux";
import { AppState } from "../../../store";

type Dependencies = {
  socketService: SocketService;
};

export type TopPeersMiddleware = (
  dependencies: Dependencies
) => Middleware<{}, AppState>;
export const topPeersMiddleware: TopPeersMiddleware = ({
  socketService
}) => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("topPeers", (payload: PeersData[]) => {
      store.dispatch(updateTopPeersAction(payload));
    });
  }
  return next(action);
};
