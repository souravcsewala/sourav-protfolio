const path = require('path');
const contactmodel=require("../models/protfoliomodel");
const nodemailer=require("nodemailer");




const getdownload = (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'SOURAV CV.PDF');
       console.log(__dirname)
       console.log(filePath)
    try {
        res.download(filePath, 'sourav-cv', (err) => {
            if (err) {
                // Handle error, such as file not found
                console.error('Error downloading file: ', err);
                res.status(404).send('File not found');
            }
        });
    } catch (error) {
        console.log("error from download page", error);
        // Depending on your application, you may want to handle this error differently,
        // For example, you can send an internal server error response:
        res.status(500).send('Internal Server Error');
    }
};
const attachmentPath=path.join(__dirname, '..', 'public', 'SOURAV CV.PDF');
      const Mailsend=(name,email,attachmentPath,msg)=>{
           try{
            const transpoter=nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,  // true for other ports 
                secure:false,
                requireTLS:true,
                auth:{
                   user:process.env.USERMAILID,
               
                   pass:process.env.MAILENTRY
                }
          })
               transpoter.sendMail({
                  from:process.env.USERMAILID,
                  to:email,
                  subject:"THAKNKS FOR CONTACT WITH ME",
                  html:'<p>hii '+name+', thanks send me your valuable massege , i will contact with you very soon.Here is my Resume is attach if u want u must give me assign projects.HAVE A NICE DAY! </p>',
                  attachments: [{
                    path: attachmentPath,
                    filename: 'SOURAV_CV.PDF',
                }]
               },function(error,info){
                if(error){
                    console.log(error)
                  }else{
                    console.log("mail has sent:-",info.response)
                  }
               })
                 transpoter.sendMail({
                    from:process.env.USERMAILID,
                    to:process.env.ADMINMAILID,
                    subject:"MAILMASSEGE FROM USER",
                    html:'<p> '+msg+' . from user name is '+name+'. user mail id is '+email+'</p>',
                  }, function(error,info){
                        if(error){
                            console.log(error)
                          }else{
                            console.log("mail has sent:-",info.response)
                          }
                 })
           }catch(error){
                console.log("log from sendmail function",error)
           }
              
                  
      }
   const getcontact=async (req,res)=>{
       const response=req.body;
        try{
            const contactinfo= await contactmodel.create(response)
            Mailsend(contactinfo.username,contactinfo.email,attachmentPath,contactinfo.msg)
               return res.status(200).send({message:"message send succesfully",contactinfo})
            
        }catch(error){
            console.log(error)
            return res.status(500).json({message:"message not deliverd"})
        }
   }
    


module.exports = { getdownload ,getcontact};
