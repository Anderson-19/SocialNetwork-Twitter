import { DataBase } from "./dataBase";
import { CommentInterface, PostInterface } from '../interfaces';


export class PostCommentDB extends DataBase {

    constructor() {
        super();
    }

    public async setComment({ post_comment_id, post_id, user_id }: CommentInterface) {
        const query = 'INSERT INTO post_comments (post_comment_id,post_id,user_id,created_at) VALUES ($1,$2,$3,NOW())';
        return await this.pool.query(query, [post_comment_id, post_id, user_id ]);
    }

    public async updateCommentsOfPost({ comments, post_id }: PostInterface) {
        const query = 'UPDATE posts SET comments=$1 WHERE post_id=$2';
        return await this.pool.query(query, [comments, post_id]);
    }

    public async getCommets(): Promise<any[]> {
        const query = 'SELECT * FROM post_comments AS pc INNER JOIN users ON pc.user_id=users.user_id ORDER BY pc.created_at DESC';
        return (await this.pool.query(query)).rows;
    }

    public async getCommentsByPostId(postId: string): Promise<any[]> {
        const query = `
            SELECT post_comment_id, pc.post_id, p.content, p.img, pc.user_id, p.likes, p.forwarded, p.comments, p.created_at, name, lastname, username, email, avatar FROM post_comments AS pc
            INNER JOIN posts AS p ON p.post_id=pc.post_comment_id 
            INNER JOIN users AS u ON u.user_id=pc.user_id
            WHERE pc.post_id=$1
        `;
        return (await this.pool.query(query, [postId])).rows;
    }

    public async deleteComment(postCommentId: string): Promise<any> {
        const query = 'DELETE FROM post_comments WHERE post_comment_id=$1';
        return await this.pool.query(query, [postCommentId]);
    } 

}
