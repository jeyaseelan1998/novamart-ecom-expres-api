import { connect } from "mongoose";


export default async function connectDB() {
    try {
        await connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB
        });
        console.log(">> DATABASE connected successfully");
    } catch (error) {
        console.log(`\n[ERROR] >>`, error.message, '\n');
        process.exit(1);
    }
}