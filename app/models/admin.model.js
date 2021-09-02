module.exports = (sequelize, Sequelize) => {
	const Admin = sequelize.define('admin', {
	  admin_name: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      admin_email: {
		type: Sequelize.STRING,
        allowNull: false
	  },
      admin_password: {
		type: Sequelize.STRING,
        allowNull: false
	  },
	  admin_address: {
		  type: Sequelize.STRING,
		  allowNull: false, 
          defaultValue: 'Gola'
	  },
	});
	
	return Admin;
}
