const PORT = process.env.PORT || 8000;
import http from "http";
import { app } from "./app";
import { loadPlanetsData } from "./models/planets.model";
import { dbConnect } from "./db/db";
import { loadLaunchesData } from "./models/launches.model";
import "dotenv/config";

const server = http.createServer(app);

async function initialServerLoad() {
    try {
        await dbConnect();
        await loadPlanetsData();
        await loadLaunchesData();
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}.`);
        });
    } catch (error) {
        console.log(error);
    }
}

initialServerLoad();
