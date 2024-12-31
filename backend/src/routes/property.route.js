const express = require("express");
const { getAllProperties, createProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");
const { protectAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllProperties);
router.post("/", protectAdmin, createProperty);
router.put("/:id", protectAdmin, updateProperty);
router.delete("/:id", protectAdmin, deleteProperty);

module.exports = router;
