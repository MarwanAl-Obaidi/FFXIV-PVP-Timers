// Function to update the events and time of change for the next 30 days
function updateEvents() {
    var eventList = document.getElementById("event-list");
    eventList.innerHTML = ""; // Clear the existing event list

    var currentDate = new Date();
    var currentHour = currentDate.getHours();

    // Get today's event
    var events = ["Seize", "Shatter", "Onsal"];
    var eventChangeHour = 18; // Events change at 6 PM
    var todayEvent = events[currentDate.getDate() % events.length];

    var listItem = document.createElement("li");
    listItem.textContent = "Today's Event: " + todayEvent;
    listItem.classList.add("event-" + todayEvent.toLowerCase());
    eventList.appendChild(listItem);

    // Get the next 30 days
    for (var i = 1; i <= 30; i++) {
        var nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);

        if (nextDate.getDate() === currentDate.getDate() && currentHour >= eventChangeHour) {
            // Skip the current day if the event change hour has already passed
            continue;
        }

        var listItem = document.createElement("li");
        var eventDate = formatDate(nextDate);
        var eventTime = formatTime(eventChangeHour);
        var eventText = events[(currentDate.getDate() + i) % events.length];
        listItem.textContent = eventText + " (Change at " + eventTime + " on " + eventDate + ")";
        listItem.classList.add("event-" + eventText.toLowerCase());
        eventList.appendChild(listItem);
    }

    // Schedule the next update
    setTimeout(updateEvents, 60000); // Check every minute
}

// Helper function to format the date as "Day, Month Date"
function formatDate(date) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var day = days[date.getDay()];
    var month = months[date.getMonth()];
    var dateNum = date.getDate();

    return day + ", " + month + " " + dateNum;
}

// Helper function to format the time as "HH:MM AM/PM"
function formatTime(hours) {
    var amPm = hours >= 12 ? "PM" : "AM";
    var formattedHours = hours % 12 || 12;

    return formattedHours + ":00 " + amPm;
}

// Start the initial update when the page loads
window.onload = function () {
    updateEvents();
};