import { Request, Response } from 'express';
import bcrypt from "bcryptjs";

import { UuidAdapter, AuthJWT } from '../helpers';
import { UserDB } from '../database';

export class Auth {

    private database: UserDB;

    constructor() {
        this.database = new UserDB();
    }

    public register = async (req: Request, res: Response) => {
        const {
            email,
            password,
            name,
            lastname,
            avatar = 'https://res.cloudinary.com/dav7kqayl/image/upload/v1703882215/social-network/default-users/wsbtqrhs3537j8v2ptlg.png',
            banner = 'https://res.cloudinary.com/dav7kqayl/image/upload/v1703882221/social-network/default-users/x1hms9adlkxsdtjjkzrc.jpg',
            username } = req.body;

        const uid = UuidAdapter.v4();
        try {
            const getDataUser = await this.database.getDataUser(email);
            if (getDataUser.rowCount > 0) {
                return res.status(400).json({
                    ok: false,
                    message: `El usuario ${email} ya existe`
                });
            }

            const pass = bcrypt.hashSync(password, bcrypt.genSaltSync());
            await this.database.setDataUser({ uid, name, lastname, username, email, password: pass, avatar, banner });

            res.status(201).json({
                ok: true,
                name,
                email
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Por favor hable con el administrador',
            });
        }
    }

    public logIn = async (req: Request, res: Response) => {

        const { email, password } = req.body;

        try {
            const getDataUser = await this.database.getDataUser(email);

            if (getDataUser.rowCount < 1) {
                return res.status(400).json({
                    ok: false,
                    message: `El usuario ${email} no existe`
                });
            }

            const validPassword = bcrypt.compareSync(password, getDataUser.rows[0]?.password);

            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    message: 'Password incorrecto'
                });
            }

            const token = await AuthJWT.generateJWT({ uid: getDataUser.rows[0]?.user_id }, '4h');

            res.status(200).json({
                ok: true,
                uid: getDataUser.rows[0]?.user_id,
                name: getDataUser.rows[0]?.name,
                lastname: getDataUser.rows[0]?.lastname,
                username: getDataUser.rows[0]?.username,
                email: getDataUser.rows[0]?.email,
                created_at: getDataUser.rows[0]?.created_at,
                avatar: getDataUser.rows[0]?.avatar,
                banner: getDataUser.rows[0]?.banner,
                token
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: 'Hable con el administrador'
            });
        }

    }

    public logout = async (req: Request, res: Response) => {

        try {
            res.json({
                ok: true,
                message: 'Sesión cerrada'
            });
        } catch (error) {
            console.log(error);
            res.json({
                ok: false,
                message: 'Problema al cerrar la sesión'
            })
        }
    }


}