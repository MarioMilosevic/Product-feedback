export type feedbacksDataType = {
  category: {
    category: string;
  };
  created_at?: string;
  description: string;
  id: number;
  likes: number;
  status: {
    status: string;
  };
  title: string;
  Comments: {
    count: number;
  }[];
};

export type FeedbackType = {
  category: {
    category:string
  };
  created_at?: string;
  description: string;
  id: number;
  likes: number;
  status: {
    status:string
  };
  title: string;
  Comments: {
    count: number;
  }[];
};
// export type FeedbackType = {
//   category: number;
//   created_at?: string;
//   description: string;
//   id: number;
//   likes: number;
//   status: number;
//   title: string;
//   Comments: {
//     count: number;
//   }[];
// };

export type SingleFeedbackType = {
  Comments: CommentType[];
  category: string;
  created_at: string;
  description: string;
  id: number;
  likes: number;
  status: string;
  title: string;
};

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

export type CategoryType = {
  category: string;
  created_at: string;
  id: number;
};

export type StatusType = {
  status: string;
  created_at: string;
  id: number;
};
