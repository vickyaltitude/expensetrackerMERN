const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000 ;
const connectDB = require('./util/dbConnection')
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));

const user = require('./routes/user');
const forgotPass = require('./routes/passwordreset');
const storeExpenses = require('./routes/storeexpense');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use('/user',user);
app.use(forgotPass);
app.use(storeExpenses);


connectDB().then(resp =>{
    console.log('connected to mongoDB')
    app.listen(PORT,()=> console.log(`server is running on PORT${PORT}`))

}).catch(error => console.log(error,'something went wrong'))
