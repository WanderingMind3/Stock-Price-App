// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";

// import {CategoryScale} from 'chart.js'; 
// import Chart from 'chart.js/auto';


// const StockChart = () => {
//   const [stockData, setStockData] = useState([]);

//   useEffect(() => {
//     // Fetch data from your stock API here and update stockData state
//     axios.get("YOUR_STOCK_API_ENDPOINT")
//       .then((response) => {
//         setStockData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching stock data:", error);
//       });
//   }, []);

//   // Define your chart data and options here
//   const chartData = {
//     labels: stockData.map((data) => data.date),
//     datasets: [
//       {
//         label: "Stock Price",
//         data: stockData.map((data) => data.price),
//         fill: false,
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div>
//       <h2>Stock Price Chart</h2>
//       <Line data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default StockChart;