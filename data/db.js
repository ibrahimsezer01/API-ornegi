const mongoose = require("mongoose")
const config = require("../config")

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${config.db.username}:${config.db.password}@${config.db.cluster}.amufmzi.mongodb.net/${config.db.database}`)
        console.log("Bağlanti oluşturuldu");
    } catch (error) {
        console.log(error);
    }
}


module.exports = connect