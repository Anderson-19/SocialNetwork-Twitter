import { UserDB, PostDB } from '../database';

export class DBValidators {

    private userDB: UserDB;
    private postDB: PostDB;

    constructor() {
        this.userDB = new UserDB();
        this.postDB = new PostDB();
    }

    public existsUserID = async ( userId: string ) =>{
       const existsID = await this.userDB.getDataUser("", userId);
       if( existsID.rowCount < 1 ){
           throw new Error(`This user: ${ userId } not exists`);
       }
    }

    public existsPostID = async ( postId: string ) =>{
        const existsID = await this.postDB.getPostById(postId);
        if( existsID.rowCount < 1 ){
            throw new Error(`This post: ${ postId } not exists`);
        }
     }
}
