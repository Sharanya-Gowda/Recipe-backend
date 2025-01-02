const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    label: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    ingredients: { type: [String], required: true },
    mealType: { type: String, required: true },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
