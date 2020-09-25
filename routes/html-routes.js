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

  //app.get("/members", isAuthenticated, function (req, res) {
  //res.sendFile(path.join(__dirname, "../public/members.html"));

  // res.render("index");
  // db.Event.findAll({}).then(function (dbEvents) {
  //   res.render("index", {
  //     msg: "Welcome ",
  //     events: dbEvents,
  //   });
  // });

  app.get("/members", isAuthenticated, function (req, res) {
    db.Event.findAll({}).then(function (dbEvent) {
      let events = [];
      //console.log("retrieved users: " + dbUser);

      dbEvent.forEach(function (event) {
        events.push({
          id: event.id,
          name: event.name,
          eventDate: event.eventDate,
          time: event.time,
          fullname: event.fullname,
        });
      });
      res.render("index", {
        msg: "Welcome ",
        events: events,
      });
    });
  });

  //app.get("/newevent", isAuthenticated, function (req, res) {
  //res.sendFile(path.join(__dirname, "../public/members.html"));

  //Get Event by ID passed in url
  // app.get("/event/:id", function (req, res) {
  //   db.Event.findOne({
  //     where: { id: req.params.id },
  //     //include: [db.Comment, db.Invitee],
  //   }).then(function (dbEvent) {
  //     //console.log (req.body)
  //     console.log(dbEvent.name);
  //   });
  // });

  // load newEvent page
  app.get("/newevent", function (req, res, next) {
    db.User.findAll({}).then(function (dbUser) {
      let users = [];
      //console.log("retrieved users: " + dbUser);

      dbUser.forEach(function (user) {
        users.push({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      });

      res.render("newevent", {
        users: users, // updated AG
        //users: dbEvent.User,
      });
      console.log("////////////");
      console.log(users);
      console.log("////////////");
    });
  });

  app.get("/event/:id", function (req, res) {
    db.Event.findOne({
      where: { id: req.params.id },
      include: [db.Comment, db.Invitee],
    }).then(function (dbEvent) {
      console.log(dbEvent.name);
      console.log(dbEvent.location);

      let sel_event = {
        id: dbEvent.id,
        name: dbEvent.name,
        eventDate: dbEvent.eventDate,
        time: dbEvent.time,
        location: dbEvent.location,
        description: dbEvent.description,
        fullname: dbEvent.fullname,
      };
      res.render("event", {
        sel_event: sel_event,
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
