import mongoose from "mongoose";

export async function Connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}
