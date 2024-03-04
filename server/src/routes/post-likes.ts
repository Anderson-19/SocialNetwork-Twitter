import { Router } from "express";
import { check } from "express-validator";

import { PostLikes } from "../controllers";
import { MiddlewaresValidators } from '../middlewares/validators';
import { DBValidators } from '../helpers';

export class PostLikesRoutes {

    static get routes() {

        const router = Router();
        const postLikesController = new PostLikes();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();
    
        router.post('/addLike/:postId/:userLikeId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            check('userLikeId', 'Invalid ID').isUUID(),
            check('userLikeId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],postLikesController.addLike);

        router.get('/getLikesByUserId/:userId',[
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],postLikesController.getLikesByUserId);

        router.get('/getLikesByPostId/:postId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ],postLikesController.getLikesByPostId);

        router.delete('/disLike/:postId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ],postLikesController.disLike);
    
        return router;
      }
}