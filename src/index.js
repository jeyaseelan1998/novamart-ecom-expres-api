import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { FRONTEND_URL, PORT } from './config/env.js';
import { setupSwagger } from './config/swagger.js';
import connectDB from "./config/db.js";
import testRoutes from './routes/test.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import mediaRoutes from './routes/media.routes.js';
import errorRoutes from './routes/error.route.js';
import { config } from "dotenv";

config({
    path: `${process.cwd()}/.env`,
    debug: process.env.MODE === 'dev',
})

console.log('\n\n');
console.log(process.env.MONGODB_URI, '\n\n');
console.log(process.env);

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

// Register swagger
setupSwagger(app);

// Frontend routes
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/error', errorRoutes);

app.use('/media', mediaRoutes);

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