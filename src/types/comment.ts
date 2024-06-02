import { BoardCategory } from './Post';

export type Comment = {
  id: string;
  uid: string;
  postId: string;
  level: number;
  name: string;
  content: string;
  createdAt: string;
  replyId: string | null;
  category: BoardCategory;
  userImage?: string;
};
