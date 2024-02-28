import { envs } from './helpers/envs';
import { AppRoutes } from './routes/AppRoutes';
import { Server } from './server/server';

(async()=> {
  main();
})();

function main() {

  const server = new Server({ port: envs.PORT });

  server.setRoutes( AppRoutes.routes );

  server.start();
};