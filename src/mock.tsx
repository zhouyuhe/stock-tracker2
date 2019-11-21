import React, { useEffect } from "react";
import { KeyStatsData } from "features/key-stats/redux/actions";
import { socketService } from "services";
import { StockTickerData } from "features/stock-ticker/redux/actions";
import { LatestNewsData } from "features/latest-news/redux/actions";
import { CompanyData } from "features/company/redux/actions";
import { SearchData } from "features/headline/redux/actions";
import { ChartData } from "features/chart/redux/actions";

type StockAPI = {
  getKeyStats: (stockName: string) => Promise<KeyStatsData>;
  getStockTcker: (stockName: string) => Promise<StockTickerData>;
  getLatestNews: (stockName: string) => Promise<LatestNewsData>;
  getCompanyOverview: (stockName: string) => Promise<CompanyData>;
  getSectorInformation: (stockName: string) => Promise<SearchData>;
  getChart: (stockName: string, timeRange: string) => Promise<ChartData>;
};

type BadResult = {
  status: "ERROR";
};

type GoodResult<T> = {
  status: "OK";
  data: T;
};

type Result<T> = BadResult | GoodResult<T>;

class StockService implements StockAPI {
  constructor(private socket: SocketIOClient.Socket) {}

  private createTopicNameWithID(service: string) {
    return service + Math.abs(Math.random() * 10000).toFixed(0);
  }

  private socketOnAndEmit<TResult, A>(
    topic: string,
    prefix: string,
    ...args: A[]
  ) {
    return new Promise<TResult>((resolve, reject) => {
      const replyTo = this.createTopicNameWithID(prefix);
      this.socket.emit(topic, replyTo, ...args);
      this.socket.on(replyTo, (result: Result<TResult>) => {
        this.socket.off(replyTo);
        result.status === "OK" ? resolve(result.data) : reject(result.status);
      });
    });
  }
  getKeyStats(stockName: string) {
    return this.socketOnAndEmit<KeyStatsData, string>(
      "getKeyStats",
      "KEY_STATS",
      stockName
    );
  }
  getStockTcker(stockName: string) {
    return this.socketOnAndEmit<StockTickerData, string>(
      "getStockTicker",
      "STOCK_TICKER",
      stockName
    );
  }
  getLatestNews(stockName: string) {
    return this.socketOnAndEmit<LatestNewsData, string>(
      "getLatestNews",
      "LATEST_NEWS",
      stockName
    );
  }
  getCompanyOverview(stockName: string) {
    return this.socketOnAndEmit<CompanyData, string>(
      "getCompanyOverview",
      "COMPANY_OVERVIEW",
      stockName
    );
  }
  getSectorInformation(stockName: string) {
    return this.socketOnAndEmit<SearchData, string>(
      "getSectorInformation",
      "SECTOR_INFO",
      stockName
    );
  }
  getChart(stockName: string, timeRange: string) {
    return this.socketOnAndEmit<ChartData, string>(
      "getChartData",
      "CHART",
      stockName,
      timeRange
    );
  }
  getAll(stockName: string) {
    return Promise.all([
      this.getKeyStats(stockName),
      this.getLatestNews(stockName),
      this.getStockTcker(stockName)
    ]);
  }
}

const service = new StockService(socketService.get());

export const Mock = () => {
  useEffect(() => {
    // service.getAll('AAPL').then(console.log).catch(console.log)
    service
      .getStockTcker("AAPL")
      .then(console.log)
      .catch(console.log);
    service
      .getLatestNews("AAPL")
      .then(console.log)
      .catch(console.log);
    service
      .getCompanyOverview("AAPL")
      .then(console.log)
      .catch(console.log);
    service
      .getKeyStats("AAPL")
      .then(console.log)
      .catch(console.log);
    service
      .getSectorInformation("AAPL")
      .then(console.log)
      .catch(console.log);
    service
      .getChart("AAPL", "1Y")
      .then(console.log)
      .catch(console.log);
  }, []);
  return <div>Hello Cindy</div>;
};
