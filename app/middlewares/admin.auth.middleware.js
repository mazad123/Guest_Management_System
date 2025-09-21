const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

    //    var token = req.headers.authorization.split(" ")[1];



const adminAuthhMiddleware =  async (req,res,next) =>{
    
   
    try{
        // var token = localStorage.getItem('adminToken');
        // console.log("token is:"+token);
        const token = req.cookies.jwtToken;
        console.log("token is:"+token);
        console.log(`My Cokies is: ${req.cookies.jwtToken}`)
        var decoded = jwt.verify(token, authConfig.secret_key);
        console.log('data in iddle:'+decoded.admin_email);
        // req.userData = decoded;
        var userId = decoded.id;
        var userType = decoded.user_type;  
        console.log("user id is:"+userId, userType)  
        if(userType!=="admin"){
           res.status(404).send("Un Authorized User");
        }
        else{
            next();
        }
               
        // next();

    }catch(e){
        res.status(401).send({message:"Invalid token"})
    }
  
}

module.exports = adminAuthhMiddleware;