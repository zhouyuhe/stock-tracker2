import React, { useState } from "react";

const App = () => {
  const [stocks, setStocks] = useState([]);
  const submitStock = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      subscribeToStock(event.target.value);
    }
  };

  socketService.get().on("data", data => {
    setStocks(data);
  });

  const deleteStock = stockName => {
    unsubscribe(stockName);
    stocks.length === 1 && setStocks([]);
  };

  const renderRow = stock => (
    <tr key={stock.name}>
      <td>
        <button
          onClick={() => {
            deleteStock(stock.name);
          }}
        >
          X
        </button>
      </td>
      <td>{stock.name}</td>
      <td>{stock.price}</td>
      <td
        style={
          stock.change > 0
            ? { backgroundColor: "green" }
            : { backgroundColor: "red" }
        }
      >
        {stock.change}
      </td>
    </tr>
  );

  return (
    <div>
      <input onKeyPress={submitStock}></input>
      <table>
        <tbody>
          <tr>
            <td>Stock Name</td>
            <td>Prices</td>
            <td>Price Change</td>
          </tr>
          {stocks.length > 0 && stocks.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};
