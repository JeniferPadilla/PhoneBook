import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRouter.js";
import phoneBookR from "./routes/phoneBookRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/contact", contactRouter);
app.use("/api/phoneBook",phoneBookR);

app.listen(process.env.PORT,()=>console.log("Backend server running on port: ", process.env.PORT));

db.dbConnection();