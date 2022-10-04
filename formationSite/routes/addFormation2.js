const express = require('express');
const router=express.Router();
const formation=require('../models/formation')
const User=require('../models/user')


//home
router.get('/',(req,res)=>
{
res.render('addFormation2.ejs');
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

router.post('/:id/:i',async(req,res)=>
{
  id=req.session._id
  nom=req.session.nom
  prenom=req.session.prenom
  em=req.session.email
  pas=req.session.password
  statut=req.session.statut
  var idf=req.params.id;
  var j=req.params.i
  

  //==========chercher la formation 
  let format= await formation.findById(idf).then((form)=>
 {

    if(!form)
  res.send('an error occued at readin chapters')
    else
   { 
  
      console.log(j)
      console.log(req.body.title)
   form.chapters.push({  title:req.body.title,
    content:req.body.content,
    urlVideo:req.body.urlVideo})



      form.save((err)=>
      {
        if(!err)       {
         var test=1;
         s=j;
         req.flash('success', 'user succesfulyl registered')

         res.render('addFormation2.ejs',{form,test,s})}
        else
       console.log('failed')
      })
    
     
      }
    })


})


module.exports=router;