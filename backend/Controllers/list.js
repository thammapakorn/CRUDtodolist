const TodoList = require('../Models/TodoList')
const fs = require('fs')

//คำสั่ง crud
//แสดงข้อมูลทั้งหมด find({})
exports.list = async(req,res)=>{
    try{
        const listed = await TodoList.find({}).exec();
        res.send(listed)
    }catch(err){
        //error
        console.log(err)
        res.status(500).send("server error")
    }
}

//แสดงข้อมูล ต้องการ id
exports.read = async(req,res) =>{
    try{
        const id = req.params.id
        const listed = await TodoList.findOne({ _id: id }).exec();
        res.send(listed)
    }catch(err){
        //error
        console.log(err)
        res.status(500).send("server error")
    }
}

//สร้างข้อมูล
exports.create = async(req,res)=>{
    try{
        // code 
        var data = req.body
        if(req.file){
            data.file = req.file.filename
        }
        //ส่งข้อมูลไปบันทึก
        const listed =  await TodoList(data).save()
        res.send(listed)
    }catch(err){
        //error
        console.log(err)
        res.status(500).send("server error")
    }
}

//แก้ไขข้อมูล ต้องการ id
exports.update = async(req,res)=>{
    try{
        const id = req.params.id
        var newData = req.body
        if(typeof req.file !== 'undefined'){
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.fileold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        const updated = await TodoList.findOneAndUpdate({ _id : id },
            req.body,{ new: true }).exec()
            res.send(updated)
        }catch(err){
        //error
            console.log(err)
            res.status(500).send("server error")
        }
}


//ลบข้อมูล ต้องการ id
exports.remove = async(req,res)=>{
    try{
        const id = req.params.id
        const removed = await TodoList.findOneAndDelete({ _id : id }).exec()
        
        if (removed?.file) {
            await fs.unlink('./uploads/' + removed.file, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Remove success')
                }
            })
        }
        res.send(removed)
    }catch(err){
        //error
        console.log(err)
        res.status(500).send("server error")
    }
}