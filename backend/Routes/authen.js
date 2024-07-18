const express = require("express")
const router =  express.Router()

const { register,login } = require('../Controllers/authen')



// http://localhost:5000/api/register

router.post('/register',register)
router.post('/login',login)

module.exports = router