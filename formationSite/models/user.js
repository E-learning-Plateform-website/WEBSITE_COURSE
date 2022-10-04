const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose')
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema({
 
    nom:String,
    prenom:String,
    email:String,
   password:String,
   gender:String,
   statut:
   {
       type:String,
       default:()=>'student'
   },

   
   idFormation:[String]
   
})
userSchema.pre('save', async function(next) {
    try {
    // check method of registration
    const user = this;
    if (!user.isModified('password')) next();
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace plain text password with hashed password
    this.password = hashedPassword;
    next();
    } catch (error) {
    return next(error);
    }
    });

    userSchema.methods.comparePassword = function(password) {
        
        try{
           const result= bcrypt.compareSync(password, this.password);

        }
        catch(error)
        {
            console.log('error comparing password',error.message)
        }
      };

userSchema.plugin(passportLocalMongoose);
const User=mongoose.model('User',userSchema);
module.exports=User;

