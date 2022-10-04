const mongoose=require('mongoose');
const User=require('./user')
const devoirSchema=mongoose.Schema({
    
    idUser:String,
    idFormation:String,
    content:String,
    title :String
    
 
 })

const commentaireSchema=mongoose.Schema({
    
    idUser:String,
     content:String,
    nom:String,
    prenom:String
    
 
 },{
     timestamps:true
 })
const chapSchema=mongoose.Schema({ 
    title:String,
   content:String,
    urlpdf:String,
    urlVideo:String,
    urlImage:String,
    idFormation:String,
    commentaires:[commentaireSchema],


 
})
//w
const formationSchema=mongoose.Schema({
    
    title:String,
    description:String,
    category:String,
    time:String,
    urlImage:String,
    niveau:String,
  
    idProprietaire:String,
    idUser:[String],
    prerequis:[String],
    
    chapters:[chapSchema],
    isapprouved:Boolean,
    devoir:devoirSchema,
 
}, {timestamps: true})




const Formation=mongoose.model('Formation',formationSchema);
module.exports=Formation;