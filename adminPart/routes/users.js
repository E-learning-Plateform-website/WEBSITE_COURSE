const express = require('express');
const router=express.Router();
const User=require('../../formationSite/models/user')




//home
router.get('/',async(req,res)=>
{
   const users=await User.find().then((err)=>
   {
    if(err)
    res.send(err)
    else
    {
        res.send('sucess')
    }
   });
   console.log(users)
   res.send(users)
res.render('users',{users});
})



module.exports=router;