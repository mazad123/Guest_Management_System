const db = require("../models");
const Room = db.rooms;

const applyPagination = require('../pagination/paging');

// Create and Save a new Room
exports.create = (req, res) => {
	  // Create a Room
	  const room = {
		room_number: req.body.room_number,
		room_type: req.body.room_type,
		room_status: req.body.room_status,
        room_price: req.body.room_price
	  };
	  console.log(room);
	
	  // Save Room in the database
	  Room.create(room)
		.then(data => {
	      console.log(data);	
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the room."
		  });
		});
};


// Retrieve all Rooms from the database.
exports.findAllRoom = (req, res) => {
	
	const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Room.findAll()
	Room.findAndCountAll({ limit, offset })
	  .then(data => {
		console.log("data is:",data);
		const response = applyPagination.getPagingData(data, page, limit);
		// res.send(data); 
		res.send(response);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving rooms."
		});
	  });
  };

// Retrieve only available Rooms from the database.
exports.findAllRoomWithCondition = (req, res) => {
	const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Room.findAll({ where: { room_Status: 'Available' } })
	Room.findAndCountAll({ limit, offset, where: { room_status: 'Available' } })
	  .then(data => {
		console.log("data is:",data);
		const response = applyPagination.getPagingData(data, page, limit);
		// res.send(data); 
		res.send(response);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving rooms."
		});
	  });
  };

// Find a single Room with detail by an id
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Room.findByPk(id)
	  .then(data => {
		if(data){
			res.send(data);
			console.log("data is:",data);
		}  
		res.send(`Data not found with id = ${id}`)
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving Room with id=" + id
		});
	  });
  };



// Update a Room by the id in the request
exports.update = (req, res) => {

	// const id = req.params.id;
	const id = req.params.id;

	Room.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
		  console.log(num);	
		  res.send({
			message: "Room was updated successfully."
		  });
		} else {
		  res.send({
			message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error updating Room with id=" + id
		});
	  });
};

 
  
// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
		const id = req.params.id;
		console.log("check id"+id)
		Room.destroy({
		  where: { id: id }
		})
		  .then(num => {
			if (num) {
				console.log("check id"+id)
				console.log("check num"+num);
			  res.send({
				message: "Room was deleted successfully!"
			  });
			} else {
			  res.send({
				message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			  message: "Could not delete Room with id=" + id
			});
		  });
};  

