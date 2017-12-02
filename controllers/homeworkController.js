const HW = require('../models/homework')

exports.showSpecificCourseHw = function(req, res, next){
      HW.find({"courseName" : req.params.courseName}).then(function(result){
          if(req.header('Content-Type')=='application/json'){
            console.log(result)
            res.json({result: result})
          }else{
            res.render('hw', { title:'Homework' , result :result })
          }
    })
}