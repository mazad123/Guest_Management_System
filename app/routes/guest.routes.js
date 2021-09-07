module.exports = app => {
    const crudGuests = require("../controllers/guest.controller");
    const managerAuthhMiddleware = require('../middlewares/manager.auth.middleware');

    var router = require("express").Router(); 
  
    // Retrieve all Guests
    router.get("/allGuests", managerAuthhMiddleware, crudGuests.findAll);
  
    // Retrieve a single Guest with id
    router.get("/getOneGuest/:id", managerAuthhMiddleware, crudGuests.findOne);
  
    app.use('/api', router);
    // app.use('/', router);
  };