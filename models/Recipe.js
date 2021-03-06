const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipeName: {
        type: String,
        required: true
    },
    serving: {
        type: Number,
        required: true
    },
    prepTimeHours: {
        type: Number,
        default: 0
    },
    prepTimeMins: {
        type: Number,
        required: true
    }, 
    price: {
        type: String,
        required: true
    },
    recipeType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    steps: {
        type: Array,
        // Object: step number - content
        required: true
    },
    ingredients: {
        type: Array,
        // Object: Ingredient name - quantity
        required: true
    },
    saved: {
        type: Array,
        default: []
    },
    reviews: {
        type: Array,
        // Object: authorReviewId, authorReviewName, reviewDate, reviewRating, reviewContent
        default: []
    }
})

module.exports = mongoose.model('recipe', RecipeSchema)