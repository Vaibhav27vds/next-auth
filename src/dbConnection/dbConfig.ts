import { log } from "console";
import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDb connected");
            
        })

        connection.on("error", (error) => {
            console.log("MongoDb connection error, Please make sure that the db is running" + error);
            process.exit()
            
        })
    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error);
        
    }
}