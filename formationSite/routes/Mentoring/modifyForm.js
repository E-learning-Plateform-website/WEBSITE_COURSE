const express = require('express');
const Formation = require('../../models/formation');
const router=express.Router();


//home
router.get('/:id',async (req,res)=>
{
    id=req.session._id
    idf=req.params.id
 var formation=await Formation.findById(idf).then((form)=>
 {
    if(!form)
  res.send('an error occued at readin chapters')
    else
   {
    res.render('Mentoring/modifyForm.ejs',{form});
    console.log(form)

      }
   
   })

})

router.post('/:idf',async (req,res)=>
{
    idf=req.params.idf
    id=req.session._id

 var formation=await Formation.findByIdAndUpdate(idf,{   
    title:req.body.title,
    niveau:req.body.niveau,
    category:req.body.category,
    description:req.body.description,
    urlImage:req.body.urlImage,
 })
 formation.save()
var test=1
 res.render('Mentoring/modifyForm2.ejs',{formation,test});

})



module.exports=router;