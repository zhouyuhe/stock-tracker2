const axios = require("axios");
exports.getAllCompanies = async (HOST, TOKEN) => {
  try {
    const companySymbols = await axios.get(
      `${HOST}/ref-data/symbols?token=${TOKEN}`
    );
    return companySymbols.data.map(data => ({
      symbol: data.symbol,
      name: data.name,
      exchange: data.exchange
    }));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
