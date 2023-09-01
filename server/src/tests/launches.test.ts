import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { app } from "../app";
import { dbConnect, dbDisconnect } from "../db/db";

describe("Launches API", () => {
    beforeAll(async () => {
        await dbConnect();
    });
    afterAll(async () => {
        await dbDisconnect();
    });
    describe("Test GET /api/launches", () => {
        test("It should respond with 200 success", async () => {
            const response = await request(app).get("/api/launches");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("Test POST /api/launches", () => {
        const completeLaunchData = {
            target: "Kepler-442 b",
            launchDate: "December 16, 2025",
            mission: "Exploration X",
            rocket: "Explore IS1",
        };
        const launchWithoutDate = {
            target: "Kepler-442 b",
            mission: "Exploration X",
            rocket: "Explore IS1",
        };
        const launchInvalidDate = {
            target: "Kepler-442 b",
            mission: "Exploration X",
            rocket: "Explore IS1",
            launchDate: "invalid date",
        };

        test("It should respond with 201 success", async () => {
            const response = await request(app)
                .post("/api/launches")
                .send(completeLaunchData);

            const requestDate = new Date(
                completeLaunchData.launchDate
            ).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();

            expect(responseDate).toBe(requestDate);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject(launchWithoutDate);
        });
        test("It should catch missing required properties", async () => {
            const response = await request(app)
                .post("/api/launches")
                .send(launchWithoutDate);
            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({
                errors: [
                    {
                        type: "field",
                        msg: "launchDate value is mandatory",
                        path: "launchDate",
                        location: "body",
                    },
                ],
            });
        });
        test("It should catch valid dates", async () => {
            const response = await request(app)
                .post("/api/launches")
                .send(launchInvalidDate);
            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({
                errors: [
                    {
                        type: "field",
                        value: "invalid date",
                        msg: "launchDate value is not a correct format date",
                        path: "launchDate",
                        location: "body",
                    },
                ],
            });
        });
    });
});
