import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { envs } from '../helpers';
import { UserDB } from '../database';

export class MiddlewaresValidators {

    private database: UserDB;

    constructor() {
        this.database = new UserDB();
    }

    public validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {

        const { x_token } = req.headers;
    
        if( !x_token ) return res.status(401).json({ msj: 'Token does not exist' });
    
        try {
            const { uid } = jwt.verify( x_token?.toString(), envs.JWT_SECRET ) as { uid: string; };
            
            const user = await this.database.getDataUser('', uid);
            const userAuth = user.rows[0];
    
            if ( !userAuth ) {
                return res.status(401).json({
                    msj: `Invalid Token - user does not exist in DB`
                })
            }
           
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ msj: 'Invalid Token' });    
        }
    }

    public validateField = (req: Request, res: Response, next: NextFunction) =>{

        const errors = validationResult(req);
        if( !errors.isEmpty() ){
            return res.status(400).json(errors);
        }
    
        next();
    
    }

    public validateFile = (req: Request, res: Response, next: NextFunction) =>{

        if (!req.files || Object.keys(req.files).length === 0 ) {
            return res.status(400).json( { msg: 'No files were uploaded.' } );
        }
    
        next();
    }

}