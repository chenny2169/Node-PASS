const CourseDB = require('../models/courses')

exports.listCourseInfo = function(req,res,next){
    CourseDB.find({}).then(function(result){
        if(req.header('Content-Type')=='application/json'){
           res.json({result: result})
        }
        else{
            res.render('course', { title:'Course' , result :result });
        }
    });
};