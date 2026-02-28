import api from "@/lib/axios";

export const getChatMessages = async () => {
    const response = await api.get("/comments?limit=20");
    return response.data.comments;
};
