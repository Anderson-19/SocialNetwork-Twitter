import { api } from "./api";

export const getCommentsByPostId = async ( token: string = '', postId: string ): Promise<any> => {      
    const { data } = await api.get<any>(`/post/comment/getCommentsByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}