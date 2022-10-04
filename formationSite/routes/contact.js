const express = require('express');
const router=express.Router();
const message=require('../models/message')
var nodemailer = require('nodemailer');

nodemailer.sendmail = true;


router.post('/:id',(req,res)=>
{

var email=req.body.email
var content=req.body.content
var objet=req.body.objet


const msg=new message(
  {
    email:req.body.email,
    content:req.body.content,
    nom:req.body.nom,
    prenom:req.body.prenom,
    objet:req.body.objet,
    tele:req.body.tele
  }
)


    var transporter = nodemailer.createTransport({
        service: 'gmail',
    
        auth: {
          user: 'inass.zaadan@gmail.com',
          pass: 'ciqngoktisaptqyk'
        }
      });
      msg.save((err)=>{
        if(!err)
        {
        console.log('msg is saved '+msg)
       }
       else
       res.send(err)
       })
      var mailOptions = {
        from: email,
        to: 'openclass566@gmail.com',
        subject: objet,
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
     req.session.id=req.params.id
    req.session.sent=true
    res.cookie('sent','true',{maxAge:150000});

     req.flash('success', 'message envoyé')
  res.redirect('/')
    
    
    
   
}
)

module.exports=router;