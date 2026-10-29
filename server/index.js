import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import certificatesRouter from './routes/certificates.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'CertifyMe API' }));
app.use('/api/certificates', certificatesRouter);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/certifyme');
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`CertifyMe API running on http://localhost:${port}`));
} catch (error) {
  console.error('Could not connect to MongoDB:', error.message);
  console.error('Check server/.env and make sure MongoDB is running.');
  process.exit(1);
}
