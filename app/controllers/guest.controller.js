const db = require("../models");
const Guest = db.guests;

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