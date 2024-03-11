import { type User } from "../interfaces";
import { api } from "./api";

export const getUsers = async (): Promise<User> => {      
    const { data } = await api.get<User>(`/user/getAll`);
    return data;
}

export const getUserById = async (userId: string = '', token: string = ''): Promise<User> => {      
    const { data } = await api.get<User>(`/user/get/${userId}`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getFollowersAndFollowing = async (token: string = '', userId: string = ''): Promise<User> => {      
    const { data } = await api.get<User>(`/user/getFollow/${userId}`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const editUser = async ( user: User ) => {
    const { data } = await api.put<User>(`/user/edit/${ user.uid }`, user, {
        headers: {
            'x_token': user.token,
        }
    });
    return data;
}

export const changeAvatarUser = async ( user: User, dataImage: any ) => {
    const { data } = await api.post<User>(`/user/changeAvatar/${ user.uid }/${ user.avatar?.split('/')[9] }`, dataImage, {
        headers: {
            "x_token": user.token,
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

export const changeBannerUser = async ( user: User, token: string, dataImage: any ) => {
    const { data } = await api.post<User>(`/user/changeBanner/${ user.uid }/${ user.banner?.split('/')[9] }`, dataImage, {
        headers: {
            "x_token": token,
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}