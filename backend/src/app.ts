import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("UniFlow API Running");
});

export default app;