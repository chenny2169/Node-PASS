var express = require('express');
var router = express.Router();
const GradesDB = require('../models/grades')
const HW = require('../models/homework')


/* GET grades home page. */
router.get('/:homework_uuid', function(req, res) {
  GradesDB.find({"homework_uuid": req.params.homework_uuid}).then(function(result){
    console.log(result)
    res.render('markHomework', { title:'批改作業專區',  result :result})
  })
})


// get specific student hw info
router.get('/person/info/:studentID/:homework_uuid', function(req, res){
    GradesDB.find({"studentID":req.params.studentID, "homework_uuid":req.params.homework_uuid})
      .then(function(result){
        console.log(result)
        res.render('markPersonHomework',{title : '作業狀態', result : result})   
  })
})

//update student hw score  
//Query Strings 和 POST method 的表單同時使用
router.post('/person/updateGrade', function(req, res){
  console.log(req.body.grade)
  console.log(req.query.studentID)
  GradesDB.update({studentID : req.query.studentID, homework_uuid : req.query.homework_uuid},
    {$set:{homeworkGrade : req.body.grade}}).then(function(result){
      res.redirect('/markHomework/'+req.query.homework_uuid)
    })
})

router.get('/person/download', function(req, res){
  let homeworkName;
  console.log(req.query.homework_uuid)
  HW.find({"_id" : req.query.homework_uuid}).then(function(result){
    console.log(result)
    homeworkName=result[0].homeworkName
    res.download("homeworkCollection/"+req.query.studentID+"_"+homeworkName+".txt")
  })
})


module.exports = router;