const express = require('express');
const router=express.Router();
const Msg=require('../../models/message')


const redirectLogin=(req,res,next)=>
{
    if(!req.session.isAuthenticated)
    {
        res.render('adminPart/signin.ejs')    }
    else
    {
        next();
    }
}

//home
router.get('/',redirectLogin,async(req,res)=>
{
   const messages=await Msg.find()
   var contexte="Messages"
 
   id=req.session._id
   nom=req.session.nom
   prenom=req.session.prenom
   em=req.session.email
   pas=req.session.password
   statut=req.session.statut
   res.render('adminPart/messages.ejs',{messages,contexte})

   
})



module.exports=router;