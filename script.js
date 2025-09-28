document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkInForm");
  const nameInput = document.getElementById("attendeeName");
  const teamSelect = document.getElementById("teamSelect");

  // Track Attendance
  const maxCount = 10; // Maximum number of attendees
  const attendeeList = [];

  // Load counts from localStorage or start at 0
  let count = parseInt(localStorage.getItem("attendeeCount")) || 0;
  let waterCount = parseInt(localStorage.getItem("waterCount")) || 0;
  let zeroCount = parseInt(localStorage.getItem("zeroCount")) || 0;
  let powerCount = parseInt(localStorage.getItem("powerCount")) || 0;

  // Update UI with loaded counts
  const attendeeCountElem = document.getElementById("attendeeCount");
  if (attendeeCountElem) {
    attendeeCountElem.textContent = count;
  }
  document.getElementById("waterCount").textContent = waterCount;
  document.getElementById("zeroCount").textContent = zeroCount;
  document.getElementById("powerCount").textContent = powerCount;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = Math.round((count / maxCount) * 100) + "%";
  }

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = nameInput.value.trim();
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    // Capture attendee name and team
    attendeeList.push({ name: name, team: teamName });
    console.log(
      `Attendee list: ${attendeeList
        .map((a) => a.name + " (" + a.team + ")")
        .join(", ")}`
    );
    console.log(`Name: ${name}, Team: ${teamName}`);
    // Update attendee list in the UI
    const attendeeListElem = document.getElementById("attendeeList");
    if (attendeeListElem) {
      attendeeListElem.innerHTML = "";
      attendeeList.forEach(function (att) {
        const li = document.createElement("li");
        li.textContent = att.name;
        const teamSpan = document.createElement("span");
        teamSpan.className = "attendee-team";
        teamSpan.textContent = att.team;
        li.appendChild(teamSpan);
        attendeeListElem.appendChild(li);
      });
    }

    // Increment Count
    count++;
    localStorage.setItem("attendeeCount", count);
    console.log(`Total check-ins: ${count}`);

    // Update total attendee count in the UI
    const attendeeCount = document.getElementById("attendeeCount");
    if (attendeeCount) {
      attendeeCount.textContent = count;
      console.log(`Attendee count updated: ${count}`);
    }

    // Update progress bar visually
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      progressBar.style.width = Math.round((count / maxCount) * 100) + "%";
    }

    // Update Team Counter
    if (team === "water") {
      waterCount++;
      localStorage.setItem("waterCount", waterCount);
      document.getElementById("waterCount").textContent = waterCount;
    } else if (team === "zero") {
      zeroCount++;
      localStorage.setItem("zeroCount", zeroCount);
      document.getElementById("zeroCount").textContent = zeroCount;
    } else if (team === "power") {
      powerCount++;
      localStorage.setItem("powerCount", powerCount);
      document.getElementById("powerCount").textContent = powerCount;
    }
    console.log(
      `Team Water Wise: ${waterCount}, Team Net Zero: ${zeroCount}, Team Renewables: ${powerCount}`
    );

    // Show Welcome Message
    const greeting = document.getElementById("greeting");
    if (greeting) {
      const message = `✋🏼 Welcome, ${name} from ${teamName}!`;
      greeting.textContent = message;
      greeting.classList.add("success-message");
      greeting.style.display = "block";
      console.log(message);
    }

    // Check if attendee goal is reached
    if (count >= maxCount) {
      // Find the winning team
      let winningTeam = "";
      let winningCount = Math.max(waterCount, zeroCount, powerCount);
      if (winningCount === waterCount) {
        winningTeam = "Team Water Wise";
      } else if (winningCount === zeroCount) {
        winningTeam = "Team Net Zero";
      } else {
        winningTeam = "Team Renewables";
      }

      // Show celebration message
      if (greeting) {
        greeting.textContent = `🎉 Check-in goal reached! Congratulations, ${winningTeam}!`;
        greeting.classList.add("success-message");
        greeting.style.display = "block";
      }

      // Show confetti (explode from center)
      showConfetti();
    } else {
      // Reset Form
      form.reset();
    }
  });

  // Confetti function (cascading and exploding)
  function showConfetti() {
    const colors = [
      "#FFD700",
      "#FF69B4",
      "#00C7FD",
      "#32CD32",
      "#FF4500",
      "#8A2BE2",
      "#FF6347",
      "#00FA9A",
    ];
    const emojis = ["🎊", "🎉", "✨", "🥳", "💙", "💚", "💛", "💜"];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Helper to remove element after transition
    function removeAfterTransition(elem, duration) {
      setTimeout(function () {
        if (elem.parentNode) {
          elem.parentNode.removeChild(elem);
        }
      }, duration);
    }

    // Exploding confetti from center (reduced count)
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 200 + Math.random() * 400;
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.left = centerX + "px";
      confetti.style.top = centerY + "px";
      confetti.style.width = 8 + Math.random() * 8 + "px";
      confetti.style.height = 16 + Math.random() * 12 + "px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = 0.8;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.zIndex = "9999";
      confetti.style.pointerEvents = "none";
      confetti.style.transition =
        "top 1.2s ease-out, left 1.2s ease-out, transform 1.2s linear";
      document.body.appendChild(confetti);
      setTimeout(function () {
        confetti.style.top = centerY + Math.sin(angle) * distance + "px";
        confetti.style.left = centerX + Math.cos(angle) * distance + "px";
        confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
        removeAfterTransition(confetti, 1300);
      }, 50);
    }
    // Exploding emoji confetti (reduced count)
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 200 + Math.random() * 400;
      const emojiConfetti = document.createElement("span");
      emojiConfetti.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];
      emojiConfetti.style.position = "fixed";
      emojiConfetti.style.left = centerX + "px";
      emojiConfetti.style.top = centerY + "px";
      emojiConfetti.style.fontSize = 30 + Math.random() * 30 + "px";
      emojiConfetti.style.zIndex = "9999";
      emojiConfetti.style.pointerEvents = "none";
      emojiConfetti.style.transition = "top 1.2s, left 1.2s";
      document.body.appendChild(emojiConfetti);
      setTimeout(function () {
        emojiConfetti.style.top = centerY + Math.sin(angle) * distance + "px";
        emojiConfetti.style.left = centerX + Math.cos(angle) * distance + "px";
        removeAfterTransition(emojiConfetti, 1300);
      }, 50);
    }

    // Cascading confetti from top (reduced count)
    for (let i = 0; i < 10; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10vh";
      confetti.style.width = 8 + Math.random() * 8 + "px";
      confetti.style.height = 16 + Math.random() * 12 + "px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = 0.8;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.zIndex = "9999";
      confetti.style.pointerEvents = "none";
      confetti.style.transition =
        "top 2.0s linear, left 2.0s linear, transform 2.0s linear";
      document.body.appendChild(confetti);
      setTimeout(function () {
        confetti.style.top = 80 + Math.random() * 15 + "vh";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
        removeAfterTransition(confetti, 2100);
      }, 50);
    }
    // Cascading emoji confetti (reduced count)
    for (let i = 0; i < 10; i++) {
      const emojiConfetti = document.createElement("span");
      emojiConfetti.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];
      emojiConfetti.style.position = "fixed";
      emojiConfetti.style.left = Math.random() * 100 + "vw";
      emojiConfetti.style.top = "-10vh";
      emojiConfetti.style.fontSize = 30 + Math.random() * 30 + "px";
      emojiConfetti.style.zIndex = "9999";
      emojiConfetti.style.pointerEvents = "none";
      emojiConfetti.style.transition = "top 2.0s linear, left 2.0s linear";
      document.body.appendChild(emojiConfetti);
      setTimeout(function () {
        emojiConfetti.style.top = 80 + Math.random() * 15 + "vh";
        emojiConfetti.style.left = Math.random() * 100 + "vw";
        removeAfterTransition(emojiConfetti, 2100);
      }, 50);
    }
  }
});
