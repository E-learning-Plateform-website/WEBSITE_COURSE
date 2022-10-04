const express = require('express');
const router=express.Router();
const formation=require('../../formationSite/models/formation')



//home
router.get('/formations',async(req,res)=>
{
   const form=await formation.find();
res.render('formations',{form});
})



module.exports=router;