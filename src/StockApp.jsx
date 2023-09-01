import { useState, useEffect } from "react";
import axios from "axios";
import "./MyComponent.css"
const StockApp = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [stockList, setStockList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        "https://stock-api-ajaz.onrender.com/api/stocks"
      );
      console.log(response, "response data");
      setStockList(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  // const updateCurrentPrice = () => {
  //   const selectedStockData = stockList.find(
  //     (stock) => stock.symbol === selectedStock
  //   );
  //   console.log(selectedStockData, "selectedStockData");
  //   if (selectedStockData) {
  //     console.log(selectedStockData, "selectedStockData");
  //     setCurrentPrice(selectedStockData.price);
  //   }
  // };

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
  );
};

export default StockApp;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import './MyComponent.css'; // Import your CSS file for styling

// const StockApp = () => {
//   const [selectedStock, setSelectedStock] = useState("");
//   const [stockList, setStockList] = useState([]);
//   const [currentPrice, setCurrentPrice] = useState(0);
//   const [timer, setTimer] = useState(60);
//   const fetchStockData = async () => {
//     try {
//       const response = await axios.get(
//         "https://stock-api-ajaz.onrender.com/api/stocks"
//       );
//       console.log(response, "response data");
//       setStockList(response.data);
//     } catch (error) {
//       console.error("Error fetching stock data:", error);
//     }
//   };

//   // const updateCurrentPrice = () => {
//   //   const selectedStockData = stockList.find(
//   //     (stock) => stock.symbol === selectedStock
//   //   );
//   //   console.log(selectedStockData, "selectedStockData");
//   //   if (selectedStockData) {
//   //     console.log(selectedStockData, "selectedStockData");
//   //     setCurrentPrice(selectedStockData.price);
//   //   }
//   // };

//   useEffect(() => {
//     fetchStockData();
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//       if (timer === 0) {
//         fetchStockData();
//         setTimer(60); // Reset the timer to 60 seconds
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [selectedStock, currentPrice]);

//   // Update current price based on selected stock
//   useEffect(() => {
//     const selectedStockData = stockList.find(
//       (stock) => stock.symbol === selectedStock
//     );
//     if (selectedStockData) {
//       setCurrentPrice(selectedStockData.price);
//     }
//   }, [selectedStock, stockList]);
//   return (
//     <div className="stock-container">
//     <h1 className="header">Stock Price Viewer</h1>
//     <p className="timer">Refresh in {timer} seconds</p>
//     <select
//       className="select"
//       value={selectedStock}
//       onChange={(e) => setSelectedStock(e.target.value)}
//     >
//       <option value="">Select a stock</option>
//       {stockList.map((stock) => (
//         <option key={stock.symbol} value={stock.symbol}>
//           {stock.symbol}
//         </option>
//       ))}
//     </select>
//     <p className="price">Current Price: {currentPrice}</p>
//   </div>
//   );
// };

// export default StockApp;
