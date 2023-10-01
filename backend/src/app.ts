import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todoRoutes from "./routes/todos";
import cors from "cors";

const app = express();

app.use(cors());

app.use(json());

app.use("/", todoRoutes);

app.use(
  (err: Error, req: express.Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  }
);

app.listen(3000);
