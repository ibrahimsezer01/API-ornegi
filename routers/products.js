// express router
const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")

const product = require("../controllers/products")


router.get('/', product.get_products)

router.get('/:id', auth, product.get_product_ById)

router.post('/', auth, product.post_product)

router.put('/:id', auth, product.put_product)

router.put('/comment/:id', auth, product.put_comment)

router.delete('/:id', auth, product.delete_product)

router.delete('/comment/:id', auth, product.delete_comment)

module.exports = router