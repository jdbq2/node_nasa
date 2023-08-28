import { Request, Response } from "express";
import { habitablePlanets } from "../models/planets.model";

export function getAllPlanets(req: Request, res: Response) {
    res.status(200).json({
        planets: habitablePlanets,
    });
}
