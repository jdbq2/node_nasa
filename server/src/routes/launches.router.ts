import { Router } from "express";
import {
    abortLaunch,
    createLaunch,
    getLauches,
} from "../controllers/lauches.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { isCorrectDateFormat } from "../middlewares/isCorrectDateFormat";

export const launchesRouter = Router();

launchesRouter.get("/", getLauches);
launchesRouter.post(
    "/",
    [
        check("rocket", "rocket field is mandatory").notEmpty(),
        check("mission", "mission field is mandatory").notEmpty(),
        check("launchDate").custom(isCorrectDateFormat),
        validateFields,
    ],
    createLaunch
);
launchesRouter.delete(
    "/:id",
    [check("id", "Launch ID is mandatory").notEmpty(), validateFields],
    abortLaunch
);
