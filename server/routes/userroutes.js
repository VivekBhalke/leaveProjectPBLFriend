const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");
const { Login } = require('../models/user');
const Leave = require("../models/leave")
const Student= require("../models/studentmodel");
app.use(cors());
``
router.use(bodyParser.json());
router.get('/', (req, res) => {
    res.send('Welcome to Leave Management System');
  });
  router.post("/login", async(req, res) => {
    console.log("loginroutehit")
   const username = req.body.username;
   const password = req.body.password;
   const role = req.body.role;
   console.log(username)
   console.log("------------")
   console.log(password)
   console.log("------------");
   console.log(role);
   console.log("---------------");
   
   try {
    const result = await Login.findOne({username:username});
    console.log(result);
    if(result)
    {
      console.log(result);
      if(result.password == password && result.role == role)
      {
          let studentDetails = [];
          
          return res.json({result : true,id:result.id});
      } 
      else{
        return res.json({result:false});
      }
      
    }else{
      console.log("wrong")
      return res.json({result:false});
    }
   
   
  } catch (error) {
    res.json({message : "wrong username "})
  }})

  
  router.post("/signup", async(req, res) => {
    console.log("signup route hiit")
   const username = req.body.username;
   const password = req.body.password;
   const role = req.body.role;
   console.log(username)
   console.log("------------")
   console.log(password)
   console.log("------------");
   console.log(role);
   console.log("---------------");
   
   try {
    const result = await Login.findOne({username:username});
    console.log(result);
    if(result)
    {
      // console.log(result);
      // if(result.password == password && result.role == role)
      // {
      //     let studentDetails = [];
          
      //     return res.json({result : true,id:result.id});
      // } 
      // else{
      //   return res.json({result:false});
      // }
     
      return res.json({message : "User already exists"})
      
    }else{
      const object = {
        username : username ,
        password : password,
        role : role
      }
      const allLogins = await  Login.find({});
      const userId =  allLogins.length+1
      object.id = userId
      const newLogin = new Login(object);
      const savedLogin = await newLogin.save();
      console.log("error occured the find one htinig");
      return res.json({result : true , user_id : userId});
    }
   
   
  } catch (error) {
    
    return res.json({message : "wrong username "})
  }})
  module.exports = router;