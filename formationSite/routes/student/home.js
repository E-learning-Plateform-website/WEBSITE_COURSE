const express = require('express');
const Formation=require('../../models/formation')
const router=express.Router();



const redirectLogin=(req,res,next)=>
{
    if(!req.session._id )
    {
        res.render('signin.ejs')    }
    else
    {
        next();
    }
}

router.get('/',redirectLogin,async(req,res)=>
  
   {  
    

    id=req.session._id


nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut
console.log(id)
console.log(nom)
console.log(em)

res.cookie('id',id)
res.cookie('nom',nom)
res.cookie('prenom',prenom)
res.cookie('pas',pas)
res.cookie('statut',statut)


var formPanier=await Formation.find({idUser:id})
var nbDeFormationPanier=formPanier.length;
res.cookie('formPanier',formPanier)
res.cookie('nbDeFormationPanier',nbDeFormationPanier)
var approuvedForm=await Formation.find({idProprietaire:req.session._id,isapprouved:true})
nbapprouvedForm=approuvedForm.length
    res.render('home.ejs',{formPanier,nbDeFormationPanier,approuvedForm,nbapprouvedForm,message:req.flash('success')});} 
)

module.exports=router