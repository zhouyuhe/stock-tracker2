const { getSectorInformation } = require("./components/sectorInformation");
const { emitTopPeers } = require("./components/topPeers");
const { getCompanyOverview } = require("./components/companyOverview");
const { getLatestNews } = require("./components/latestNews");
const { getKeyStats } = require("./components/keyStats");
const { getStockTicker } = require("./components/stockTicker");
const { getChartData } = require("./components/chartData");
const { emitSearchQuery } = require("./components/searchQuery");
const { getAllCompanies } = require("./components/allCompanies");

const TOKEN = process.env.TOKEN;
const HOST = "https://sandbox.iexapis.com/stable";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

function callAndStartIntervals(fn, interval, ...args) {
  fn(...args);
  return setInterval(() => fn(...args), interval);
}

const keyStats = getKeyStats(HOST, TOKEN);
const stockTicker = getStockTicker(HOST, TOKEN);
const latestNews = getLatestNews(HOST, TOKEN);
const companyOverview = getCompanyOverview(HOST, TOKEN);
const sectorInformation = getSectorInformation(HOST, TOKEN);
const chart = getChartData(HOST, TOKEN);

const requestReply = async (socket, promise, replyTo) => {
  try {
    const result = await promise;
    socket.emit(replyTo, { status: "OK", data: result });
  } catch (error) {
    socket.emit(replyTo, { status: "ERROR" });
  }
};

exports.handleConnection = socket => {
  const timerIDs = {};
  const allSymbols = getAllCompanies(HOST, TOKEN);
  console.info("New client connected");
  Object.values(timerIDs).forEach(clearInterval);

  // socket.on("getStockTicker", stockName => {
  //   timerIDs.stockTicker = callAndStartIntervals(
  //     emitStockTicker,
  //     5000,
  //     socket,
  //     stockName,
  //     HOST,
  //     TOKEN
  //   );
  // });

  socket.on("getStockTicker", async (replyTo, stockName) => {
    requestReply(socket, stockTicker(stockName), replyTo);
  });

  socket.on("getKeyStats", async (replyTo, stockName) => {
    requestReply(socket, keyStats(stockName), replyTo);
  });

  socket.on("getLatestNews", async (replyTo, stockName) => {
    requestReply(socket, latestNews(stockName), replyTo);
  });

  socket.on("getCompanyOverview", async (replyTo, stockName) => {
    requestReply(socket, companyOverview(stockName), replyTo);
  });

  socket.on("getSectorInformation", async (replyTo, stockName) => {
    requestReply(socket, sectorInformation(stockName), replyTo);
  });

  socket.on("getChartData", async (replyTo, stockName, timeRange) => {
    requestReply(socket, chart(stockName, timeRange), replyTo);
  });

  // socket.on("getKeyStats", stockName => {
  //   timerIDs.keyStats = callAndStartIntervals(
  //     getKeyStats,
  //     ONE_DAY_IN_MS,
  //     socket,
  //     stockName,
  //     HOST,
  //     TOKEN
  //   );
  // });

  // socket.on("getLatestNews", stockName => {
  //   timerIDs.latestNews = callAndStartIntervals(
  //     emitLatestNews,
  //     ONE_DAY_IN_MS,
  //     socket,
  //     stockName,
  //     HOST,
  //     TOKEN
  //   );
  // });

  // socket.on("getCompanyOverview", stockName => {
  //   timerIDs.companyOverview = callAndStartIntervals(
  //     emitCompanyOverview,
  //     ONE_DAY_IN_MS,
  //     socket,
  //     stockName,
  //     HOST,
  //     TOKEN
  //   );
  // });

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

  // socket.on("getChartData", (stockName, timeRange) => {
  //   timerIDs.chartData = callAndStartIntervals(
  //     emitChartData,
  //     ONE_DAY_IN_MS,
  //     socket,
  //     stockName,
  //     timeRange,
  //     HOST,
  //     TOKEN
  //   );
  // });

  // socket.on("getSectorInformation", stockName => {
  //   timerIDs.sectorInformation = callAndStartIntervals(
  //     emitSectorInformation,
  //     ONE_DAY_IN_MS,
  //     socket,
  //     stockName,
  //     HOST,
  //     TOKEN
  //   );
  // });

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
