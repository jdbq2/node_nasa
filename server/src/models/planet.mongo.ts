import { Schema, model } from "mongoose";

const planetSchema = new Schema({
    kepler_name: {
        type: String,
        required: true,
    },
});

export const planetModel = model("Planet", planetSchema);
