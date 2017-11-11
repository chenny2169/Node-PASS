const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HwSchema = new Schema({
    name:{
        type : String
    },
    percentage :{
        type : String
    }
})

const HW = mongoose.model('hwCollection',HwSchema)

module.exports = HW