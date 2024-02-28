import { Router } from 'express';
import { check } from 'express-validator';

import { validateField } from '../middlewares';
import { Auth } from '../controllers';

export class AuthRoutes {

  static get routes() {

    const router = Router();
    const AuthController = new Auth();

    router.post('/logIn', [
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      validateField
    ], AuthController.logIn);

    router.post('/singIn', [
      check('name', 'Name is required').not().isEmpty(),
      check('lastname', 'Lastname is required').not().isEmpty(),
      check('username', 'Username is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      validateField
    ], AuthController.singIn);

    router.post('/logout', AuthController.logout);

    return router;
  }


}