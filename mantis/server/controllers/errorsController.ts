import { AuthenticatedRequest } from "../types/types";
import { Response, NextFunction, RequestHandler } from "express";
import axios from "axios";
import User from "../models/userModel";
import { Point, InfluxDB } from "@influxdata/influxdb-client";

const wiremock_base = process.env.WIREMOCK_BASE || "http://wiremock:8080";


export const error4xx: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Error 4xx method in error4xx controller trigger");

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No userfound" });
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

    console.log("Fetching metrics from Prometheus for user:", username);
    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    const query =
      'sum(rate(http_request_duration_seconds_count{status=~"4.."}[1m]))';
    const { data } = await axios.get(prometheusUrl, {
      timeout: 5000,
      params: { query: query },
    });
    console.log("Prometheus raw response:", data);

    if (
      !data ||
      data.status !== "success" ||
      !Array.isArray(data.data?.result) ||
      data.data.result.length === 0
    ) {
      console.warn("No valid 4xx data from Prometheus.");
      return res
        .status(404)
        .json({ 
          wiremockData: wiremockData,
          message: "No 4xx data available from Prometheus" });
    }

    const firstVal = data.data.result[0]?.value;
    const error4xx = firstVal ? parseFloat(firstVal[1]) : 0;

    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const writeApi = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    }).getWriteApi(orgName, user.bucket, "ms");

    const point = new Point("4xx")
      .tag("endpoint", wiremockEndpoint)
      .floatField("4xx", error4xx);

    writeApi.writePoint(point);
    await writeApi.flush();

    console.log("4xx data written to InfluxDB for user:", username);

    return res.status(200).json({
      wiremockEndpoint: wiremockEndpoint,
      wiremockData: wiremockData,
      metric: "error4xx",
      value: error4xx,
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error("Error in error4xx controller", err);
    return next(err);
  }
}