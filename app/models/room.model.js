module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('room', {
	  room_Number: {
		type: Sequelize.BIGINT,
        allowNull: false,
		unique: true,
	  },
	  room_Type: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      room_Status: {
		type: Sequelize.STRING,
        allowNull: false,
		defaultValue:'Avaiable'
	  },
	  room_Price: {
		  type: Sequelize.FLOAT,
		  allowNull: false, 
          defaultValue: 1000
	  },
	});
	
	return Room;
}
