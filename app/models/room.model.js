
const modelConstants = require('./constants/model.constant');

module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('room', {
	  room_number: {
		type: Sequelize.BIGINT,
        allowNull: false,
		unique: true,
	  },
	  room_type: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      room_status: {
		type: Sequelize.STRING,
        allowNull: false,
		defaultValue:modelConstants.defaltValueMessages.ROOM_STATUS
	  },
	  room_price: {
		  type: Sequelize.FLOAT,
		  allowNull: false, 
          defaultValue:modelConstants.defaltValueMessages.ROOM_PRICE
	  },
	});
	
	return Room;
}
