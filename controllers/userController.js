//import model in userController.js file
const users=require('../db/Models/userSchema')

//import jsonwebtoken
const jwt=require('jsonwebtoken')

//define and export logic to resolve diffrent http client request
exports.register=async(req,res)=>{
//register logic

console.log(req.body);
//get data send by frond end
const { username,acno,password }= req.body

if(!username||!acno||!password)
{
    res.status(403).json("All inputs are required!!!")
}

//check user is excisting 
try{
const preuser=await users.findOne({acno})
if(preuser){
    res.status(406).json("user already exist!!!")
}
else{
    //add user to db
    const newuser=new users({
        username,
        password,
        acno,
        balance:5000,
        transaction:[]
    })
     //to save newuser in mongodb
     await newuser.save()
     res.status(200).json(newuser)
}

}
catch(error){
    res.status(401).json(error)
}
}
//login
exports.login=async(req,res)=>{
//get request body
const{acno,password}=req.body
//check acno nd password in database
try{
//check acno and password is in db/mongodb
const preuser=await users.findOne({acno,password})
//check preuser or not
if(preuser){
    //generate token using jwt
    const token =jwt.sign({
        lognAcno:acno
    },"supersecretkey12345")
    //send to client
    res.status(200).json({preuser,token})
}
else{
    res.status(404).json("Invalid account number / password")
}
}catch(error){
    re.status(401).json(error.message)
}
}
//getbalance
exports.getbalance=async(req,res)=>{
    //get acno from path parameter
    let acno=req.params.acno
    console.log(acno);

    //get data of given acno
    try{
       //find acno from userscollection
      const preuser= await users.findOne({acno})
      console.log(preuser);

      res.status(200).json(preuser.balance)

       }
    catch(error){
        res.status(404).json("Invalid Account Number")
    }
}

//fund gtransfer
exports.transfer=async(req,res)=>{
    console.log("inside transfer logic");
    //logic
    //1.get body from req,creditacno,amt,pswd
    const {creditAcno,creditAmount,pswd}=req.body
    console.log(req.body["creditAcno"]);
    let amt=Number(creditAmount)
    const{debitAcno}=req
    console.log(debitAcno);
   try{
     //2.check debit acno and pswd is available in mongodb
     const debitUserDetails=await users.findOne({acno:debitAcno,password:pswd})
     console.log(debitUserDetails);

     //3.get credit acno details from mongodb
     const creditUserDetails=await users.findOne({acno:creditAcno})
     console.log(creditUserDetails);

    if(debitAcno!=creditAcno){
        if(debitUserDetails&&creditUserDetails){
        
            if(debitUserDetails.balance>=creditAmount){
    
            //perfome transfer
            //check sufficient balance available for debit user
            //debit credit amount from debituserdetails
            debitUserDetails.balance-=amt
            //add debit transaction to debitUserDetails
            debitUserDetails.transaction.push({
                transaction_type:"DEBIT",amount:creditAmount,fromAcno:debitAcno,toAcno:creditAcno
            })
           // save debitUserDetails in mongodb
           await debitUserDetails.save()
            //credit creditamount to credituserdetials
            creditUserDetails.balance+=amt
            creditUserDetails.transaction.push({
                transaction_type:"CREDIT",amount:creditAmount,fromAcno:debitAcno,toAcno:creditAcno
            })
            //save creditUserDetails in mongodb
           await creditUserDetails.save()
            res.status(200).json("transfer successfully")
            }
            else{
                //insuficent balance
                res.status(406).json("invalid balance!!!")
            }
         }
         else{
            res.status(406).json("invalid credit/debit details!!!")
         }
    }
    else{
        res.status(406).json("operation denies!!!self transaction not allowed")
    }
   }
   catch(error){
    res.status(401).json(error)
   }
    //res.send("transfer rqst recieve")
    //get transactions


}
//getTransactions
exports.getTransactions=async(req,res)=>{
    //get acno from req.debit acno
    let acno=req.debitAcno
    //2.check acno in mongodb
    try{
const preuser=await users.findOne({acno})
res.status(200).json(preuser.transaction)
    }
    catch(error){
res.status(401).json("Invalid Account Number")
    }
}

//deleteaccount
exports.deleteMyAccount=async(req,res)=>{
    //1.get account number from req
  let acno=req.debitAcno
    //remove acno from db
    try{
       await users.deleteOne({acno})
       res.status(200).json("remove suuccessfully")
    }
        catch(error){
            res.status(401).json(error)
        }
    }
