import { PostDB, PostForwardedDB } from "../database";

import { Request, Response } from 'express';
import { UuidAdapter, AuthJWT } from '../helpers/';

export class PostForwarded {

    private postForwardedDB: PostForwardedDB;
    private postDB: PostDB;

    constructor() {
        this.postForwardedDB = new PostForwardedDB();
        this.postDB = new PostDB();
    }

    public addForwarded = async (req: Request, res: Response) => {
        const { postId, userForwardedId } = req.params;
        const { x_token } = req.headers;
        const id = UuidAdapter.v4();
        
        try {

            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            const forwarded = await this.postDB.getPostById(postId);
            const addForwarded = forwarded.rows[0].forwarded !== null ? Number( forwarded.rows[0].forwarded ) + 1 : 1;

            await this.postForwardedDB.addForwarded(id, postId, uid, userForwardedId);
            await this.postForwardedDB.updateForwardedOfPost({ forwarded: addForwarded, post_id: postId });

            res.status(200).json({ ok: true });
        } catch (error) {
            res.status(400).json({ error });
        }

    }

    public getForwardedByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        
        try {
            const forwarded = await this.postForwardedDB.getForwardedByUserId(userId);
    
            res.status(200).json({ forwarded });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public getForwardedByPostId = async (req: Request, res: Response) => {
        const { postId } = req.params;
        
        try {
            const forwarded = await this.postForwardedDB.getForwardedByPostId(postId);
    
            res.status(200).json({ forwarded });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public deleteForwareded = async (req: Request, res: Response) => {
        const { postId } = req.params;
        
        try {
            const forwareded = await this.postDB.getPostById(postId);
            const deleteForwareded = Number( forwareded.rows[0].forwareded ) - 1;

            await this.postForwardedDB.deleteForwarded(postId);
            await this.postForwardedDB.updateForwardedOfPost({ forwarded: deleteForwareded, post_id: postId });

            res.status(200).json({ ok: true });
        } catch (error) {
            res.status(400).json({ error });
        }
    }


}