//import
//config:loads .env file contents tnto process .env.
require('dotenv').config();
//import express
const express=require('express')
//import cors
const cors=require('cors')
//import connection.js
require('./db/connection')

//import router
const router=require('./Routes/router')
//import appMiddleware
const appMiddleware =require('./middleware/appMiddleware')

//create express server
const server=express()

//setup port number to server
const PORT=3000 || process.env.PORT



//use cors,json parse in server app
server.use(cors())
server.use(express.json())
//use appMiddleware
server.use(appMiddleware.appMiddleware)

//use router in server app
server.use(router)



//run the server app in a specified function
server.listen(PORT,()=>{
    console.log(`bank server started at port number ${PORT}`);
})
