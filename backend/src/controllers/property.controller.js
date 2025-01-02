import Property from "../models/property.model.js";
import { v2 as cloudinary } from "cloudinary";

//Controller for admin only to create property
export const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, images, size, status } =
      req.body;
    if (!title || !description || !price || !location || !size) {
      return res.status(400).json({ error: "All fields are Required." });
    }

    //upload images to cloudinary
    let imageUrls = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader(images[i], {
          folder: "properties", //this is folder name in clodinary
        });
        imageUrls.push(result.secure_url); //storing the urls
      }
    }
    const property = new Property({
      title,
      description,
      price,
      location,
      size,
      images: imageUrls,
      status,
    });
    await property.save();
    res
      .status(201)
      .json({ message: "Property created successfully", property });
  } catch (error) {
    console.error("Error in creating property: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

//update property by admin only
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, images, size, status } =
      req.body;

    //find the property by id
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    //handle new images
    let updatedImages = [...property.images];
    if (images && images.length > 0) {
      //upload new images to cloudinary
      const uploadedImages = [];
      for(let img of images){
        const result = await cloudinary.uploader.upload(img, {
          folder: "properties", //this is folder name in clodinary
        });
        updatedImages.push(result.secure_url); //storing the urls 
      }
      updatedImages = [...updatedImages,...uploadedImages];

      //remove old images from cloudinary if they are replaced
      for (let image of property.images) {
        const public_id = image.split("/").slice(-1)[0].split(".")[0]; //getting the public id of image
        await cloudinary.uploader.destroy(public_id); //deleting the image
      }
    };
    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;
    property.size = size || property.size;
    property.images = updatedImages;
    property.status = status || property.status;

    const updatedProperty = await property.save();
    res.status(200).json({message:"update sucessful",updatedProperty});
  } catch (error) {
    console.error("Error in updating property: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

//delete the property by admin only
export const deleteProperty = async (req, res) => {
  try {
    const {id} = req.params;
    const property = await Property.findById(id);
    if(!property){
      return res.status(404).json({error:"Property not found"});
    };
    //delete images from cloudinary
    for(let images of property.images){
      const public_id = images.split("/").slice(-1)[0].split(".")[0]; //getting the public id of image
      await cloudinary.uploader.destroy(public_id); //deleting the image
    }

    await Property.findByIdAndDelete(id);
    res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error("Error in deleting property: ", error.message);
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
