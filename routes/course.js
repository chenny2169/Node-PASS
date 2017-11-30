var express = require('express');
var router = express.Router();
const CourseDB = require('../models/courses')
const HW = require('../models/homework')
var controller = require('../controllers/courseController');

/* GET homework home page. */
router.get('/',controller.listCourseInfo)

module.exports = router;