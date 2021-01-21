const mongoose= require('mongoose');
const validator= require('validator');

const CompanySchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter valid name'],
        trim: true
    },
});

const InterviewExperienceSchema= new mongoose.Schema({
    experience: {
        type: String,
        required: [true],
        trim: true
    },
    CompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});


const Company= mongoose.model('Company',CompanySchema)
const InterviewExperience= mongoose.model('InterviewExperience',InterviewExperienceSchema)
module.exports= {Company, InterviewExperience};