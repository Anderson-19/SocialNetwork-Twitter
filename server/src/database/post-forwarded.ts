import { PostInterface } from "../interfaces";
import { DataBase } from "./dataBase";


export class PostForwardedDB extends DataBase {

    constructor() {
        super();
    }

    public async addForwarded(forwardedId: string, postId: string, userId: string, userForwardedId: string): Promise<any> {
        const query = 'INSERT INTO post_forwarded (forwarded_id,date,post_id,user_id,user_forwarded_id) VALUES ($1,NOW(),$2,$3,$4)';
        return await this.pool.query(query, [forwardedId, postId, userId, userForwardedId]);
    }

    public async getForwardedByUserId(userId: string): Promise<any> {
        const query = `
            SELECT forwarded_id, date, likes, forwarded, user_forwarded_id, pf.post_id, content, img, u.user_id, name, lastname, username, email, avatar FROM post_forwarded AS pf 
            INNER JOIN posts AS p ON p.post_id=pf.post_id 
            INNER JOIN users AS u ON u.user_id=pf.user_forwarded_id 
            WHERE pf.user_id=$1
        `;
        return (await this.pool.query(query, [userId])).rows;
    }

    public async getForwardedByPostId(postId: string): Promise<any> {
        const query = "SELECT * FROM post_forwarded AS pf INNER JOIN posts AS p ON p.post_id=pf.post_id WHERE p.post_id=$1";
        return (await this.pool.query(query, [postId])).rows;
    }

    public async deleteForwarded(postId: string): Promise<any> {
        const query = 'DELETE FROM post_forwarded WHERE post_id=$1';
        return await this.pool.query(query, [postId]);
    }

    public async updateForwardedOfPost({ forwarded, post_id }: PostInterface) {
        const query = 'UPDATE posts SET forwarded=$1 WHERE post_id=$2';
        return await this.pool.query(query, [forwarded, post_id]);
    }
    
}