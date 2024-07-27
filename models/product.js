const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const commentSchema = new Schema({
    text: String,
    username: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    date: {
        type: Date,
        default: Date.now()
    },
    isActive: Boolean,
    category: { 
        type: Schema.Types.ObjectId, 
        ref: "Category" 
    },
    comments: [commentSchema] // Comment Schema'yı array içerisine tanımlıyoruz
})


// Validate
function validateProduct(product) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(40).required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        isActive: Joi.boolean(),
        category: Joi.string().required(),
        comments: Joi.array().items(Joi.object({
            text: Joi.string().required(),
            username: Joi.string().required(),
            date: Joi.date()
        }))
    })

    return schema.validate(product)
}

const Product = mongoose.model("Product", productSchema)
const Comment = mongoose.model("Comment", commentSchema)

module.exports = { Product, Comment, validateProduct }