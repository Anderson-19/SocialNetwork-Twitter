import { UserDB } from '../database';

export class DBValidators {

    private database: UserDB;

    constructor() {
        this.database = new UserDB();
    }

    public existsUserID = async ( userId: string ) =>{
       const existsID = await this.database.getDataUser("", userId);
       if( existsID.rowCount < 1 ){
           throw new Error(`This user: ${ userId } not exists`);
       }
    }
}
