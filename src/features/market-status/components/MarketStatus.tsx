import React, { FC } from "react";
import moment from "moment";
import "./MarketStatus.css";
import { KeyStatsData } from "../../key-stats/redux/actions";
import { StockTickerData } from "../../stock-ticker/redux/actions";

type MarketStatusProps = {
  stock: StockTickerData["latestUpdate"];
  isMarketOpen: KeyStatsData["isUSMarketOpen"];
};
const marketSign = (value: boolean) =>
  value === false ? "market---moon" : "market---sun";

export const MarketStatus: FC<MarketStatusProps> = ({
  stock,
  isMarketOpen
}) => {
  const correctFormat = stock && moment(stock).format("lll");
  const marketStatus = !isMarketOpen ? "Market Closed" : "Market Open";

  return (
    <div className="market">
      <p>
        <span className="market__text">
          Real-Time Price as of {correctFormat} EST
        </span>
        {isMarketOpen && (
          <span className={marketSign(isMarketOpen)}>{marketStatus}</span>
        )}
      </p>
    </div>
  );
};
