
const modelConstants = require('./constants/model.constant');

module.exports = (sequelize, Sequelize) => {
	const Booking = sequelize.define('book_Room', {
    guest_id: {
      type: Sequelize.BIGINT,
      defaultValue: null
    },
    manager_id: {
      type: Sequelize.BIGINT,
      defaultValue: null
    },
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
     },
     booking_person:{
      type: Sequelize.STRING,
      allowNull: false,
      // defaultValue:'Guest'
      defaultValue:modelConstants.defaltValueMessages.BOOKING_PERSON
     },
     booking_status:{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:modelConstants.defaltValueMessages.BOOKING_STATUS.SUCCESS
     }
	});
	
	return Booking;
}

