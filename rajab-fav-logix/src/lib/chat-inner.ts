export type ChatMessageAPI = {
    id: number;
    body: string;
    postId: number;
    likes: number;
    createdAt?: string;
    user: {
        id: number;
        username: string;
    };
};