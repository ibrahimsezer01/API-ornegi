const { Category } = require("../models/category")
const { Product } = require("../models/product")


exports.get_home = async (req, res) => {
    try {
        const products = await Product.find()
        const categories = await Category.find()

        return res.status(200).send({ products, categories })

    } catch (error) {
        console.log(error);
    }
}