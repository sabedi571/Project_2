// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    //Use "signup" template/handlebars
    res.render("signup");
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
  });


  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    //Use "login" template/handlebars
    res.render("login");
    //res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    //res.sendFile(path.join(__dirname, "../public/members.html"));

    // res.render("index");
    db.Event.findAll({}).then(function (dbEvents) {
      res.render("index", {
        msg: "Welcome ",
        events: dbEvents,
      });
    });
  });

  //app.get("/newevent", isAuthenticated, function (req, res) {
  //res.sendFile(path.join(__dirname, "../public/members.html"));

  // load newEvent page
  app.get("/newevent", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.render("newevent", {
        users: dbUser,
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");


  });

};
