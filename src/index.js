import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { setupSwagger } from './config/swagger.js';
import connectDB from "./config/db.js";
import testRoutes from './routes/test.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import mediaRoutes from './routes/media.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true,
}));

// Register swagger
setupSwagger(app);

// Frontend routes
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use('/api/media', mediaRoutes);

async function startServer() {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => console.log(`>> Server is running at http://localhost:${process.env.PORT}`));
    } catch (error) {
        console.log(`\n[ERROR] >>`, error.message, '\n');
        process.exit(1);
    }
}

startServer();