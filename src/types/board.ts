export type Board = {
  id: string;
  uid: string;
  name: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: number;
  userImage?: string;
  contentImage?: string;
};
