module.exports = (sequelize, Sequelize) => {
	const Booking = sequelize.define('book_Room', {
	  guest_name: {
		    type: Sequelize.STRING,
        allowNull: false
	  },
      guest_email: {
		    type: Sequelize.STRING,
        allowNull: false
	  },
      guest_phone:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      booking_date:{
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull:false
      },
      room_number: {
		    type: Sequelize.INTEGER,
        allowNull: false
      },
      total_amount_pay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 500
     }
	});
	
	return Booking;
}

