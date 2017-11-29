var express = require('express');
var router = express.Router();
const CourseDB = require('../models/courses')
const HW = require('../models/homework')

/* GET homework home page. */
router.get('/', function(req, res) {
    CourseDB.find({}).then(function(result){
        if(req.header('Content-Type')=='application/json'){
            res.json({result: result})
        }
        else{
            res.render('course', { title:'Course' , result :result });
        }
    })
});

module.exports = router;