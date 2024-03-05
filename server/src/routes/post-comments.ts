import { Router } from "express";
import { check } from "express-validator";

import { PostComment } from "../controllers";
import { MiddlewaresValidators } from "../middlewares/validators";
import { DBValidators } from "../helpers";

export class PostCommentRoutes {

    static get routes() {

        const router = Router();
        const postCommentController = new PostComment();
        const middlewaresValidators = new MiddlewaresValidators();
        const validators = new DBValidators();
    
        router.post('/create/:postId', [
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            check('content', 'Está vacío o es invalido').not().isEmpty(),
            middlewaresValidators.validateField
        ], postCommentController.createComment);

        router.get('/getAll', middlewaresValidators.validateJWT, postCommentController.getComments);

        router.get('/getCommentsOfPost/:postId', [
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ], postCommentController.getCommentsByPostId);

        router.delete('/delete/:postId', [
            middlewaresValidators.validateJWT,
            check('postId', 'Invalid ID').isUUID(),
            check('postId').custom( validators.existsPostID ),
            middlewaresValidators.validateField
        ], postCommentController.deleteComment);

        return router;
      }
}