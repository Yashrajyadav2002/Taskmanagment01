const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    task:String,
    duration:Number,
    priority:String,
    emoid:String
});

module.exports  = mongoose.model("task",taskSchema);
