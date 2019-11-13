import React, { FC } from "react";
import moment from "moment";
import "./MarketStatus.css";
import { KeyStatsData } from "../../key-stats/redux/actions";
import { StockTickerData } from "../../stock-ticker/redux/actions";

type MarketStatusProps = {
  stock: StockTickerData | undefined;
  keyStats: KeyStatsData | null;
};
const marketSign = (value: boolean) =>
  value === false ? "market---moon" : "market---sun";

export const MarketStatus: FC<MarketStatusProps> = ({ stock, keyStats }) => {
  const correctFormat = stock && moment(stock.latestUpdate).format("lll");
  const marketStatus =
    keyStats && keyStats.isUSMarketOpen === false
      ? "Market Closed"
      : "Market Open";

  return (
    <div className="market">
      <p>
        <span className="market__text">
          Real-Time Price as of {correctFormat} EST
        </span>{" "}
        {keyStats && (
          <span className={marketSign(keyStats.isUSMarketOpen)}>
            {marketStatus}
          </span>
        )}
      </p>
    </div>
  );
};
