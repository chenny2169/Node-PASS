var express = require('express');
var router = express.Router();
const HW = require('../models/homework')

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('hw', { title: 'Homework' });
    HW.find({}).then(function(result){
      // let JsonObj = JSON.parse(result)
      // console.log(JsonObj)
      res.render('hw', { title:'Homework' , result :result });
    })
});

router.post('/addHW', function(req, res){
     HW.create(req.body).then(function(result){
       res.send(result)
    });
})

module.exports = router;
