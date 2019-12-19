import React, { useState, useEffect, useRef } from "react";
import Feed from "./feed";

import "App1.css";

const useStocks = () => {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState({});
  const ref = useRef(new Set());

  useEffect(() => {
    Feed.onChange(data => {
      // create a closure on that
      // do a function otherwise it will change for each time the stocks changes
      setStocks(prevStocks => {
        console.log(data);
        /// .current is the latest/ current render, without current is the previous render
        if (!ref.current.has(data.symbol)) return;

        const change = prevStocks[data.symbol]
          ? prevStocks[data.symbol].last - data.last
          : 0;
        const newStocks = {
          ...prevStocks,
          [data.symbol]: { ...data, change: change.toFixed(2) }
        };
        return newStocks;
      });
    });
  }, []);

  const addToStocks = () => {
    Feed.subscribe(search);
    ref.current.add(search.toUpperCase());
    setSearch("");
  };

  console.log(ref.current);
  //   console.log(stocks)

  const unsubscribe = symbol => {
    Feed.unsubscribe(symbol);
    const latestStocks = { ...stocks };
    delete latestStocks[symbol];
    setStocks(latestStocks);
    // .add and .delete and .has is the set property, ref.current is the useRef property
    ref.current.delete(symbol);
  };
  return { stocks, search, setSearch, addToStocks, unsubscribe };
};

const App = () => {
  const { stocks, search, setSearch, addToStocks, unsubscribe } = useStocks();

  return (
    <>
      <div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Please Enter Stock Here..."
        />
        <button onClick={addToStocks}>Submit</button>
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
            {/* key is unique identifier, even if we delete some part of it*/}
            {stocks &&
              Object.values(stocks).map(stock => (
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
                    <button onClick={() => unsubscribe(stock.symbol)}>X</button>
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
