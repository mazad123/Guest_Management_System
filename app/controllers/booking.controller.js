const db = require("../models");
const Booking = db.bookings;


// Create and Save a new Booking
exports.create = (req, res) => {
	  // Create a booking
	  const booking = {
		guest_name: req.body.guest_name,
		guest_email: req.body.guest_email,
        guest_phone: req.body.guest_phone,
        booking_date: req.body.booking_date,
        room_number: req.body.room_number,
        total_amount_pay: req.body.total_amount_pay
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