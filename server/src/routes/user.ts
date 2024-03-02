import { Router } from 'express';
import { check } from 'express-validator';

import { validateField, ValidateJWT } from '../middlewares';
import { DBValidators } from '../helpers';
import { User } from '../controllers/index';

export class UserRoutes {

    static get routes() {

        const router = Router();
        const UserController = new User();
        const validateJWT = new ValidateJWT();
        const validators = new DBValidators();

        router.get('/get/:userId',[
            validateJWT.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID )
        ], UserController.getUser);

        router.get('/getAll', UserController.getUsers);

        router.put('/edit/:userId', [
            validateJWT.validateJWT,
            check('name', 'Name is required').not().isEmpty(),
            check('lastname', 'Lastname is required').not().isEmpty(),
            check('location', 'Location is required').not().isEmpty(),
            check('birthdate', 'Birthdate is required').not().isEmpty(),
            check('biography', 'Biography is required').not().isEmpty(),
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            validateField
        ], UserController.editUser);

        router.put('/follow/:followingId',[
            validateJWT.validateJWT,
            check('followingId', 'Invalid ID').isUUID(),
            check('followingId').custom( validators.existsUserID )
        ], UserController.followUser);

        router.get('/getFollow/:userId',[
            validateJWT.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID )
        ], UserController.getFollowerAndFollowings);

        router.delete('/unFollow/:userId/:followingId', [
            validateJWT.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            check('followingId', 'Invalid ID').isUUID(),
            check('followingId').custom( validators.existsUserID )
        ], UserController.unFollowUser);

        return router;
    }


}