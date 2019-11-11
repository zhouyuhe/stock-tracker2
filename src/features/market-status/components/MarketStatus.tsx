import React, { FC } from "react";
import moment from "moment";
import "./MarketStatus.css";
import { KeyStatsData } from "../../key-stats/redux/actions";

type MarketStatusProps = {
  stock: any;
  keyStats: KeyStatsData | null;
};
const marketSign = (value: number) =>
  value === null ? "market---moon" : "market---sun";
const formatDate = (date: Date) => new Date(date);
export const MarketStatus: FC<MarketStatusProps> = ({ stock, keyStats }) => {
  const UKTime = formatDate(stock.latestUpdate);
  const USTime = formatDate(UKTime).toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  const correctFormat = moment(new Date(USTime)).format("lll");
  const marketStatus =
    keyStats && keyStats.open === null ? "Market Closed" : "Market Open";

  return (
    <div className="market">
      <p>
        <span className="market__text">
          Real-Time Price as of {correctFormat} EST
        </span>{" "}
        {keyStats && (
          <span className={marketSign(keyStats.open)}> {marketStatus}</span>
        )}
      </p>
    </div>
  );
};
