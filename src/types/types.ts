export type FeedbackType = {
  category: string;
  created_at: string;
  description: string;
  id: number;
  likes: number;
  status: string;
  title: string;
  Comments: {
    id: number;
  }[];
};

export type CommentType = {
  content: string;
  created_at: string;
  feedbackId: number;
  fullName: string;
  id: number;
  image: string;
  username: string;
  Users: UserType;
};

export type UserType = {
  created_at: string;
  fullName: string;
  id: number;
  image: string;
  username: string;
};
