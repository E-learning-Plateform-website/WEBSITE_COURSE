const express = require('express');
const router=express.Router();
const Candidature=require('../../models/candidature')



//home
router.get('/:id',async(req,res)=>
{
  
id=req.params.id;
const u=await User.findById(id)
email=req.session.email
})



module.exports=router;