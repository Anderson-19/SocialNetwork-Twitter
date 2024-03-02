import { Router } from "express";
import { check } from "express-validator";

import { Post } from "../controllers";
import { MiddlewaresValidators } from "../middlewares/validators";
import { DBValidators } from "../helpers";

export class PostRoutes {
    static get routes() {

        const router = Router();
        const PostController = new Post();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();
    
        router.post('/create', [
            middlewaresValidators.validateJWT,
            middlewaresValidators.validateFile,
            check('content', 'Está vacío o es invalido').not().isEmpty(),
            middlewaresValidators.validateField
        ], PostController.createPost);

        router.get('/getAll', middlewaresValidators.validateJWT, PostController.getPosts);

        router.get('/get/:userId', [
            middlewaresValidators.validateJWT,
            check('userId', 'Invalid ID').isUUID(),
            check('userId').custom( validators.existsUserID ),
            middlewaresValidators.validateField
        ], PostController.getPostsById);

        router.get('/getPostsOfFollowings', middlewaresValidators.validateJWT, PostController.getPostsOfFollowingsById);

        router.delete('/delete/:postId', [
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ], PostController.deletePost);

        return router;
      }
}