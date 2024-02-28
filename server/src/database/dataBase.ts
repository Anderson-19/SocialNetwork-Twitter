import Pool, { } from 'pg-pool';
// import { type User } from '../interfaces/user';
// import { type Message } from '../interfaces/message';
// import { type Post } from '../interfaces/post';

export class DataBase {

    public pool: Pool<any>;
    private static instance: DataBase;

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'social-network',
            password: '29758990',
            port: 5432,
        });
    }

    public static getInstance(): DataBase {
        if (!DataBase.instance) {
            DataBase.instance = new DataBase();
        }
        return DataBase.instance;
    }
}