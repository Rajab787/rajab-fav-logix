import api from "@/lib/axios";

export const getChatList = async () => {
  const postsRes = await api.get("/posts?limit=20");
  const usersRes = await api.get("/users?limit=150");

  const posts = postsRes.data.posts;
  const users = usersRes.data.users;

  // Merge user data into each post
  const merged = posts.map((post: any) => {
    const user = users.find((u: any) => u.id === post.userId);

    return {
      ...post,
      fullName: `${user?.firstName ?? "Unknown"} ${user?.lastName ?? ""}`,
      avatar: user?.image ?? null,
    };
  });

  return merged;
};