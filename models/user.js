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
    isAdmin: {
        type: Boolean,
    }
    // products: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Product"
    //     }
    // ]
}, { timestamps: true })


// Validate
function validateRegister(user) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.boolean()
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

userSchema.methods.createAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.TOKEN_SECRET)
}

const User = mongoose.model("User", userSchema)
module.exports = { User, validateRegister, validateLogin }