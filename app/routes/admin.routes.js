module.exports = app => {
    const validation = require('../validations/admin.auth.validation');
    const admins = require("../controllers/admin.auth.controller");
  
    var router = require("express").Router();
  
    // Create a new Admin  
    router.post("/adminSignup", validation.adminSignupValidation, admins.create);
   
    //Login Admin
    router.post("/adminLogin", validation.adminLoginValidation, admins.login);
    
    
    app.use('/api/admin', router);
  }; 