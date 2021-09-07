const express = require("express");
const cors = require("cors");

const app = express();

// require('./app/routes/room.routes')(app); 
// require('./app/routes/admin.routes')(app); 

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./app/routes/room.routes')(app); 
require('./app/routes/admin.routes')(app); 
require('./app/routes/manager.routes')(app); 
require('./app/routes/guest.routes')(app); 
require('./app/routes/guest.auth.routes')(app);
require('./app/routes/booking.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});