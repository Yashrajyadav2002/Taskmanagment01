var nodemailer = require ('nodemailer');
const useMailsender = (uname,uemail,upass)=>{
    var transporter = nodemailer.createTransport({
        service:'gamil',
        auth:{
            user: "",
            pass:"",
        }
    });

    var mailOptions = {
      from: '',
      to: uemail,
      subject: 'Sending Email by Admin using Node.js Task Management System ',
      text:`Dear :  ${uname}\n Your Password :  ${upass}\n You can Login With Email and this Password`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email Succ sent: ' + info.response);
        res.send(info.response);
      }
    });
}

module.exports={
    useMailsender,
}