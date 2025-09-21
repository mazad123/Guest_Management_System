module.exports = app => {
    const validation = require('../validations/admin.auth.validation');
    const admins = require("../controllers/admin.auth.controller");
  
    var router = require("express").Router();
  
    // Create a new Admin  
    router.post("/adminSignup", validation.adminSignupValidation, admins.create);

    //Get Login EJS UI
    router.get('/getAdminLogin', (req,res)=>{
      res.render('adminLogin', { title: 'Log In Admin'});
    })

    //Login Admin with valid credentials
    router.post("/postAdminLogin", validation.adminLoginValidation, admins.login);
    
    
    app.use('/api/admin', router);
    // app.use('/', router);
  }; 