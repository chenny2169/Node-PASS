const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GradeSchema = new Schema({
    studentID:{
        type : String
    },
    studentName:{
        type : String
    },
    homeworkGrade:{
        type : String
    },
    submitTime:{
        type : String
    },
    homework_uuid:{
        type : String
    }
})

const gradesDB = mongoose.model("gradesCollection", GradeSchema)
module.exports = gradesDB