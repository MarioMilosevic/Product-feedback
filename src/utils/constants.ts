import { InputType } from "src/utils/types";

export const emptyFeedback = {
  id: undefined,
  category: {
    name: "",
  },
  description: "",
  likes: 0,
  likedUserIds: [],
  status: {
    name: "Planned",
  },
  title: "",
};

export const notLoggedInUser = {
  image: "",
  username: "",
  is_anonymous: true,
};

export const navSortOptions = [
  "Most Likes",
  "Least Likes",
  "Most Comments",
  "Least Comments",
];

export const loginInputs:InputType[] = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email Address",
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

export const signUpInputs: InputType[] = [
  {
    id: 1,
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
  },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "Email Address",
  },
  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    id: 5,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];