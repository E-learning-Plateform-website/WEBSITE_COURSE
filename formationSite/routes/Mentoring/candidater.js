const express = require('express');
const Candidature = require('../../models/candidature');
const router=express.Router();
const User=require('../../models/user');
//const multer  = require('multer')
//const upload = multer({ dest: 'images/' })


router.get('/',(req,res)=>
{
    let errors=[]
    id=req.session._id
    nom=req.session.nom
     prenom=req.session.prenom
    vaem=req.session.email
    pas=req.session.password
    statut=req.session.statut
    nbDeFormationPanier=req.session.nbDeFormationPanier
    res.render('Mentoring/candidater.ejs',{errors})
})


router.post('/',async(req,res)=>
{
const email=req.body.email
const urlLinkedin=req.body.urlLinkedin
const urlCv=req.body.urlLinkedin
const statut=req.body.statut
const nom=req.body.nom
const bio=req.body.bio
const lettreDeMotivation=req.body.lettreDeMotivation
const errors=[]

 let user=await User.findOne({email})
 const candidat=await Candidature.findOne({email:email})

    if(!email ||!statut|| !bio)
     errors.push({msg:"please fill in all fields"});
     if(email&&!user)
     errors.push({msg:"there is no user with this email "});
        if(candidat)
            errors.push({msg:"il existe déja une candidature avec cet email"});
        
        if(errors.length>0)  res.render('Mentoring/candidater',{errors})
        
    else{
        let c=new Candidature({
            urlLinkedin:req.body.urlLinkedin,
             idUser:user._id,
             email:req.body.email,
             nom:req.body.nom,
             statut:req.body.statut,
             bio:req.body.bio,
             isapprouved:false,
            lettreDeMotivation:req.body.lettreDeMotivation,
             urlCv:req.body.urlCv
            })
       
            c.save((err) => {
               if (err) {
                req.flash('error','error')

                 res.redirect("/candidater");
               } else {
            req.flash('success','success')
                 res.redirect("/candidater")
                
               }
           } )

    }}
 )
 


module.exports=router;