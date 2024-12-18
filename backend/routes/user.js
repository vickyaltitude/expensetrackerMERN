const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');


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

module.exports = router;