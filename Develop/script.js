// Get the current date and display it at the top of the calendar
function displayCurrentDate() {
  var currentDate = moment().format("dddd, MMMM Do YYYY");
  document.getElementById("currentDay").textContent = currentDate;
}

// Save the event text in local storage when the save button is clicked
function saveEvent() {
  var eventText = this.parentNode.querySelector(".event").value;
  var timeBlock = this.parentNode.querySelector(".hour").textContent;
  localStorage.setItem(timeBlock, eventText);
}

// Load the saved events from local storage and display them in the time blocks
function loadEvents() {
  var timeBlocks = document.querySelectorAll(".time-block");
  timeBlocks.forEach(function(timeBlock) {
    var hour = timeBlock.querySelector(".hour").textContent;
    var eventText = localStorage.getItem(hour);
    if (eventText) {
      timeBlock.querySelector(".event").value = eventText;
    }
  });
}

// Update the time block colors based on the current time
function updateTimeBlocks() {
  var currentTime = moment().format("H");
  var timeBlocks = document.querySelectorAll(".time-block");
  timeBlocks.forEach(function(timeBlock) {
    var hour = parseInt(timeBlock.querySelector(".hour").textContent);
    if (hour < currentTime) {
      timeBlock.classList.remove("present", "future");
      timeBlock.classList.add("past");
    } else if (hour === currentTime) {
      timeBlock.classList.remove("past", "future");
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.remove("past", "present");
      timeBlock.classList.add("future");
    }
  });
}

// Call the necessary functions when the page loads
document.addEventListener("DOMContentLoaded", function() {
  displayCurrentDate();
  loadEvents();
  updateTimeBlocks();
  
  // Add event listeners to the save buttons
  var saveButtons = document.querySelectorAll(".saveBtn");
  saveButtons.forEach(function(saveButton) {
    saveButton.addEventListener("click", saveEvent);
  });
});