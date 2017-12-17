var express = require('express');
var router = express.Router();
var request = require('request-promise');
const GradesDB = require('../models/grades')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ping/byjenkins', function(req, res){
  // var url = "http://140.124.181.129:8080/job/student1/ws/mochawesome-report/mochawesome.json"
  let jobName=String(req.query.homeworkInfo)//query=>homeworkInfo=105598001_SE1
  let homeworkInfo ={
    studentID:jobName.split('_')[0],
    homeworkName:jobName.split('_')[1]
  }
  let baseurl="http://140.124.181.129:8080/job/"
  let filePath="/ws/mochawesome-report/mochawesome.json"

  request({
      url: baseurl.concat(jobName).concat(filePath),
      json: true
  }).then(function(body){
    console.log(body)
    GradesDB.update({studentID : homeworkInfo.studentID, homeworkName : homeworkInfo.homeworkName},
      {$set:{homeworkGrade : body.stats.passPercent}}).then(function(result){
        console.log(result)
        res.send('correct finish')
      })
  })
})

module.exports = router;
