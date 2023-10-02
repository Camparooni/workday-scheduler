$(document).ready(function() {
  // Display current day at the top of the calendar
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // Get the current hour
  var currentHour = dayjs().hour();

  // Color-code time blocks based on past, present, and future
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Event handler for saving the entered event
  $(".saveBtn").on("click", function() {
    var eventText = $(this).siblings(".description").val();
    var blockId = $(this).parent().attr("id");
    localStorage.setItem(blockId, eventText);
  });

  $("#resetBtn").on("click", function() {
    $(".description").val(""); // Clear all event text
    localStorage.clear(); // Clear local storage
  });

  // Load saved events from local storage
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(blockId);
    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });
});
