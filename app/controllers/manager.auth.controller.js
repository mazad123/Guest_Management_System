const db = require("../models");
const Manager = db.managers;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const responseMessages = require('../constants/message.constant'); 

// Create and Save a new Manager
exports.create =  async(req, res) => {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(req.body.manager_password, saltRounds);
    
	  // Create a Manager
	  const manager = {
		manager_name: req.body.manager_name,
		manager_email: req.body.manager_email,
        // manager_password: req.body.manager_password,
        manager_password: hashPassword,
        manager_phone: req.body.manager_phone,
        manager_address: req.body.manager_address,
    };
	  console.log(manager);
	  //Check if Alreday user exist or not
		const oldManager = await Manager.findOne({ where: { manager_email: req.body.manager_email } });
        if (oldManager) {
			// return res.status(409).send("User Already Exist. Please Login");
			return res.status(409).send({message:responseMessages.messages.ALREADY_EXIST});
		}
	  // Save Manager in the database
	  Manager.create(manager)
		.then(data => {
	      console.log(data);	 
		  res.send({
			message:responseMessages.messages.REGISTRATION.SUCCESS,
			data
		  });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			//   err.message || "Some error occurred while login Manager."
			  err.message || responseMessages.messages.REGISTRATION.FAILED
		  });
		});
};


exports.login = async (req, res) => {
     
	const {manager_email, manager_password} = req.body;
	const user = await Manager.findOne({ where: { manager_email: manager_email } });
	// const user = await Admin.findOne({email:email});
	if(!user){
		// res.status(400).send({message:"User Not Found"});
		res.status(400).send({ message:responseMessages.messages.USER_NOT_FOUND });
	}
	else{
		const isValid = await bcrypt.compare(manager_password, user.manager_password)
		if(isValid){
		   const accessToken = await jwt.sign({id:user.id,manager_email:user.manager_email}, authConfig.secret_key);
		   console.log(manager_email,manager_password,accessToken);
		   res.json({
			  message:responseMessages.messages.LOGIN.SUCCESS,
			  manager_email,
			  manager_password,
			  accessToken,
		  })
		}
		else{
		//    res.status(400).send({message:"Invalid credentials"});
		   res.status(400).send({message:responseMessages.messages.INVALID_CREDENTIALS});
		}
	}

};