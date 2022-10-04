const mongoose=require('mongoose');
const User = require('./user');

const commentaireSchema=mongoose.Schema({
    
   idUser:String,
    idFormation:String,
    content:String,
   nom:String,
   prenom:String
   

},{
    timestamps:true
})

const Commentaire=mongoose.model('Commentaire',commentaireSchema);
module.exports=Commentaire;