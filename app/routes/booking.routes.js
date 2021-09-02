module.exports = app => {
    const bookings = require("../controllers/booking.controller");
  
    var router = require("express").Router();
  
    // Login Manager  
    router.post("/bookRoom", bookings.create);
  
    app.use('/api', router);
    // app.use('/', router);
  };