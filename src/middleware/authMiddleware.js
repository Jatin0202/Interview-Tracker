const jwt= require("jsonwebtoken");
const User = require("../models/user");

const requireAuth= (req, res, next)=>{
    const token= req.cookies.jwt;
    
    // Check json web token and verify it
    if(token){
        jwt.verify(token, 'Interview Coding Club IITG', (err, decodedToken)=>{
            if(err){
                //console.log(err.message);
                res.redirect('/users/login');
            }
            else{
                //console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/users/login');
    }
}

const checkUser= (req, res, next)=> {
    const token= req.cookies.jwt;
    
    if(token){
        jwt.verify(token, 'Interview Coding Club IITG', async(err, decodedToken)=>{
            if(err){
                //console.log(err.message);
                res.locals.user= null;
                next();
            }
            else{
                let user= await User.findById(decodedToken.id);
                res.locals.user= user
                //console.log(user);
                next();
            }
        });
    }
    else{
        res.locals.user= null;
        next();
    }
}

module.exports= {requireAuth, checkUser};