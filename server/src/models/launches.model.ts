import { Launch } from "../interfaces/Launch";

export const launches = new Map<number, Launch>();

let latestFlightNumber: number = 100;

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

export function getAllLaunches() {
    return Array.from(launches.values());
}

export function addNewLaunch(launch: Launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customers: ["NASA", "ZTM"],
            success: true,
            upcoming: true,
        })
    );
}

export function launchExist(id: string) {
    return launches.has(Number(id));
}

export function deleteLaunch(id: string) {
    const aborted = launches.get(Number(id));
    if (aborted) {
        aborted.upcoming = false;
        aborted.success = false;
    }
    return aborted;
}

launches.set(launch.flightNumber, launch);
