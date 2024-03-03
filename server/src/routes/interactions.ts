import { Router } from "express";
import { check } from "express-validator";

import { Interactions } from "../controllers";
import { MiddlewaresValidators } from '../middlewares/validators';
import { DBValidators } from '../helpers';

export class InteractionsRoutes {

    static get routes() {

        const router = Router();
        const LikesController = new Interactions();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();
    
        router.post('/addLike/:postId/:userLikeId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            check('userLikeId', 'Invalid ID').isUUID(),
            check('userLikeId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],LikesController.addLike);

        router.get('/get/:userId',[
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],LikesController.getLikesById);

        router.get('/getLike/:userId',[
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],LikesController.getLikeById);

        router.delete('/disLike/:postId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ],LikesController.addLike);
    
        return router;
      }
}