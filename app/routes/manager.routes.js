module.exports = app => {
    const managers = require("../controllers/manager.auth.controller");
  
    var router = require("express").Router();
  
    // Create Manager  
    router.post("/managerSignup", managers.create);

    //Login Manager
    router.post("/managerLogin", managers.login);

    app.use('/api', router);
    // app.use('/', router);
  };