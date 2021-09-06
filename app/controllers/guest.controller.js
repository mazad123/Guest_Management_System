const db = require("../models");
const Guest = db.guests;

const applyPagination = require('../pagination/paging');

// Retrieve all Guests from the database.
exports.findAll = (req, res) => {

	const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Guest.findAll()
	Guest.findAndCountAll({ limit, offset})
	  .then(data => {
		console.log("data is:",data);
		const response = applyPagination.getPagingData(data, page, limit);
		// res.send(data); 
		res.send(response);
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
			res.status(201).send(data);
			console.log("data is:",data);
		} else{
			res.status(404).send(`Data not found with id = ${id}`)
			res.end();
		} 
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving Guest with id=" + id
		});
	  });
  };