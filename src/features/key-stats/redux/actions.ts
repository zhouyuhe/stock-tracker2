import { UPDATE_KEY_STATS } from "./constants";
import { ActionWithPayload } from "store";

export type KeyStatsData = {
  companyName: string;
  symbol: string;
  currency: string;
  primaryExchange: string;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  previousVolume: number;
  avgTotalVolume: number;
  marketCap: number;
  peRatio: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: boolean;
  eps: number;
};
export type UpdateKeyStatsAction = ActionWithPayload<
  typeof UPDATE_KEY_STATS,
  KeyStatsData
>;

export const updateKeyStatsAction = (
  keyStats: KeyStatsData
): UpdateKeyStatsAction => ({
  type: UPDATE_KEY_STATS,
  payload: keyStats
});
