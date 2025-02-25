import mongoose from "mongoose";

// export const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     throw error; 
//   }
// };


export async function Connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}
