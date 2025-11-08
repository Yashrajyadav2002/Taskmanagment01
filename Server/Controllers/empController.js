const EmpModel = require("../models/empModel");
const Taskmodel = require("../models/taskModel");

// =======================
// Employee Login
// =======================
const emplogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await EmpModel.findOne({ email: email });

    if (!employee) {
      return res.status(401).send({ msg: "Invalid Employee Email" });
    }

    // Check password
    if (employee.password !== password) {
      return res.status(401).send({ msg: "Invalid Employee Password" });
    }

    // Success
    return res.status(200).send({
      employee: employee,
      msg: "Login successfully!",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// =======================
// Show Employee Tasks
// =======================
const showTask = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send({ msg: "Employee ID is required" });
    }

    const tasks = await Taskmodel.find({ empid: id });

    if (!tasks || tasks.length === 0) {
      return res.status(404).send({ msg: "No tasks found for this employee" });
    }

    res.status(200).send(tasks);
  } catch (error) {
    console.error("Show Task Error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// =======================
// Submit Task Report
// =======================
const taskReports = async (req, res) => {
  try {
    const { taskstatus, taskduration, taskId } = req.body;

    if (!taskId) {
      return res.status(400).send({ msg: "Task ID is required" });
    }

    await Taskmodel.findByIdAndUpdate(taskId, {
      taskstatus: taskstatus,
      completionday: taskduration,
      submitstatus: true,
    });

    res.status(201).send({ msg: "Task successfully submitted!" });
  } catch (error) {
    console.error("Task Report Error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  emplogin,
  showTask,
  taskReports,
};
