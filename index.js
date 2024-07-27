// dotenv
const dotenv = require("dotenv")
dotenv.config()

// config
const config = require("./config")

// express
const express = require('express')
const app = express()

// connection to db
const db = require("./data/db")()

// cors
const cors = require("cors")

// middleware
app.use(express.json())

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
//     res.setHeader("Access-Control-Allow-Methods", "GET POST PUT DELETE")
//     next()
// })
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5500/veya-baska-bir-url-daha"],
    optionsSuccessStatus: 200,
}))

// router
const products = require("./routers/products")
const categories = require("./routers/categories")
const home = require("./routers/home")

app.use("/api/products", products)
app.use("/api/categories", categories)
app.use(home)

// data
// const dummyData = require("./data/dummy-data")
// async function productData() {
//     await dummyData();
// }
// productData()

const port = process.env.PORT || 3776
app.listen(port, () => console.log(`Example app listening on port ${port}!`))