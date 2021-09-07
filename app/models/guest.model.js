module.exports = (sequelize, Sequelize) => {
	const Guest = sequelize.define('guest', {
	  guest_name: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      guest_email: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      guest_password: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      guest_phone:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
	  guest_address: {
		  type: Sequelize.STRING,
		  allowNull: false, 
	  },
	});
	
	return Guest;
}
