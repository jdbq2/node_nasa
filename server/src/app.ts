import path from "path";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { planetsRouter } from "./routes/planets.router";
import { launchesRouter } from "./routes/launches.router";
export const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(morgan("short"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// RUTAS

app.use("/api/planets", planetsRouter);
app.use("/api/launches", launchesRouter);
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
