//define node app and mongodb database connectivity



//import mangoose in connection.js file
const mongoose=require('mongoose')
//get connection string from .env file:process.env
const connectionString=process.env.DATABASE


//Connect node app with mongodb using connection string with help of mongoogse
mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("mongodb atlas connected");
}).catch(()=>{console.log(`connection error`+error);})