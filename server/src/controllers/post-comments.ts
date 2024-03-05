import { Response, Request } from 'express';
import { UploadedFile } from "express-fileupload";

import { PostCommentDB, PostDB, PostLikesDB, PostForwardedDB } from "../database";
import { AuthJWT, UploadFile, UuidAdapter } from "../helpers";

export class PostComment {

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

    public createComment = async (req: Request, res: Response) => {
        const { x_token } = req.headers;
        const { postId } = req.params;
        const { content } = req.body;
        const id = UuidAdapter.v4();

        try {
            const { uid } = await AuthJWT.verifyJWT(x_token?.toString()) as { uid: string };

            const comments = await this.postDB.getPostById(postId);
            const addComments = comments.rows[0].comments !== null ? Number(comments.rows[0].comments) + 1 : 1;

            if (content && req.files?.file) {
                const { tempFilePath } = req.files?.file as UploadedFile;
                const file = await this.uploadFiles?.uploadFile(tempFilePath, 'posts');

                await this.postDB.setPost({ post_id: id, content,img: file , user_id: uid });
                await this.postCommentDB.setComment({ post_comment_id: id, post_id: postId, user_id: uid });
                await this.postCommentDB.updateCommentsOfPost({ comments: addComments, post_id: postId });

                res.status(201).json({ ok: true });
            } else if (content) {
                await this.postDB.setPost({ post_id: id, content, user_id: uid });
                await this.postCommentDB.setComment({ post_comment_id: id, post_id: postId, user_id: uid });
                await this.postCommentDB.updateCommentsOfPost({ comments: addComments, post_id: postId });

                res.status(201).json({ ok: true });
            } else {
                const { tempFilePath } = req.files?.file as UploadedFile;
                const file = await this.uploadFiles?.uploadFile(tempFilePath, 'posts');

                await this.postDB.setPost({ post_id: id, img: file, user_id: uid });
                await this.postCommentDB.setComment({ post_comment_id: id, post_id: postId, user_id: uid });
                await this.postCommentDB.updateCommentsOfPost({ comments: addComments, post_id: postId });

                res.status(201).json({ ok: true });
            }

        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getComments = async (req: Request, res: Response) => {

        try {
            const comments = await this.postCommentDB.getCommets();
            res.status(201).json({ comments });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getCommentsByPostId = async (req: Request, res: Response) => {
        const { postId } = req.params;

        try {
            const commentOfPost = await this.postCommentDB.getCommentsByPostId(postId);
            res.status(201).json({ commentOfPost });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        const { postId } = req.params;

        try {
            const comments = await this.postDB.getPostById(postId);
            const addComments = Number( comments.rows[0].comments ) - 1;
            if (comments.rows[0].post_id !== postId) return res.status(500).json({ ok: false });

            if ( comments.rows[0].img ) {
                const img = comments.rows[0].img.split('/')[9].split('.')[0];
                await this.uploadFiles.deleteFile(img, 'posts');

                await this.postCommentDB.deleteComment(postId);
                await this.postCommentDB.updateCommentsOfPost({ comments: addComments, post_id: postId });
                await this.postLikesDB.disLike(postId);
                await this.postForwardedDB.deleteForwarded(postId);
                await this.postDB.deletePost(postId);
                res.status(201).json({ ok: true })
            } else {
                await this.postCommentDB.deleteComment(postId);
                await this.postCommentDB.updateCommentsOfPost({ comments: addComments, post_id: postId });
                await this.postLikesDB.disLike(postId);
                await this.postForwardedDB.deleteForwarded(postId);
                await this.postDB.deletePost(postId);
                res.status(201).json({ ok: true })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    } 

}