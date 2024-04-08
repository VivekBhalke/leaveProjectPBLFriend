// // Function to attach event listeners to approve and reject buttons
// // Function to attach event listeners to approve and reject buttons
// function attachEventListeners(students) {
//     const approveButtons = document.getElementsByClassName("approve");
//     const rejectButtons = document.getElementsByClassName("reject");

//     for (let i = 0; i < approveButtons.length; i++) {
//         const leaveStatus = students[i].leaves.status; // Assuming status is a property of each leave

//         if (leaveStatus) {
//             // If status is true, enable the approve button
//             approveButtons[i].addEventListener("click", async () => {
//                 // Disable the button and display "done"
//                 approveButtons[i].classList.add("disabled");
//                 approveButtons[i].disabled = true;
//                 rejectButtons[i].classList.add("disabled");
//                 rejectButtons[i].disabled = true;

//                 // Handle approval logic here
//                 console.log("Approved leave with ID:", i + 1);

//                 // Send approval request to the backend and update the leave status
//                 // Example: await sendApprovalRequest(i + 1);
//             });
//         } else {
//             // If status is false, disable the approve button
//             approveButtons[i].classList.add("disabled");
//             approveButtons[i].disabled = false;
//         }

//         // Event listener for reject button (assuming always enabled)
//         rejectButtons[i].addEventListener("click", async () => {
//             // Disable the button and display "done"
//             approveButtons[i].textContent = "Done";
//             rejectButtons[i].textContent = "Done";
//             approveButtons[i].disabled = true;
//             rejectButtons[i].disabled = true;

//             // Handle rejection logic here
//             console.log("Rejected leave with ID:", i + 1);
//             // Send rejection request to the backend and update the leave status
//             // Example: await sendRejectionRequest(i + 1);
//         });
//     }
// }


// async function fetchAndPopulateTable() {
//     try {
//         const response = await fetch('http://localhost:3000/student/students', {
//             method: 'GET',
//             headers: {
//                 "Content-type": "application/json"
//             },
//         });
//         const data = await response.json();
//         console.log(data);
//         const students = data;
//         const studentList = document.getElementById("student-list");
//         students.forEach(student => {
//             const studentRow = document.createElement("tr");
//             studentRow.id = `student-${student.student_id}`; // Add student ID to the row

//             if (student.leaves) {
//                 studentRow.innerHTML = `
//                 <td>${student.name}</td>
//                 <td>${student.leaves.length}</td>
//                 <td colspan="4">
//                     <table id="leave-table-${student.name}">
//                         <thead>
//                             <tr>
//                                 <th>Start Date</th>
//                                 <th>End Date</th>
//                                 <th>Reason</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                         </tbody>
//                     </table>
//                 </td>
//             `;
//                 studentList.appendChild(studentRow);
//                 const leaveTable = document.getElementById(`leave-table-${student.name}`);
//                 student.leaves.forEach(leave => {
//                     const leaveRow = document.createElement("tr");
//                     leaveRow.id = `leave-${leave.leave_id}`; // Add leave ID to the row
//                     leaveRow.innerHTML = `
//                         <td>${leave.startDate}</td>
//                         <td>${leave.endDate}</td>
//                         <td>${leave.reason}</td>
//                         <td>
//                             <button class="approve">Approve</button>
//                             <button class="reject">Reject</button>
//                         </td>
//                     `;
//                     leaveTable.getElementsByTagName("tbody")[0].appendChild(leaveRow);
//                 });
//             } else {
//                 console.log("leave is empty")
//             }
//         });

//         // Attach event listeners after adding buttons to the DOM
//         attachEventListeners(students);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// // Call the function to fetch data and populate the table
// fetchAndPopulateTable();



// ----------------------------------------------------------------------

