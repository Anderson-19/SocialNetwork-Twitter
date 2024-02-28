export interface User {
    uid?: string;
    name?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    location?: string;
    birthdate?: string;
    biography?: string;
    role?: string;
    statusConnetion?: boolean;
    created_at?: string;
    updated_at?: string;
    avatar?: string;
    banner?: string;
}

export interface Token {
    uid: string;
}