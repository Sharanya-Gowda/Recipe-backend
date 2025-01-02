const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Save recipes to MongoDB
router.post('/save', async (req, res) => {
    try {
        const { recipes } = req.body;
        console.log('Received recipes:', recipes); // Log incoming data
        
        if (!recipes || recipes.length === 0) {
            return res.status(400).json({ message: 'No recipes provided.' });
        }

        // Insert recipes into MongoDB
        const savedRecipes = await Recipe.insertMany(recipes);
        console.log('Successfully saved recipes:', savedRecipes);

        res.status(200).json({ message: 'Recipes saved successfully!' });
    } catch (error) {
        console.error('Error saving recipes:', error);  // Log detailed error
        res.status(500).json({ message: 'Error saving recipes', error: error.message });
    }
});

// Fetch recipes from MongoDB
router.get('/fetch', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
});

module.exports = router;
