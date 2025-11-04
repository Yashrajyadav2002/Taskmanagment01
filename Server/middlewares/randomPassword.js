const myPassword = ()=>{
    let passWord="";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let strLen = str.length;
    for(var i=0;i<7;i++){
        let mynum=Math.floor(Math.random()*strLen);
        passWord+=str.charAt(mynum);
    }

    return passWord;
}

module.exports={
    myPassword,
}