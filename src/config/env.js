import { config } from "dotenv";

config({
    path: '.env',
    debug: process.env.MODE === 'dev',
})

export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_DB = process.env.MONGODB_DB;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;
export const API_URL = process.env.API_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
export const AWS_MAX_UPLOAD_SIZE = process.env.AWS_MAX_UPLOAD_SIZE;