// Function to attach event listeners to approve and reject buttons
function attachEventListeners(students) {
   
    // console.log(approveButtons.length);
    for (let i = 0; i < students.length; i++) {
        // console.log("i is :  " + i);
        const leaves = students[i].leaves;
        for(let j = 0 ;j<leaves.length;j++)
        {

            const leaveTable = document.getElementById(`leave-table-${students[i].name}`);
            const approveButton = leaveTable.querySelector(`#leave-${leaves[j].leave_id} .approve`);
            const rejectButton = leaveTable.querySelector(`#leave-${leaves[j].leave_id} .reject`);
            const leaveStatus = leaves[j].status;
            if (leaveStatus == 'Pending' ) {
                // If status is true, enable the approve button
                console.log("this is j : " + j);
                approveButton.addEventListener("click", async (event) => {
                    const studentRowId = event.target.dataset.studentRowId;
                    const leaveRowId = event.target.dataset.leaveRowId;
                    console.log("dhruv");
                    // Disable the button and display "done"
                    
                    // Handle approval logic here
                    console.log("render this ");
                    console.log("Approved leave with ID:", leaveRowId, "for student ID:", studentRowId);
                    const arrayLeaveId = leaveRowId.split('-')
                    const arrayStudentId = studentRowId.split('-')
                    const leave_id = parseInt(arrayLeaveId[1]);
                    const student_id = parseInt(arrayStudentId[1]);
                    console.log(leave_id);
                    console.log(student_id);
                    const status = "Approved";
                    fetch("http://localhost:3000/leave/updateStatus" , {
                        method : 'POST',
                        headers : {
                            'Content-type' : 'Application/json',

                        },
                        body:JSON.stringify({
                            leave_id : leave_id,
                            student_id : student_id,
                            status : status
                        })
                    }).then((response) =>{
                        response.json().then((data)=>{
                            if(data.result)
                            {
                                //sab barabar ho gaya
                                console.log("everything worked properly");
                                location.reload();
                            }else{
                                console.log("something bad happended")
                            }
                        })
                    })

                    // Send approval request to the backend and update the leave status
                    // Example: await sendApprovalRequest(leaveRowId, studentRowId);
                });
            

            // Event listener for reject button (assuming always enabled)
            rejectButton.addEventListener("click", async (event) => {
                const studentRowId = event.target.dataset.studentRowId;
                const leaveRowId = event.target.dataset.leaveRowId;

                // Disable the button and display "done"
                

                // Handle rejection logic here
                console.log("Rejected leave with ID:", leaveRowId, "for student ID:", studentRowId);
                // Send rejection request to the backend and update the leave status
                    const arrayLeaveId = leaveRowId.split('-')
                    const arrayStudentId = studentRowId.split('-')
                    const leave_id = parseInt(arrayLeaveId[1]);
                    const student_id = parseInt(arrayStudentId[1]);
                    const status = "Rejected";
                    fetch("http://localhost:3000/leave/updateStatus" , {
                        method : 'POST',
                        headers : {
                            'Content-type' : 'Application/json',

                        },
                        body:JSON.stringify({
                            leave_id : leave_id,
                            student_id : student_id,
                            status : status
                        })
                    }).then((response) =>{
                        response.json().then((data)=>{
                            if(data.result)
                            {
                                //sab barabar ho gaya
                                console.log("everything worked properly");
                                location.reload();
                            }else{
                                console.log("something bad happended")
                            }
                        })
                    })
                // Example: await sendRejectionRequest(leaveRowId, studentRowId);
            });
        }
            // }else if(leaveStatus == 'Approved' || leaveStatus == 'Rejected') {
            //     // If status is false, disable the approve button
            //     approveButton.classList.add("disabled");
            //     approveButton.disabled = true;
            // }
        }    
    }
}


async function fetchAndPopulateTable() {
    try {
        const response = await fetch('http://localhost:3000/student/students', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        });
        const data = await response.json();
        // console.log(data);
        const students = data;
        const studentList = document.getElementById("student-list");
        students.forEach(student => {
            const studentRow = document.createElement("tr");
            studentRow.id = `student-${student.student_id}`; // Add student ID to the row

            if (student.leaves) {
                studentRow.innerHTML = `
                <td>${student.name}</td>
                <td>${student.leaves.length}</td>
                <td colspan="4">
                    <table id="leave-table-${student.name}">
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </td>
            `;
                studentList.appendChild(studentRow);
                const leaveTable = document.getElementById(`leave-table-${student.name}`);
                student.leaves.forEach(leave => {
                    const leaveRow = document.createElement("tr");
                    leaveRow.id = `leave-${leave.leave_id}`; // Add leave ID to the row
                    leaveRow.innerHTML = `
                        <td>${leave.startDate}</td>
                        <td>${leave.endDate}</td>
                        <td>${leave.reason}</td>
                        ${
                            leave.status === 'Pending' ?
                            `<button class="approve" data-student-row-id="${studentRow.id}" data-leave-row-id="${leaveRow.id}">Approve</button>
                            <button class="reject" data-student-row-id="${studentRow.id}" data-leave-row-id="${leaveRow.id}">Reject</button>`
                            :
                            `<button class="done" disabled>Done</button>`
                        }
                    `;
                    leaveTable.getElementsByTagName("tbody")[0].appendChild(leaveRow);
                });
            } else {
                console.log("leave is empty")
            }
        });

        // Attach event listeners after adding buttons to the DOM
        attachEventListeners(students);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data and populate the table
fetchAndPopulateTable();

