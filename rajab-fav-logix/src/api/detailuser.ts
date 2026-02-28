import api from "@/lib/axios";
export const fetchDetail = async () => {
    const res = await api.get("/users/1");
    return res.data;
};