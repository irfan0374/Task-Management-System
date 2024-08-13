const mongoose=require("mongoose")
require('dotenv').config()

module.exports={
    dbConnect:()=>{
        const mongoUri=process.env.MONGO_URI

        mongoose.connect(mongoUri).then(()=>{
            console.log("Database connected")

        }).catch((error)=>{
            console.error("Error connecting database:",error)
        })
    }
}