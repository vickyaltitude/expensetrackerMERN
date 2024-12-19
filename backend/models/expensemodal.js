const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Expenses = new Schema({
     user_id : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
     },
     expenses:[
        {
            amount:{
                type: Number,
                required: true
            },
            description:{
                type: String,
                required: true
            },
            category:{
                type:String,
                required: true
            },
            id:{
                type: Number,
                required: true
            }
        }
     ]
})

module.exports = mongoose.model('Expenses',Expenses)