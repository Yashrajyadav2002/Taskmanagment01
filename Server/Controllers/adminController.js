const AdminModel = require ("../models/adminModel");
const Userpassword = require("../middlewares/randomPassword");
const emailSend = require("../middlewares/empMailSen");
const EmpModel = require ("../models/empModel");
const TaskModel = require("../models/taskModel");
const adminLogin = async(req,res)=>{
    const {email,password}=req.body;
    try {
       const Admin  = await AdminModel.findOne({email:email});
       if(!Admin)
       {
        res.status(401).send({msg:"Invalid Email ID"})
       }
       if(Admin.password!=password)
       {
        res.status(401).send({msg:"Invalid Password"})
       }
       res.status(200).send({Admin:Admin,msg:"Succesfully login"})
    } catch (error) {
        console.log(error);
       
    }

}
   const userCreate = async (req,res)=>{
    const {empname,empemail,designation}=req.body;
    const emppassword = Userpassword.myPassword();
    emailSend.useMailsender(empname,empemail,emppassword);

    const Empolyee =await EmpModel.create({

        name:empname,
        email:empemail,
        designation:designation,
        password: emppassword
    })
    res.status(201).send("user succesfully created !!!!")
   }

   const empDisplay = async(req,res)=>{
    const empolyee =await EmpModel.find();
    res.status(200).send(empolyee);
   }

   const taskSave  =async(req,res)=>{
    const {id,task,duration,priority}=req.body;
    const emptask = await TaskModel.create({
        task:task,
        duration:duration,
        priority:priority,
        empid:id
    })
    // await emptask.save();
    // console.log(req.body)
    res.status(201).send("Task Succesfully Created!");
}

    const taskreportDisplay=async(req,res)=>{
        const taskreport=await TaskModel.find({
            submitstatus:true}).populate("empid");
            res.status(200).send(taskreport);
    };

    const taskReassign=async(req,res)=>{
        const task = await TaskModel.findByIdAndUpdate(req.query.tid,{
            submitstatus:false
        });
        res.status(201).send({msg:"Task succesfully Updated "});
    
   }
    const updateTask = async (req, res) => {
      try {
        const { id } = req.params;
        const { task, duration, priority } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { task, duration, priority },
        { new: true }
      );

       res.status(200).send(updatedTask);
    } catch (error) {
       console.log(error);
       res.status(500).send({ msg: "Error updating task" });
     }
};





module.exports={
    adminLogin,
    userCreate,
    empDisplay,
    taskSave,
    taskreportDisplay,
    taskReassign,
    updateTask,
}