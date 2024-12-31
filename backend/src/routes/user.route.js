const express = require("express");
const { contactUs } = require("../controllers/userController");
const router = express.Router();

router.post("/contact", contactUs);

module.exports = router;
