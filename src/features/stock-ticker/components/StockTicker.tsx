import React, { FC } from "react";
import "./StockTicker.css";
import { StockTickerData } from "../redux/actions";

const getSign = (value: number) => (value > 0 ? "positive" : "negative");

type StockTickerProps = {
  stock: StockTickerData | undefined;
};
export const StockTicker: FC<StockTickerProps> = ({ stock }) => {
  const changePercent =
    stock && Math.round(stock.changePercent * 100 * 100) / 100;

  return (
    <div className="quotes">
      <p className="quotes__stock-price">
        <span className="quotes_dollar-sign">{stock && stock.latestPrice}</span>
      </p>
      <p className="quotes__stock-price">
        <span
          className={`change-${stock && getSign(stock.change)} arrow-${stock &&
            getSign(stock.change)}`}
        >
          {stock && Math.abs(stock.change)}
        </span>
      </p>
      <p className="quotes__stock-price">
        <span
          className={`change-${changePercent &&
            getSign(changePercent)} quotes__percentage-sign`}
        >
          {changePercent && changePercent > 0
            ? changePercent.toFixed(2)
            : changePercent && -changePercent.toFixed(2)}
        </span>
      </p>
    </div>
  );
};
