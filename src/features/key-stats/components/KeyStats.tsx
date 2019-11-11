import React from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../loading";
import "./KeyStats.css";
import { AppState } from "store";
import { KeyStatsData } from "../redux/actions";
import { ErrorMessage } from "../../error-message";

const NUMBER_FORMATTER = new Intl.NumberFormat();

const DEFAULT_FORMATTER = (
  keyStatsData: KeyStatsData,
  key: keyof KeyStatsData
) => (keyStatsData[key] !== null ? keyStatsData[key] : "N/A");

type Formatter = (keyStatsData: KeyStatsData) => string;

type Schema = {
  key: keyof KeyStatsData;
  label: string;
  formatter?: Formatter;
}[];

const schema: Schema = [
  {
    key: "previousClose",
    label: "Previous Close"
  },
  {
    key: "low",
    label: "Day Range",
    formatter: keyStatsData =>
      keyStatsData.low && keyStatsData.high
        ? `${keyStatsData.low}-${keyStatsData.high}`
        : "N/A"
  },
  {
    key: "previousVolume",
    label: "Volume",
    formatter: keyStatsData =>
      NUMBER_FORMATTER.format(keyStatsData.previousVolume)
  },
  {
    key: "marketCap",
    label: "Market Cap",
    formatter: keyStatsData => NUMBER_FORMATTER.format(keyStatsData.marketCap)
  },
  {
    key: "peRatio",
    label: "P/E Ratio"
  },
  {
    key: "open",
    label: "Open"
  },
  {
    key: "week52Low",
    label: "52 Week Range",
    formatter: keyStatsData =>
      `${keyStatsData.week52Low}-${keyStatsData.week52High}`
  },
  {
    key: "avgTotalVolume",
    label: "Total Avg. Volume",
    formatter: keyStatsData =>
      NUMBER_FORMATTER.format(keyStatsData.avgTotalVolume)
  },
  {
    key: "eps",
    label: "Earnings Per Share"
  },
  {
    key: "ytdChange",
    label: "Dividend & Yield",
    formatter: keyStatsData =>
      (keyStatsData.ytdChange * 100).toPrecision(3) + "%"
  }
];

export const KeyStats = () => {
  const { selectedKeyStats } = useSelector(
    (state: AppState) => state.keyStatsData
  );

  const renderKeystatsComponent = React.useCallback(() => {
    const tableData = selectedKeyStats ? (
      schema.map(({ key, label, formatter = DEFAULT_FORMATTER }) => (
        <tr key={key}>
          <td>{label}</td>
          <td>{formatter(selectedKeyStats, key)}</td>
        </tr>
      ))
    ) : (
      <ErrorMessage message="KeyStats data N/A" />
    );

    return (
      <div className="key-stats__wrapper">
        <table className="key-stats__table">
          <tbody>{tableData}</tbody>
        </table>
      </div>
    );
  }, [selectedKeyStats]);

  return (
    <div className="key-stats">
      <h1 className="title">Key Stats</h1>
      <Loading
        loaded={selectedKeyStats !== null}
        render={renderKeystatsComponent}
      />
    </div>
  );
};
