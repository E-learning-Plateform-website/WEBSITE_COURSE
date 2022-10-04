const express=require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser')
const flash=require('connect-flash')
const  toastr = require('express-toastr');



const session=require('express-session')
//==========================session

const app=express();
app.use(session({
    NODE_ENV:'dev',
    secret:'secret',
    SESSION_NAME:'sid',
    resave:false,
    saveUnitialized:false,
}))


app.use(cookieParser())

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('../adminPart/public'));
app.use(express.static('./public/admin'));

app.use(express.static('./public/home'));
app.use(express.static('./public/theme1'));
app.use(express.static('../adminPart/public/Mentor'));

app.use(bodyParser.json());
require('dotenv').config();

const passport=require('passport');

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(flash());

app.use(toastr());
app.use( (req, res, next)=>
{
    res.locals.toasts = req.toastr.render()
    next()
});
//view 
app.set('view engine','ejs');
//variable d'env

//controler route=============
const homRoute=require('./routes/student/home');
app.use('/',homRoute); 
const formationRoute=require('./routes/formation');
app.use('/formations',formationRoute); 

const contactRoute=require('./routes/contact');
app.use('/contact',contactRoute); 

const addformationRoute=require('./routes/addFormation');
app.use('/addFormation',addformationRoute); 

const addformation2Route=require('./routes/addFormation2');
app.use('/addFormation2',addformation2Route); 


const logoutRoute=require('./routes/logout');
app.use('/logout',logoutRoute); 


const signUpRoute=require('./routes/signUp');
app.use('/signUp',signUpRoute); 

const signinRoute=require('./routes/signin');
app.use('/signin',signinRoute); 
//==========================Mentoring

const candidaterRoute=require('./routes/Mentoring/candidater');
app.use('/candidater',candidaterRoute);
const dashbordRoute=require('./routes/Mentoring/Dashbord1');
app.use('/dashbord1',dashbordRoute);
const ModifyRoute=require('./routes/Mentoring/modifyForm');
app.use('/modifyForm',ModifyRoute);

const Modify2Route=require('./routes/Mentoring/modifyForm2');
app.use('/modifyForm2',Modify2Route);

//==========================================
//============route home 


//==================================================ADMIN===============================

const signinAdminRoute=require('./routes/adminPart/signin');
app.use('/loginAdmin',signinAdminRoute); 

const homeAdminRoute=require('./routes/adminPart/home');
app.use('/homeAdmin',homeAdminRoute); 

const usersAdminRoute=require('./routes/adminPart/users');
app.use('/users',usersAdminRoute); 

const msgsAdminRoute=require('./routes/adminPart/messages');
app.use('/messages',msgsAdminRoute); 

const formationsAdminRoute=require('./routes/adminPart/formations');
app.use('/formationsa',formationsAdminRoute); 

const candidaturesAdminRoute=require('./routes/adminPart/candidatures');
app.use('/candidatures',candidaturesAdminRoute); 






//initialiser le serveur
app.listen(process.env.PORT,()=>
{ 
    let port=process.env.PORT;
 console.log('client server started at http://localhost:'+port);
 console.log('server Admin started at http://localhost:'+port+'/loginAdmin');

})
//connection mongoose


mongoose.connect(process.env.DATABASE|| 5000,(err)=>
{
    if(!err)
    console.log("connected sucessfully to database");
    else{
        console.log(" not connected to database"+err);

    }
});

//======
app.use(flash());
var sessionFlash = function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();

}
app.use(sessionFlash)


