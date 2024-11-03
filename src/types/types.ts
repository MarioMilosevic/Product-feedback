export type FeedbackType = {
  category: string;
  created_at?: string;
  description: string;
  id: number | string;
  likes: number;
  status: string;
  title: string;
  Comments: {
    feedbackId: number;
  }[];
};

export type SingleFeedbackType = {
  Comments: CommentType[];
  category: string;
  created_at: string;
  description: string;
  id: number;
  likes: number;
  status: string;
  title: string;
}

export type CommentType = {
  content: string;
  created_at: string;
  feedbackId: number;
  id: number;
  userId: number;
  Users: UserType;
};

export type UserType = {
  created_at: string;
  fullName: string;
  id: number;
  image: string;
  username: string;
};
