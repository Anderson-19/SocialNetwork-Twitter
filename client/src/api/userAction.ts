import { type User } from "../interfaces";
import { api } from "./api";

export const getUsers = async (): Promise<User> => {      
    const { data } = await api.get<User>(`/user/getAll`);
    return data;
}