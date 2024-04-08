const leaveForm = document.getElementById('leave-form');
const leaveType = document.getElementById('leave-type');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const reason = document.getElementById('reason');

leaveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    leaveType: leaveType.value,
    startDate: startDate.value,
    endDate: endDate.value,
    reason: reason.value
  };
  fetch('http://localhost:3000')})