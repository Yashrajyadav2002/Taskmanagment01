const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyparser = require('body-parser');
const cors = require('cors');
const AdminRoute = require("./Routes/adminRoute");
mongoose.connect(process.env.DBCON).than(()=>{
    console.log("DB is connected succesfully !")
});

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Use CORS middleware
app.use(cors());

app.use("/admin",AdminRoute);

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server run on ${port} port!`);
});