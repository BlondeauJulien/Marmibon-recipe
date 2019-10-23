const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    serving: {
        type: Number,
        required: true
    },
    prepTime: [{
        hours: Number,
        minutes: Number,
    }],
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('recipe', RecipeSchema)