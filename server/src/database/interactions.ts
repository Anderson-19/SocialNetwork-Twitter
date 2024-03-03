import { DataBase } from "./dataBase";
import { PostInterface } from '../interfaces';

export class InteractionsDB extends DataBase {

    constructor() {
        super();
    }

    public async addLike(post_like_id: string, postId: string, userId: string, userLikeId: string): Promise<any> {
        const query = 'INSERT INTO post_likes (post_like_id,date,post_id,user_id,user_like_id) VALUES ($1,NOW(),$2,$3,$4)';
        return await this.pool.query(query, [post_like_id, postId, userId, userLikeId]);
    }

    public async getLikesById(userId: string): Promise<any> {
        const query = `
            SELECT post_like_id, date, likes, user_like_id, pl.post_id, content, img, u.user_id, name, lastname, username, email, avatar FROM post_likes AS pl 
            INNER JOIN posts AS p ON p.post_id=pl.post_id 
            INNER JOIN users AS u ON u.user_id=pl.user_like_id 
            WHERE pl.user_id=$1
        `;
        return (await this.pool.query(query, [userId])).rows;
    }

    public async getLikeById(user_id: string): Promise<any> {
        const query = "SELECT * FROM post_likes AS pl WHERE pl.user_id=$1;"
        return (await this.pool.query(query, [user_id])).rows;
    }

    public async disLike(post_id: string): Promise<any> {
        const query = 'DELETE FROM post_likes WHERE post_id=$1';
        return await this.pool.query(query, [post_id]);
    }

    public async updateLikeOfPost({ likes, post_id }: PostInterface) {
        const query = 'UPDATE posts SET likes=$1 WHERE post_id=$2';
        return await this.pool.query(query, [likes, post_id]);
    }
}





