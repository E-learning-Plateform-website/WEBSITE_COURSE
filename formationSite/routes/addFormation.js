const express = require('express');
const router=express.Router();
const formation=require('../models/formation')
const User=require('../models/user')


//home
router.get('/',(req,res)=>
{
    id=req.session._id
    nom=req.session.nom
    prenom=req.session.prenom
    em=req.session.email
    pas=req.session.password
    statut=req.session.statut
res.render('addFormation.ejs');
})
/*title:String,
description:String,
category:String,
time:String,
urlImage:String,
niveau:String,
createdAt:
{
    type:Date,
    default:()=>Date.now()
},
chapters:[String],
isapprouved:Boolean,*/

router.post('/',async(req,res)=>
{
    id=req.session._id
nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut

   let form=new formation({
    title:req.body.title,
    description:req.body.description,
    category:req.body.category,
    time:req.body.time,
    niveau:req.body.niveau,
   
    urlImage:req.body.urlImage,
    isApprouved:false,
    idProprietaire:req.session._id
    

   }) 
   form.save((err)=>{
    if(!err)
    {
        req.toastr.success('Successfully logged in', "You're in!");

    res.render('addFormation2.ejs',{form,req:req})
   }
   else

    req.toastr.error('Invalid credentials.');
   })
})


module.exports=router;