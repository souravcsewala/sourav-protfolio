
    const mongoose=require("mongoose");

         const URI=process.env.MONGODBURI;
        const mongodbconnect=async ()=>{
               try{
               await mongoose.connect(URI);
                     console.log("database is connect")
               }catch(error){
                console.error("connection failed from database")
                process.exit(0)
               }
        }
            module.exports={mongodbconnect}
