module.exports = app => {

    const validation = require('../validations/manager.auth.validation');
    const managers = require("../controllers/manager.auth.controller");
  
    var router = require("express").Router();
  
    // Create Manager  
    router.post("/managerSignup", validation.managerSignupValidation, managers.create);

    //Login Manager
    router.post("/managerLogin", validation.managerLoginValidation, managers.login);

    app.use('/api/manager', router);
  };