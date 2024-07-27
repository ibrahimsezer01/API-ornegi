const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    date: {
        type: Date,
        default: Date.now()
    },
    isActive: Boolean
})


// Validate
function validateProduct(product) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(40).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        isActive: Joi.boolean()
    })

    return schema.validate(product)
}

const Product = mongoose.model("Product", productSchema) // model

module.exports = { Product, validateProduct }