import { type Post } from "../interfaces";
import { api } from "./api";

export const createPost = async ( token: string, dataPost: any ) => {
    const { data } = await api.post<Post>('/post/create', dataPost, {
        headers: {
            "x_token": token,
            "Content-Type": "multipart/form-data",
        }   
    });
    return data;
}

export const getPosts = async ( token: string = ''): Promise<any> => {      
    const { data } = await api.get<any>(`/post/getAll/`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getPostsOfFollowings = async ( token: string = '' ): Promise<Post> => {      
    const { data } = await api.get<Post>(`/post/getPostsOfFollowings`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getPostsByUserId = async ( token: string = '', userId: string ): Promise<any> => {      
    const { data } = await api.get<any>(`/post/getPostsByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

