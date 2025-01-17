const {
  emitSectorInformation,
  emitTopPeers,
  emitCompanyOverview,
  emitLatestNews,
  emitKeyStats,
  emitStockTicker,
  emitChartData,
  emitSearchQuery,
  getAllCompanies
} = require("./components");

const TOKEN = process.env.TOKEN;
const HOST = "https://sandbox.iexapis.com/stable";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

function callAndStartIntervals(fn, interval, ...args) {
  fn(...args);
  return setInterval(() => fn(...args), interval);
}

exports.handleConnection = socket => {
  const timerIDs = {};
  const allSymbols = getAllCompanies(HOST, TOKEN);
  console.info("New client connected");
  Object.values(timerIDs).forEach(clearInterval);

  socket.on("getStockTicker", stockName => {
    timerIDs.stockTicker = callAndStartIntervals(
      emitStockTicker,
      5000,
      socket,
      stockName,
      HOST,
      TOKEN
    );
  });

  socket.on("getKeyStats", stockName => {
    timerIDs.keyStats = callAndStartIntervals(
      emitKeyStats,
      ONE_DAY_IN_MS,
      socket,
      stockName,
      HOST,
      TOKEN
    );
  });

  socket.on("getLatestNews", stockName => {
    timerIDs.latestNews = callAndStartIntervals(
      emitLatestNews,
      ONE_DAY_IN_MS,
      socket,
      stockName,
      HOST,
      TOKEN
    );
  });

  socket.on("getCompanyOverview", stockName => {
    timerIDs.companyOverview = callAndStartIntervals(
      emitCompanyOverview,
      ONE_DAY_IN_MS,
      socket,
      stockName,
      HOST,
      TOKEN
    );
  });

  socket.on("getPeersData", stockName => {
    timerIDs.topPeers = callAndStartIntervals(
      emitTopPeers,
      ONE_DAY_IN_MS,
      socket,
      stockName,
      HOST,
      TOKEN,
      allSymbols
    );
  });

  socket.on("getChartData", (stockName, timeRange) => {
    timerIDs.chartData = callAndStartIntervals(
      emitChartData,
      ONE_DAY_IN_MS,
      socket,
      stockName,
      timeRange,
      HOST,
      TOKEN
    );
  });

  socket.on("getSectorInformation", stockName => {
    timerIDs.sectorInformation = callAndStartIntervals(
      emitSectorInformation,
      ONE_DAY_IN_MS,
      socket,
      stockName,
      HOST,
      TOKEN
    );
  });

  socket.on("enteredSearchQuery", inputQuery => {
    emitSearchQuery(socket, inputQuery, allSymbols);
  });

  socket.on("timeRange", (stockName, timeRange) => {
    emitChartData(socket, stockName, timeRange, HOST, TOKEN);
  });

  socket.on("disconnect", () => {
    Object.values(timerIDs).forEach(clearInterval);
    console.info("Client disconnected");
  });
};
