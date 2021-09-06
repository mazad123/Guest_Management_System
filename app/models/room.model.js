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
		defaultValue:'Avaiable'
	  },
	  room_price: {
		  type: Sequelize.FLOAT,
		  allowNull: false, 
          defaultValue: 1000
	  },
	});
	
	return Room;
}
