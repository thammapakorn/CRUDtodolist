const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {token} = require('morgan')

//Register
exports.register = async(req,res)=>{
    try{
        // 1. CheckUser
        const{ username,password } = req.body
        var user = await User.findOne({ username })
        
        if(user){
            return res.send("User already exists!").status(400)
        }
        // 2. Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({ 
            username,
            password
        })
        user.password = await bcrypt.hash(password, salt)

        // 3. Save
        await user.save()
        res.send("Register Success")

    }catch(err){
        console.log(err)
        res.status(500).send("server error")
    }
}

//Login
exports.login = async(req,res)=>{
    try{
        // 1. CheckUser
        const { username, password } = req.body
        var user = await User.findOneAndUpdate({username},{new:true})
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).send("Password ไม่ตรง")
            }
            // 2. Payload
            var payload ={
                user:
                {username: user.username,
                    role: user.role
                }
            }
            // 3. Genarate
            jwt.sign(payload,'jwtsecret',{expiresIn:'1d'},(err,token)=>{
                if(err) throw err;
                res.status(200).json({
                    status: 'success',
                    token,
                    payload,
                    message: 'Logged in Successfully',
                })
            })
        }else{
            return res.status(400).send('User not found')
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
}