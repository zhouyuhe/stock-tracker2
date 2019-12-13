require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes");
const { handleConnection } = require("./handleConnection");

const port = process.env.PORT || 4000;
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

server.listen(port, () => console.info(`Listening on port ${port}`));

const symbols = ["AAPL", "MSFT", "AMZN", "GOOG", "ADPT"];
const subscriptions = {};
const randomNumberGenerator = () => (Math.random() * 100).toFixed(2);
const stockGenerator = symbol => {
  return {
    symbol: symbol.toUpperCase(),
    open: randomNumberGenerator(),
    last: randomNumberGenerator(),
    high: randomNumberGenerator(),
    low: randomNumberGenerator()
  };
};
const intervalGenerator = (symbol, socket) => {
  return setInterval(() => socket.emit("stock", stockGenerator(symbol)), 1000);
};
io.on("connection", socket => {
  socket.on("subToStock", symbol => {
    if (symbols.includes(symbol.toUpperCase())) {
      subscriptions[symbol.toUpperCase()] = intervalGenerator(
        symbol.toUpperCase(),
        socket
      );
    }
  });
  socket.on("unSubToStock", symbol => {
    const symbolNew = symbol.toUpperCase();
    const timeout = setTimeout(() => {
      socket.emit("stock", stockGenerator(symbol));
      clearTimeout(timeout);
    }, 1000);
    clearInterval(subscriptions[symbolNew]);
  });
});
