import express from "express";
import { getAllProperties, createProperty, updateProperty, deleteProperty }  from "../controllers/property.controller.js";
import {protectRoute, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProperties);
router.post("/create", protectRoute,adminOnly, createProperty);
router.put("/:id", protectRoute, updateProperty);
router.delete("/:id", protectRoute, deleteProperty);

export default router;
