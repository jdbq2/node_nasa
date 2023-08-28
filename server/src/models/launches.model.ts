import { Launch } from "../interfaces/Launch";

export const launches = new Map<number, Launch>();

let latestFlightNumber: number = 100;

const launch = {
    customers: ["NASA", "ZTM"],
    destination: "Kepler-442 b",
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

launches.set(launch.flightNumber, launch);
