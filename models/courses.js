const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    courseID:{
        type : String
    },
    courseName:{
        type : String
    },
    instructor:{
        type : String
    },
    classroom:{
        type : String
    }
})

const courseDB = mongoose.model("coursesCollection", CourseSchema)
module.exports = courseDB