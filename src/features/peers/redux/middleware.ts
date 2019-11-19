import { BOOTSTRAP } from "store/constants";
import { updateTopPeersAction, PeersData } from "./actions";
import { SocketService } from "services/socketService";
import { Middleware } from "redux";
import { AppState } from "store";

export type PeersDependencies = {
  socketService: SocketService;
};

export const topPeersMiddleware = ({
  socketService
}: PeersDependencies): Middleware<
  {},
  Pick<AppState, "peerData">
> => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("topPeers", (payload: PeersData[]) => {
      store.dispatch(updateTopPeersAction(payload));
    });
  }
  return next(action);
};
