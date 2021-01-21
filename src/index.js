const express= require('express');
const authRouters= require('./routers/authRouters')
const adminRouters= require('./routers/adminRouters')
const programmingRouters= require('./routers/programmingRouters')
const interviewExperienceRouters= require('./routers/interviewExperienceRouters')
const bodyParser = require('body-parser')
const cookieParser= require('cookie-parser')
const {requireAuth, checkUser}= require('./middleware/authMiddleware');
require('./db/mongoose');

const app= express();
const port= process.env.PORT || 3000;

// middleware and admin routers
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/admin', adminRouters);
app.use(bodyParser.urlencoded());

// view engine
app.set('view engine', 'ejs');

// Routes
app.get('*', checkUser);
app.use(authRouters);
app.use(programmingRouters);
app.use(interviewExperienceRouters);
app.get('/',async(req, res)=> res.render("home"));

// listening on port
app.listen(port, ()=>{
    console.log("Server is up on port "+port);
});
