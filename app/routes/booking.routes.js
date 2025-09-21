module.exports = app => {
    const bookings = require("../controllers/booking.controller");
    const validation = require('../validations/booking.input.validation');

    const managerAuthhMiddleware = require('../middlewares/manager.auth.middleware');
    const guestAuthhMiddleware = require('../middlewares/guest.auth.middleware');;
  
    var router = require("express").Router();
   
    //Create a booking   
    router.post("/bookRoom", validation.bookingInputValidation, managerAuthhMiddleware || guestAuthhMiddleware, bookings.create);

    // Retrieve only rooms which are booked by Manager  
    router.get("/bookedRoomByManager", managerAuthhMiddleware, bookings.findAllRoomBookedByManager);

    // Retrieve only rooms which are booked by Guests  
    router.get("/bookedRoomByGuest", guestAuthhMiddleware, bookings.findAllRoomBookedByGuest);

    // Retrieve a single booked Room with id
    router.get("/getOneBookedRoom/:id", bookings.findOne);

     //Fetch booking history 
     router.get("/bookingHistory", bookings.bookingHistory);
  
    app.use('/api', router);
    // app.use('/', router);
  };