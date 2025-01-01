import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";

import adminRoutes from "./src/routes/admin.route.js";
import userRoutes from "./src/routes/user.route.js";


const app = express();
dotenv.config();

const Port = process.env.PORT || 6070;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);


app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
  connectDB();
});
