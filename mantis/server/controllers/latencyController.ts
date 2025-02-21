import { AuthenticatedRequest } from "../types/types";
import { Response, NextFunction, RequestHandler } from "express";
import axios from "axios";
import User from "../models/userModel";
import { Point, InfluxDB } from "@influxdata/influxdb-client";

export const p50Latency: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("P50 Latency method in latency controller trigger");
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

    console.log("Fetching metrics from Prometheus for user:", username);
    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    const query =
      "histogram_quantile(0.5, sum(rate(http_request_duration_seconds_bucket[1m])) by (le))";

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
      console.warn("No valid latency p50 data from Prometheus.");
      return res
        .status(404)
        .json({ message: "No latency p50 data available from Prometheus" });
    }

    const firstVal = data.data.result[0]?.value;
    const p50 = firstVal ? parseFloat(firstVal[1]) : 0;

    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const writeApi = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    }).getWriteApi(orgName, user.bucket, "ms");

    const point = new Point("p50_latency")
      .tag("endpoint", "p50_latency")
      .floatField("p50", p50);

    writeApi.writePoint(point);
    await writeApi.flush();

    console.log(`✅ Stored p50 latency data: ${p50} for user: ${username}`);

    return res.status(200).json({
      metric: "p50_latency",
      value: p50,
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error("Error in p50Latency method in latency controller", err);
    return next(err);
  }
};

export const p90Latency: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("P90 Latency method in latency controller trigger");
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

    console.log("Fetching metrics from Prometheus for user:", username);
    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    const query =
      "histogram_quantile(0.90, sum(rate(http_request_duration_seconds_bucket[1m])) by (le))";

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
      console.warn("No valid latency p90 data from Prometheus.");
      return res
        .status(404)
        .json({ message: "No latency p90 data available from Prometheus" });
    }

    const firstVal = data.data.result[0]?.value;
    const p90 = firstVal ? parseFloat(firstVal[1]) : 0;

    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const writeApi = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    }).getWriteApi(orgName, user.bucket, "ms");

    const point = new Point("p90_latency")
      .tag("endpoint", "p90_latency")
      .floatField("p90", p90);

    writeApi.writePoint(point);
    await writeApi.flush();

    console.log(`✅ Stored p90 latency data: ${p90} for user: ${username}`);

    return res.json({
      metric: "p90_latency",
      value: p90,
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error("Error in p50Latency method in latency controller", err);
    return next(err);
  }
};

export const p99Latency: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("P99 Latency method in latency controller trigger");
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

    console.log("Fetching metrics from Prometheus for user:", username);
    const prometheusUrl = "http://prometheus:9090/api/v1/query";
    const query =
      "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[1m])) by (le))";

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
      console.warn("No valid latency p99 data from Prometheus.");
      return res
        .status(404)
        .json({ message: "No latency p99 data available from Prometheus" });
    }

    const firstVal = data.data.result[0]?.value;
    const p99 = firstVal ? parseFloat(firstVal[1]) : 0;

    const orgName = process.env.INFLUX_ORG || "MainOrg";
    const writeApi = new InfluxDB({
      url: process.env.INFLUX_URL || "http://influxdb:8086",
      token: user.influxToken,
    }).getWriteApi(orgName, user.bucket, "ms");

    const point = new Point("p99_latency")
      .tag("endpoint", "p99_latency")
      .floatField("p99", p99);

    writeApi.writePoint(point);
    await writeApi.flush();

    console.log(`✅ Stored p99 latency data: ${p99} for user: ${username}`);

    return res.json({
      metric: "p99_latency",
      value: p99,
      source: "Prometheus",
      user: username,
    });
  } catch (err) {
    console.error("Error in p50Latency method in latency controller", err);
    return next(err);
  }
};
