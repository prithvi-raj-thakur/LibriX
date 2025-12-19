import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';

const app = express();
const port = process.env.PORT || 3000;
await connectDB();

//Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the LibriX Server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});