const express= require('express');
const authRouters= require('./routers/authRouters')
const bodyParser = require('body-parser')
const cookieParser= require('cookie-parser')
const {requireAuth, checkUser}= require('./middleware/authMiddleware');
require('./db/mongoose');

const app= express();
const port= process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// Routes
app.get('*', checkUser);
app.use(authRouters);
app.get('/programming', requireAuth, async(req, res)=> res.render("programming"))
app.get('/',async(req, res)=> res.render("home"))

// listening on port
app.listen(port, ()=>{
    console.log("Server is up on port "+port);
});