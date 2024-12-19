import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import userValidation from '../../validations/user.validation';
import userController from '../../controllers/user.controller';

const router = express.Router();

router
    .route('/')
    .post(auth('all'), validate(userValidation.createUser), userController.createUser)
    .get(auth('all'), validate(userValidation.getUsers), userController.getUsers);

router
    .route('/:userId')
    .get(auth('all'), validate(userValidation.getUser), userController.getUser)
    .patch(auth('all'), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth('all'), validate(userValidation.deleteUser), userController.deleteUser);

export default router;
