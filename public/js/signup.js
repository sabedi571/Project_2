$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstnameInput = $("input#firstname-input");
  var lastnameInput = $("input#lastname-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstname: firstnameInput.val().trim(),
      lastname: lastnameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (
      !userData.firstname ||
      !userData.lastname ||
      !userData.email ||
      !userData.password
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.password
    );

    //Clear up input
    firstnameInput.val("");
    lastnameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, email, password) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    })
      .then(function (data) {
        window.location.replace("/members");
        //window.location.replace(data);
        // used to be window.location.replace("/members"); //wrong code, should be replace(data) ALG
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
    console.log(err);
  }
});
n;
