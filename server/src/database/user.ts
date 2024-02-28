import { User } from "../interfaces";
import { DataBase } from "./dataBase";

export class UserDB extends DataBase{

    constructor(){
        super();
    }

    public async getDataUser(email?: string, uid?: string): Promise<any> {
        let query = '';

        if (email) {
            query = 'SELECT * FROM users WHERE email=$1';
            
            return await this.pool.query(query, [email]);
        } else {
            query = 'SELECT * FROM users WHERE user_id=$1';
            return await this.pool.query(query, [uid]);
        }

    }

    public async setDataUser({ uid, name, lastname, username, email, password, avatar, banner }: User): Promise<any> {
        const query = 'INSERT INTO users (user_id,name,lastname,username,email,password,avatar,created_at,banner) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),$8)';
        return await this.pool.query(query, [uid, name, lastname, username, email, password, avatar, banner]);
    }

    public async insertEditUser({ uid, name, lastname, biography, location, birthdate }: User) {
        const query = 'UPDATE users SET name=$1, lastname=$2, biography=$3, location=$4, birthdate=$5 WHERE user_id=$6';
        return await this.pool.query(query, [name, lastname, biography, location, birthdate, uid]);
    }

    public async setAvatarBannerUser(uid: string, avatar?: string, banner?: string) {
        if (avatar) {
            const query = 'UPDATE users SET avatar=$1 WHERE user_id=$2';
            return await this.pool.query(query, [avatar, uid]);
        } else {
            const query = 'UPDATE users SET banner=$1 WHERE user_id=$2';
            return await this.pool.query(query, [banner, uid]);
        }
    }

    public async getUsers(): Promise<any> {
        const query = 'SELECT * FROM users';
        return (await this.pool.query(query)).rows;
    }
}