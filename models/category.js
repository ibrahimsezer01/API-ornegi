const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const categorySchema = new Schema({
    name: String,
})

// Validate
function validateCategory(category) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(40).required(),
    })

    return schema.validate(category)
}

const Category = mongoose.model("Category", categorySchema) // model

module.exports = { Category, validateCategory }