import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const connectDB=async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("MONGODB Connected!!",connectionInstance.connection.host);
        
    } catch (error) {
        console.log("MONGODB Connection Failed",error);        
    }
}

export default connectDB