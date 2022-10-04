const mongoose=require('mongoose');
const User = require('./user');

const candidatureSchema=mongoose.Schema({
    
   idUser:String,
    nom:String,
    prenom:String,
    email:String,
    urlLinkedin:String,
    avatar:String,
    statut:String,
    bio:String,
   Pays:String,
    urlCv:String,
    lettreDeMotivation:String,
 
 
    isapprouved:
    {
        type:Boolean,
        default:()=>false
    },

},{
    timestamps:true
})

const Candidature=mongoose.model('Candidature',candidatureSchema);
module.exports=Candidature;