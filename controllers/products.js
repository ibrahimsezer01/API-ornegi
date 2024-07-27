const { Product, validateProduct } = require("../models/product")


exports.get_products = async (req, res) => {
    try {
        const products = await Product.find()
        return res.send(products)

    } catch (error) {
        console.log(error);
    }
}

exports.get_product_ById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).send("Aradiğiniz Data Bulunamadi")
        }

        const { error } = validateProduct(req.body)

        if (error) {
            return res.status(400).send(error)
        }

        return res.send(product)

    } catch (error) {
        console.log(error);
    }
}

exports.post_product = async (req, res) => {
    try {
        const { error } = validateProduct(req.body)

        if (error) {
            return res.status(400).send(error)
        }

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            isActive: req.body.isActive
        })

        await product.save()
        return res.send(product)

    } catch (error) {
        console.log(error);
    }
}

exports.put_product = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).send("Güncellemek İstediğini Data Bulunamadi")
        }

        const { error } = validateProduct(req.body)

        if (error) {
            return res.status(400).send(error)
        }

        product.name = req.body.name
        product.price = req.body.price
        product.description = req.body.description
        product.image =  req.body.image
        product.isActive = req.body.isActive

        const updatedProduct = await product.save()

        return res.send(updatedProduct)

    } catch (error) {
        console.log(error);
    }
}

exports.delete_product = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).send("Silmek İstediğiniz Data Bulunamadi")
        }

        return res.send("Ürün Başariyla Silindi " + product)

    } catch (error) {
        console.log(error);
    }
}