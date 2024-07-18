const express = require("express")

const morgan = require("morgan")
const cors = require("cors")
const bodyParse = require("body-parser")
//Routes
const { readdirSync } = require("fs")
//Database
const connectDB = require('./Config/db')

const app = express();
//เรีกยใช้ DB
connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))

// Route loop Routes auto
readdirSync('./Routes')
    .map((r)=>app.use('/api', require('./Routes/'+r)))

//Server
app.listen(5000,()=>
    console.log("Server is running on port 5000"))