const express = require('express');
const router=express.Router();
const formation=require('../models/formation')
const Candidature=require('../models/candidature')
const User=require('../models/user')

const redirectLogin=(req,res,next)=>
{
    if(!req.session._id)
    {
        res.redirect('/signin')
    }
    else
    {
        next();
    }
}

//home
router.get('/',redirectLogin,async(req,res)=>
{
   id=req.session._id
nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut

   const form=await formation.find({isapprouved:true});
res.render('formations',{form});
})




router.get('/:id',redirectLogin,async(req,res)=>
{
   const idf=req.params.id;
   id=req.session._id
   nom=req.session.nom
   prenom=req.session.prenom
   em=req.session.email
   pas=req.session.password
   statut=req.session.statut

   const form= await formation.findById(idf).then(async(formation)=>
   {
      if(formation)
      {
         let us=await User.findOne({id:formation.idProprietaire})
         const candidat=await Candidature.findOne({email:us.email})
         
   let exist=false        
formation.idUser.forEach(c=> {
   if(c==id)
   exist=true;
   
});

if(!exist)

{  
   formation.idUser.push(id)

formation.save()
}
   
   res.render('consulteForm.ejs',{formation,candidat})
      }
      
     else
            res.send('non trouvé')
    
   })
})
          

  

router.get('/fr/:id/:j',redirectLogin,async(req,res)=>
{
    let j=req.params.j;
 let idf = req.params.id;
 id=req.session._id
nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut


 let form= await formation.findById(idf).then((formation)=>
 {
    if(!formation)
  res.send('an error occued at readin chapters')
    else
   {   var z=j
     var pre=--z;
     z=j
     var suiv=++z;
     console.log(pre )
     console.log(j )
     console.log(suiv )
if(pre<0)  pre++;
if(suiv>=formation.chapters.length)  suiv--;
{ 
 
   console.log("dépassé")
   console.log(pre )
   console.log(j )
   console.log(suiv )
}
      res.render('consulteChap',{formation,j,pre,suiv});

      }
   

   })
 })









module.exports=router;