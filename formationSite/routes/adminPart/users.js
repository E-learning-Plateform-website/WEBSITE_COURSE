const express = require('express');
const router=express.Router();
const User=require('../../models/user')
const message=require('../../models/message')



//home
router.get('/',async(req,res)=>
{
   const messages=await message.find()
   id=req.session._id
   nom=req.session.nom
   prenom=req.session.prenom
   em=req.session.email
   pas=req.session.password
   statut=req.session.statut

   var contexte="Utilisateurs"
 
   const users=await User.find({statut:{ "$ne": 'admin' }})
   res.render('adminPart/users.ejs',{users,messages,contexte})

   
})



module.exports=router;