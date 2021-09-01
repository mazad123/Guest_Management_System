module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('room', {
	//   admin_id: {
	// 	type: Sequelize.STRING,
    //     allowNull: false
	//   },
	//   manager_id: {
	// 	type: Sequelize.STRING,
    //     allowNull: false
	//   },
	  room_Number: {
		type: Sequelize.BIGINT,
        allowNull: false,
		primaryKey: true,
		unique: true,
	  },
	  room_Type: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      room_Status: {
		type: Sequelize.STRING,
        allowNull: false
	  },
	  room_Price: {
		  type: Sequelize.FLOAT,
		  allowNull: false, 
          defaultValue: 1000
	  },
	});
	
	return Room;
}
