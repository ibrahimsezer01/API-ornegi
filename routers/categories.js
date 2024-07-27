// express router
const express = require("express")
const router = express.Router()

const category = require("../controllers/categories")

router.get('/', category.get_categories)

router.post('/', category.post_category)

router.put('/:id', category.put_category)

router.delete('/:id', category.delete_category)

router.get('/:id', category.get_category_ById)

module.exports = router