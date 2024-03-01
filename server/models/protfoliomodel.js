
       const mongoose=require("mongoose");

       const Contactschemaprotfolio=mongoose.Schema({
            username:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            },
            msg:{
                type:String,
                require:true
            }
       })
            const ContactModel=new mongoose.model("contact",Contactschemaprotfolio);

             module.exports=ContactModel;