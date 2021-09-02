module.exports = app => {
    const guests = require("../controllers/guest.controller");
  
    var router = require("express").Router();
  
    // Create a new Guest
    router.post("/createGuest", guests.create);

    // Retrieve all Guests
    router.get("/allGuests", guests.findAll);
  
    // Retrieve a single Guest with id
    router.get("/getOneGuest/:id", guests.findOne);
  
    app.use('/api', router);
    // app.use('/', router);
  };