const mongoose  = require('mongoose')

mongoose.set("strictQuery",true)

async function connecttoMongoDB(url){
    return mongoose.connect(url);  
}

module.exports = {
    connecttoMongoDB,
}