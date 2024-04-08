document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const rollno = formData.get('rollno');
    const hostelroomno = formData.get('hostelroomno');

    // You can perform validation here if needed

    // Example: Log form data to the console
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Roll No:', rollno);
    console.log('Hostel Room No:', hostelroomno);

    // You can send the form data to the server using fetch or any other method
    // For example:
    
    fetch('http://localhost:3000/student/getRegsistrationDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            rollno: rollno,
            hostelroomno: hostelroomno,
            user_id: parseInt(localStorage.getItem("id"))
        }),
        
    }).then((response)=>{
        response.json().then((data)=>{
            console.log("got the data");
            if(data.result)
            {
                console.log("got the data redirecting to studentlogin.html");
                window.location.href = 'studentlogin.html';
            }else{
                alert("there was an error please re fill the form")
            }
        })
    })
    
    
});