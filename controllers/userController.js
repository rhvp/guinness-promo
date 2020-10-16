const AppError = require('../config/appError');
const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

exports.signup = async(req, res, next) => {
    try {
        let data = _.pick(req.body, ['email', 'password']);
        const userExists = await User.findOne({email: data.email});
        if(userExists) return next(new AppError('A user with this email already exists', 409));
        const hashedPassword = bcrypt.hashSync(data.password, 12);
        data.password = hashedPassword;
        const newUser = await User.create(data);
        res.status(201).json({
            status: 'success',
            data: newUser
        })
    } catch (error) {
        return next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        const data = _.pick(req.body, ['email', 'password']);
        const user = await User.findOne({email: data.email});
        if(!user) return next(new AppError('User does not exist', 404));
        const passwordCorrect = bcrypt.compareSync(data.password, user.password);
        if(!passwordCorrect) return next(new AppError('Wrong password entered', 401));
        const signature = {id: user._id, email: user.email};
        const token = jwt.sign(signature, process.env.JWT_SECRET);
        await Token.create({user: user._id, token: token});
            const cookie_Options = {
                expires: new Date(
                    Date.now() + 86400000
                ),
                httpOnly: true
            };
        if(process.env.NODE_ENV === 'production') cookie_Options.secure = true;
        res.cookie('jwt', token, cookie_Options);
        user.password = undefined;
        res.status(200).json({
            status: 'success',
            data: user,
            token: token
        })
    } catch (error) {
        return next(error);
    }
}