export interface PostInterface {
    post_id?: string;
    content?: string | string[];
    img?: string;
    created_at?: string;
    user_id?: string;
    likes?: number;
    forwarded?: number;
    comments?: number;
}