// express router
const express = require("express")
const router = express.Router()

// router
const products = require("./products")
const categories = require("./categories")
const users = require("./users")
const home = require("./home")
const error = require("../middlewares/error")

router.use("/api/products", products)
router.use("/api/categories", categories)
router.use("/api/users", users)
router.use("/api", home)
router.use(error)

module.exports = router