import { Response, Request } from 'express';
import { UploadedFile } from "express-fileupload";

import { PostDB, PostLikesDB, PostForwardedDB, PostCommentDB } from "../database";
import { AuthJWT, UploadFile, UuidAdapter } from "../helpers";

export class Post {

    private postCommentDB: PostCommentDB;
    private postDB: PostDB;
    private postLikesDB: PostLikesDB;
    private postForwardedDB: PostForwardedDB;
    private uploadFiles: UploadFile;

    constructor() {
        this.postCommentDB = new PostCommentDB();
        this.postDB = new PostDB();
        this.postLikesDB = new PostLikesDB();
        this.postForwardedDB = new PostForwardedDB();
        this.uploadFiles = new UploadFile();
    }

    public createPost = async (req: Request, res: Response) => {
        const { x_token } = req.headers;
        const { content } = req.body;
        const post_id = UuidAdapter.v4();

        try {
            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            if (content && req.files?.file) {
                const { tempFilePath } = req.files?.file as UploadedFile;
                const file = await this.uploadFiles?.uploadFile(tempFilePath, 'posts');
                await this.postDB.setPost({ post_id, content, img: file, user_id: uid });
                res.status(201).json({ ok: true });
            } else if (content) {
                await this.postDB.setPost({ post_id, content, user_id: uid });
                res.status(201).json({ ok: true });
            } else {
                const { tempFilePath } = req.files?.file as UploadedFile;
                const file = await this.uploadFiles?.uploadFile(tempFilePath, 'posts');
                await this.postDB.setPost({ post_id, img: file, user_id: uid });
                res.status(201).json({ ok: true });
            }

        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPosts = async (req: Request, res: Response) => {

        try {
            const posts = await this.postDB.getPosts();
            res.status(201).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPostsById = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const posts = await this.postDB.getPostsById(userId);
            res.status(201).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPostById = async (req: Request, res: Response) => {
        const { postId } = req.params;

        try {
            const post = await this.postDB.getPostById(postId);
            res.status(201).json({ post: post.rows[0] });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getPostsOfFollowingsById = async (req: Request, res: Response) => {
        const { x_token } = req.headers;

        try {
            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            const posts = await this.postDB.getPostsOfFollowingsById(uid);
            res.status(201).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        const { postId } = req.params;

        try {
            const post = await this.postDB.getPostById(postId);
            if (post.rows[0].post_id !== postId) return res.status(500).json({ ok: false });

            const commentsPost = await this.postDB.getCommentsPostId(postId);
            if (commentsPost.rowCount < 1) {

                if (post.rows[0].img) {
                    const img = post.rows[0].img.split('/')[9].split('.')[0];
                    await this.uploadFiles.deleteFile(img, 'posts');

                    await this.postDB.deleteComments(postId);
                    await this.postLikesDB.disLike(postId);
                    await this.postForwardedDB.deleteForwarded(postId);
                    await this.postDB.deletePost(postId);
                    res.status(201).json({ ok: true });
                } else {

                    await this.postDB.deleteComments(postId);
                    await this.postLikesDB.disLike(postId);
                    await this.postForwardedDB.deleteForwarded(postId);
                    await this.postDB.deletePost(postId);
                    res.status(201).json({ ok: true });
                }

            } else {
                commentsPost.rows.map(async ({ post_comment_id }: any) => {
       
                    if (post.rows[0].img) {
                        const img = post.rows[0].img.split('/')[9].split('.')[0];
                        
                        Promise.all([
                            await this.uploadFiles.deleteFile(img, 'posts'),
                            await this.postDB.deleteComments(post_comment_id),
                            await this.postLikesDB.disLike(post_comment_id),
                            await this.postForwardedDB.deleteForwarded(post_comment_id),
                            await this.postDB.deletePost(post_comment_id),
    
                            await this.postDB.deleteComments(postId),
                            await this.postLikesDB.disLike(postId),
                            await this.postForwardedDB.deleteForwarded(postId),
                            await this.postDB.deletePost(postId),
                        ]);

                    } else {

                        Promise.all([
                            await this.postDB.deleteComments(post_comment_id),
                            await this.postLikesDB.disLike(post_comment_id),
                            await this.postForwardedDB.deleteForwarded(post_comment_id),
                            await this.postDB.deletePost(post_comment_id),
    
                            await this.postDB.deleteComments(postId),
                            await this.postLikesDB.disLike(postId),
                            await this.postForwardedDB.deleteForwarded(postId),
                            await this.postDB.deletePost(postId),
                        ]);
                        
                    }
                })
                res.status(201).json({ ok: true });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }

}