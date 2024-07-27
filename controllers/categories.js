const { Category, validateCategory } = require("../models/category")



exports.put_category = async (req, res) => {
    try {
        const { error } = validateCategory(req.body)

        if (error) {
            return res.status(400).send("Girdiğiniz bilgileri kontrol ediniz")
        }

        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send("Gündellemek istediğiniz kategori bulunamadi")
        }

        category.name = req.body.name
        const updatedCategory = await category.save()

        return res.status(200).send(updatedCategory)

    } catch (error) {
        console.log(error);
    }
}

exports.post_category = async (req, res) => {
    try {
        const { error } = validateCategory(req.body)

        if (error) {
            return res.status(400).send("Girdiğiniz bilgileri kontrol ediniz")
        }

        const category = await Category.create({
            name: req.body.name
        })

        return res.status(200).send(category)

    } catch (error) {
        console.log(error);
    }
}

exports.delete_category = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if (!category) {
            return res.status(404).send("Silmek İstediğiniz Data Bulunamadi")
        }

        return res.send("Ürün Başariyla Silindi " + category)

    } catch (error) {
        console.log(error);
    }
}

exports.get_categories = async (req, res) => {
    try {
        const categories = await Category.find()

        return res.status(200).send(categories)

    } catch (error) {
        console.log(error);
    }
}

exports.get_category_ById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send("Aradiğiniz Kategori Bulunamamiştir")
        }

        return res.status(200).send(category)

    } catch (error) {
        console.log(error);
    }
}