import express, { Router } from 'express';
import cors from 'cors';

import http from 'http';
import FileUpload from 'express-fileupload';

import { DataBase } from '../database';

interface Options {
  port: number;
  public_path?: string;
}

export class Server {

  public app = express();
  private readonly port: number;
  private server: http.Server;

  constructor(options: Options) {
    const { port } = options;
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);

    this.configure();
  }

  private configure() {

    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    this.app.use(FileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }));

    //* Data Base
    this.connectionDB();
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  public connectionDB() {
    return DataBase.getInstance();
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

  public close() {
    this.server?.close();
  }

}