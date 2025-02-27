import { AuthenticatedRequest } from "../types/types";
import { Response, NextFunction, RequestHandler } from "express";
import axios from "axios";
import User from "../models/userModel";
import { Point, InfluxDB } from "@influxdata/influxdb-client";
import {generateModifier} from "./automation.ts"

const wiremock_base = process.env.WIREMOCK_BASE || "http://wiremock:8080";

// General function to fetch latency data from Prometheus and store it in InfluxDB
const fectchAnStoreLatency = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  quantile: number
) => {
  try {
    console.log("Latency method in latency controller trigger");
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

    const endpointQuery = req.query.endpoint as string;
    const wiremockEndpoint = endpointQuery || "/default";
    let wiremockData: any = null;

    try {
      const wiremockResponse = await axios.get(
        `${wiremock_base}${wiremockEndpoint}`
      );
      wiremockData = wiremockResponse.data;
    } catch (err) {
      console.error(
        `Error fetching wiremock data for endpoint: ${wiremockEndpoint}`,
        err
      );
      wiremockData = { error: "Failed calling Wiremock" };
    }

    console.log(
      `Fetching latency p${quantile * 100} from Prometheus for user:`,
      username
    );

    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    
    // Query to get the latency data from Prometheus Globally
    const query = `histogram_quantile(${quantile}, sum(rate(http_request_duration_seconds_bucket[1m])) by (le))`;
    // const query = `histogram_quantile(${quantile}, sum(rate(http_request_duration_seconds_bucket{route="${wiremockEndpoint}"}[1m])) by (le))`;

    const { data } = await axios.get(prometheusUrl, {
      timeout: 5000,
      params: { query: query },
    });

    console.log(`Prometheus raw response for p{$quantile * 100}:`, data);

    if (
      !data ||
      data.status !== "success" ||
      !Array.isArray(data.data?.result) ||
      data.data.result.length === 0
    ) {
      console.warn(`No valid latency p${quantile * 100} data from Prometheus.`);
      return res.status(404).json({
        wiremockData: wiremockData,
        message: `No latency p${quantile * 100} data available from Prometheus`,
      });
    }

    const firstVal = data.data.result[0]?.value;
    let latencyValue = firstVal ? parseFloat(firstVal[1]) : 0;

    const modifierFunction = generateModifier(wiremockEndpoint);
    latencyValue = modifierFunction(latencyValue);

    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const writeApi = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    }).getWriteApi(orgName, user.bucket, "ms");

    const point = new Point(`p${quantile * 100}_latency`)
      .tag("endpoint", wiremockEndpoint)
      .floatField(`p${quantile * 100}`, latencyValue);

    writeApi.writePoint(point);
    await writeApi.flush();

    console.log(
      `✅ Stored p${
        quantile * 100
      } latency data: ${latencyValue} for user: ${username}`
    );

    return res.status(200).json({
      metric: `p${quantile * 100}_latency`,
      wiremockEnpoint: wiremockEndpoint,
      wiremockData: wiremockData,
      value: latencyValue.toFixed(2),
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error(
      `Error in latency p${quantile * 100} method in latency controller: `,
      err
    );
    return next(err);
  }
};

// Controllers to fetch and store latency data for different quantiles
export const p50Latency: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  fectchAnStoreLatency(req, res, next, 0.5);
};

export const p90Latency: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  fectchAnStoreLatency(req, res, next, 0.9);
};

export const p99Latency: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  fectchAnStoreLatency(req, res, next, 0.99);
};
