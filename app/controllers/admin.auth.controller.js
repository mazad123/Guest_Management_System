const db = require("../models");
const Admin = db.admins;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const responseMessages = require('../constants/message.constant');
 
exports.create = async (req, res) => {
	  const saltRounds = 10;
	  const hashPassword = await bcrypt.hash(req.body.admin_password, saltRounds);
	  // Create a Admin
	  const admin = {
		admin_name: req.body.admin_name,
		admin_email: req.body.admin_email,
        // admin_password: req.body.admin_password,
		admin_password: hashPassword,
		admin_phone: req.body.admin_phone,
        admin_address: req.body.admin_address,
    };
	    console.log(admin);
	   //Check if Alreday user exist or not
		const oldAdmin = await Admin.findOne({ where: { admin_email: req.body.admin_email } });
        if (oldAdmin) {
			return res.status(409).send({message:responseMessages.messages.ALREADY_EXIST});
		}
	  // Save Admin in the database
	   Admin.create(admin)
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
			//   err.message || "Some error occurred while login Admin."
			err.message || responseMessages.messages.REGISTRATION.FAILED
		  });
	   });
};

//login Admin
exports.login = async (req, res) => {
	const {admin_email, admin_password} = req.body;
	console.log('detail:'+admin_email,admin_password);
	const user = await Admin.findOne({ where: { admin_email: admin_email } });
	console.log('user is:',user);
	if(!user){
		res.status(400).send({ message:responseMessages.messages.USER_NOT_FOUND });
	}
	else{
		const isValid = await bcrypt.compare(admin_password, user.admin_password)
		if(isValid){
		   const accessToken = await jwt.sign({id:user.id,user_type:'admin',admin_email:user.admin_email}, authConfig.secret_key);
		   res.cookie('jwtToken' , accessToken, {
              expires: new Date(Date.now()+ 80000),
			  httpOnly:true	
		   })
		   console.log(`Cookies is: ${req.cookies.jwtToken}`);
		//    localStorage.setItem('adminToken', accessToken)
		   console.log(admin_email,admin_password,accessToken);
		   res.send({
			  message:responseMessages.messages.LOGIN.SUCCESS, 
			  admin_email,
			  admin_password,
			  accessToken,
		  })
		}
		else{
		res.status(400).send({message:responseMessages.messages.INVALID_CREDENTIALS});
		}
	}

};
