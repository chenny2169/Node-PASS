var express = require('express');
var router = express.Router();
const HW = require('../models/homework')

/* GET homework home page. */
router.get('/', function(req, res) {
  // res.render('hw', { title: 'Homework' });
    HW.find({}).then(function(result){
     console.log(result)
      res.render('hw', { title:'Homework' , result :result });
    })
});

/* POST Add homework. */
router.post('/addHW', function(req, res, next){
     HW.create(req.body).then(function(result){
       console.log(result)
       res.redirect('/hw')
    });
})

module.exports = router;
