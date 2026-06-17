import { connect } from "mongoose";
import { MONGODB_DB, MONGODB_URI } from "./env.js";


export default async function connectDB() {
    try {
        await connect(MONGODB_URI, {
            dbName: MONGODB_DB
        });
        console.log(">> DATABASE connected successfully");
    } catch (error) {
        console.log(`\n[ERROR] >>`, error.message, '\n');
        process.exit(1);
    }
}