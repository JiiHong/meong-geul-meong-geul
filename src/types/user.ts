export type User = {
  id: string;
  uid: string;
  email: string;
  createdAt: string;
  recommendPosts: string[];
  commentPosts: string[];
  name?: string;
  profileImage?: string;
};
