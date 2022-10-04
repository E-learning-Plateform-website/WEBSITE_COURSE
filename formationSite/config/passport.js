const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const {compareSync}=require('bcrypt')

const User=require('../models/user')

module.exports=function(passport)
{
passport.use(new LocalStrategy(function(email,password,done)
{
User.findOne({email:email},function(err,user)
    {
        if(err)
        {
            return done(err)
        }
        if(!user)
        {
            return done(null,false,{message:'that email is not registred'})
        }

        if(!compareSync(password,user.password))
        {
            return done(null,false,{message:'password incorrect'})
        }
        return done(null,user)

    })
}
))

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
}