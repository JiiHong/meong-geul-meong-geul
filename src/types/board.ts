export type Board = {
  id: string;
  uid: string;
  name: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  userImage?: string;
  contentImage?: string;
};

export type WriteFormState = Pick<Board, 'title' | 'content'>;

export type BoardCategory = 'info' | 'question' | 'free';
