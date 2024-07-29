const { Product, Comment, validateProduct } = require("../models/product")


exports.get_products = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name -_id")
            .select("-comments._id -comments.date")
        return res.send(products)

    } catch (error) {
        console.log(error);
    }
}

exports.get_product_ById = async (req, res) => {
    const productId = req.params.id

    try {
        const product = await Product.findById(productId)
            .populate("category", "name -_id")
            .select("-comments._id -comments.date")

        if (!product) {
            return res.status(404).send("Aradiğiniz Data Bulunamadi")
        }

        return res.send(product)

    } catch (error) {
        console.log(error);
    }
}

exports.post_product = async (req, res) => {
    const { error } = validateProduct(req.body)

    if (error) {
        return res.status(400).send("Hatali Giriş Yaptiniz, Lütfen Konrtol Ediiniz")
    }

    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        isActive: req.body.isActive,
        category: req.body.category,
        comments: req.body.comments
    })

    await product.save()
    return res.send(product)
}

exports.put_comment = async (req, res) => {
    const id = req.params.id
    const updatedComment = await Product.findByIdAndUpdate(
        id,
        {
            $push: {
                comments: {
                    text: req.body.text,
                    user: req.body.username
                }
            }
        },
        { new: true }
    );

    if (!updatedComment) {
        return res.status(404).send('Product bulunamadi');
    }

    await updatedComment.save()
    res.status(200).send(updatedComment)
}

exports.put_product = async (req, res) => {
    const productId = req.params.id

    const product = await Product.findById(productId)

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
    product.image = req.body.image
    product.isActive = req.body.isActive
    product.category = req.body.category

    const updatedProduct = await product.save()

    return res.send(updatedProduct)

}

exports.delete_comment = async (req, res) => {
    const productId = req.params.id

    const product = await Product.findById(productId)

    if (!product) {
        return res.status(404).send("Aradiğiniz Comment Bulunamadi")
    }

    const comment = product.comments.id(req.body.commentid)
    comment.deleteOne()

    const updatedProduct = await product.save()
    res.status(200).send(updatedProduct)
}

exports.delete_product = async (req, res) => {
    const productId = req.params.id

    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
        return res.status(404).send("Silmek İstediğiniz Data Bulunamadi")
    }

    return res.send("Ürün Başariyla Silindi " + product)
}