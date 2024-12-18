const express = require('express');
const User = require('../models/usermodel');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apikey = client.authentications['api-key'];
apikey.apiKey = process.env.brevo_api_key; 
let transEmailApi = new Sib.TransactionalEmailsApi();

const router = express.Router()


router.post('/forgotpassword',(req,res)=>{
    console.log(req.body)

    User.find({userEmail: req.body.email}).then(resp =>{
          console.log(resp)
          let currentUser = resp;
        if(resp.length === 0){
            res.json({msg:'user not found'})
        }else{
                 
                const sender = {
                    email: 'vignvick3005@gmail.com'
                }
                const receiver = [
                    {
                        email : req.body.email
                    }
                ]
                const userId = currentUser[0]._id.toString()
                transEmailApi.sendTransacEmail({
                    sender,
                    to: receiver,
                    subject: 'Password reset link from Day-to-Day Expense Tracker Application',
                     htmlContent: `<p>Please reset your password through this link: <a href="http://localhost:3000/resetpassword?userid=${userId}">Reset Password</a></p>`
                }).then(resp =>{
                    console.log(resp)
                    res.json({msg:'reset link sent successfully'})
                }).catch(err => console.log(err))
            
        }
    }).catch(err =>{
        console.log(err)
        res.json({msg: 'error sending reset link'})
    })
    
})


router.post('/resetpassword',(req,res)=>{

    User.findOneAndUpdate({_id: req.body.userid},{$set:{userPassword: req.body.password}}).then(resp=>{
         
        res.json({msg:'password updated successfully'})
    }).catch(err =>{
        console.log(err)
        res.json({msg:'password updated fail something went wrong'})
    })
   
    
})


module.exports = router