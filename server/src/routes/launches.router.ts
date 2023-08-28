import { Router } from "express";
import { createLaunch, getLauches } from "../controllers/lauches.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { isCorrectDateFormat } from "../middlewares/isCorrectDateFormat";

export const launchesRouter = Router();

launchesRouter.get("/", getLauches);
launchesRouter.post(
    "/",
    [
        check("destination", "Destination field is mandatory").notEmpty(),
        check("rocket", "rocket field is mandatory").notEmpty(),
        check("mission", "mission field is mandatory").notEmpty(),
        check("launchDate").custom(isCorrectDateFormat),
        validateFields,
    ],
    createLaunch
);
