import { createStore, applyMiddleware, compose } from "redux";
import { chartMiddleware } from "../features/chart";
import { combinedReducer } from "./reducer";
import { socketService } from "../services";
import { companyMiddleware } from "../features/company";
import { keyStatsMiddleware } from "../features/key-stats";
import { latestNewsMiddleware } from "../features/latest-news";
import { topPeersMiddleware } from "../features/peers";
import { headlineMiddleware } from "../features/headline";
import { stockTickerMiddleware } from "../features/stock-ticker";
import { stockMiddleware } from "../app/redux/middleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  chartMiddleware({ socketService }),
  companyMiddleware({ socketService }),
  keyStatsMiddleware({ socketService }),
  latestNewsMiddleware({ socketService }),
  topPeersMiddleware({ socketService }),
  headlineMiddleware({ socketService }),
  stockTickerMiddleware({ socketService }),
  stockMiddleware({ socketService })
];

export const store = createStore(
  combinedReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);
