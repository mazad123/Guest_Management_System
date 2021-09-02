const db = require("../models");
const Guest = db.guests;


// Create and Save a new Guest
exports.create = (req, res) => {
	  // Create a Guest
	  const guest = {
		guest_name: req.body.guest_name,
		guest_email: req.body.guest_email,
		guest_password: req.body.guest_password,
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


// Retrieve all Guests from the database.
exports.findAll = (req, res) => {
	Guest.findAll()
	  .then(data => {
		console.log("data is:",data);
		res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving guests."
		});
	  });
  };

// Find a single Guest with an id
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Guest.findByPk(id)
	  .then(data => {
		if(data){
			res.send(data);
			console.log("data is:",data);
		}  
		res.send(`Data not found with id = ${id}`)
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving Guest with id=" + id
		});
	  });
  };