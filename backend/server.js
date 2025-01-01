import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from 'cloudinary';

import connectDB from "./src/config/db.js";

import adminRoutes from "./src/routes/admin.route.js";
import userRoutes from "./src/routes/user.route.js";
import propertyRoutes from "./src/routes/property.route.js";


const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})



const Port = process.env.PORT || 6070;
console.log(process.env.CLOUDINARY_CLOUD_NAME);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())






app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("api/property", propertyRoutes);


app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
  connectDB();
});


