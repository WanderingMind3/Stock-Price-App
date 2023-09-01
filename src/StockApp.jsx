import { useState, useEffect } from "react";
import axios from "axios";
import "./MyComponent.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const StockApp = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [stockList, setStockList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [chartData, setChartData] = useState([]);
  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        "https://stock-api-ajaz.onrender.com/api/stocks"
      );
      setStockList(response.data);
      const chartData = response.data.map((stock) => stock.price);
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();

    const interval = setInterval(async () => {
      console.log("running");
      await fetchStockData();
    }, 60000); // Fetch data every minute
    return () => {
      clearInterval(interval);
    };
  }, [selectedStock, currentPrice, stockList]);

  // Update current price based on selected stock
  useEffect(() => {
    const selectedStockData = stockList.find(
      (stock) => stock.symbol === selectedStock
    );
    if (selectedStockData) {
      setCurrentPrice(selectedStockData.price);
    }
  }, [selectedStock, stockList]);
  return (
    <div>
      <div className="stock-container">
        <h1 className="header">Stock Price Viewer</h1>
        <h1 className="timer">it will update every 60 seconds</h1>
        <select
          className="select"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          <option value="">Select a stock</option>
          {stockList.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol}
            </option>
          ))}
        </select>
        <p className="price">Current Price: {currentPrice}</p>
      </div>

      <div className="chart-container">
        <Line
          data={{
            labels: stockList.map((stock) => stock.symbol),
            datasets: [
              {
                label: "Stock Prices",
                data: chartData,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default StockApp;
