const { check, validationResult } = require('express-validator');

exports.adminSignupValidation = [


     // check('email').isEmail(),
    // check('admin_name', 'Name length should be 10 to 20 characters')
    //     .isLength({ min: 4, max: 20 }),
    // check('admin_email', 'Email length should be 10 to 30 characters')
    //     .isEmail().isLength({ min: 10, max: 30 }),
    // check('admin_phone', 'Mobile number should contains 10 digits')
    //     .isLength({ min: 10, max: 10 }),
    // check('admin_password', 'Password length should be 8 to 10 characters')
    //     .isLength({ min: 8, max: 10 }),


    check('admin_name')
        .notEmpty().withMessage('Name can not be null or empty')
        .isLength({min:4, max:20}).withMessage('Name length should be 4 to 20 chracters long')
    ,
    check('admin_email')
        .isEmail().withMessage('Must be a valid email')	
        .notEmpty().withMessage('Email can not be null or empty')
    ,
    check('admin_password')	 
        .notEmpty().withMessage('Password can not be null or empty')
      	.isLength({min:4, max:8}).withMessage('Password length should be 4 to 20 chracters long')
    ,
    check('admin_phone')
        .notEmpty().withMessage('Phone number can not be null or empty')	
      	.isLength({min:10, max:10}).withMessage('Phone Number length should be 10 chracters only ') 
      	.isMobilePhone().withMessage('Enter only valid phone number')
    ,
    check('admin_address')
        .notEmpty().withMessage('Address can not be null or empty')	
    ,        

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else next();
    }
];


exports.adminLoginValidation = [
    check('admin_email')
        .isEmail().withMessage('Must be a valid email')	
        .notEmpty().withMessage('Email can not be null or empty')
    ,
    check('admin_password')	 
        .notEmpty().withMessage('Password can not be null or empty')
      	.isLength({min:4, max:8}).withMessage('Password length should be 4 to 20 chracters long')
    ,
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else next();
    }
];