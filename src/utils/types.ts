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
  likedUserIds: number[];
  status: {
    name: string;
  };
  title: string;
  Comments: { count: number }[];
  userId?: string;
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
  likedUserIds:number[],
  status: {
    name: string;
  };
  title: string;
  userId: string;
};


export type CommentType = {
  id?: number;
  created_at?: string;
  content: string;
  feedbackId: number;
  userId: number | undefined;
  auth_id: string;
  count?: number;
  Users: {
    auth_id: string;
    created_at?: string;
    fullName: string;
    id?: number;
    image: string;
    username: string;
  };
};

export type UserType = {
  created_at?: string;
  id?: number;
  fullName: string;
  image: string;
  username: string;
  auth_id?: string;
  is_anonymous?: boolean;
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

