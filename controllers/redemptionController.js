const Redemption = require('../models/redemption');
const Operator = require('../models/operator');
const Code = require('../models/code');
const AppError = require('../config/appError');


exports.redeemCode = async(req, res, next) => {
    try {
        const {code, phone, operator} = req.body;
        const codeRedeemed = await Redemption.findOne({code});
        if(codeRedeemed) return next(new AppError('Code has already been redeemed', 409));
        const codeValid = await Code.findOne({code});
        if(!codeValid) {
            await Redemption.create({
                phone,
                code,
                operator,
                status: "failed"
            });
            return next(new AppError('Code is invalid', 404));
        }
        const redeemed = await Redemption.create({code, phone, operator});
        
        // send details to interswitch
        
        res.status(201).json({
            status: 'success',
            data: redeemed
        })
    } catch (error) {
        return next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        const data = await Redemption.find().sort({createdAt: -1}).lean();
        res.status(200).json({
            status: 'success',
            count: data.length,
            data
        })
    } catch (error) {
        return next(error);
    }
}

exports.getFailed = async(req, res, next) => {
    try {
        const data = await Redemption.find({status: 'failed'}).lean();
        res.status(200).json({
            status: 'success',
            count: data.length,
            data
        })
    } catch (error) {
        return next(error);
    }
}
