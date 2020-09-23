$(document).ready(function () {
  // Getting references to our form and input
  //var newEvent;
  var eventInput = $("input#eventname-input");
  var dateInput = $("input#eventdate-input");
  var timeInput = $("input#eventtime-input");

  var locationInput = $("input#location-input");
  var descriptionInput = $("input#description-input");
  var invitedInput = $("#invited-input");

  $("#newevent").click(function (event) {
    event.preventDefault();

    $.get("/api/user_data").then(function (data) {
      var eventData = {
        eventInput: eventInput.val().trim(),
        dateInput: dateInput.val().trim(),
        timeInput: timeInput.val().trim(),
        locationInput: locationInput.val().trim(),
        descriptionInput: descriptionInput.val().trim(),
        email: data.email,
        fullname: data.firstname + " " + data.lastname,
      };

      if (
        !eventData.eventInput ||
        !eventData.dateInput ||
        !eventData.locationInput ||
        !eventData.descriptionInput
      ) {
        return;
      }

      // If we have an all field filled out, run the newEvent function
      newEvent(
        eventData.eventInput,
        eventData.dateInput,
        eventData.timeInput,
        eventData.locationInput,
        eventData.descriptionInput,
        eventData.email,
        eventData.fullname
      );
      eventInput.val("");
      dateInput.val("");
      timeInput.val("");
      locationInput.val("");
      descriptionInput.val("");

      // Does a post to the signup route. If successful, we are redirected to the members page
      // Otherwise we log any errors
      function newEvent(
        eventInput,
        dateInput,
        timeInput,
        locationInput,
        descriptionInput,
        email,
        fullname
      ) {
        $.post("/api/newevent", {
          eventInput: eventInput,
          dateInput: dateInput,
          dateInput: timeInput,
          locationInput: locationInput,
          descriptionInput: descriptionInput,
          email: email,
          fullname: fullname,
        }).then(function (event) {
          var invitedArray = invitedInput.val();
          console.log(invitedArray);
          for (var i = 0; i < invitedArray.length; i++) {
            var invitedID = invitedArray[i];
            console.log(invitedID);
            $.get("api/users/" + invitedID).then(function (data) {
              var inviteeData = {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                EventId: event.id,
              };
              console.log(inviteeData);
              newInvitee(inviteeData);

              function newInvitee(data) {
                console.log(JSON.stringify(data));
                return $.ajax({
                  headers: {
                    "Content-Type": "application/json",
                  },
                  type: "POST",
                  url: "/api/newinvitee",
                  data: JSON.stringify(data),
                });
              }
            });
          }
          window.location.href = "/members";
        });
      }
    });
  });
});
