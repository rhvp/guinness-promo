const Operator = require('../models/operator');
const AppError = require('../config/appError');


exports.create = async(req, res, next) => {
    try {
        const operator = await Operator.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Operator created',
            operator
        })
    } catch (error) {
        return next(error)
    }
}

exports.getAll = async(req, res, next) => {
    try {
        const operators = await Operator.find().lean();
        res.status(200).json({
            status: 'success',
            count: operators.length,
            operators
        })
    } catch (error) {
        
    }
}

