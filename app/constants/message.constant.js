exports.messages = {
    ALREADY_EXIST: 'User Already Exist with this email, Please Login',
    USER_NOT_FOUND:'User Not Found',
    DATA_NOT_FOUND:'Data Not Found',
    INVALID_CREDENTIALS:'Invalid Credentials',
    CHANGE_PASSWORD:'Password Changed Successfully',
    CREATE_ROOM:{
        SUCCESS:'Room has been created successfully' ,
        FAILED:'Cannot create Room'
    },
    FIND_ROOM:{
        SUCCESS:'Room has been retrieved successfully' ,
        FAILED:'Cannot retrieve Room'
    },
    UPDATE_ROOM:{
        SUCCESS:'Room has been updated successfully' ,
        FAILED:'Cannot update Room. Maybe Room was not found or req.body is empty!'  
    },
    DELETE_ROOM:{
        SUCCESS:'Room has been deleted successfully' ,
        FAILED:'Cannot delete Room. Maybe Room was not found or req.body is empty!'  
    },
    CREATE_BOOKING:{
        SUCCESS:'Booking has been created successfully' ,
        FAILED:'Cannot create booking, Some Error during booking'
    },
    FIND_BOOKING:{
        SUCCESS:'Booking has been retrieved successfully' ,
        FAILED:'Cannot retrieve booking'
    },
    BOOKING_HISTORY:{
        SUCCESS:'Booking history has been retrieved successfully' ,
        FAILED:'Cannot retrieve booking history. Maybe booking history was not found or req.body is empty!' 
    },
    FIND_GUEST:{
        SUCCESS:'Guest has been retrieved successfully' ,
        FAILED:'Cannot retrieve guest'
    },
    REGISTRATION:{
        SUCCESS:'Registered Successfully',
        FAILED:'Registration Faild due to some error'
    },
    LOGIN:{
        SUCCESS:'Logged In Successfully',
        FAILED:'Login Faild due to some error'
    },
    INVALID_CREDENTIALS: 'Invalid Credentials'
}