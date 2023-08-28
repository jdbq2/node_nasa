import { Request, Response } from "express";
import {
    addNewLaunch,
    deleteLaunch,
    getAllLaunches,
    launchExist,
} from "../models/launches.model";

export function getLauches(req: Request, res: Response) {
    return res.status(200).json(getAllLaunches());
}

export function createLaunch(req: Request, res: Response) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

export function abortLaunch(req: Request, res: Response) {
    const { id } = req.params;
    if (!launchExist(id)) {
        return res.status(404).json({
            msg: "Launch not Found",
        });
    }
    const aborted = deleteLaunch(id);
    res.status(200).json(aborted);
}
