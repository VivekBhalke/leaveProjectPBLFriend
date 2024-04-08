async function fetchAndPopulateLeaveHistory() {
    try {
        // Fetch leave history data for the parent
        fetch('http://localhost:3000/parent/getDetails', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body : JSON.stringify({
                parentKeStudentKaNo : localStorage.getItem("parentKeStudentKaNo")
            })
        }).then((response)=>{
            response.json().then((data)=>{
                const studentData = data.studentData
                console.log(studentData);
                const leaves = studentData.leaves;
                const studentDetailsParagraph = document.getElementById("student-details");
                studentDetailsParagraph.innerHTML = `Student Name: ${studentData.name}, Student ID: ${studentData.student_id}`;
                // Get the table body element to populate the leave history
                const leaveHistoryTableBody = document.querySelector("#leave-history");

                // Iterate over the leave history data and populate the table
                leaves.forEach(leave => {
                    const leaveRow = document.createElement("tr");
                    leaveRow.innerHTML = `
                        <td>${leave.startDate}</td>
                        <td>${leave.endDate}</td>
                        <td>${leave.reason}</td>
                        <td>${leave.status}</td>
                    `;
                    leaveHistoryTableBody.appendChild(leaveRow);
                });
            })
        })

        // Extract leave history data from the response
        
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and populate leave history
fetchAndPopulateLeaveHistory();
