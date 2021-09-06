const jwt = require('jsonwebtoken');
// const db = require("../models");
// const Admin = db.admins;
const authConfig = require('../config/auth.config');

const guestAuthhMiddleware =  (req,res,next) =>{
    // var headerToken = req.headers;
    // console.log(headerToken);
    try{
        var token = req.headers.authorization.split(" ")[1];
        console.log("token is:"+token);
        console.log("hello")
        var decoded = jwt.verify(token, authConfig.secret_key);
        console.log("in auth"+decoded);
        // req.userData = decoded;
        // console.log(token);
        var userId = decoded.id  
        console.log("user id is:"+userId)  
        next();

    }catch(e){
        res.status(401).send({message:"Invalid token"})
    }
  
}

module.exports = guestAuthhMiddleware;