const db = require("../models");
const Room = db.rooms;

const applyPagination = require('../pagination/paging');

const responseMessages = require('../constants/message.constant');

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
		//   res.send(data);
		res.send({
			message:responseMessages.messages.CREATE_ROOM.SUCCESS,
            data:data
		   });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || responseMessages.messages.CREATE_ROOM.FAILED
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
	console.log('response is'+response['records']); 
	// res.send({
	// 	message:responseMessages.messages.FIND_ROOM.SUCCESS,
	// 	response
	// });
	res.render('findAllRooms', { title:"Get all data from databse", message:responseMessages.messages.FIND_ROOM.SUCCESS, response});
	})
	.catch(err => {
	res.status(500).send({
		message:
		err.message || responseMessages.messages.FIND_ROOM.FAILED
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
		// res.send(response);
		// res.send({
		// 	message:responseMessages.messages.FIND_ROOM.SUCCESS,
		// 	response
		// });
		res.render('findAllRooms', { title:"Get All Available Rooms data from Database", message:responseMessages.messages.FIND_ROOM.SUCCESS, response});
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || responseMessages.messages.FIND_ROOM.FAILED
		});
	  });
  };

// Find a single Room with detail by an id
exports.findOne = (req, res) => {
	var id = req.params.id;
	Room.findByPk(id)
	  .then(data => {
		if(data){
			// res.send(data);
			// res.send({
			// 	message:responseMessages.messages.FIND_ROOM.SUCCESS,
			// 	data
			// });
			res.render('findSingleRoom', { title:"Get Single data from databse", message:responseMessages.messages.FIND_ROOM.SUCCESS, data});
			console.log("data is:",data);
		}else{
			// res.send(`Data not found with id = ${id}`)
		    res.status(404).send({message:responseMessages.messages.DATA_NOT_FOUND})
		}  
	  })
	  .catch(err => {
		res.status(500).send({
		  message: responseMessages.messages.FIND_ROOM.FAILED
		});
	  });
  };



// Update a Room by the id in the request
exports.update = (req, res) => {
	// const id = req.params.id;
	const id = req.body.id;
    console.log('id:'+id);
	Room.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num) {
		  console.log(num);	
		  res.send({
			message: responseMessages.messages.UPDATE_ROOM.SUCCESS,
		  });
		} 
		else {
		  res.send({
			message: responseMessages.messages.UPDATE_ROOM.FAILED
		  });
		}
	  })
	  .catch(err => {
		res.status(500).send({
		//   message: "Error updating Room with id=" + id
		message: responseMessages.messages.UPDATE_ROOM.FAILED
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
				message: responseMessages.messages.DELETE_ROOM.SUCCESS,
			  });
			} else {
			  res.send({
				message: responseMessages.messages.DELETE_ROOM.FAILED
			  });
			}
		  })
		  .catch(err => {
			res.status(500).send({
			//   message: "Could not delete Room with id=" + id
			message: responseMessages.messages.DELETE_ROOM.FAILED
			});
		  });
};  

// Find a single Tutorial with an id
exports.findOneForUpdate = (req, res) => {
    const id = req.params.id;
	Room.findByPk(id)
	  .then(data => {
		if(data){
			// res.send(data);
			// res.send({
			// 	message:responseMessages.messages.FIND_ROOM.SUCCESS,
			// 	data
			// });
			res.render('editRoom', { title:"Get Single data by id from databse", message:responseMessages.messages.FIND_ROOM.SUCCESS, data});
			console.log("data is:",data);
		}else{
			res.status(404).send({message:responseMessages.messages.DATA_NOT_FOUND});
		}
	  })
	  .catch(err => {
		res.status(500).send({
		  message: responseMessages.messages.FIND_ROOM.FAILED
		});
	  });

  };