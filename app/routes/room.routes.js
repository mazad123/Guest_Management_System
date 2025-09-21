module.exports = app => {
    const rooms = require("../controllers/room.controller");
    const adminAuthhMiddleware = require('../middlewares/admin.auth.middleware');
    const managerAuthhMiddleware = require('../middlewares/manager.auth.middleware');
    const validation = require('../validations/room.input.validation');
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/saveNewCreatedRoom", validation.roomInputValidation, adminAuthhMiddleware, rooms.create);

    // Render Create Room EJS UI 
    router.get('/createRoom', (req,res)=>{
      res.render('createRoom', { title: 'Add Room In Database'});
    })

    // Retrieve all Rooms
    router.get("/allRooms", adminAuthhMiddleware, rooms.findAllRoom);

    // Retrieve only Avaialbe Rooms 
    router.get("/availableRooms", rooms.findAllRoomWithCondition);
  
    // Retrieve a single Room with id
    router.get("/getOneRoom/:id", adminAuthhMiddleware || managerAuthhMiddleware, rooms.findOne);
    // router.get("/getOneRoom/:id", rooms.findOne);


    // Get Deatail of room by id for updation
    router.get('/edit/:id', adminAuthhMiddleware, rooms.findOneForUpdate);
    
    // Update a Room with id
    // router.put("/update/:id", adminAuthhMiddleware, rooms.update);

    // Update Room data in databse
    router.post("/update", adminAuthhMiddleware, rooms.update);

    // Delete a Room with id
    // router.delete("/delete/:id", adminAuthhMiddleware, rooms.delete);

    // Delete a Room with id
    router.get("/delete/:id", adminAuthhMiddleware, rooms.delete);
  
    app.use('/api', router);
    // app.use('/', router);
  };
   