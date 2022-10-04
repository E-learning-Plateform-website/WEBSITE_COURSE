const express = require('express');
const router=express.Router();
const Formation=require('../../models/formation')

//home
router.get('/',async(req,res)=>
{
 id=req.session._id
 nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut
req.session.save()
res.cookie('id',id)
res.cookie('nom',nom)
res.cookie('prenom',prenom)
res.cookie('pas',pas)
res.cookie('statut',statut)
 const formationn=await Formation.find({idProprietaire:req.session._id}).then((formation)=>
 {
    if(!formation)
  res.send('an error occued at readin chapters')
    else
   {
res.render('Mentoring/Dashbord1.ejs',{formation});

      }
   
   })



})

router.get('/delete/:idf',async(req,res)=>
{
   idf=req.params.idf
   id=req.session._id
   var form=await Formation.findByIdAndDelete(idf)
   res.redirect('/dashbord1')

})



module.exports=router;