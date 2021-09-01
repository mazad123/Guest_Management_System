module.exports = app => {
    const admins = require("../controllers/admin.controller");
  
    var router = require("express").Router();
  
    // Create a new Admin  
    router.post("/login", admins.create);
  
    app.use('/api', router);
    // app.use('/', router);
  };