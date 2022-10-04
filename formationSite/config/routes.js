const formationRoute=require('./routes/formation');
app.use('/formations',formationRoute); 

const contactRoute=require('./routes/contact');
app.use('/contact',contactRoute); 

const addformationRoute=require('./routes/addFormation');
app.use('/addFormation',addformationRoute); 

const addformation2Route=require('./routes/addFormation2');
app.use('/addFormation2',addformation2Route); 

const learnMoreRoute=require('./routes/learnMore');
app.use('/learn',learnMoreRoute); 
const logoutRoute=require('./routes/logout');
app.use('/logout',logoutRoute); 



const signUpRoute=require('./routes/signUp');
app.use('/signUp',signUpRoute); 

const signinRoute=require('./routes/signin');
app.use('/signin',signinRoute); 
//==========================Mentoring
const wlcmMentorRoute=require('./routes/Mentoring/welcmMentor');
app.use('/welcmMentor',wlcmMentorRoute);
const candidaterRoute=require('./routes/Mentoring/candidater');
app.use('/candidater',candidaterRoute);
const dashbordRoute=require('./routes/Mentoring/Dashbord1');
app.use('/dashbord1',dashbordRoute);
const ModifyRoute=require('./routes/Mentoring/modifyForm');
app.use('/modifyForm',ModifyRoute);

const Modify2Route=require('./routes/Mentoring/modifyForm2');
app.use('/modifyForm2',Modify2Route);


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

module.exports=routes