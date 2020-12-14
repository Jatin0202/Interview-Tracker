const User= require('../models/user');
const jwt= require('jsonwebtoken');
const { use } = require('../routers/authRouters');

module.exports.signup_get= (req, res)=> {
    res.render('signup');
}

module.exports.login_get= (req, res)=> {
    res.render('login');
}

// handle errors
const handleErrors= (err) =>{
    let errors= {name: '', email: '', password: ''};
    
    if(err.message === 'Email is not registered'){
        errors.email= 'Email is not registered';
    }
    if(err.message === 'Incorrect Password'){
        errors.email= 'Incorrect Password';
    }

    if(err.code === 11000){
        errors.email= 'that email is already registered';
        return errors;
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]= properties.message;
        })
    }

    return errors;
}

const maxAge= 3*24*60*60;
const createToken= (id)=>{
    return jwt.sign({id}, 'Interview Coding Club IITG',{
        expiresIn: maxAge
    });
}

module.exports.signup_post= async(req, res)=> {
    const {name, email, password, password2}= req.body;

    try{
        const user= await User.create({email, name, password});
        const token= createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.redirect('/');
    }
    catch(err){
        const errors= handleErrors(err);
        res.render('signup', {errors});
    }
}

module.exports.login_post= async(req, res)=> {
    const {email, password}= req.body;

    try{
        const user= await User.login(email, password);
        const token= createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.redirect('/');
    }
    catch(err){
        const errors= handleErrors(err);
        res.render('login', {errors});
    }
}

module.exports.logout_get= (req, res)=> {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}