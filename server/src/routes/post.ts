import { Router } from "express";
import { check } from "express-validator";

import { Post } from "../controllers";
import { MiddlewaresValidators } from "../middlewares/validators";
import { DBValidators } from "../helpers";

export class PostRoutes {
    static get routes() {

        const router = Router();
        const postController = new Post();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();
    
        router.post('/create', [
            middlewaresValidators.validateJWT,
            check('content', 'Está vacío o es invalido').not().isEmpty(),
            middlewaresValidators.validateField
        ], postController.createPost);

        router.get('/getAll', middlewaresValidators.validateJWT, postController.getPosts);

        router.get('/getPostsByUserId/:userId', [
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], postController.getPostsById);

        router.get('/getPostByPostId/:postId', [
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ], postController.getPostById);

        router.get('/getPostsOfFollowings', middlewaresValidators.validateJWT, postController.getPostsOfFollowingsById);

        router.delete('/delete/:postId', [
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ], postController.deletePost);

        return router;
      }
}