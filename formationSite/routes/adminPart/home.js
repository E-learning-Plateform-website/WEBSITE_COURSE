const express = require('express');
const router=express.Router();
const message=require('../../models/message')

const redirectLogin=(req,res,next)=>
{
    if(!req.session._id)
    {
        res.render('adminPart/signin.ejs')    }
    else
    {
        next();
    }
}

router.get('/',redirectLogin,async(req,res)=>
{ 
    
    const messages=message.find()
    const formations=await Formation.find()
  const users=await User.find()
  var nbf=formations.length;
  var nbu=users.length
  var nbTuteurs=0
  var nbApprenant=0
users.forEach(i=>{ 
   if(i.statut=="teacher")
    nbTuteurs++
    else 
    nbApprenant++})
    const user=await User.findOne({email:req.body.email})
    req.session._id = user.id;
    req.session.nom=user.nom
    req.session.prenom=user.prenom
    req.session.email=user.email
    req.session.statut=user.statut
    id=req.session._id
nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut
res.cookie('id',id)
res.cookie('nom',nom)
res.cookie('prenom',prenom)
res.cookie('pas',pas)
res.cookie('statut',statut)
 console.log(id+'home')
    nbTuteurs=req.session.nbTuteurs
    nbApprenant=req.session.nbApprenant
    nbu=req.session.nbTuteurs
    
 
    nbf=req.session.nbTuteurs
    res.render('adminPart/home.ejs',{nbApprenant,nbTuteurs,nbf,nbu,messages})
})

module.exports=router;