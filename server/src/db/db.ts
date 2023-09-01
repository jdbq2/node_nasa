import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(
            `mongodb://jdbq1612:abcd1234@127.0.0.1:27017/ztm_nasa?authSource=admin`
        );
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
