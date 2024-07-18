const mongoose = require('mongoose')

//สร้าง Model table Schema
const listSchema = mongoose.Schema({
    //สร้าง filed
    name:String,
    todoName:{
        type: String
    },
    todoDate:{
        type: String
    },
    file:{
        type: String,
        default: 'noimage.jpg'
    }
// timestamps บอกเวลาที่สร้างข้อมูล
}, { timestamps: true })

module.exports = mongoose.model('ToDoList', listSchema)