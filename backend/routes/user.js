const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const userAuth = require('../util/jwt');


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

module.exports = router;