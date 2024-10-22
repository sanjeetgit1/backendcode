import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
// import path from "path";
export const app = express();
app.use(cors({origin:"http://localhost:3000/",credentials:true}))
            
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

import { userRouter } from "./routes/User.js";
app.use("/api/v1", userRouter);

// app.use(express.static(path.resolve("./frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("./frontend/build/index.html"));
// });