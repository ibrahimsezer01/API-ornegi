const express = require("express")
const router = express.Router()

const user = require("../controllers/users")

// router.get('/', user.get_users)

router.post('/register', user.post_register)

router.post('/login', user.post_login)

// router.put('/:id', user.put_user)

// router.delete('/:id', user.delete_user)

// router.get('/:id', user.get_user_ById)

module.exports = router