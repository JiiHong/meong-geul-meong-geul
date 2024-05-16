export type Post = {
  id: string;
  uid: string;
  name: string;
  title: string;
  content: string;
  recommendCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  userImage?: string;
  contentImage?: string;
};

export type WriteFormState = Pick<Post, 'title' | 'content'>;

export type BoardCategory = 'info' | 'question' | 'free';
