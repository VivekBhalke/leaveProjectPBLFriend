document.addEventListener('DOMContentLoaded', async function() {
    // Get the paragraph element with the ID "leave-count"
    const leaveCountParagraph = document.getElementById('leave-count');
    const id = localStorage.getItem('id');
    // const id = 1;
    const url = `http://localhost:3000/student/me?id=${id}`
    try {
        // Fetch leave count data from localhost:3000/student/me
        const response = await fetch(url, {
            method:'GET',
        });
        
        if (response.ok) {
            // Parse JSON response
            const data = await response.json();
            const userDetailsDiv = document.querySelector('.user-details');
            userDetailsDiv.querySelector('p:nth-child(1)').textContent += data.username;
            userDetailsDiv.querySelector('p:nth-child(2)').textContent += data.email;
            userDetailsDiv.querySelector('p:nth-child(3)').textContent += data.rollno;
            userDetailsDiv.querySelector('p:nth-child(4)').textContent += data.roomno;
            // Update the leave count paragraph text content with the fetched leave count
            leaveCountParagraph.textContent = `Total Leaves Applied: ${data.leaveCount}`;
        } else {
            // Handle error if response is not ok
            console.error('Failed to fetch leave count:', response.statusText);
            leaveCountParagraph.textContent = 'Failed to fetch leave count';
        }
    } catch (error) {
        // Handle network or other fetch-related errors
        console.error('Error fetching leave count:', error.message);
        leaveCountParagraph.textContent = 'Error fetching leave count';
    }
    try {
        fetch("http://localhost:3000/leave/getApprovedRejected" , {
            method : 'POST',
            headers : {
                'Content-type' : 'Application/json'
            },
            body :JSON.stringify( {
                id : id
            })
        }).then((response)=>{
            response.json().then((data)=>{
                if(data.yourLeaves){
                    document.getElementById("rejected-count").innerHTML = data.yourLeaves.rejected;
                    document.getElementById("approved-count").innerHTML = data.yourLeaves.approved;
                    document.getElementById("pending-count").innerHTML = data.yourLeaves.pending;
                }else{

                }
            })
        })
    } catch (error) {
        
    }
});
