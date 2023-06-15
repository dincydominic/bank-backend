//define application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log("appliation specicfic middleware");
    next()
}
module.exports={
    appMiddleware
}