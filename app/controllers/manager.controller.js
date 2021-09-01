const db = require("../models");
const Manager = db.managers;
const bcrypt = require('bcrypt');


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
	
	  // Save Manager in the database
	  Manager.create(manager)
		.then(data => {
	      console.log(data);	
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while login Manager."
		  });
		});
};