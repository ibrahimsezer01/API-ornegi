const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // products: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Product"
    //     }
    // ]
}, { timestamps: true})


// Validate
function validateRegister(user) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(user)
}

function validateLogin(user) {
    const schema = new Joi.object({
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(user)
}

userSchema.methods.createAuthToken = () => {
    return jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET)
}

const User = mongoose.model("User", userSchema)
module.exports = { User, validateRegister, validateLogin }