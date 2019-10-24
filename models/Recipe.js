const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    serving: {
        type: Number,
        required: true
    },
     prepTime: [{
        hours: Number,
        minutes: Number,
    }], 
    price: {
        type: String,
        default: "cheap"
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    steps: {
        type: Array,
        // Object: title - content
        required: true
    },
    ingredients: {
        type: Array,
        // Object: Ingredient name - quantity
        required: true
    }
})

module.exports = mongoose.model('recipe', RecipeSchema)