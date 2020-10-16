const express = require('express');
const router = express.Router();
const redemption = require('../controllers/redemptionController');
const auth = require('../controllers/authController');

router.post('/redeem-code', redemption.redeemCode)

router.get('/', auth.userAuth, redemption.getAll)

router.get('/get-failed', auth.userAuth, redemption.getFailed)


module.exports = router;