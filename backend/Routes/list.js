const express = require('express')
const router =  express.Router()

const { read,list,create,update,remove } = 
require('../Controllers/list')

const { authen } = require('../Middleware/authen')
const { upload } = require('../Middleware/upload')

//method ต่างๆที่เรียกใช้งานฝั่ง controller Endpoint
router.get('/list',list)
router.get('/list/:id',read)
router.post('/list/',upload,create)
router.put('/list/:id',upload,update)
router.delete('/list/:id',remove)

module.exports = router