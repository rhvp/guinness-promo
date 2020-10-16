const jwt = require('jsonwebtoken');
const AppError = require('../config/appError');

exports.userAuth = async(req, res, next) => {
    try {
        let auth = req.headers['authorization'];
        if(!auth) return next(new AppError('Please login to access this resource', 401));
        const authorized = jwt.verify(auth, process.env.JWT_SECRET);
        if(authorized.id) next();
        else return next(new AppError('Unauthorized. Kindly login again to access this resource', 401));
    } catch (error) {
        return next(error);
    }
}