const User=require('../models/user')
const bcrypt=require('bcryptjs')

const Formation=require('../models/formation')


const register=async(req,res,next)=>
{
    const {nom,prenom,email,password,password2,gender}=req.body;
 let errors=[];
 const emailExist=await User.findOne({email});

       if(!nom || !prenom || !email || !password || !password2||!gender)
       {errors.push({msg:"please fill in all fields"});
}
       if(password!==password2)
      { errors.push({msg:"passwords do not match"});
      }
      if(emailExist)
      {
        errors.push({msg:"email already exist "});
      
      }
   
      if(errors.length>0)
      {
        res.render('signup',{errors,title:'signup'})
      }

  else{   
    
    let u=new User({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender

       })  


     
       u.save((err, docs) => {
        if (err) {
          res.redirect("/signup");
        } else {
      
          res.redirect("/signin");
         
        }
      });
    }
}



const login=async(req,res)=>
{ 
  let errors=[];
const email=req.body.email;
  const password=req.body.password;


const user=await User.findOne({email:req.body.email})
if(!email)
{ if(!password)
  {errors.push({msg:"fill in password and email"}); res.render('signin',{errors})}
else
   {errors.push({msg:"fill in email"});
  res.render('signin',{errors})}
}
else {if(!user)
{  errors.push({msg:"email does not exist"});
  res.render('signin',{errors})
}
else{
 
const test= await bcrypt.compare(password,user.password)
if(!test)
{  errors.push({msg:"false password"});
  res.render('signin',{errors})

}
else{ 

 req.session._id = user.id;
 req.session.nom=user.nom
 req.session.prenom=user.prenom
 req.session.email=user.email
 req.session.statut=user.statut
 //or req.session.user={ ...} 

 req.session.save(err => {
  if (err) {
    console.log(err)
    errors.push({msg:"false credentials "});


  };
});

id=req.session._id
nom=req.session.nom
prenom=req.session.prenom
em=req.session.email
pas=req.session.password
statut=req.session.statut
res.cookie('id',id)
res.cookie('nom',nom)
res.cookie('prenom',prenom)
res.cookie('pas',pas)
res.cookie('statut',statut)
//ajouté
if(statut=="admin")
{
  res.redirect('/homeAdmin')

}

var formPanier=await Formation.find({idUser:id})
var nbDeFormationPanier=formPanier.length;
res.cookie('formPanier',formPanier)
res.cookie('nbDeFormationPanier',nbDeFormationPanier)
var approuvedForm=await Formation.find({idProprietaire:req.session._id,isapprouved:true})
console.log(approuvedForm)
nbapprouvedForm=approuvedForm.length
  res.render('home.ejs',{errors,formPanier,nbDeFormationPanier,approuvedForm,nbapprouvedForm})
}
}


  }}



module.exports={
    register,login
}