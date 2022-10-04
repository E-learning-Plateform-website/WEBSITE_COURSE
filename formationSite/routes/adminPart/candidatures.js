const express = require('express');
const router=express.Router();
const Candidature=require('../../models/candidature')
const User=require('../../models/user')
const message=require('../../models/message')

var nodemailer = require('nodemailer');



nodemailer.sendmail = true;

//home
router.get('/',async(req,res)=>
{
   const candidatures=await Candidature.find()
   const messages=await message.find()
 

   id=req.session._id
   nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut
var contexte="candidatures"
 
   res.render('adminPart/candidatures.ejs',{candidatures,messages,contexte})

   
})


router.get('/accept/:id',async(req,res)=>
{
  
id=req.params.id;
const c=await Candidature.findById(id)
 c.isapprouved=true
 c.save()
 const user=await User.findById(c.idUser)
const candidatures=await Candidature.find()

 var transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: 'inass.zaadan@gmail.com',
      pass: 'ciqngoktisaptqyk'
    }
  });
  
  var mailOptions = {
    from: 'inass.zaadan@gmail.com',
    to: user.email,
    subject: 'Formation Site Web',
    text: `Congratulations ur request to publy is accepted `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  
user.statut='teacher'
user.save();
//res.render('adminPart/candidatures.ejs',{candidatures})

res.redirect('/candidatures')
}
)
module.exports=router;