import { DataBase } from "./dataBase";
import { PostInterface } from '../interfaces';


export class PostDB extends DataBase {

    constructor(){
        super();
    }

    public async setPost({ content, img, post_id, user_id }: PostInterface) {
        let query = '';

        if (img && content) {
            query = 'INSERT INTO posts (post_id,content,img,created_at,user_id) VALUES ($1,$2,$3,NOW(),$4)';
            return await this.pool.query(query, [post_id, content, img, user_id]);
        } else if (content) {
            query = 'INSERT INTO posts (post_id,content,created_at,user_id) VALUES ($1,$2,NOW(),$3)';
            return await this.pool.query(query, [post_id, content, user_id]);
        } else {
            query = 'INSERT INTO posts (post_id,img,created_at,user_id) VALUES ($1,$2,NOW(),$3)';
            return await this.pool.query(query, [post_id, img, user_id]);
        }

    }

    public async getPosts(): Promise<any[]> {
        const query = 'SELECT * FROM posts INNER JOIN users ON posts.user_id=users.user_id ORDER BY posts.created_at DESC';
        return (await this.pool.query(query)).rows;
    }

    public async getPostsById(userId: string): Promise<any[]> {
        const query = `
            SELECT name, lastname, username, email, avatar, u.created_at, u.user_id, content, img, post_id, p.created_at FROM posts AS p 
            INNER JOIN users AS u ON p.user_id=u.user_id WHERE u.user_id=$1
        `;
        return (await this.pool.query(query, [userId])).rows;
    }

    public async getPostsOfFollowingsById(userId: string): Promise<any[]> {
        const query = `
            SELECT DISTINCT name, lastname, username, email, avatar, u.created_at, u.user_id, content, img, post_id, p.created_at, following_id FROM follows AS f
            INNER JOIN posts AS p ON p.user_id=f.following_id 
            INNER JOIN users AS u ON u.user_id=f.following_id
            WHERE f.following_id<>$1 AND p.user_id<>$2
        `;
        return (await this.pool.query(query, [userId, userId])).rows;
    }

    public async getPostById(postId: string): Promise<any> {
        const query = 'SELECT * FROM posts WHERE post_id=$1';
        return await this.pool.query(query, [postId]);
    }

    public async deletePost(postId: string): Promise<any> {
        const query = 'DELETE FROM posts WHERE post_id=$1';
        return await this.pool.query(query, [postId]);
    }

}
