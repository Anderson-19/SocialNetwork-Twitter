import { Router } from 'express';

import { AuthRoutes } from './auth';
import { UserRoutes } from './user';
import { PostRoutes } from './post';
import { InteractionsRoutes } from './interactions';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/auth',  AuthRoutes.routes );
    router.use('/api/user',  UserRoutes.routes );
    router.use('/api/post',  PostRoutes.routes);
    router.use('/api/interaction',  InteractionsRoutes.routes);

    return router;
  }


}