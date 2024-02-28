import jwt, { type JwtPayload } from 'jsonwebtoken';

import { envs } from './envs';

export class AuthJWT {

    public static generateJWT = (payload: any, duration: string = '2h') => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, envs.JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) reject('unable to generate token');
                resolve(token);
            })
        })
    }

    public static verifyJWT = async (token: string = '') => {
        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded);
            });
        })
    }

}