const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    task:String,
    duration:Number,
    priority:String,
    emoid:{type: mongoose.Schema.Types.ObjectId, ref:"employee"},
    taskstatus:String,
    completionday:Number,
    submitstatus:Boolean
});

module.exports  = mongoose.model("task",taskSchema);
