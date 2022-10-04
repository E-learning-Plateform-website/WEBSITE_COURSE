const express = require('express');
const router=express.Router();
const Formation=require('../../models/formation')
const message=require('../../models/message')


const redirectLogina=(req,res,next)=>
{
    if(!req.session.isAuthenticated)
    {
        res.redirect('/loginAdmin')
    }
    else
    {
        next();
    }
}
//home
router.get('/',redirectLogina,async(req,res)=>
{
   const formations=await Formation.find()
   const messages=await message.find()
   var contexte="Formations"
 
   id=req.session._id
   nom=req.session.nom
   prenom=req.session.prenom
   em=req.session.email
   pas=req.session.password
   statut=req.session.statut
   console.log(id+'formation')

   console.log(statut)
   res.render('adminPart/formations.ejs',{formations,messages,contexte})

   
})

router.get('/accept/:id',async(req,res)=>
{
   idf=req.params.id

   const formations=await Formation.findById(idf).then((formation,err)=>
   {
      if(formation) 
      {
         formation.isapprouved=true
         formation.save()
       res.redirect('/formationsa')
      }
     if(err)
      console.log(err)
   })
   
})
router.get('/fr/:id/:j',redirectLogina,async(req,res)=>
{
    let j=req.params.j;
 let idf = req.params.id;
 console.log(id+'cha')
 id=req.session._id
 nom=req.session.nom
 prenom=req.session.prenom
 em=req.session.email
 pas=req.session.password
 statut=req.session.statut
 console.log(statut)

 let form= await Formation.findById(idf).then((formation)=>
 {
    if(!formation)
  res.send('an error occued at readin chapters')
    else
   {   var z=j
     var pre=--z;
     z=j
     var suiv=++z;
   
if(pre<0)  pre++;
if(suiv>=formation.chapters.length)  suiv--;

      res.render('consulteChap',{formation,j,pre,suiv});

      }
   

   })
 })

router.get('/delete/:id',async(req,res)=>
{
   idf=req.params.id

   const formations=await Formation.findByIdAndDelete(idf).then((err)=>
   {
      if(!err) 
      {   
         console.log("this formation is deleted ")
       res.redirect('/formationsa')
      }
    else
    res.redirect('/formationsa')
   })
   
})



module.exports=router;