module.exports = app => {
    const admins = require("../controllers/admin.auth.controller");
  
    var router = require("express").Router();
  
    // Create a new Admin  
    router.post("/adminSignup", admins.create);
   
    //Login Admin
    router.post("/adminLogin", admins.login);
    
    
    app.use('/api', router);
    // app.use('/', router);
  };