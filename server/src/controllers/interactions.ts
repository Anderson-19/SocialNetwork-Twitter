import { Request, Response } from 'express';

import { InteractionsDB, PostDB } from "../database";
import { UuidAdapter, AuthJWT } from '../helpers/';

export class Interactions {

    private interactionsDB: InteractionsDB;
    private postDB: PostDB;

    constructor() {
        this.interactionsDB = new InteractionsDB();
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
            await this.interactionsDB.addLike(id, postId, uid, userLikeId);
            await this.interactionsDB.updateLikeOfPost({ likes: addLike, post_id: postId });
            res.status(200).json({ ok: true });
        } catch (error) {
            res.status(400).json({ error });
        }

    }

    public getLikesById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        
        try {
            const likes = await this.interactionsDB.getLikesById(userId);
    
            res.status(200).json({ likes });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public getLikeById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        
        try {
            const likes = await this.interactionsDB.getLikeById(userId);
    
            res.status(200).json({ likes });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public deleteLike = async (req: Request, res: Response) => {
        const { postId } = req.params;
        
        try {
            const likes = await this.postDB.getPostById(postId);
            const disLike = Number( likes.rows[0].likes ) - 1;
            await this.interactionsDB.updateLikeOfPost({ likes: disLike, post_id: postId });
            await this.interactionsDB.disLike(postId);
            res.status(200).json({ ok: true });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

}