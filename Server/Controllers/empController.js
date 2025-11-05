
const EmpModel = require("../models/empModel");

const emplogin = async (req,res)=>{
    const {email,password}=req.body;
    const empolyee= await EmpModel.findOne({email:email});

    if(!empolyee)
    {
        res.status(401).send({msg:"Invalid  Empolyee Email"});

    }

    if(empolyee.password!=password){
        res.status(401).send({msg:"Ivalid empolyee Passwoed"});
    }

    res.status(200).send({empolyee:empolyee,msg:"Login succesfully!"});
}

module.exports={
    emplogin,
}