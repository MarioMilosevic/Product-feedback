export const emptyFeedback = {
  id: undefined,
  category: {
    name: "",
  },
  description: "",
  likes: 0,
  likedUserIds:[],
  status: {
    name: "Planned",
  },
  title: "",
};

export const notLoggedInUser = {
  image: "",
  username: "",
  is_anonymous: true
};

export const navSortOptions = [
  "Most Likes",
  "Least Likes",
  "Most Comments",
  "Least Comments",
];
