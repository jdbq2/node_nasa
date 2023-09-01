import axios from "axios";
import { Launch } from "../interfaces/Launch";
import { launchModel } from "./launch.mongo";

export async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat",
    });

    if (firstLaunch) {
        console.log("Data already loaded");
        return;
    }

    console.log("Downloading Launch Data...");

    const { data } = await axios.post(
        "https://api.spacexdata.com/v4/launches/query",
        {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: "rocket",
                        select: {
                            name: 1,
                        },
                    },
                    {
                        path: "payloads",
                        select: {
                            customers: 1,
                        },
                    },
                ],
            },
        }
    );
    const launchDocs = data.docs;
    for (const launchDoc of launchDocs) {
        const payloads: [] = launchDoc["payloads"];
        const customers: string[] = payloads.flatMap(
            (payload: { customers: string }) => payload["customers"]
        );
        const launch = {
            flightNumber: launchDoc["flight_number"],
            launchDate: launchDoc["date_local"],
            mission: launchDoc["name"],
            rocket: launchDoc["rocket"]["name"],
            success: launchDoc["success"],
            upcoming: launchDoc["upcoming"],
            customers: customers,
        };

        await saveLaunch(launch);
    }
}

async function findLaunch(filter: any): Promise<boolean> {
    return !!(await launchModel.findOne(filter));
}

export async function getAllLaunches(limit: number, page: number) {
    const skip = limit * (page - 1);
    try {
        return launchModel
            .find({}, { _id: 0, __v: 0 })
            .sort({ flightNumber: "ascending" })
            .skip(skip)
            .limit(limit);
    } catch (error) {
        console.log(error);
    }
}

export async function saveLaunch(launch: Launch) {
    try {
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
