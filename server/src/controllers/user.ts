import { Request, Response } from 'express';
import { type UploadedFile } from 'express-fileupload';

import { UserDB } from "../database";
import { AuthJWT } from '../helpers/generate-jwt';
import { UuidAdapter } from '../helpers';

export class User {

    private database: UserDB;
    //private uploadFile: UploadFile;

    constructor() {
        this.database = new UserDB();
        //this.uploadFile = new UploadFile();
    }


    public getUser = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const getData = await this.database.getDataUser("", userId);
            const user = getData.rows[0];
            res.status(200).json({
                ok: true,
                uid: user?.user_id,
                name: user?.name,
                lastname: user?.lastname,
                username: user?.username,
                email: user?.email,
                created_at: user?.created_at,
                avatar: user?.avatar,
                location: user?.location,
                birthdate: user?.birthdate,
                biography: user?.biography,
                banner: user?.banner,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.database.getUsers();
            res.status(200).json({ users });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public editUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { name, lastname, location, birthdate, biography } = req.body;

        try {
            await this.database.insertEditUser({ uid: userId, name, lastname, location, birthdate, biography });
            res.status(201).json({ ok: true });
        } catch (error) {
            console.log(error);
            res.status(401).json({ ok: false });
        }
    }

    public followUser = async (req: Request, res: Response) => {
        const { followingId } = req.params;
        const { followerId } = req.body;
        const followId = UuidAdapter.v4();

        try {
            if( followerId === followingId ) return res.status(404).json({ ok: false, msg: "You can't follow yourself" });
            await this.database.follow(followId, followerId, followingId);
            res.status(200).json({ ok: true });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }

    public unFollowUser = async (req: Request, res: Response) => {
        const { followingId, Id } = req.params;

        try {
            await this.database.unFollow(followingId, Id);
            res.status(200).json({ ok: true });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }

    }

    public getFollowerAndFollowings = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const followers = await this.database.getfollowers(userId);
            const followings = await this.database.getfollowings(userId);
            res.status(200).json({ ok: true, followers: followers.rows, followings: followings.rows });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }

    }

}