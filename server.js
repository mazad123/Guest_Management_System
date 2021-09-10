const express = require("express");
const cors = require("cors");
const path = require('path');
const cookieParser  = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();

// require('./app/routes/room.routes')(app); 
// require('./app/routes/admin.routes')(app); 

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//view engine
app.set('views', './app/views');
app.set('view engine', 'ejs');

const db = require("./app/models");
db.sequelize.sync();


//local storage
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to bezkoder application." });
  // res.render('adminLogin', { title: 'Log In Admin'});
  res.render('home', { title: 'Welcome To The Guest Management System' });
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