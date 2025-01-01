import Property from "../models/property.model.js";
import {v2 as cloudinary} from 'cloudinary';

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, images ,size ,status} = req.body;
    if(!title || !description || !price || !location || !size || !status ){
      return res.status(400).json({ error: "All fields are Required." });
    }
  
    //upload images to cloudinary
    let imageUrls = [];
    if(images && images.length > 0){
      for (let i = 0 ; i < images.length ; i++){
        const result = await cloudinary.uploader(images[i],{
          folder : "properties",   //this is folder name in clodinary
        });
        imageUrls.push(result.secure_url);  //storing the urls
      }
    }
    const property = new Property({
      title,
      description,
      price,
      location,
      size,
      images : imageUrls,
      status
    });
    await property.save();
    res.status(201).json({ message: "Property created successfully", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//front end for any one
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};