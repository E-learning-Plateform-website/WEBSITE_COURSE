const express=require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');

//routes
const usersRoute=require('./routes/users')

//===========================================


const app=express();
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static('public'))

//view 
app.set('view engine','ejs');
//variable d'env
require('dotenv').config();



//controler route=============
app.use('/users',usersRoute);  

 



app.get('/signin',(req,res)=>
{
    res.send('signin page');
})


app.get('/',(req,res)=>
{
    res.render('index.ejs')
})

app.get('/signup',(req,res)=>
{
    res.send('signUp',);
})
//initialiser le serveur
app.listen(process.env.PORT,()=>
{ 
    let port=process.env.PORT;
 console.log('server started at http://localhost:'+port);
})
//connection mongoose

mongoose.connect(process.env.DATABASE,(err)=>
{
    if(!err)
    console.log("connected sucessfully to database");
    else{
        console.log(" not connected to database"+err);

    }
});


