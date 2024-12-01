export const emptyFeedback = {
  id: undefined,
  category: {
    name: "",
  },
  description: "",
  likes: 0,
  status: {
    name: "Planned",
  },
  title: "",
};

export const notLoggedInUser = {
  image: "",
  username: "",
  is_anonymous: true,
  
  //     created_at?: string;
  // id?: number;
  // fullName: string;
  // image: string;
  // username: string;
  // auth_id?: string;
  // is_anonymous?: boolean;
};

export const navSortOptions = [
  "Most Likes",
  "Least Likes",
  "Most Comments",
  "Least Comments",
];
