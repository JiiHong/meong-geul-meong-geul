export type Comment = {
  id: string;
  uid: string;
  level: number;
  name: string;
  content: string;
  createdAt: string;
  replyId: string | null;
  userImage?: string;
};
