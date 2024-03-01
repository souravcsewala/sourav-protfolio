
    const mongoose=require("mongoose");

         const URI=process.env.MONGODBURI;
        const mongodbconnect=async ()=>{
               try{
               await mongoose.connect(URI);
                     console.log("database is connect")
               }catch(error){
                console.error("connection failed")
                process.exit(0)
               }
        }
            module.exports={mongodbconnect}