var express = require('express');
var router = express.Router();
const HW = require('../models/homework')
const GradeDB = require('../models/grades')
const studentDB = require('../models/student')



router.get('/edit/:_id', function(req, res){
    HW.find({"_id":req.params._id}).then(function(result){
        console.log(result)
         res.render('editHomework', {title:'Edit Homework', result :result})
    })
})


/* GET homework home page. */
router.get('/:courseName', function(req, res) {
    HW.find({"courseName":req.params.courseName}).then(function(result){
     console.log(result)
      res.render('hw', { title:'Homework' , result :result })
    })
});



/* POST Add homework. */
router.post('/addHW', function(req, res, next){
    HW.create(req.body).then(function(homework){
        studentDB.find({}).then(function(students) {
            students.forEach(function(student) {
                let grade = {
                    studentID:student.studentID,
                    studentName:student.studentName,
                    submitTime:'',
                    homework_uuid:homework._id.toString()
                }
                GradeDB.create(grade).then(function(result) {
                    console.log(result)
                })
            })
        })
   })

    res.redirect('/hw/'+req.body.courseName)
})

/* POST Edit homework. */
router.post('/editHW', function(req, res){
    console.log(req.body)
    HW.update({_id : req.query.homework_uuid}, 
        {$set:{homeworkName : req.body.homeworkName,
             dueDate : req.body.dueDate, 
             percentage : req.body.percentage, 
             fileExtension : req.body.fileExtension, 
             homeworkDescription : req.body.homeworkDescription}})
        .then(function(result){
            res.redirect('/hw/'+req.body.courseName)    
    })
})

module.exports = router;
