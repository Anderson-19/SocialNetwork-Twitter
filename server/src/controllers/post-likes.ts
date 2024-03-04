import { Request, Response } from 'express';

import { PostLikesDB, PostDB } from "../database";
import { UuidAdapter, AuthJWT } from '../helpers';

export class PostLikes {

    private postLikesDB: PostLikesDB;
    private postDB: PostDB;

    constructor() {
        this.postLikesDB = new PostLikesDB();
        this.postDB = new PostDB();
    }

    public addLike = async (req: Request, res: Response) => {
        const { postId, userLikeId } = req.params;
        const { x_token } = req.headers;
        const id = UuidAdapter.v4();
        
        try {

            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            const likes = await this.postDB.getPostById(postId);
            const addLike = likes.rows[0].likes !== null ? Number( likes.rows[0].likes ) + 1 : 1;

            await this.postLikesDB.addLike(id, postId, uid, userLikeId);
            await this.postLikesDB.updateLikeOfPost({ likes: addLike, post_id: postId });

            res.status(200).json({ ok: true });
        } catch (error) {
            res.status(400).json({ error });
        }

    }

    public getLikesByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        
        try {
            const likes = await this.postLikesDB.getLikesByUserId(userId);
    
            res.status(200).json({ likes });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public getLikesByPostId = async (req: Request, res: Response) => {
        const { postId } = req.params;
        
        try {
            const likes = await this.postLikesDB.getLikesByPostId(postId);
    
            res.status(200).json({ likes });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public disLike = async (req: Request, res: Response) => {
        const { postId } = req.params;
        
        try {
            const likes = await this.postDB.getPostById(postId);
            const disLike = Number( likes.rows[0].likes ) - 1;
            await this.postLikesDB.updateLikeOfPost({ likes: disLike, post_id: postId });
            await this.postLikesDB.disLike(postId);
            res.status(200).json({ ok: true });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

}