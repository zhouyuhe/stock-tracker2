import { BOOTSTRAP } from "../../../store/constants";
import {
  updateCompanySymbolsAction,
  updateSearchAction,
  SearchDataProps,
  CompanySymbolData,
  UpdateSearchAction,
  UpdateCompanySymbolAction
} from "./actions";
import { UPDATE_SEARCH_QUERY } from "./constants";
import { SocketService } from "../../../services/socketService";
import { Middleware, AnyAction } from "redux";
import { HeadlineState } from "./reducer";

type T1 = (search: SearchDataProps) => AnyAction;
type T2 = (company: CompanySymbolData[]) => AnyAction;
// type T3<T> = <T extends {}>(input: T) => AnyAction;
type DataToFetch = { name: string; action: T1 | T2 };

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
      socket.on(item.name, (payload: any) => {
        store.dispatch(item.action(payload));
      });
    });
  }
  if (action.type === UPDATE_SEARCH_QUERY) {
    socketService.get().emit("searchQuery", action.payload);
  }
  return next(action);
};
