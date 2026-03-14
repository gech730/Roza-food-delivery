import food_list from "../models/foodModel.js";
import fs from "fs";

/**
 * Add New Food Item
 * Creates a new food item with image upload
 */
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  try {
    const newFood = new food_list({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: image_filename,
      category: req.body.category,
    });

    await newFood.save();
    res.status(201).json({ success: true, message: "Food added successfully", newFood });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding food"});
  }
};

/**
 * Get All Food Items
 * Retrieves all food items from database
 */
const readFood = async (req, res) => {
  try {
    const foods = await food_list.find({});
    if (!foods)
      return res.status(404).json({ success: false, message: "No food items found" });
    res.status(200).json({ success: true, data: foods });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Delete Food Item
 * Removes a food item and its image from the server
 */
const deleteFood = async (req, res) => {
  try {
    const food = await food_list.findById(req.body.id);
    if (!food)
      return res.status(404).json({ success: false, message: "Food item not found" });
    
    // Delete the image file from uploads folder
    fs.unlink(`uploads/${food.image}`, () => {});
    
    await food_list.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Update Food Item
 * Edits an existing food item's details
 */
const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;
    
    // Find existing food item
    const existingFood = await food_list.findById(id);
    if (!existingFood) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    
    // Prepare update object
    const updateData = {
      name: name || existingFood.name,
      description: description || existingFood.description,
      price: price || existingFood.price,
      category: category || existingFood.category,
    };
    
    // If new image is uploaded, use it and delete old image
    if (req.file) {
      // Delete old image
      fs.unlink(`uploads/${existingFood.image}`, () => {});
      updateData.image = req.file.filename;
    }
    
    // Update the food item
    const updatedFood = await food_list.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: "Food updated successfully", 
      data: updatedFood 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get Single Food Item
 * Retrieves a specific food item by ID
 */
const getFoodById = async (req, res) => {
  try {
    const food = await food_list.findById(req.body.id);
    if (!food)
      return res.status(404).json({ success: false, message: "Food item not found" });
    res.status(200).json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addFood, readFood, deleteFood, updateFood, getFoodById };
