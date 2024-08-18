const dotenv = require("dotenv")
dotenv.config()

const config = require("config")

require("express-async-errors")

const express = require('express')
const app = express()

require("./data/db")()

const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    optionsSuccessStatus: 200,
}))

const router = require("./routers/router")
app.use(router)

console.log(config.get("username"));
console.log(app.get("env"));

const port = process.env.PORT || 3776
app.listen(port, () => console.log(`Example app listening on port ${port}!`))