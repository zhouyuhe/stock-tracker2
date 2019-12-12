import React, { useState, useEffect } from "react";
import "./App.css";

const allSymbols = ["AAPL", "TESS", "ECOR", "AMZN", "MSFT"];

const data = [
  { symbol: "AAPL", price: 34, change: -2.42 },
  { symbol: "TESS", price: 12, change: 5.32 },
  { symbol: "ECOR", price: 33, change: 2.21 },
  { symbol: "MSFT", price: 25, change: -3.22 },
  { symbol: "AMZN", price: 7, change: 28 }
];

const getAllSymbols = () => {
  return allSymbols;
};

const subToStock = stock =>
  data.filter(item => item.symbol === stock.toUpperCase()).pop();

//Subscribe
//Unsubscribe
//Get all symbols

// ***************************************************************************************************************

const App = () => {
  const [allSymbols, setAllSymbols] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    setAllSymbols(getAllSymbols());
  }, []);

  const searchSymbol = event => {
    if (event.key === "Enter") {
      const isStockValid = stockData
        .map(stock => stock.symbol)
        .includes(event.target.value.toUpperCase());
      if (allSymbols.includes(event.target.value.toUpperCase())) {
        if (!isStockValid) {
          const getStock = subToStock(event.target.value);
          setStockData([...stockData, getStock]);
        }
      }
    }
  };

  console.log(stockData);

  const deleteIt = index => {
    const newData = [...stockData];
    newData.splice(index, 1);
    setStockData(newData);
  };

  const renderTableRow = (stockData, index) => (
    <tr key={index}>
      <td>{stockData.symbol}</td>
      <td>{stockData.price}</td>
      <td className={stockData.change > 0 ? "green" : "red"}>
        {stockData.change}
      </td>
      <button onClick={() => deleteIt(index)}>X</button>
    </tr>
  );

  return (
    <div className="App">
      <h1>Welcome to the Coding Challenge</h1>
      <input onKeyPress={searchSymbol} />
      <table>
        <thead>
          <tr>
            <td>Symbol</td>
            <td>Price</td>
            <td>Change</td>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock, index) => renderTableRow(stock, index))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
