const mongoose= require('mongoose');
const validator= require('validator');

const ProgrammingSectionSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter valid name'],
        trim: true
    },
});

const ProgrammingQuestionSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter valid name'],
        trim: true
    },
    link: {
        type: String,
        required: [true, 'Please enter valid link'],
        trim: true
    },
    ProgrammingSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProgrammingSection',
    }
});


const ProgrammingSection= mongoose.model('ProgrammingSection',ProgrammingSectionSchema)
const ProgrammingQuestion= mongoose.model('ProgrammingQuestion',ProgrammingQuestionSchema)
module.exports= {ProgrammingSection, ProgrammingQuestion};