const mongoose = require("mongoose")
const loginSchema = new mongoose.Schema({

    username : String,
    password : Number,
    role : String
  })
  const loginModel = mongoose.model("student",loginSchema)
  const url = "mongodb+srv://dhruvD:demo123@cluster0.qk1u6ed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "login" });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

async function getData(){
   try {
    const result = await loginModel.find({});
    console.log(result);
   } catch (error) {
    console.log("error")
   }

}

getData();