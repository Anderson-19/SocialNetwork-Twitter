import { Response, Request } from 'express';
import { UploadedFile } from "express-fileupload";

import { PostDB } from "../database";
import { AuthJWT, UploadFile, UuidAdapter } from "../helpers";

export class Post {

    private database: PostDB;
    private uploadFiles: UploadFile;

    constructor() {
        this.database = new PostDB();
        this.uploadFiles = new UploadFile();
    }

    public createPost = async (req: Request, res: Response) => {
        const { x_token } = req.headers;
        const { content } = req.body;
        const { tempFilePath } = req.files?.file as UploadedFile;
        const post_id = UuidAdapter.v4();

        try {
            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            if (content && tempFilePath) {
                const file = await this.uploadFiles?.uploadFile(tempFilePath, 'posts');
                await this.database.setPost({ post_id, content, img: file, user_id: uid });
                res.status(201).json({ ok: true });
            } else if (content) {
                await this.database.setPost({ post_id, content, user_id: uid });
                res.status(201).json({ ok: true });
            } else {
                const file = await this.uploadFiles?.uploadFile(tempFilePath, 'posts');
                await this.database.setPost({ post_id, img: file, user_id: uid });
                res.status(201).json({ ok: true });
            }

        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPosts = async (req: Request, res: Response) => {

        try {
            const posts = await this.database.getPosts();
            res.status(201).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPostsById = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const posts = await this.database.getPostsById(userId);
            res.status(201).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPostsOfFollowingsById = async (req: Request, res: Response) => {
        const { x_token } = req.headers;

        try {
            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            const posts = await this.database.getPostsOfFollowingsById(uid);
            res.status(201).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        const { postId } = req.params;

        try {
            const post = await this.database.getPostById(postId);
            if (post.rows[0].post_id !== postId) return res.status(500).json({ ok: false });

            const img = post.rows[0].img.split('/')[9].split('.')[0];
            await this.uploadFiles.deleteFile(img, 'posts');
            await this.database.deletePost(postId);
            res.status(201).json({ ok: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }

}