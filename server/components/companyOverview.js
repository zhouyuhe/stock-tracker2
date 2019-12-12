const axios = require("axios");
exports.emitCompanyOverview = async (socket, stockName, HOST, TOKEN) => {
  try {
    const company = await axios.get(
      `${HOST}/stock/${stockName}/company?token=${TOKEN}`
    );
    const { website, description, symbol, companyName } = company.data;
    const companyOverview = {
      website,
      description,
      symbol,
      companyName
    };
    socket.emit("companyOverview", companyOverview);
    const a = { open: 3, close: 4 };
    const b = [{ symbol: 1 }, { match: 7 }];
    const c = [...b.slice(0, 1), { ...a, yes: 2 }, ...b.slice(1)];
    const d = [...b, { symbol: 1234 }];
    const e = { ...a, symbol: 1 };
    console.log(e);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
