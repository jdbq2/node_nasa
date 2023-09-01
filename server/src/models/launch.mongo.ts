import { Schema, model } from "mongoose";

const launchSchema = new Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    target: {
        type: String,
    },
    rocket: {
        type: String,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    customers: {
        type: [String],
        required: true,
    },
});

export const launchModel = model("Launch", launchSchema);
