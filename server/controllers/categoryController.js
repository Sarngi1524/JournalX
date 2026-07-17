const Category = require("../models/Category");
const slugify = require("slugify");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;

    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description,
      color,
      icon,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
};