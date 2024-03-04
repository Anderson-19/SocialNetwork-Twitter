import { Router } from 'express';

import { AuthRoutes } from './auth';
import { UserRoutes } from './user';
import { PostRoutes } from './post';
import { PostLikesRoutes } from './post-likes';
import { PostForwardedRoutes } from './post-forwarded';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/auth',  AuthRoutes.routes );
    router.use('/api/user',  UserRoutes.routes );
    router.use('/api/post',  PostRoutes.routes);
    router.use('/api/post/like',  PostLikesRoutes.routes);
    router.use('/api/post/forwarded',  PostForwardedRoutes.routes);

    return router;
  }


}