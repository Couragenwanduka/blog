import mongoose from "mongoose";

const connectDb= async()=>{
    try{
   const db = await mongoose.connect(process.env.mongodburl)
    console.log("connection established");
    }catch(error){
        console.log(error);
    }
}

export default connectDb;