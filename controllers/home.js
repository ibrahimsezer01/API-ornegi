const { Category } = require("../models/category")
const { Product } = require("../models/product")

exports.get_home = async (req, res) => {
    const products = await Product.find()
    const categories = await Category.find()

    return res.status(200).send({ products, categories })
}