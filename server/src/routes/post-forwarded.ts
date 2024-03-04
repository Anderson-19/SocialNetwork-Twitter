import { Router } from "express";
import { check } from "express-validator";

import { PostForwarded } from "../controllers";
import { MiddlewaresValidators } from '../middlewares/validators';
import { DBValidators } from '../helpers';

export class PostForwardedRoutes {

    static get routes() {

        const router = Router();
        const postForwardedController = new PostForwarded();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();

        router.post('/addForwarded/:postId/:userForwardedId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            check('userForwardedId', 'Invalid ID').isUUID(),
            check('userForwardedId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],postForwardedController.addForwarded);

        router.get('/getForwardedByUserId/:userId',[
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ],postForwardedController.getForwardedByUserId);

        router.get('/getForwardedByPostId/:postId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ],postForwardedController.getForwardedByPostId);

        router.delete('/deleteForwarded/:postId',[
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ],postForwardedController.deleteForwareded);
    
        return router;
      }
}