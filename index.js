// dotenv
const dotenv = require("dotenv")
dotenv.config()

const config = require("config")
// express async error handling
require("express-async-errors")

// express
const express = require('express')
const app = express()

// connection to db
require("./data/db")()

// cors
const cors = require("cors")

// middleware
app.use(express.json())
app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    optionsSuccessStatus: 200,
}))

// router
const products = require("./routers/products")
const categories = require("./routers/categories")
const users = require("./routers/users")
const home = require("./routers/home")
const error = require("./middlewares/error")

app.use("/api/products", products)
app.use("/api/categories", categories)
app.use("/api/users", users)
app.use("/api", home)
app.use(error)


console.log(config.get("username"));
console.log(app.get("env"));

const port = process.env.PORT || 3776
app.listen(port, () => console.log(`Example app listening on port ${port}!`))