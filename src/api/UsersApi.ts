import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toastify";

type UserType = {
  fullName: string;
  username: string;
  email: string;
    password: string;
    confirmPassword: string;
  image: string;
};

export const createNewUser = async (user: UserType) => {
    try {
        console.log(user)
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
              fullName: user.fullName,
            username:user.username,
          image: user.image,
        },
      },
    });
    if (error) {
      showToast("Error occured when signing up", "error");
      console.error("Error occured when signing up", error);
      return;
    }
    return data;
  } catch (error) {
    showToast("Unexpected error occured, please try again", "error");
    console.error(error);
  }
};
