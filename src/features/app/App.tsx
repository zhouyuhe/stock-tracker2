import React from "react";
import { useSelector } from "react-redux";
import { Headline } from "../headline";
import { Chart } from "../chart";
import { LatestNews } from "../latest-news";
import { KeyStats } from "../key-stats";
import { Company } from "../company";
import { Footer } from "../footer";
import "./App.css";
import { AppState } from "../../store";

const App = () => {
  const selectedStock = useSelector(
    (state: AppState) => state.stockData.selectedStock
  );

  return (
    <>
      <div className="grid-container">
        <Headline />
        {selectedStock && (
          <>
            <Chart />
            <LatestNews />
            <KeyStats />
            <Company />
          </>
        )}
      </div>
      {selectedStock && <Footer />}
    </>
  );
};

export default App;
