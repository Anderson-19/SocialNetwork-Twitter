import { v2 } from 'cloudinary';

import { envs } from './envs';

export class UploadFile {

    constructor() {
        v2.config( envs.CLOUDINARY_URL );
    }

    public async uploadFile(tempFilePath: string, folder: string): Promise<string> {
        const { secure_url } = await v2.uploader.upload(tempFilePath, {folder: `social-network/${folder}`});
        return secure_url;
    }

    public async destroyFile(file: string, folder: string) {
        return await v2.uploader.destroy(`social-network/${folder}/${file}`);
    }

    public async deleteFile(file: string, folder: string) {
        return await v2.api.delete_resources([`social-network/${folder}/${file}`], { type: 'upload', resource_type: 'image' })
    }

}