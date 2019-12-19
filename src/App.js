import React, { useState, useEffect, useRef, useReducer } from "react";
import "App1.css";
import feed from "./feed";

const App = () => {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState({});

  const onSubscribe = () => {
    feed.subscribe(search);
    setSearch("");
  };

  const unsubscribe = symbol => {
    feed.unsubscribe(symbol);
    const latestStocks = { ...stocks };
    latestStocks[symbol] = { symbol, last: null, high: null };
    setStocks(latestStocks);
  };

  console.log(stocks);
  useEffect(() => {
    feed.onChange(data => {
      setStocks(prevStocks => {
        if (prevStocks[data.symbol] && prevStocks[data.symbol].high === null) {
          delete prevStocks[data.symbol];
          return prevStocks;
        } else {
          const latestStocks = { ...prevStocks };
          const change = prevStocks[data.symbol]
            ? data.last - prevStocks[data.symbol].last
            : 0;
          latestStocks[data.symbol] = { ...data, change: change.toFixed(2) };
          return latestStocks;
        }
      });
    });
  }, []);

  return (
    <>
      <div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Please Enter Stock Here..."
        />
        <button onClick={onSubscribe}>Submit</button>
        <table>
          <thead>
            <tr>
              <td>Symbol</td>
              <td>Open</td>
              <td>Last</td>
              <td>High</td>
              <td>Low</td>
              <td>Change</td>
            </tr>
          </thead>
          <tbody>
            {Object.values(stocks).map(stock => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.open}</td>
                <td>{stock.last}</td>
                <td>{stock.high}</td>
                <td>{stock.low}</td>
                <td className={stock.change > 0 ? "green" : "red"}>
                  {stock.change}
                </td>
                <td>
                  <button onClick={() => unsubscribe(stock.symbol)}>
                    Unsubscribe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
