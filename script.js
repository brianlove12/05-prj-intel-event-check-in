document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkInForm");
  const nameInput = document.getElementById("attendeeName");
  const teamSelect = document.getElementById("teamSelect");

  // Check if elements exist
  if (!form || !nameInput || !teamSelect) {
    console.log("One or more form elements not found.");
    return;
  }
  

  // Track Attendance
  let count = 0;
  const maxCount = 50; // Maximum number of attendees

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = nameInput.value;
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    console.log(`Name: ${name}, Team: ${teamName}`);

    // Increment Count
    count++;
    console.log(`Total check-ins: ${count}`);

    // Update Progress Bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);

    // Update Team Counter

    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    // Show Welcome Message
    const message = `✋🏼 Welcome, ${name} from ${teamName}!`;
    console.log(message);

    // Reset Form
    form.reset();

  });
});
