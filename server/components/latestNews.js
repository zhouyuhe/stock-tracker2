const axios = require("axios");
exports.getLatestNews = (HOST, TOKEN) => async stockName => {
  try {
    const news = await axios.get(
      `${HOST}/stock/${stockName}/news/last/5?token=${TOKEN}`
    );
    const latestNews = news.data.map(data => ({
      headline: data.headline,
      source: data.source,
      date: data.datetime,
      url: data.url
    }));
    return latestNews;
    // socket.emit("latestNews", latestNews);
  } catch (error) {
    return error;
  }
};
