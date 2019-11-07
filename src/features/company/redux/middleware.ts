import { BOOTSTRAP } from "../../../store/constants";
import { updateCompanyOverviewAction, CompanyData } from "./actions";
import { SocketService } from "../../../services/socketService";
import { Middleware } from "redux";
import { AppState } from "../../../store";
export type Dependencies = {
  socketService: SocketService;
};
export type CompanyMiddleware = (
  dependencies: Dependencies
) => Middleware<{}, AppState>;
export const companyMiddleware: CompanyMiddleware = ({
  socketService
}) => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    socket.on("companyOverview", (payload: CompanyData) => {
      store.dispatch(updateCompanyOverviewAction(payload));
    });
  }
  return next(action);
};
