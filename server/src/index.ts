const PORT = process.env.PORT || 8000;
import http from "http";
import { app } from "./app";
import { loadPlanetsData } from "./models/planets.model";
import { dbConnect } from "./db/db";

const server = http.createServer(app);

async function initialServerLoad() {
    try {
        await dbConnect();
        await loadPlanetsData();
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}.`);
        });
    } catch (error) {
        console.log(error);
    }
}

initialServerLoad();
