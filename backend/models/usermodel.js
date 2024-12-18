const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword:{
        type: String,
        required: true
    },
    userFullName:{
        type: String
    },
    userProfilePicUrl:{
        type: String
    },
    userVerified:{
        type: Boolean,
        default: false
    },
    userVerifyToken:{
        type: String,
        required: true
    }
   
})

module.exports = mongoose.model('Users',Users);