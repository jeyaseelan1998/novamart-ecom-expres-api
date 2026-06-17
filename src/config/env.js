import { config } from "dotenv";

config({
    path: `${process.cwd()}/.env`,
    debug: process.env.MODE === 'dev',
})

export const MONGODB_URI = process.env.RAILWAY_MONGODB_URI;
export const MONGODB_DB = process.env.RAILWAY_MONGODB_DB;
export const JWT_SECRET = process.env.RAILWAY_JWT_SECRET;
export const PORT = process.env.RAILWAY_PORT;
export const API_URL = process.env.RAILWAY_API_URL;
export const FRONTEND_URL = process.env.RAILWAY_FRONTEND_URL;
export const AWS_REGION = process.env.RAILWAY_AWS_REGION;
export const AWS_ACCESS_KEY_ID = process.env.RAILWAY_AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.RAILWAY_AWS_SECRET_ACCESS_KEY;
export const AWS_S3_BUCKET = process.env.RAILWAY_AWS_S3_BUCKET;
export const AWS_MAX_UPLOAD_SIZE = process.env.RAILWAY_AWS_MAX_UPLOAD_SIZE;