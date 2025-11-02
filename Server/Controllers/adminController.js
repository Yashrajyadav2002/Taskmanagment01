const AdminModel = require ("../models/adminModel");

const adminLogin = async(req,res)=>{
    try {
       const Admin  = await AdminModel.findOne({email:"email"});
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
};

module.exports = {
    adminLogin,
}