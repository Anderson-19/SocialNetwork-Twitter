import { Router } from 'express';
import { check } from 'express-validator';

import { MiddlewaresValidators } from '../middlewares/validators';
import { Auth } from '../controllers';

export class AuthRoutes {

  static get routes() {

    const router = Router();
    const AuthController = new Auth();
    const middlewaresValidators = new MiddlewaresValidators();

    router.post('/logIn', [
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      middlewaresValidators.validateField
    ], AuthController.logIn);

    router.post('/register', [
      check('name', 'Name is required').not().isEmpty(),
      check('lastname', 'Lastname is required').not().isEmpty(),
      check('username', 'Username is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      middlewaresValidators.validateField
    ], AuthController.register);

    router.post('/logout', AuthController.logout);

    return router;
  }


}