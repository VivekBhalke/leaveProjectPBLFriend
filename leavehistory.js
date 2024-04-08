async function fetchAndPopulateTable() {
    try {
        const id = localStorage.getItem('id');
        const response = await fetch(`http://localhost:3000/leaveHistory/getAllLeaves?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        });
        const { yourLeaves } = await response.json();
        console.log(yourLeaves);
        const leaveTableBody = document.querySelector("tbody");

        yourLeaves.forEach(leave => {
            const leaveRow = document.createElement("tr");
            const status = leave.status; // If status is true, it's Approved, otherwise Rejected
            leaveRow.innerHTML = `
                <td>${leave.leaveType}</td>
                <td>${leave.startDate}</td>
                <td>${leave.endDate}</td>
                <td>${status}</td>
                
            `;
            leaveTableBody.appendChild(leaveRow);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data and populate the table
fetchAndPopulateTable();
