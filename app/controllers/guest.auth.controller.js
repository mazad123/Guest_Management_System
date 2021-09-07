const db = require("../models");
const Guest = db.guests;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const responseMessages = require('../constants/message.constant');

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

	  //Check if Alreday user exist or not
		const oldGuest = await Guest.findOne({ where: { guest_email: req.body.guest_email } });
        if (oldGuest) {
			// return res.status(409).send("User Already Exist. Please Login");
			return res.status(409).send({message:responseMessages.messages.ALREADY_EXIST});
		}

	  // Save Guest in the database
	  Guest.create(guest)
		.then(data => {
	      console.log("data is:"+data);	
		  res.send({
			message:responseMessages.messages.REGISTRATION.SUCCESS,
			data
		  });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			//   err.message || "Some error occurred while creating the Guest."
			  err.message || responseMessages.messages.REGISTRATION.FAILED
		  });
		});
};

//login Guest
exports.login = async (req, res) => {
     
	const {guest_email, guest_password} = req.body;
	const user = await Guest.findOne({ where: { guest_email: guest_email } });
	if(!user){
		// res.status(400).send({message:"User Not Found"});
		res.status(400).send({ message:responseMessages.messages.USER_NOT_FOUND });
	}
	else{
		const isValid = await bcrypt.compare(guest_password, user.guest_password)
		if(isValid){
		   const accessToken = await jwt.sign({id:user.id,guest_email:user.guest_email}, authConfig.secret_key);
		   console.log(guest_email,guest_password,accessToken);
		   res.json({
			  message:responseMessages.messages.LOGIN.SUCCESS,
			  guest_email,
			  guest_password,
			  accessToken,
		  })
		}
		else{
		//    res.status(400).send({message:"Invalid credentials"});
		   res.status(400).send({message:responseMessages.messages.INVALID_CREDENTIALS});
		}
	}

};


//change Password by Guest
exports.changePassword = async (req, res) => {
     
	const { guest_email } = req.body;
	const user = await Guest.findOne({ where: { guest_email: guest_email } });
	if(!user){
		// res.status(400).send({message:"User Not Found"});
		res.status(400).send({ message:responseMessages.messages.USER_NOT_FOUND });
	}
	else{
		const saltRounds = 10;
		const newHashPassword = await bcrypt.hash(req.body.guest_password, saltRounds);
		user.guest_password = newHashPassword;
		user.save();
		 res.status(201).send({
			//  message:"Password Changed Sucessfully"
			message:responseMessages.messages.CHANGE_PASSWORD
		 })
	}

};

