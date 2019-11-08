import { BOOTSTRAP } from "../../../store/constants";
import {
  updateCompanySymbolsAction,
  updateSearchAction,
  SearchDataProps,
  CompanySymbolData
} from "./actions";
import { UPDATE_SEARCH_QUERY } from "./constants";
import { SocketService } from "../../../services/socketService";
import { Middleware } from "redux";
import { HeadlineState } from "./reducer";

type DataToFetch = {
  name: string;
  action: any;
};

const dataTofetch: DataToFetch[] = [
  { name: "sectorInformation", action: updateSearchAction },
  { name: "companySymbols", action: updateCompanySymbolsAction }
];

export type Dependencies = {
  socketService: SocketService;
};
export type HeadlineMiddleware = (
  dependencies: Dependencies
) => Middleware<{}, HeadlineState>;
export const headlineMiddleware: HeadlineMiddleware = ({
  socketService
}) => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    dataTofetch.forEach(item => {
      socket.on(item.name, (payload: SearchDataProps | CompanySymbolData) => {
        store.dispatch(item.action(payload));
      });
    });
  }
  if (action.type === UPDATE_SEARCH_QUERY) {
    socketService.get().emit("searchQuery", action.payload);
  }
  return next(action);
};
