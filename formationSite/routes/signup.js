const express = require('express');
const router=express.Router();
const authController=require('../Controllers/authController')


router.get('/',(req,res)=>
{
    res.render('signUp.ejs',{title:"Sign Up"});
})

router.post('/',
//[check("email","Email should be valid ").isEmail()],
authController.register);

module.exports=router;