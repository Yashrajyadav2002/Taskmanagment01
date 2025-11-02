const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const AdminRoute = require("./routes/adminRoute");

// ✅ Fix 1: 'then' was written as 'than'
mongoose.connect(process.env.DBCONN)
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

// ✅ body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ use cors middleware
app.use(cors());

// ✅ use your admin route
app.use("/admin", AdminRoute);

// ✅ Fix 2: small log message correction
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
