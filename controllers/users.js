const { User, validateRegister, validateLogin } = require("../models/user")
const bcrypt = require("bcrypt")

exports.post_register = async (req, res) => {
    const { error } = validateRegister(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const checkUser = await User.findOne({ email: req.body.email })
    if (checkUser) return res.status(400).send("Bu E-posta Adresi Zaten Kullanımda")


    const user = new User(req.body)
    // hashing the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.createAuthToken()

    res.header("x-auth-token", token).send(user)

}

exports.post_login = async (req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Hatali Email")

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ message: "Şifre Yanliş" })

    const token = user.createAuthToken()

    res.header("x-auth-token", token).send(token)
}