import axios from "axios";
// import { Point, InfluxDB } from "@influxdata/influxdb-client";
// import { influxDB } from "../controllers/userController";
import { Response, NextFunction, RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/types";
import User from "../models/userModel";

const wiremock_base = process.env.WIREMOCK_BASE || "http://wiremock:8080";

export const getEnpoints: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("Getting Endpoints ...");
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    const { username } = req.user;

    if (!username) {
      return res
        .status(400)
        .json({ error: "Missing 'username' in the request body." });
    }

    const user = await User.findOne({ username });

    if (!user || !user.influxToken || !user.bucket) {
      return res
        .status(404)
        .json({ error: "No Influx credentials found for this user." });
    }

    const wireResp = await axios.get(`${wiremock_base}/__admin/mappings`);

    const endpoints = wireResp.data.mappings.map(
      (m: any) => m.request.urlPath || m.request.url || ""
    );

    return res.json({
      endpoints,
    });
  } catch (err) {
    console.error("Error fetching endpoints", err);
    next(err);
  }
};
