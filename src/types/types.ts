export type feedbacksDataType = {
  category: {
    name: string;
  };
  created_at?: string;
  description: string;
  id: number;
  likes: number;
  status: {
    name: string;
  };
  title: string;
  Comments: {
    count: number;
  }[];
};

export type FeedbackType = {
  category: {
    name: string;
  };
  created_at?: string;
  description: string;
  id?: number;
  likes: number;
  status: {
    name: string;
  };
  title: string;
  Comments: CommentType[];
};

export type SingleFeedbackType = {
  Comments: CommentType[];
  category: {
    name: string;
  };
  created_at: string;
  description: string;
  id: number;
  likes: number;
  status: {
    name: string;
  };
  title: string;
};

export type CommentType = {
  content: string;
  created_at: string;
  feedbackId: number;
  id: number;
  userId: number;
  Users: UserType;
  count?: number;
};

export type UserType = {
  created_at: string;
  fullName: string;
  id: number;
  image: string;
  username: string;
};

export type CategoryType = {
  name: string;
  created_at: string;
  id: number;
};

export type StatusType = {
  name: string;
  created_at: string;
  id: number;
};

export type SubmitFeedbackType = {
  Comments: CommentType[],
  category: string;
  description: string;
  likes: number;
  status: string;
  title: string;
  id?:number
}
