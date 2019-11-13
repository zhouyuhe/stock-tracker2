import { updateCompanyOverviewAction, CompanyData } from "./actions";
import { SocketService } from "services/socketService";
import { Middleware } from "redux";
import { AppState, BOOTSTRAP } from "store";

export type Dependencies = {
  socketService: SocketService;
};

export const companyMiddleware = ({
  socketService
}: Dependencies): Middleware<{}, AppState> => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("companyOverview", (payload: CompanyData) => {
      store.dispatch(updateCompanyOverviewAction(payload));
    });
  }
  return next(action);
};
