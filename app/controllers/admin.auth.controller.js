const db = require("../models");
const Admin = db.admins;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

// Create and Save a new Admin
exports.create = async (req, res) => {
	  const saltRounds = 10;
	  const hashPassword = await bcrypt.hash(req.body.admin_password, saltRounds);

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

//login Admin
exports.login = async (req, res) => {
     
	const {admin_email, admin_password} = req.body;
	const user = await Admin.findOne({ where: { admin_email: admin_email } });
	// const user = await Admin.findOne({email:email});
	if(!user){
		res.status(400).send({message:"User Not Found"});
	}
	else{
		const isValid = await bcrypt.compare(admin_password, user.admin_password)
		if(isValid){
		   const accessToken = await jwt.sign({id:user.id,admin_email:user.admin_email}, authConfig.secret_key);
		   console.log(admin_email,admin_password,accessToken);
		   res.json({
			  admin_email,
			  admin_password,
			  accessToken,
		  })
		}
		else{
		   res.status(400).send({message:"Invalid credentials"});
		}
	}

};
