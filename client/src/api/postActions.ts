import { type Post } from "../interfaces";
import { api } from "./api";

export const getPostsOfFollowings = async ( token: string = '' ): Promise<Post> => {      
    const { data } = await api.get<Post>(`/post/getPostsOfFollowings`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}