const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json())
const router = express.Router();

const userRouter = require("./routes/userroutes.js")
const studentRouter=  require("./routes/studentRoutes.js");
const leaveRouter=  require("./routes/leaveRoutes.js");
const leaveHistoryRouter = require("./routes/leaveHistoryRoutes.js")
const parentRouter = require("./routes/parent.js")
app.use(bodyParser.json());
// Now you can use the Login model and loginSchema in this file
const connectToMongoDB = require("./database/connect.js")
const url = "mongodb+srv://dhruvD:demo123@cluster0.qk1u6ed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ;
connectToMongoDB().then((response)=>{console.log("got a response")}).catch((reject)=>{console.log("got rejected")})

app.use("/user",userRouter)
app.use("/student" , studentRouter);
app.use("/leave",leaveRouter)
app.use("/leaveHistory" , leaveHistoryRouter);
app.use("/parent" , parentRouter)
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});