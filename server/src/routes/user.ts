import { Router } from 'express';
import { check } from 'express-validator';

import { MiddlewaresValidators } from '../middlewares/validators';
import { DBValidators } from '../helpers';
import { User } from '../controllers/index';

export class UserRoutes {

    static get routes() {

        const router = Router();
        const UserController = new User();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();

        router.get('/get/:userId',[
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], UserController.getUser);

        router.get('/getAll', UserController.getUsers);

        router.put('/edit/:userId', [
            middlewaresValidators.validateJWT,
            check('name', 'Name is required').not().isEmpty(),
            check('lastname', 'Lastname is required').not().isEmpty(),
            check('location', 'Location is required').not().isEmpty(),
            check('birthdate', 'Birthdate is required').not().isEmpty(),
            check('biography', 'Biography is required').not().isEmpty(),
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], UserController.editUser);

        router.put('/follow/:followingId',[
            middlewaresValidators.validateJWT,
            check('followingId', 'Invalid ID').isUUID(),
            check('followingId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], UserController.followUser);

        router.get('/getFollow/:userId',[
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], UserController.getFollowerAndFollowings);

        router.delete('/unFollow/:userId/:followingId', [
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            check('followingId', 'Invalid ID').isUUID(),
            check('followingId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], UserController.unFollowUser);

        return router;
    }


}