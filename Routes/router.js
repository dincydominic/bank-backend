//import express
const express=require('express')
//import middleware
const middleware=require('../middleware/routerSpecific')

//create routes,using express.Router() class
const router=new express.Router()

//import controller
const userController=require('../controllers/userController')

//define routes to resolve http request
//register reqst
router.post('/employee/register',userController.register)
//login req
router.post('/employee/login',userController.login)
//getbalance reqst
router.get('/user/balance/:acno',middleware.logMiddleware,userController.getbalance)
//fund transfer reqst
router.post('/user/transfer',middleware.logMiddleware,userController.transfer)
//transactions
router.get('/user/transactions',middleware.logMiddleware,userController.getTransactions)
//delete account
router.delete('/user/delete',middleware.logMiddleware,userController.deleteMyAccount)

//export router
module.exports=router
