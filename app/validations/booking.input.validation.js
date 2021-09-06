const { check, validationResult } = require('express-validator');

exports.bookingInputValidation = [

    check('guest_name')
        .notEmpty().withMessage('Guest Name can not be null or empty')
        .isLength({min:4, max:20}).withMessage('Name length should be 4 to 20 chracters long')
    ,
    check('guest_email')
        .isEmail().withMessage('Must be a valid email')	
        .notEmpty().withMessage('Email can not be null or empty')
    ,
    // check('admin_password')	 
    //     .notEmpty().withMessage('Password can not be null or empty')
    //   	.isLength({min:4, max:8}).withMessage('Password length should be 4 to 20 chracters long')
    // ,
    check('guest_phone')
        .notEmpty().withMessage('Phone number can not be null or empty')	
      	.isLength({min:10, max:10}).withMessage('Phone Number length should be 10 chracters only ') 
      	.isMobilePhone().withMessage('Enter only valid phone number')
    ,
    // check('admin_address')
    //     .notEmpty().withMessage('Address can not be null or empty')	
    // ,        

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else next();
    }
];
