// express router
const express = require("express")
const router = express.Router()
const home = require("../controllers/home")


router.get('/', home.get_home)


module.exports = router