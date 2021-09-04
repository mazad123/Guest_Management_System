module.exports = app => {
    const bookings = require("../controllers/booking.controller");
  
    var router = require("express").Router();
  
    //Create a booking   
    router.post("/bookRoom", bookings.create);

    // Retrieve only rooms which are booked by Manager  
    router.get("/bookedRoomByManager", bookings.findAllRoomBookedByManager);

    // Retrieve only rooms which are booked by Guests  
    router.get("/bookedRoomByGuest", bookings.findAllRoomBookedByGuest);

    // Retrieve a single booked Room with id
    router.get("/getOneBookedRoom/:id", bookings.findOne);
  
    app.use('/api', router);
    // app.use('/', router);
  };