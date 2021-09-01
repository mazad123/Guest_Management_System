const db = require("../models");
const Admin = db.admins;

// Create and Save a new Admin
exports.create = (req, res) => {
	  // Create a Admin
	  const admin = {
		admin_id: req.body.admin_id,
		admin_name: req.body.admin_name,
		admin_email: req.body.admin_email,
        admin_password: req.body.admin_password,
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