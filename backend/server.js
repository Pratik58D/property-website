import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import adminRoutes from "./src/routes/admin.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const Port = process.env.PORT || 6070;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use("/api/admin", adminRoutes);


app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
  connectDB();
});
