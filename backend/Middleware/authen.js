// const jwt = require('jsonwebtoken')

// //ใช้งาน Token
// exports.authen = async(req,res)=>{
//     try{
//         //เช็คหน้าบ้านส่ง Token
//         const token = req.headers["authToken"]
//         if(!token){
//             return res.status(401).send('No Token')
//         }
//         //ถ้ามี Token
//         const decoded = jwt.verify(token, 'jwtsecret')
//         //เก็บ token ไปกับ user
//         req.user = decoded.user
//         next();

//     }catch(err){
//         console.log(err)
//         res.send('Token Invalid').status(500)
//     }
// }