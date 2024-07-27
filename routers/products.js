// express router
const express = require("express")
const router = express.Router()

const product = require("../controllers/products")


router.get('/', product.get_products)

router.post('/', product.post_product)

router.put('/:id', product.put_product)

router.delete('/:id', product.delete_product)

router.get('/:id', product.get_product_ById)

module.exports = router