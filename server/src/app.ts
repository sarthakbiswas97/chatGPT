import express from "express"
import { config } from "dotenv"
import morgan from "morgan"
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

config();
const app = express();


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it inside production
app.use(morgan());

app.use("/api/v1", appRouter);

export default app;