const {Company, InterviewExperience}= require('../models/interviewExperience');
const { use } = require('../routers/programmingRouters');

module.exports.company= async(req, res)=> {
    const companies= await Company.find();    
    res.render('companies', {companies});
}

module.exports.particularCompany= async(req, res)=> {
    const name= req.params.name;
    const company= await Company.find({name});
    const experiences= await InterviewExperience.find({CompanyId:company[0]._id});
    res.render('company', {name, experiences});
}

module.exports.your_experience_get= async(req, res)=> {
    res.render('your_experience');
}


