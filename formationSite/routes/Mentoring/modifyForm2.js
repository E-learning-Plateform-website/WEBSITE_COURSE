const express = require('express');
const Formation = require('../../models/formation');
const router=express.Router();

//home
router.post('/:id/:s',async (req,res)=>
{
    id=req.session._id
    idf=req.params.id
   s=req.params.s
 var form=await Formation.findById(idf).then((formation)=>
 {
    if(!formation)
  res.send('an error occued at readin chapters')
    else
   {
    formation.chapters[s].title=req.body.title
    formation.chapters[s].content=req.body.content
    formation.chapters[s].urlVideo=req.body.urlVideo
    formation.save()
    if(s==formation.chapters.length-1)
    {var lastsection=1;
    s--;
    }
         var alert=1
    res.render('Mentoring/modifyForm2.ejs',{formation,s,alert,lastsection});
    console.log(formation)
       
      }
   
   })

})


module.exports = router ;
