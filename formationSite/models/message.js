const mongoose=require('mongoose');
const msgSchema=mongoose.Schema({
    
  email:String,
 nom: String ,
  prenom:String ,
  tele:String ,
 objet:String,
   content:String,
    


 
})

const Msg=mongoose.model('Msg',msgSchema);
module.exports=Msg;