var express = require('express');
var router = express.Router();
const GradesDB = require('../models/grades')

/* GET grades home page. */
router.get('/', function(req, res) {
    GradesDB.find({}).then(function(result){
    console.log(result)
    res.render('markHomework', { title:'批改作業專區',  result :result})
  })
})

//Mock for adding user info for grades
router.post('/monkData', function(req, res){
    GradesDB.create(req.body).then(function(result){
    console.log(result)
  })
})

// get specific student hw info
router.get('/person/info/:id', function(req, res){
    GradesDB.find({"studentID":req.params.id}).then(function(result){
    console.log(result)
    res.render('markPersonHomework',{title : '作業狀態', result : result})   
  })
})

//update student hw score  
//Query Strings 和 POST method 的表單同時使用
router.post('/person/updateGrade', function(req, res){
  console.log(req.body.grade)
  console.log(req.query.studentID)
  GradesDB.update({studentID : req.query.studentID},{$set:{homeworkGrade : req.body.grade}})
          .then(function(result){res.redirect('/markHomework')})
})


module.exports = router;