import { api } from "./api";

export const addForwarded = async ( token: string = '', postId: string, userForwardedId: string ) => {      
    const { data } = await api.post(`/post/forwarded/addForwarded/${ postId }/${ userForwardedId }`, {} ,{
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const deleteForwarded = async ( token: string = '', postId: string ): Promise<any> => {      
    const { data } = await api.delete<any>(`/post/forwarded/deleteForwarded/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getForwardedByUserId = async ( token: string = '', userId: string ): Promise<any> => {      
    const { data } = await api.get<any>(`/post/forwarded/getForwardedByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getForwardedByPostId = async ( token: string = '', postId: string ): Promise<any> => {      
    const { data } = await api.get<any>(`/post/forwarded/getForwardedByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}
