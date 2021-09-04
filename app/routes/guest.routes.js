module.exports = app => {
    const crudGuests = require("../controllers/guest.controller");
    const authGuests = require('../controllers/guest.auth.controller');
    const managerAuthhMiddleware = require('../middlewares/manager.auth.middleware');

    var router = require("express").Router(); 
  
    // Create a new Guest
    router.post("/guestSignup", authGuests.create);

    // Login a Guest 
    router.post("/guestLogin", authGuests.login);

    // Change Password by Guest
    router.post("/changePassword", authGuests.changePassword);

    // Retrieve all Guests
    router.get("/allGuests", managerAuthhMiddleware, crudGuests.findAll);
  
    // Retrieve a single Guest with id
    router.get("/getOneGuest/:id", managerAuthhMiddleware, crudGuests.findOne);
  
    app.use('/api', router);
    // app.use('/', router);
  };