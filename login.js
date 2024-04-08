const loginForm = document.getElementById('login-form');
// const { response } = require('express');
// const mongoose = require('mongoose');
// const loginSchema = new mongoose.Schema({
//   username : String,
//   password : Number,
//   role : String
// })
// const loginModel = mongoose.model("student",loginSchema)
// const url = "mongodb+srv://dhruvD:demo123@cluster0.qk1u6ed.mongodb.net/login" 
// mongoose.connect(url);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
loginForm.addEventListener('submit', async (e) => {
  console.log("d")
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
 
  // if(document.getElementById('rollno').value)
  // {
  //   localStorage.setItem("parentKeStudentKaNo" , document.getElementById('rollno').value );
  // }
  // else{
  //   parentKeStudentKaNo = null;
  // }
  // if (username === 'admin' && password === 'password') {
  //   window.location.href = 'admin.html';
  // } else if (role === 'student') {
  //   window.location.href = 'studentlogin.html';
  // } else if (role === 'warden') {
  //   window.location.href = 'warden.html';
  // } else if (role === 'parent') {
  //   window.location.href = 'parent.html';
  // } else {
  //   alert('Invalid username or password');
  // }
  fetch("http://localhost:3000/user/login", {
  method: 'POST',
  body: JSON.stringify({
    username: username,
    password: password,
    role: role,
    
  }),
  headers: {
    "Content-Type": "application/json"
  }
}).then((response) => {
  // Check if the response status is OK
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  // Parse JSON response
  return response.json();
}).then((data) => {
  // Handle the JSON data returned by the server
  console.log(data);
  // Assuming your response contains a property 'result' indicating success or failure
  if (data.result) {
    console.log("id is :" +data.id)
    localStorage.setItem("id",data.id)
    if (role === 'student') {
      window.location.href = 'studentlogin.html';
    } else if (role === 'warden') {
      window.location.href = 'warden.html';
    } else if (role === 'parent') {
      window.location.href = 'parent1.html';
    } else {
      alert('Invalid username or password');
    }
  } else {
    alert("Invalid username or password");
  }
}).catch((error) => {
  console.error('There was a problem with the fetch operation:', error);
  alert('An error occurred, please try again later.');
});


});
const signupButton = document.getElementById('signup-btn');
        signupButton.addEventListener('click', function(e) {
            // Redirect to the sign-up page or perform any other action
            console.log("event listner for singup working");// Change 'signup.html' to the actual URL of your sign-up page
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            fetch("http://localhost:3000/user/signup" , {
              method : "POST" , 
              headers : {
                "Content-type" : "application/json"
              },
              body : JSON.stringify({
                "username" : username,
                "password" : password,
                "role" : role
            })
            }).then((response)=>{
              response.json().then((data)=>{
                if(data.result)
                {
                  if(role == 'student')
                  {
                    localStorage.setItem("id" , data.user_id)
                    console.log("role is student");
                    window.location.href = "studentReg.html";
                  }
                  else{
                    alert("data updated please login again");
                    location.reload();
                  }
                }else{
                  alert("user Already exists please login ")
                }
              })
            })
        });

