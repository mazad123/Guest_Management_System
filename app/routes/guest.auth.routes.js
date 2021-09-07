module.exports = app => {
    const authGuests = require('../controllers/guest.auth.controller');
    const validation = require('../validations/guest.auth.validation');

    var router = require("express").Router(); 
  
    // Create a new Guest
    router.post("/guestSignup", validation.guestSignupValidation, authGuests.create);

    // Login a Guest 
    router.post("/guestLogin", validation.guestLoginValidation, authGuests.login);

    // Change Password by Guest
    router.post("/changePassword", validation.guestChangePasswordValidation, authGuests.changePassword);
  
    app.use('/api/guest', router);
  };