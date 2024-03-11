import { api } from "./api";

export const addLike = async ( token: string = '', postId: string, userLikeId: string ) => {      
    const { data } = await api.post(`/post/like/addLike/${ postId }/${ userLikeId }`, {} ,{
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const disLike = async ( token: string = '', postId: string ): Promise<any> => {      
    const { data } = await api.delete<any>(`/post/like/disLike/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getLikesByUserId = async ( token: string = '', userId: string ): Promise<any> => {      
    const { data } = await api.get<any>(`/post/like/getLikesByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getLikesByPostId = async ( token: string = '', postId: string ): Promise<any> => {      
    const { data } = await api.get<any>(`/post/like/getLikesByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}