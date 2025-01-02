const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipes'); // Import the recipe routes
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/recipeApp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log('MongoDB connection error:', err));

const mongoDBConnection = new MongoClient("mongodb://localhost:27017");
mongoDBConnection.connect()
    .then(() => {
        console.log("Connected to database!");

        const db = mongoDBConnection.db("recipeApp");
        const collection = db.collection("recipes");

        return collection.find({}).toArray(); // Return the promise
    })
    .then((result) => {
        console.log(result); // Log the resolved data
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    })
    .finally(() => {
        mongoDBConnection.close(); // Ensure the connection is closed
    });


// Use recipe routes
app.use('/api/recipes', recipeRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
