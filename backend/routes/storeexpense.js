const express = require('express');
const router = express.Router();
const Expenses = require('../models/expensemodal');
const jwt = require('jsonwebtoken')

router.post('/postexpense', (req,res)=>{

    const parsedUser = jwt.verify(req.body.userId,process.env.JWT_TOKEN_SECRET)
  
       Expenses.findOneAndUpdate({ user_id: parsedUser.userId },{$set:{expenses: req.body.expenses}},{new:true,upsert:true}).then(resp =>{

        console.log(resp)
        res.json({msg:'expense inserted successfully'})

       }).catch(err =>{
        console.log(err)
        res.json({msg:'error while adding expense'})
       })
   
})

router.get('/getexpense',(req,res)=>{
    const userId = req.headers.authorization
    const parsedUser = jwt.verify(userId,process.env.JWT_TOKEN_SECRET)
    Expenses.find({user_id: parsedUser.userId}).then(resp =>{
        res.json({data: resp})
    }).catch(err =>{
        console.log(err)
        res.json({msg:'error fetching expenses'})
    })
  
})

module.exports = router