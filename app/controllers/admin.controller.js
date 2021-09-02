const db = require("../models");
const Admin = db.admins;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

// Create and Save a new Admin
exports.create = async (req, res) => {
	//   const saltRounds = 10;
	//   const hashPassword = await bcrypt.hash(req.body.admin_password, saltRounds);
	//   const token = jwt.sign({ id, admin_name }, authConfig.secret_key);
	//   if(token){
		  
	//   }
	  // Create a Admin
	  const admin = {
		admin_name: req.body.admin_name,
		admin_email: req.body.admin_email,
        // admin_password: req.body.admin_password,
		admin_password: hashPassword,
        admin_address: req.body.admin_address,
    };
	  console.log(admin);
	
	  // Save Admin in the database
	  Admin.create(admin)
		.then(data => {
	      console.log(data);	
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while login Admin."
		  });
		});
};