const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const userAuth = require('../util/jwt');
const jwt = require('jsonwebtoken')


router.post('/usersignup',(req,res)=>{

    console.log(req.body)
    const newUser = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    })

    newUser.save().then(resp =>{

         console.log('user inserted successfully')
         res.json({msg:'User inserted successfully'})

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
   
     User.findOneAndUpdate({userEmail:userFetch.userEmail},{$set:{userFullName:req.body.userFullName,userProfilePicUrl: req.body.userProfileUrl}}).then(resp =>{

        res.json({msg:'user updated successfully'})

     }).catch(err => console.log(err,'user update failure'))
     
})

module.exports = router;