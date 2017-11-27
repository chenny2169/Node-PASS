var express = require('express');
var router = express.Router();
const CourseDB = require('../models/courses')
const HW = require('../models/homework')
const GradeDB = require('../models/grades')
const studentDB = require('../models/student')

router.get('/', function(req, res){
  let result = {
    studentID : req.query.studentID,
    homeworks :  [],
    grades : []
  }
  HW.find({"courseName":req.query.courseName}).then(function(homeworks) {
    console.log(homeworks)
    result.homeworks = homeworks
    return homeworks
  }).then(function(homeworks){
    let homework_uuid = []
    for(let i = 0 ; i < homeworks.length ; i++){
      homework_uuid.push(homeworks[i]._id)
    }
    console.log(homework_uuid)
    GradeDB.find({"homework_uuid" :homework_uuid, "studentID" :req.query.studentID}).then(function(grade){
      result.grades = grade
      return result
    }).then(function(a){
      console.log(result)
      res.render('listHomework', { title:req.query.studentID+' '
        +req.query.courseName+'作業區' , result :result });
    })
  })
})

router.get('/uploadHomework', function(req, res){
  let result = {
      studentID :  req.query.studentID,
      homework :[]
  }
  HW.find({"_id":req.query.homework_uuid}).then(function(homework){
      console.log(result)
      result.homework = homework
      res.render('uploadHomework', { title: homework[0].courseName+' '
          +homework[0].homeworkName+' 上傳作業區' , result :result });
  })
})

router.post('/upload', function(req, res){
  // console.log(req.files.uploadFile.name)
  if (req.files.uploadFile == undefined)
    return res.status(500).send('No files were uploaded.');
  else {
    let uploadFile = req.files.uploadFile;
    // Use the mv() method to place the file somewhere on your server
    uploadFile.mv('homeworkCollection/'+uploadFile.name, function(err) {
      if (err)
        return res.status(500).send(err);

      
      GradeDB.update({"homework_uuid":req.query.homework_uuid, "studentID" :req.query.studentID},
      {$set:{submitTime : upload()}, homeworkState : '已繳交'}).then(function() {
  
        HW.find({"_id":req.query.homework_uuid}).then(function(result){
          // console.log(result)
          res.redirect('/listHomework?courseName='+result[0].courseName+'&studentID='+req.query.studentID)
        })
      })
    })
  }
})

router.get('/download', function(req, res){
  HW.find({"_id" : req.query.homework_uuid}).then(function(result){
    console.log(result)
    homeworkName=result[0].homeworkName
    fileExtension=result[0].fileExtension
    // res.download("homeworkCollection/"+req.query.studentID+"_"+homeworkName+"."+fileExtension)
    res.download("homeworkCollection/"+req.query.studentID+"_"+homeworkName+"."+fileExtension)
    
  })
})

function upload() {
  let currentdate = new Date(); 
  let datetime = currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() 
                + "   "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  console.log(datetime)
  return datetime
}
module.exports = router;