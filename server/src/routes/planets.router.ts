import { Router } from "express";
import { getAllPlanets } from "../controllers/planets.controller";

export const planetsRouter = Router();

planetsRouter.get("/", getAllPlanets);
