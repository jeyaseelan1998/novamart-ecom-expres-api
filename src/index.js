import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { FRONTEND_URL, PORT } from './config/env.js';
import { setupSwagger } from './config/swagger.js';
import connectDB from "./config/db.js";
import testRouter from './routes/test.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import mediaRouter from './routes/media.routes.js';
import errorRouter from './routes/error.route.js';
import productRouter from './routes/product.route.js';
import newsletterRouter from "./routes/newsletter.route.js";
import webhookRouter from "./routes/webhook.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

// Register swagger
setupSwagger(app);

// Frontend routes
app.use('/api/test', testRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/error', errorRouter);

app.use('/api/products', productRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/webhook', webhookRouter);

app.use('/media', mediaRouter);

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`>> Server is running at http://localhost:${PORT}`));
    } catch (error) {
        console.log(`\n[ERROR] >>`, error.message, '\n');
        process.exit(1);
    }
}

startServer();