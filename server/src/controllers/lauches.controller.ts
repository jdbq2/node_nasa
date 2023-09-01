import { Request, Response } from "express";
import {
    scheduleNewLaunch,
    deleteLaunch,
    getAllLaunches,
    launchExist,
} from "../models/launches.model";

export async function getLauches(req: Request, res: Response) {
    const queryParams = req.query;
    const limit = Math.abs(Number(queryParams.limit)) || 0;
    const page = Math.abs(Number(queryParams.page)) || 1;

    const data = await getAllLaunches(limit, page);
    return res.status(200).json(data);
}

export async function createLaunch(req: Request, res: Response) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

export async function abortLaunch(req: Request, res: Response) {
    const { id } = req.params;
    const correctLaunchID = await launchExist(id);
    if (!correctLaunchID) {
        return res.status(404).json({
            msg: "Launch not Found",
        });
    }
    const aborted = await deleteLaunch(id);
    if (!aborted) {
        return res.status(500).json({
            msg: "Launch not aborted",
        });
    }
    return res.status(200).json({
        ok: true,
    });
}
