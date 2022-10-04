const express=require('express')
const router=express.Router();


router.get('/',async (req,res)=>
{
  id=req.session._id
  nom=req.session.nom
  prenom=req.session.prenom
  em=req.session.email
  pas=req.session.password
  statut=req.session.statut
  req.logout(err=>
    {
      if(err)
      console.log('error logout')
      else
      {
        req.session.destroy()

      console.log('sucess')
        res.render('signin')
      }
    });

  // destroy session data

})
module.exports=router