const db = require("../models");
const Booking = db.bookings;

const applyPagination = require('../pagination/paging');

// Create and Save a new Booking
exports.create = (req, res) => {
	  // Create a booking
	//   const loginId = req.userId;
	//   console.log('login'+loginId)
	  const booking = {
		guest_id: req.body.guest_id,
		// guest_id: loginId ? loginId :'',
		manager_id: req.body.manager_id, 
		// manager_id : loginId ? loginId : '',
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
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while booking the Room."
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
		res.send(response);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving rooms."
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
		res.send(response);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving rooms."
		});
	  });
  };


// Retrieve a singlem booked Room with detail by an id and booking status
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Booking.findOne({where: {id: id, booking_status: 'Booked Sucessfully'} })
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


// Booking History 
exports.bookingHistory = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = applyPagination.getPagination(page, size);

	// Booking.findAll({ where: { booking_person: 'Guest' } })
	Booking.findAndCountAll({ limit, offset, where: { guest_id: guest_id} })
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
