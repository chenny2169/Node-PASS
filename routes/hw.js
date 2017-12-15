var express = require('express');
var router = express.Router();
const HW = require('../models/homework')
const GradeDB = require('../models/grades')
const studentDB = require('../models/student')
var controller = require('../controllers/homeworkController');


router.get('/edit/:_id', function(req, res){
    HW.find({"_id":req.params._id}).then(function(result){
        console.log(result)
         res.render('editHomework', {title:'Edit Homework', result :result})
    })
})

router.get('/delete/:_id', function(req, res){
    HW.find({"_id":req.params._id}).then(function(hwinfo){
        return hwinfo[0].courseName
    }).then(function(courseName){
        HW.remove({"_id":req.params._id}).then(function(result){
            GradeDB.remove({"homework_uuid":req.params._id}).then(function(result){
                 console.log(courseName)
                 res.redirect('/hw/'+courseName)
            })
        })
    })
})


/* GET homework home page. */
router.get('/:courseName', controller.showSpecificCourseHw)


/* POST Add homework. */
router.post('/addHW', function(req, res, next){
    HW.create(req.body).then(function(homework){
        studentDB.find({role:'student'}).then(function(students) {
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
router.post('/editHW', controller.editSpecificCouresHwInfos)


module.exports = router;
