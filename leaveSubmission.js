document.addEventListener('DOMContentLoaded', async function() {
    const id = localStorage.getItem("id");
    // Send form data to the backend
    fetch('http://localhost:3000/student/updateLeaveTotal', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Leave total updated successfully:', data);
        // Optionally, you can redirect the user to another page or show a success message
    })
    .catch(error => {
        console.error('There was a problem updating leave total:', error);
        // Optionally, you can show an error message to the user
    });

    
});
