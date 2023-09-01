import { Launch } from "../interfaces/Launch";
import { launchModel } from "./launch.mongo";
import { planetModel } from "./planet.mongo";

const launch = {
    customers: ["NASA", "ZTM"],
    target: "Kepler-442 b",
    flightNumber: 100,
    launchDate: new Date("December 27, 2030"),
    mission: "Exploration X",
    rocket: "Explore IS1",
    success: true,
    upcoming: true,
};

export async function getAllLaunches() {
    try {
        return launchModel.find({}, { _id: 0, __v: 0 });
    } catch (error) {
        console.log(error);
    }
}

export async function saveLaunch(launch: Launch) {
    try {
        const planetTarget = await planetModel.findOne({
            kepler_name: launch.target,
        });
        if (!planetTarget) {
            throw new Error("No Match target planet");
        }
        await launchModel.findOneAndUpdate(
            {
                flightNumber: launch.flightNumber,
            },
            launch,
            { upsert: true }
        );
    } catch (error) {
        console.log(error);
    }
}

export async function scheduleNewLaunch(launch: Launch) {
    const latestFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["NASA", "ZTM"],
        success: true,
        upcoming: true,
    });
    saveLaunch(newLaunch);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchModel.findOne().sort("-flightNumber");
    if (!latestLaunch) {
        return 100;
    }
    return latestLaunch?.flightNumber;
}

export async function launchExist(id: string) {
    return launchModel.findOne({ flightNumber: id });
}

export async function deleteLaunch(id: string) {
    const aborted = await launchModel.updateOne(
        { flightNumber: id },
        {
            upcoming: false,
            success: false,
        }
    );

    return aborted.acknowledged;
}

saveLaunch(launch);
