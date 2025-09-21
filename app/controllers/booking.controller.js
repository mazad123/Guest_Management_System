const db = require("../models");
const Booking = db.bookings;

const applyPagination = require('../pagination/paging');

const responseMessages = require('../constants/message.constant');

var jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
// Create and Save a new Booking
exports.create = (req, res) => {
		var token = req.headers.authorization.split(" ")[1];
		var decoded = jwt.verify(token, authConfig.secret_key);
		req.userData = decoded;
		var userId = decoded.id;
		var userType = decoded.user_type; 
	  // Create a booking
	  const booking = {
		guest_id: (userType=='guest')?userId:null, 
		manager_id: (userType=='manager')?userId:null, 
		guest_name: req.body.guest_name,
		guest_email: req.body.guest_email,
        guest_phone: req.body.guest_phone,
        booking_date: req.body.booking_date,
        room_number: req.body.room_number,
        total_amount_pay: req.body.total_amount_pay,
		booking_person: req.body.booking_person,
		booking_status: req.body.booking_status
	  };
	  console.log(booking);
	
	  // Save booking in the database
	  Booking.create(booking)
		.then(data => {
	      console.log(data);	
		  res.send({
			  message:responseMessages.messages.CREATE_BOOKING.SUCCESS,
			  data
			});
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || responseMessages.messages.CREATE_BOOKING.FAILED
		  });
		});
};


// Retrieve all Rooms booked by Manager for the guest from the database.
exports.findAllRoomBookedByManager = (req, res) => {
	const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Booking.findAll({ where: { booking_person: 'Manager' } })
	Booking.findAndCountAll({ limit, offset, where: { booking_person: 'Manager' } })
	  .then(data => {
		console.log("data is:",data);
		const response = applyPagination.getPagingData(data, page, limit);
		// res.send(data); 
		res.send({
			message:responseMessages.messages.FIND_BOOKING.SUCCESS,
			response
		});
	})
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || responseMessages.messages.FIND_BOOKING.FAILED
		});
	});
  };

// Retrieve all Rooms booked by Guests for the guest from the database.
exports.findAllRoomBookedByGuest = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Booking.findAll({ where: { booking_person: 'Guest' } })
	Booking.findAndCountAll({ limit, offset, where: { booking_person: 'Guest' } })
	  .then(data => {
		console.log("data is:",data);
		const response = applyPagination.getPagingData(data, page, limit);
		// res.send(data); 
		res.send({
			message:responseMessages.messages.FIND_BOOKING.SUCCESS,
			response
		});
	})
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || responseMessages.messages.FIND_BOOKING.FAILED
		});
	});
  };


// Retrieve a singlem booked Room with detail by an id and booking status
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Booking.findOne({where: {id: id, booking_status: 'Booked Sucessfully'} })
	  .then(data => {
		if(data){
			res.send({
				message:responseMessages.messages.FIND_BOOKING.SUCCESS,
				data
			});
			console.log("data is:",data);
		}  
		res.send({
			message:responseMessages.messages.DATA_NOT_FOUND,
		})
	  })
	  .catch(err => {
		res.status(500).send({
		  message: responseMessages.messages.FIND_BOOKING.FAILED
		});
	  });
  };  


// Booking History 
exports.bookingHistory = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Booking.findAll({ where: { booking_person: 'Guest' } })
	Booking.findAndCountAll({ limit, offset, where: { guest_id:null} })
	// Booking.findAndCountAll({ limit, offset, where: {guest_id: { $not: 0 }}})
	  .then(data => {
		console.log("data is:",data);
		const response = applyPagination.getPagingData(data, page, limit);
		if(response){
			// res.send(data); 
			res.send({
				message:responseMessages.messages.BOOKING_HISTORY.SUCCESS,
				response
			});
		}else{
			res.send({
				message:responseMessages.messages.DATA_NOT_FOUND
			});
		}		
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || responseMessages.messages.BOOKING_HISTORY.FAILED,
		});
	  });
  };
