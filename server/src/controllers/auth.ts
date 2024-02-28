import { Request, Response } from 'express';
import bcrypt from "bcryptjs";

import { UuidAdapter , AuthJWT} from '../helpers';
import { UserDB } from '../database';

export class Auth {

    private database: UserDB;

    constructor() {
        this.database = new UserDB();
     }

    public singIn = async ( req: Request, res: Response ) => {
        const { 
            email, 
            password, 
            name, 
            lastname, 
            avatar='https://res.cloudinary.com/dav7kqayl/image/upload/v1703882215/social-network/default-users/wsbtqrhs3537j8v2ptlg.png',
            banner='https://res.cloudinary.com/dav7kqayl/image/upload/v1703882221/social-network/default-users/x1hms9adlkxsdtjjkzrc.jpg',
            username } = req.body;
        const uid = UuidAdapter.v4();

        try {
            const getDataUser = await this.database.getDataUser(email);
            if(getDataUser.rowCount > 0){
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario ${ email } ya existe`
                });
            }

            const pass = bcrypt.hashSync( password, bcrypt.genSaltSync() );
            await this.database.setDataUser({ uid, name, lastname, username, email, password: pass, avatar, banner });

            res.status(201).json({
                ok: true,
                name,
                email
            })
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        }   
    }

    public logIn = async ( req: Request, res: Response ) => {
        
        const { email, password } = req.body;

        try {
            const getDataUser = await this.database.getDataUser(email);

            if(getDataUser.rowCount < 1){
                return res.status(400).json({
                    ok: false,
                    msg: `El usuario ${ email } no existe`
                });
            }

            const validPassword = bcrypt.compareSync( password, getDataUser.rows[0]?.password );

            if ( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto'
                });
            }

            const token = await AuthJWT.generateJWT( {uid: getDataUser.rows[0]?.user_id}, '3h' );

            //await this.database.setRemoveConnectionUser( { uid: getDataUser.rows[0]?.user_id, statusConnetion: true} )

            res.json({
                ok: true,
                uid: getDataUser.rows[0]?.user_id,
                name: getDataUser.rows[0]?.name,
                lastname: getDataUser.rows[0]?.lastname,
                username: getDataUser.rows[0]?.username,
                email: getDataUser.rows[0]?.email,
                created_at: getDataUser.rows[0]?.created_at,
                avatar: getDataUser.rows[0]?.avatar,
                token
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el administrador'
            });
        }

    }

    public logout = async (req: Request, res: Response) => {
        const { uid } = req.body;

        try {   
            //await this.database?.setRemoveConnectionUser( { uid, statusConnetion: false} );
            res.json({
                ok: true,
                msg: 'Sesión cerrada'
            });
        } catch (error) {
            console.log(error)
            res.json({
                ok: false,
                msg: 'Problema al cerrar la sesión'
            })
        }
    }


}