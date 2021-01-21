const express= require('express');
const router= express.Router();
const {ProgrammingSection, ProgrammingQuestion}= require('../models/programming');
const programmingController= require("../controllers/programmingController");
const {requireAuth, checkUser}= require('../middleware/authMiddleware');

router.get('/programming', requireAuth, programmingController.programming_section);
router.get('/programming/:name', requireAuth, programmingController.programming_question);

module.exports= router