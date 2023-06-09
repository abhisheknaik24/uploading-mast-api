import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import authRoutes from './routes/authRoutes';
import songRoutes from './routes/songRoutes';

const app: Express = express();

const port: string | number = process.env.PORT || 8000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: process.env.CLIENT_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use('/auth', authRoutes);

app.use('/api/songs', songRoutes);

(async () => {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }

    app.listen(port);
  } catch (error: any) {
    process.exit(1);
  }
})();
