module.exports = app => {
    const crudGuests = require("../controllers/guest.controller");
    const authGuests = require('../controllers/guest.auth.controller');
  
    var router = require("express").Router();
  
    // Create a new Guest
    router.post("/guestSignup", authGuests.create);

    // Login a Guest
    router.post("/guestLogin", authGuests.login);

    // Retrieve all Guests
    router.get("/allGuests", crudGuests.findAll);
  
    // Retrieve a single Guest with id
    router.get("/getOneGuest/:id", crudGuests.findOne);
  
    app.use('/api', router);
    // app.use('/', router);
  };