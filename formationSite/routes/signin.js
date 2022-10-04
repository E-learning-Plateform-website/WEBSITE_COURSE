const express = require('express');
const authController=require('../Controllers/authController')


const router=express.Router();


router.get('/',(req,res)=>
{
   
    res.render('signin.ejs',{title:"Sign in"});
})


router.post('/', authController.login)




module.exports=router;