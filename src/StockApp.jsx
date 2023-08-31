import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockApp = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [stockList, setStockList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  const fetchStockData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stocks');
      console.log(response, "running")
      setStockList(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };


  const updateCurrentPrice = () => {    const selectedStockData = stockList.find(stock => stock.symbol === selectedStock);
    if (selectedStockData) {
      setCurrentPrice(selectedStockData.price);
    }
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(() => {
      fetchStockData();
      updateCurrentPrice();
    }, 60000); 
    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div>
      <h1>Stock Price Viewer</h1>
      <select value={selectedStock} onChange={e => setSelectedStock(e.target.value)}>
        <option value="">Select a stock</option>
        {stockList.map(stock => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.symbol}
          </option>
        ))}
      </select>
      <p>Current Price: {currentPrice}</p>
    </div>
  );
};

export default StockApp;
