module.exports = (sequelize, Sequelize) => {
	const Manager = sequelize.define('manager', {
	  manager_name: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      manager_email: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      manager_password: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      manager_phone:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
	  manager_address: {
		  type: Sequelize.STRING,
		  allowNull: false, 
	  },
	});
	
	return Manager;
}
