const express = require('express');
const router=express.Router();
const Formation=require('../../models/formation');
const User = require('../../models/user');
const message=require('../../models/message')
const bcrypt=require('bcrypt')

router.get('/',async(req,res)=>
{
   const users=await User.find()
   const formations=await Formation.find()

   var nbf=formations.length;
   var nbu=users.length
   var nbTuteurs=0
   var nbApprenant=0
 users.forEach(i=>{ 
    if(i.statut=="teacher")
     nbTuteurs++
     else
     nbApprenant++})
     req.session.isAuthenticated=true;
          req.session.nbTuteurs=nbTuteurs
          req.session.nbApprenant=nbApprenant
          req.session.nbTuteurs=nbu
          req.session.nbTuteurs=nbf
  
   const messages=await message.find()
    res.render('adminPart/signin',{messages,nbApprenant,nbTuteurs,nbf,messages,nbu})
})
//home
router.post('/',async(req,res)=>
{
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
 

 const {email,password}=req.body;
 const errors=[]
 const admin=await User.findOne({email,statut:"admin"})

 if(!email)
{ if(!password)
  {errors.push({msg:"fill in password and email"}); res.render('adminPart/signin',{errors})}
else
   {errors.push({msg:"fill in email"});
  res.render('adminPart/signin',{errors})}
}
else {if(!admin)
   
{  errors.push({msg:"false credentials"});
  res.render('adminPart/signin',{errors})
}
else{
   const test= await bcrypt.compare(password,admin.password)

if(!test)
{  errors.push({msg:"false password"});
 res.render('adminPart/signin',{errors})
}
else{ 

       req.session._id=admin.id
       req.session.nom=admin.nom
       req.session.prenom=admin.prenom
       id=req.session._id
nom=req.session.nom
prenom=req.session.prenom


       req.session.isAuthenticated=true;
          req.session.nbTuteurs=nbTuteurs
          req.session.nbApprenant=nbApprenant
          req.session.nbTuteurs=nbu
          req.session.nbTuteurs=nbf
    
  
          req.session.save(err => {
            if (err) {
              console.log(err)
              errors.push({msg:"false credentials "});
          
          
            }})};
        const messages=await message.find()
         res.render('adminPart/home.ejs',{nbApprenant,nbTuteurs,nbf,nbu,messages})
         
    
       
 }}
})
module.exports=router;