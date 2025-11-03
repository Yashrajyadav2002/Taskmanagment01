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
    const userCreate = async(req,res)=>{
        const {empname,empemail,designation}=req.body;
        const emppassword = Userpassword.myPassword();
        console.log(Userpassword.myPassword());

    const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
     host: "smtp.ethereal.email",
     port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "maddison53@ethereal.email",
     pass: "jn7jnAPss4f63QBp6D",
  },
});

// Wrap in an async IIFE so we can use await.
   (async () => {
     const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
  });

     console.log("Message sent:", info.messageId);
      })();
    }
};git 