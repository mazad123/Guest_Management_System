module.exports = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "1234",
    DB: "guest_management",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };