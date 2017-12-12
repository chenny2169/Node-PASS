const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    studentID:{
        type : String
    },
    studentName:{
        type : String
    },
    courseID:{
        type : [String]
    },
    role:{
        type : String
    },
    password:{
        type : String
    }
})

const studentDB = mongoose.model("studentCollection", StudentSchema)
module.exports = studentDB