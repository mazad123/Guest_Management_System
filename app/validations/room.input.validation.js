const { check, validationResult } = require('express-validator');

exports.roomInputValidation = [

    check('room_number')
        .notEmpty().withMessage('Room Number can not be null or empty')
        .isLength({min:1, max:2}).withMessage('Name length should be 1 to 2 chracters long')
        .isNumeric().withMessage('Numeric value allowed only')
    ,
    check('room_type')
        .notEmpty().withMessage('Room Type can not be null or empty')
    ,
    check('room_status')	 
        .notEmpty().withMessage('Room Status can not be null or empty')
    ,
    check('room_price')
        .notEmpty().withMessage('Room Price can not be null or empty')	
        .isNumeric().withMessage('Numeric value allowed only') 
    ,


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else next();
    }
];
