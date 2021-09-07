module.exports = app => {
    const rooms = require("../controllers/room.controller");
    const adminAuthhMiddleware = require('../middlewares/admin.auth.middleware');
    const managerAuthhMiddleware = require('../middlewares/manager.auth.middleware');
    const validation = require('../validations/room.input.validation');
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/createRoom", validation.roomInputValidation, adminAuthhMiddleware, rooms.create);

    // Retrieve all Rooms
    router.get("/allRooms", adminAuthhMiddleware, rooms.findAllRoom);

    // Retrieve only Avaialbe Rooms 
    router.get("/availableRooms", rooms.findAllRoomWithCondition);
  
    // Retrieve a single Room with id
    router.get("/getOneRoom/:id", adminAuthhMiddleware || managerAuthhMiddleware, rooms.findOne);
    
    // Update a Tutorial with id
    router.put("/update/:id", adminAuthhMiddleware, rooms.update);

    // Delete a Room with id
    router.delete("/delete/:id", adminAuthhMiddleware, rooms.delete);
  
    app.use('/api', router);
    // app.use('/', router);
  };
   