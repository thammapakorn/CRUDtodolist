const mongoose = require('mongoose')

//เชื่อมต่อ mongodb
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/TodoDB')
        console.log('DB Connected')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB

