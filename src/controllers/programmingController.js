const {ProgrammingSection, ProgrammingQuestion}= require('../models/programming');
const { use } = require('../routers/programmingRouters');

module.exports.programming_section= async(req, res)=> {
    console.log(req);
    const programmingSections= await ProgrammingSection.find();    
    res.render('programmingSection', {programmingSections});
}

module.exports.programming_question= async(req, res)=> {
    const name= req.params.name;
    const programmingSection= await ProgrammingSection.find({name});
    const programmingQuestions= await ProgrammingQuestion.find({ProgrammingSectionId:programmingSection[0]._id});
    res.render('programmingQuestion', {programmingQuestions, name});
}

