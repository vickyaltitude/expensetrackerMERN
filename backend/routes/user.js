const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const userAuth = require('../util/jwt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apikey = client.authentications['api-key'];
apikey.apiKey = process.env.BREVO_API_KEY; 
let transEmailApi = new Sib.TransactionalEmailsApi();


router.post('/usersignup',(req,res)=>{

    console.log(req.body)

    const uniqueID = uuidv4();
    const newUser = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userVerifyToken: uniqueID
    })

    newUser.save().then(resp =>{

         console.log('user inserted successfully')
         res.json({msg:'User inserted successfully'})

         const receiverEmail = req.body.userEmail
        const sender = {
            email: 'vignvick3005@gmail.com',
            name: 'Expense Tracker'
        }
        const receiver = [
            {
                email : receiverEmail
            }
        ]

        transEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: "Email verification",
             htmlContent: `<h2>Please verify your mail</h2><p>Please reset your password through this link: <a href="http://localhost:5000/user/userverification?uuid=${uniqueID}">Reset Password</a></p>`
        }).then(resp => console.log(resp)).catch(err => console.log(err))

    }).catch(err =>{

        console.log(err,'error while inserting users')

    })
    
})

router.post('/userlogin',(req,res)=>{

     console.log(req.body)

     User.find({userEmail: req.body.userEmail}).then(resp =>{

        if(resp.length === 0){
            res.json({msg:'User not found'})
        }else if(resp[0].userPassword !== req.body.userPassword){
            res.json({msg:'Password incorrect'})
        }else{
            
            res.json({msg:'Login successfull',userCred: userAuth.encryptUserId(resp[0]._id.toString(),resp[0].userEmail,resp[0].userName)})
        }
         console.log(resp)

     }).catch(err =>{
        console.log(err)
     })

    
})

router.post('/profileupdate',(req,res)=>{

    
     const userFetch = jwt.verify(req.body.userId,process.env.JWT_TOKEN_SECRET);
   
     User.findOneAndUpdate({userEmail:userFetch.userEmail},{$set:{userFullName:req.body.userFullName,userProfilePicUrl: req.body.userProfileUrl,userVerified: true}}).then(resp =>{

        res.json({msg:'user updated successfully'})

     }).catch(err => console.log(err,'user update failure'))
     
})


router.get('/getuserprofile',(req,res)=>{
  
    const userFetch = jwt.verify(req.headers.authorization.toString(),process.env.JWT_TOKEN_SECRET);
   console.log(userFetch)
   User.find({userEmail: userFetch.userEmail}).then(resp =>{

    res.json({data: resp})

   }).catch(err => {
    console.log(err)
    res.json({msg: 'error fetching user'})
   })
  
})

router.get('/userverification',(req,res)=>{
     const {uuid} = req.query;
     console.log(uuid)
     User.find({userVerifyToken: uuid.toString()}).then(resp =>{
        
        if(resp.length > 0){

            User.findOneAndUpdate({userVerifyToken: uuid.toString()},{$set:{userVerified: true,userVerifyToken:null},},{new:true}).then(resp =>{

                console.log(resp)
                res.send("<h2>Thanks for the verification</h2>")
            }).catch(err =>{
                console.log(err)
                res.send("<h2>Internal server error</h2>")
            })
           

        }
        
     }).catch(err =>{
        console.log(err,'error while finding user token')
     })
     
})

module.exports = router;