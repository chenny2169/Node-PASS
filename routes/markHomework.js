var express = require('express');
var router = express.Router();
const GradesDB = require('../models/grades')

/* GET grades home page. */
router.get('/', function(req, res) {
    GradesDB.find({}).then(function(result){
      console.log(result)
      res.render('markHomework', { title:'Mark homework',  result :result})
    })
});

//Monk for adding user info for grades
router.post('/monkData', function(req, res){
  GradesDB.create(req.body).then(function(result){
     console.log(result)
  })
})


module.exports = router;