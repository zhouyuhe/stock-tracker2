const axios = require("axios");
exports.getStockTicker = (HOST, TOKEN) => async stockName => {
  try {
    const quote = await axios.get(
      `${HOST}/stock/${stockName}/quote?token=${TOKEN}`
    );
    const { latestPrice, latestUpdate, change, changePercent } = quote.data;

    const stockTicker = {
      latestPrice,
      latestUpdate,
      change,
      changePercent
    };
    return stockTicker;

    // socket.emit("stockTicker", stockTicker);
  } catch (error) {
    return error;
  }
};
