const express= require('express');
const router= express.Router();
const {Company, InterviewExperience}= require('../models/interviewExperience');
const interviewExperienceController= require("../controllers/interviewExperienceController");
const {requireAuth, checkUser}= require('../middleware/authMiddleware');

router.get('/interview_experience', requireAuth, interviewExperienceController.company);
router.get('/interview_experience/:name', requireAuth, interviewExperienceController.particularCompany);
router.get('/your_experience', requireAuth, interviewExperienceController.your_experience_get);
//router.post('/your_experience', requireAuth, interviewExperienceController.your_experience_post);

module.exports= router