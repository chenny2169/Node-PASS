var express = require('express');
var router = express.Router();
const studentDB = require('../models/student')
const session = require('express-session');

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.isLogin == true)
    return next();
  else
    return res.Status(401).send('Unauthorized');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{isLogin:req.session.isLogin, result:req.session.result});
});

/* GET login page. */
router.get('/login', function(req, res, next){
  res.render('login'); 
});

router.post('/login', function(req, res, next){
  studentDB.find({'studentID':req.body.studentID, 'password':req.body.password}).then(function(result){
    if(result.length==0){
      req.flash('msg','invalid account');
      res.locals.messages = req.flash();
      res.render('login')
    }
    else{
      if(result[0].role=="student"){
        req.session.isLogin = true
        req.session.result = result
      res.redirect('/listCourse/'+result[0].studentID)
      }
      else if (result[0].role=="teacher"){
         req.session.isLogin = true
        req.session.result = result
      res.redirect('/course')
      }
    }
  })
})

// Get content endpoint
router.get('/content', auth, function (req, res) {
    if(req.session.result[0].role =='teacher')
      res.redirect('/course')
    else if(req.session.result[0].role == 'student')
      res.redirect('/listCourse/'+req.session.result[0].studentID)
    
});

router.get('/test', function(req, res, next){
  if(!req.session.result){
    return res.status(401).send('no session exist')
  }
  res.send('login yap')
})

router.get('/logout', function(req, res, next){
  req.session.destroy()
  res.redirect('/login')
  // res.status(200).send('successful logout')
})

module.exports = router;

