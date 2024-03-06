import { type User } from "../interfaces";
import { api } from "./api";

export const register = async ( user: User ) => {
    const { data } = await api.post<User>('/auth/register', user);
    return data;
}

export const logIn = async ( user: User ) => {
    const { data } = await api.post<User>('/auth/logIn', user);
    return data;
}

export const logout = async ( user: User ) => {
    const { data } = await api.post<User>('/auth/logout', user);
    return data;
}