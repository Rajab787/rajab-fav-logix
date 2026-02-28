import api from "@/lib/axios";

export const fetchUsers = async () => {
    const res = await api.get("/users");
    return res.data;
};
