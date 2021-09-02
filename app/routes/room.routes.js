module.exports = app => {
    const rooms = require("../controllers/room.controller");
    const adminAuthhMiddleware = require('../middlewares/admin.auth.middleware');
  
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/createRoom", adminAuthhMiddleware, rooms.create);

    // Retrieve all Rooms
    router.get("/allRooms", adminAuthhMiddleware, rooms.findAll);
  
    // Retrieve a single Room with id
    router.get("/getOneRoom/:id", adminAuthhMiddleware, rooms.findOne);
    
    // Update a Tutorial with id
    router.put("/update/:id", adminAuthhMiddleware, rooms.update);

    // Delete a Room with id
    router.delete("/delete/:id", adminAuthhMiddleware, rooms.delete);
  
    app.use('/api', router);
    // app.use('/', router);
  };
   