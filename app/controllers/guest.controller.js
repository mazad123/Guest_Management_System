const db = require("../models");
const Guest = db.guests;

const applyPagination = require('../pagination/paging');

const responseMessages = require('../constants/message.constant');

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
		res.send({
			message:responseMessages.messages.FIND_GUEST.SUCCESS,
            response
		});
	})
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || responseMessages.messages.FIND_GUEST.FAILED
		});
	});
  };

// Find a single Guest with an id
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Guest.findByPk(id)
	  .then(data => {
		if(data){
			res.status(201).send({
				message:responseMessages.messages.FIND_GUEST.SUCCESS,
				data
			});
			console.log("data is:",data);
		} else{
			res.status(404).send({message:responseMessages.messages.USER_NOT_FOUND})
			res.end();
		} 
	  })
	  .catch(err => {
		res.status(500).send({
		  message:responseMessages.messages.FIND_GUEST.FAILED
		});
	  });
  };