import React, { useState, useEffect, useCallback } from "react";
import APICall from ".api";
import ".css";

const App = () => {
  // the value I typed in
  const [search, setSearch] = useState("");
  // all the list of stocks I already typed in
  const [stocks, setStocks] = useState([]);

  // do the side effect, calculate the change
  useEffect(() => {
    //manipulate api data, then subscribe and unsubscribe accordingly
    APICall.onChange(data => {
      // set the stock list as
      setStocks(previousStock => {
        //contain the symbol, find the index of that symbol, and handle the change accordingly
        if (previousStock.map(stock => stock.symbol).includes(data.symbol)) {
          const indexIs = previousStock.findIndex(
            stock => stock.symbol === data.symbol
          );
          // calculate the change manually (current - previous one)
          const change =
            previousStock[indexIs].last === null
              ? null
              : data.last - previousStock.last;
          // only mutate the data-- change as it is the only one changes
          return [
            ...previousStock.slice(0, indexIs),
            { ...data, change },
            ...previousStock.slice(indexIs + 1)
          ];
        } else {
          return previousStock;
        }
      });
    });
  }, []);

  const handleOnChange = useCallback(
    event => setSearch(event.target.value),
    []
  );
  const handleOnChange1 = event => {
    setSearch(event.target.value);
  };
  const handleOnKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearch(event.target.value);
    }
  };

  const handleSubscribe = useCallback(() => {
    //subscribe the one already enter
    APICall.subscibe(search);
    // other not change, just the symol change relative to search
    setStocks([
      ...stocks,
      {
        symbol: search,
        open: null,
        last: null,
        high: null,
        low: null,
        change: null
      }
    ]);
    //clear the setSearch as already subscribe it
    setSearch("");
  }, [search, stocks]);

  const handleUnSubscribe = useCallback(
    symbol => {
      // unsubscribe the particular one
      APICall.unsubscribe(symbol);
      // delete the unsubscibe one stock
      setStocks(stocks.filter(stock => stock.symbol !== symbol));
    },
    [stocks]
  );
  //two ways of doing it
  const deleteIt = index => {
    const newstocks = [...stocks];
    newstocks.splice(index, 1);
    setStocks(newstocks);
    setSearch("");
  };

  const unsubAll = () => {
    setStocks([]);
    setSearch("");
  };

  return (
    <div>
      {/* alternative way by on key press the enter do the input*/}
      <input onKeyPress={handleOnKeyPress}></input>
      <input
        type="text"
        placeholder="enter symbol here"
        value={search}
        onChange={handleOnChange}
      />
      {/* same as above */}
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={unsubAll}>unsubscribeAll</button>
      <table>
        <thead>
          <td></td>
        </thead>
        <tbody>
          {stocks.length > 0 &&
            stocks.map((data, index) => (
              <tr key={index}>
                <td>
                  <button onClick={handleUnSubscribe}></button>
                  <button onClick={() => deleteIt(index)}></button>
                </td>
                <td>{data.name}</td>
                <td
                  style={
                    data.change > 0
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "red" }
                  }
                >
                  <span className={data.change > 0 ? "green" : "red"}></span>
                  {data.change}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
