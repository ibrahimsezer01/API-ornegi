const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const categorySchema = new Schema({
    name: String,
    product: [{ type: Schema.Types.ObjectId, ref: "Product" }]
})

// Validate
function validateCategory(category) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(40).required(),
        product: Joi.array().items(Joi.string())
    })

    return schema.validate(category)
}

const Category = mongoose.model("Category", categorySchema)

module.exports = { Category, validateCategory }