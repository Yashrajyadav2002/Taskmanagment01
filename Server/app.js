const express = require("express");
const app = express();
const AdminRoute = require("./Routes/adminRoute");


mongoose.connect(process.env.DBCON).than(()=>{
    console.log("DB is connected succesfully !")
});

app.use("/admin",AdminRoute);


const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server run on ${port} port!`);
});