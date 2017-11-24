var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const CourseDB = require('../models/courses')
const HW = require('../models/homework')
const GradeDB = require('../models/grades')
const studentDB = require('../models/student')


/* GET homework home page. */
router.get('/:studentID', function(req, res){
  studentDB.find({"studentID" :req.params.studentID}).then(function(student){
      console.log(student[0].studentID) 
      return student[0].courseID
  }).then(function(courseID){
      CourseDB.find({'courseID':courseID}).then(function(courseInfo){
        console.log(courseInfo)
        res.render('listCourse',{title:'作業繳交區',result:courseInfo})
      })
  })
})


router.get('/', function(req, res) {
  CourseDB.find({}).then(function(result){
    console.log(result)
    res.render('listCourse', { title:'作業繳交區' , result :result });
  })
});




//Mock for adding user info for grades
router.post('/mockData', function(req, res){
  studentDB.create(req.body).then(function(result){
    console.log(result)
  })
})

//"studentID":req.params.id
router.get('/listHomework', function(req, res){
  HW.find({"courseName":req.query.courseName}).then(function(result) {
    
  // HW.find({"courseName":req.query.courseName}).then(function(homewoerks) {
    //   console.log("homewoerks=")
    //   console.log(homewoerks)
      
    //   let listHomework = {
    //     homeworkName: '',
    //     uploadState: '',
    //     dueDate: '',
    //     submitTime: '',
    //     homeworkGrade: ''
    //   }
    //   var result =[]
    //   homewoerks.forEach(function(homework){
    //     GradeDB.find({"homework_uuid" :homework._id}).then(function(grade){
    //       listHomework.homeworkName = homework.homeworkName
    //       listHomework.uploadState = ''
    //       listHomework.dueDate = homework.dueDate
    //       listHomework.submitTime = grade[0].submitTime
    //       listHomework.homeworkGrade = grade[0].homeworkGrade
    //       console.log(listHomework)
    //       result.push(listHomework)
    //     })
    //     console.log(result)
    //   })
    // }).then(function(value){
    //   console.log("result=")
    //   console.log(value)
      res.render('listHomework', { title:'作業區' , result :result });
    
    })
})

router.get('/uploadPersonalHomework', function(req, res){
  // GradeDB.find({"homework_uuid":req.query.homework_uuid, "studentID" :req.query.studentID}).then(function(result){
  HW.find({"_id":req.query.homework_uuid}).then(function(result){
    console.log('123')
    console.log(result)
    
     res.render('uploadPersonalHomework', { title:'作業區' , result :result });
  })
})

router.post('/listHomework/upload', function(req, res){
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
          res.redirect('/listCourse/listHomework?courseName='+result[0].courseName+'&studentIO=105598001')
        })
      })
    })
  }
})

router.get('/listHomework/download', function(req, res){
  HW.find({"_id" : req.query.homework_uuid}).then(function(result){
    console.log(result)
    homeworkName=result[0].homeworkName
    fileExtension=result[0].fileExtension
    // res.download("homeworkCollection/"+req.query.studentID+"_"+homeworkName+"."+fileExtension)
    res.download("homeworkCollection/"+req.query.studentID+"_"+homeworkName+".doc")
    
  })
})

function upload() {
  let currentdate = new Date(); 
  let datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  console.log("y="+datetime)
  return datetime
}
module.exports = router;