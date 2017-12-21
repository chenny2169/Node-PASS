const HW = require('../models/homework')

exports.showSpecificCourseHw = function(req, res, next){
          HW.find({"courseName" : req.params.courseName}).then(function(result){
          if(req.header('Content-Type')=='application/json'){
            console.log(result)
            res.json({result: result})
          }else{
            res.render('hw', { title:'Homework' , result :result , courseName :req.params.courseName})
          }
    })
}

exports.editSpecificCouresHwInfos = function(req, res, next){
    console.log(req.body)
    console.log(req.files)
    // let uploadFile = req.files.homeworkTestScript;
    // req.body.homeworkTestScriptName = uploadFile.name
    // req.body.homeworkTestScriptPath ='homeworkCollection/'+uploadFile.name
  HW.findOneAndUpdate({"_id" : req.query.homework_uuid}, {$set:
        {
            homeworkName : req.body.homeworkName,
            dueDate : req.body.dueDate, 
            percentage : req.body.percentage, 
            fileExtension : req.body.fileExtension, 
            homeworkDescription : req.body.homeworkDescription,
            dueDateExtension : req.body.dueDateExtension,
            // homeworkTestScriptName : req.body.homeworkTestScriptName,
            // homeworkTestScriptPath : req.body.homeworkTestScriptPath
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