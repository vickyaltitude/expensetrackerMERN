const mongoose = require('mongoose')
require('dotenv').config();

function connectToDb(){
   return mongoose.connect(`mongodb+srv://vignvick3005:${process.env.DB_PASSWORD}@clustersharpener.ru5nn.mongodb.net/expensetrackermern?retryWrites=true&w=majority&appName=ClusterSharpener`)
}

module.exports = connectToDb;