import { Request, Response } from "express";
import { addNewLaunch, getAllLaunches } from "../models/launches.model";

export function getLauches(req: Request, res: Response) {
    return res.status(200).json(getAllLaunches());
}
export function createLaunch(req: Request, res: Response) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    addNewLaunch(launch);
    return res.status(201).json(launch);
}
