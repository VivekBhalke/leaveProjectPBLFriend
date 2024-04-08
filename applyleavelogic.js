document.addEventListener('DOMContentLoaded',  function() {
    console.log("apply leave wala functoin ran which puts data in the local storage")
    const leaveForm = document.getElementById('leave-form');
    const id = localStorage.getItem("id");
    console.log(id);
    if (leaveForm) {
        console.log("got the leave-form form thingi");
        console.log("leave form is not null");
        leaveForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            // Gather form data
            console.log("submit button in apply leave clicked");
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                rollNo: document.getElementById('roll-number').value,
                hostelNo: document.getElementById('hostel-room-number').value,
                leaveType: document.getElementById('leave-type').value,
                startDate: document.getElementById('start-date').value,
                endDate: document.getElementById('end-date').value,
                reason: document.getElementById('reason').value,
                status: "Pending",
                id : id
            };
            console.log(formData)
            // Store form data in local storage
            async function putData(){
                fetch(`http://localhost:3000/leave/applyleave?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Leave applied successfully:', data);
                // localStorage.removeItem("formData");
                // Optionally, you can show a success message to the user
            })
            .catch(error => {
                console.error('There was a problem applying leave:', error);
                // Optionally, you can show an error message to the user
            });
            
            }
            await putData().then((response)=>{
                window.location.href = "leavesubmission.html";
            })
            // Redirect to student dashboard
            // window.location.href = 'leavesubmission.html'; // Replace 'studentdashboard.html' with your actual student dashboard page
        });
    } else {
        console.error("Element with ID 'leave-form' not found.");
    }
});
