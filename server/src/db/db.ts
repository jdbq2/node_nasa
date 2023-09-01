import mongoose from "mongoose";
import "dotenv/config";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN || "");
        console.log("DB Online");
    } catch (error) {
        console.log(error);
        throw new Error("Error in the db connection");
    }
};

export const dbDisconnect = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        throw new Error("Error in the db disconnection");
    }
};
