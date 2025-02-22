import { Request } from "express";
import { Document } from "mongoose";

export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

// export interface LatencyController {
//   p50Latency: (req: Request, res: Response, next: NextFunction) => Promise<void> | Response;
//   p90Latency: (req: Request, res: Response, next: NextFunction) => Promise<void> | Response;
//   p99Latency: (req: Request, res: Response, next: NextFunction) => Promise<void> | Response;
// }

// export interface TrafficController {
//   rps: (req: Request, res: Response, next: NextFunction) => Promise<void> | Response;
//   trafficEndpoint: (req: Request, res: Response, next: NextFunction) => Promise<void> | Response;
// }

// export interface UserController {
//   createNewUser: (req: Request, res: Response, next: NextFunction) => Promise<void> | Response;
//   loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
// }

export interface IUser extends Document {
  username: string;
  password: string;
  influxToken: string;
  bucket: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export interface UserPrometheus extends Request{
  user?: {username : string}
}