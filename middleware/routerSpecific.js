//router specific middleware
//import jsonwebtoken
const jwt=require('jsonwebtoken')
//define logic checking user loginned or not
const logMiddleware=(req,res,next)=>{
    console.log("router specific middleware");
    //get token
    const token=req.headers['access-token']
   // console.log(token);

    try{
        //verify token
    const {lognAcno}=jwt.verify(token,"supersecretkey12345")
   //const jwtres=jwt.verify(token,"supersecretkey12345")

    console.log(lognAcno);
    //pass loginAcno to requst
    req.debitAcno=lognAcno
    //to process user requst
    next()
    }
    catch{
        res.status(401).json("please log in")
    }
}
module.exports={
    logMiddleware
}