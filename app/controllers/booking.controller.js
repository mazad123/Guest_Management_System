const db = require("../models");
const Booking = db.bookings;


// Create and Save a new Booking
exports.create = (req, res) => {
	  // Create a booking
	  const booking = {
		guest_id: req.body.guest_id,
		manager_id: req.body.manager_id, 
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
	Booking.findAll({ where: { booking_person: 'Manager' } })
	  .then(data => {
		console.log("data is:",data);
		res.send(data);
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
	Booking.findAll({ where: { booking_person: 'Guest' } })
	  .then(data => {
		console.log("data is:",data);
		res.send(data);
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