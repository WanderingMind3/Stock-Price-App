import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/stocks_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Stock = mongoose.model('Stock', {
  symbol: String,
  price: Number,
});

// Mock API Endpoint to update stock prices
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stocks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
