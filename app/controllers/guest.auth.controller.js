const db = require("../models");
const Guest = db.guests;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

// Create and Save a new Guest
exports.create = async (req, res) => {

      const saltRounds = 10;
	  const hashPassword = await bcrypt.hash(req.body.guest_password, saltRounds);
	  // Create a Guest
	  const guest = {
		guest_name: req.body.guest_name,
		guest_email: req.body.guest_email,
		// guest_password: req.body.guest_password,
        guest_password: hashPassword,
        guest_phone: req.body.guest_phone,
        guest_address: req.body.guest_address
	  };
	  console.log(guest);
	
	  // Save Guest in the database
	  Guest.create(guest)
		.then(data => {
	      console.log(data);	
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the Guest."
		  });
		});
};


//login Guest
exports.login = async (req, res) => {
     
	const {guest_email, guest_password} = req.body;
	const user = await Guest.findOne({ where: { guest_email: guest_email } });
	if(!user){
		res.status(400).send({message:"User Not Found"});
	}
	else{
		const isValid = await bcrypt.compare(guest_password, user.guest_password)
		if(isValid){
		   const accessToken = await jwt.sign({id:user.id,guest_email:user.guest_email}, authConfig.secret_key);
		   console.log(guest_email,guest_password,accessToken);
		   res.json({
			  guest_email,
			  guest_password,
			  accessToken,
		  })
		}
		else{
		   res.status(400).send({message:"Invalid credentials"});
		}
	}

};


//change Password by Guest
exports.changePassword = async (req, res) => {
     
	const { guest_email } = req.body;
	const user = await Guest.findOne({ where: { guest_email: guest_email } });
	if(!user){
		res.status(400).send({message:"User Not Found"});
	}
	else{
		const saltRounds = 10;
		const newHashPassword = await bcrypt.hash(req.body.guest_password, saltRounds);
		user.guest_password = newHashPassword;
		user.save();
		 res.status(201).send({
			 message:"Password Changed Sucessfully"
		 })
	}

};

