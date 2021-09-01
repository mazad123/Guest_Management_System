module.exports = app => {
    const rooms = require("../controllers/room.controller");
  
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/createRoom", rooms.create);

    // Retrieve all Rooms
    router.get("/allRooms", rooms.findAll);
  
    // Retrieve a single Room with id
    router.get("/getOneRoom/:id", rooms.findOne);
    
    // Update a Tutorial with id
    router.put("/update/:id", rooms.update);

    // Delete a Room with id
    router.delete("/delete/:id", rooms.delete);
  
    app.use('/api', router);
    // app.use('/', router);
  };
   