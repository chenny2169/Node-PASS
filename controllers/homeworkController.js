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

exports.editSpecificCouresHwInfos = function(req, res, next){
  HW.findOneAndUpdate({"_id" : req.query.homework_uuid}, {$set:
        {
            homeworkName : req.body.homeworkName,
            dueDate : req.body.dueDate, 
            percentage : req.body.percentage, 
            fileExtension : req.body.fileExtension, 
            homeworkDescription : req.body.homeworkDescription,
            dueDateExtension : req.body.dueDateExtension
        }
    },{ new: true }).then(function(result){
       if(req.header('Content-Type')=='application/json'){
          console.log(result)
          res.json({result: result})
       }else{
          console.log(result)
          res.redirect('/hw/'+req.body.courseName)    
       }
    })
}