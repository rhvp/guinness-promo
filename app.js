const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const AppError = require('./config/appError');
const errorHandler = require('./controllers/errorController');

const redemptionRouter = require('./routes/redemptionRoutes');
const userRouter = require('./routes/userRoutes');
const operatorRouter = require('./routes/operatorRoutes');

app.use(cors());
app.options('*', cors());

app.use(morgan('short'));

app.use(helmet());

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

// add routes
app.use('/api/v1/redemption', redemptionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/operator', operatorRouter);

app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use(errorHandler);


module.exports = app;