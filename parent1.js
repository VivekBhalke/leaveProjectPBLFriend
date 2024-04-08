
// async function doLogic(){
//     return new Promise((resolve , reject)=>{
//         if(document.getElementById('rollno').value)
//     {
//     localStorage.setItem("parentKeStudentKaNo" , document.getElementById('rollno').value );
//     resolve();
//   }
//   else{
//     parentKeStudentKaNo = null;
//     reject();
//   }
//     })
// }

// doLogic()

  // Add event listener to the button
  document.getElementById('view-details-btn').addEventListener('click', function() {
    // Get the value of the roll number input field
    const rollNo = document.getElementById('rollno').value;
    console.log(rollNo);
    localStorage.setItem("parentKeStudentKaNo" , rollNo)
    // Navigate to the "parent.html" page with the roll number as a query parameter
    window.location.href = `parent.html`;
});