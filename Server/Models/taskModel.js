const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    task:String,
    duration:Number,
    priority:String,
    emoid:String,
    taskstatus:String,
    completionday:Number,
    submitstatus:Boolean
});

module.exports  = mongoose.model("task",taskSchema);
