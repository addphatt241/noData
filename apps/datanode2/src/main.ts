/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import config from './config/config';
import dotenv from 'dotenv'
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';
import { errorHandler, successHandler } from './config/morgan';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './config/passport';
import authLimiter from './middlewares/rateLimiter';
import ApiError from './utils/ApiError';
import httpStatus from 'http-status';
import { errorConverter } from './middlewares/error';
import routes from './routes/index';
import mongoose from 'mongoose';
import logger from './config/logger';

dotenv.config({ path: path.join(__dirname, '../../.env') })


const app = express();

if (config.env !== 'Namenode') {
    app.use(successHandler);
    app.use(errorHandler);
}

app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(mongoSanitize());

app.use(cors());
app.options('*', cors());



let server: any;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: any) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});


app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/api/auth', authLimiter);
}

app.use('/api', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


app.use(errorConverter);

app.use(errorHandler);



export default app
