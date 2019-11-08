import React from "react";

const NUMBER_FORMATTER = new Intl.NumberFormat();
const getSign = (value: number | string) =>
  value > 0 ? "positive" : "negative";

export type FooterItemProp = {
  exchange: string;
  price: number;
  percentageChange: number;
  priceChange: number;
};
export const FooterItem = ({
  exchange,
  price,
  priceChange,
  percentageChange
}: FooterItemProp) => {
  const roundValue = Math.round(priceChange * 100 * 100) / 100;
  const priceChangeFormat = roundValue.toFixed(2);
  return (
    <div>
      <span className="footer__list__exchange">{exchange}</span>
      <span className="footer__dollar-sign">
        {NUMBER_FORMATTER.format(price)}
      </span>
      <span
        className={`footer__price--${getSign(
          priceChangeFormat
        )} footer--${getSign(priceChangeFormat)}`}
      >
        {Math.abs(priceChange)}
      </span>
      <span
        className={`footer__price--${getSign(
          percentageChange
        )} footer__percentage-sign`}
      >
        {Math.abs(percentageChange)}
      </span>
    </div>
  );
};
