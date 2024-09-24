import React, { useEffect, useState } from "react";
import axios from "axios";

type StockData = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

const Stocks: React.FC = () => {
  const [topGainers, setTopGainers] = useState<StockData[]>([]);
  const [topLosers, setTopLosers] = useState<StockData[]>([]);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=8VHVIRMXP6KSFX16`
      );
      console.log(response.data);
      setTopGainers(response.data.top_gainers);
      setTopLosers(response.data.top_losers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const StockTable: React.FC<{ stocks: StockData[]; title: string }> = ({ stocks, title }) => (
    <div className="w-1/2 p-3 h-1/3">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Ticker</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Change</th>
              <th className="px-6 py-3">%Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.slice(0,4).map((stock, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{stock.ticker}</td>
                <td className="px-6 py-4">${parseFloat(stock.price).toFixed(2)}</td>
                <td className={`px-6 py-4 ${parseFloat(stock.change_amount) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(stock.change_amount) >= 0 ? '+' : ''}{parseFloat(stock.change_amount).toFixed(2)}
                </td>
                <td className={`px-6 py-4 ${parseFloat(stock.change_percentage) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(stock.change_percentage) >= 0 ? '+' : ''}{parseFloat(stock.change_percentage).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className=" p-3 h-1">
      <h1 className="text-xl font-bold my-7 mx-2 text-center text-gray-800">Stock Market Overview</h1>
      <div className="flex flex-wrap -mx-4">
        <StockTable stocks={topGainers} title="Top Gainers" />
        <StockTable stocks={topLosers} title="Top Losers" />
      </div>
    </div>
  );
};

export default Stocks;