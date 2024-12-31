const Property = require("../models/Property");

exports.contactUs = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    // Handle sending emails or storing inquiries
    res.status(200).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
