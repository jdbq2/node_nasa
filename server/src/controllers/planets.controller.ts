import { Request, Response } from "express";
import { getHabitablePlanets } from "../models/planets.model";

export async function getAllPlanets(req: Request, res: Response) {
    const planets = await getHabitablePlanets();
    res.status(200).json(planets);
}
