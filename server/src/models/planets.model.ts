import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { Planet } from "../interfaces/Planets";
import { planetModel } from "./planet.mongo";

function isHabitablePlanet(planet: Planet) {
    return (
        planet["koi_disposition"] === "CONFIRMED" &&
        Number(planet["koi_insol"]) > 0.36 &&
        Number(planet["koi_insol"]) < 1.11 &&
        Number(planet["koi_prad"]) < 1.6
    );
}

export function loadPlanetsData() {
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, "..", "..", "data", "kepler_data.csv")
        )
            .pipe(
                parse({
                    comment: "#",
                    columns: true,
                })
            )
            .on("data", (data: Planet) => {
                if (isHabitablePlanet(data)) {
                    populatePlanet(data);
                }
            })
            .on("error", (err: Error) => {
                console.log(err);
                reject(err);
            })
            .on("end", async () => {
                const countPlanetsFound = (await getHabitablePlanets())?.length;
                console.log(`${countPlanetsFound} Planets Found!`);
                resolve();
            });
    });
}

async function populatePlanet(planet: Planet) {
    try {
        await planetModel.updateOne(
            { kepler_name: planet.kepler_name },
            { kepler_name: planet.kepler_name },
            { upsert: true }
        );
    } catch (error) {
        console.log(error);
    }
}

export const getHabitablePlanets = async () => {
    try {
        return await planetModel.find({}, { _id: 0, __v: 0 });
    } catch (error) {
        console.log(error);
    }
};
