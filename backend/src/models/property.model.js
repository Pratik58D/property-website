import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String, //in square meters
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: [String],
  status: { 
    type: String,
    enum : ['available','sold'], 
    default: "available" },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
