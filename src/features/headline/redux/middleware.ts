import { BOOTSTRAP } from "../../../store/constants";
import {
  updateCompanySymbolsAction,
  updateSearchAction,
  SearchData,
  CompanySymbolData
} from "./actions";
import { UPDATE_SEARCH_QUERY } from "./constants";
import { SocketService } from "services/socketService";
import { Middleware, AnyAction } from "redux";
import { AppState } from "store";

type TypeOfAction<T> = (input: T) => AnyAction;

type DataToFetch = {
  name: string;
  action: TypeOfAction<SearchData> | TypeOfAction<CompanySymbolData[]>;
};

const dataTofetch: DataToFetch[] = [
  { name: "sectorInformation", action: updateSearchAction },
  { name: "suggestedCompanies", action: updateCompanySymbolsAction }
];

export type Dependencies = {
  socketService: SocketService;
};

export const headlineMiddleware = ({
  socketService
}: Dependencies): Middleware<{}, AppState> => store => next => action => {
  if (action.type === BOOTSTRAP) {
    const socket = socketService.get();
    dataTofetch.forEach(item => {
      socket.on(item.name, (payload: SearchData & CompanySymbolData[]) => {
        store.dispatch(item.action(payload));
      });
    });
  }
  if (action.type === UPDATE_SEARCH_QUERY) {
    socketService.get().emit("enteredSearchQuery", action.payload);
  }
  return next(action);
};
