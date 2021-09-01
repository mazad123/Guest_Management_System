module.exports = app => {
    const managers = require("../controllers/manager.controller");
  
    var router = require("express").Router();
  
    // Login Manager  
    router.post("/managerLogin", managers.create);
  
    app.use('/api', router);
    // app.use('/', router);
  };