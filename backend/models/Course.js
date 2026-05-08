const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

platform:{
type:String
},

skillsCovered:{
type:[String],
default:[]
},

link:{
type:String
},

duration:{
type:String
}

});

module.exports = mongoose.model("Course", courseSchema);