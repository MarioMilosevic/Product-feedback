import supabase from "src/config/supabaseClient";
import { showToast } from "src/utils/toastify";

type UserFormType = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
};

export const createNewUser = async (user: UserFormType) => {
  try {
    const { email, password, fullName, username, image } = user;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          username,
          image,
        },
      },
    });

    if (error) {
      showToast("Error occurred when signing up", "error");
      console.error("Error occurred when signing up", error);
      return;
    }

    signOutUser();

    if (data?.user) {
      const {
        id,
        user_metadata: { fullName, image, username },
      } = data.user;

      const userForTable = {
        fullName,
        username,
        image,
        auth_id: id,
      };

      const { error: userError } = await supabase
        .from("Users")
        .insert(userForTable)
        .select();

      if (userError) {
        console.error("Unable to add new user", userError);
        return;
      } else {
        showToast("Account created successfully!");
      }
    } else {
      console.error("Sign-up was successful but user data is null");
    }
  } catch (error) {
    showToast("Unexpected error occurred, please try again", "error");
    console.error(error);
  }
};


export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Unable to sign in user", error);
      return;
    }
    const { user } = data;
    return user;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Unable to sign out", error);
    }
  } catch (error) {
    console.error("Unexpected error occured", error);
    showToast("Unexpected error occured", "error");
  }
};

export const retrieveUser = async () => {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      return {};
    }

    const user = authData?.user;
    if (!user || !user.email) {
      console.error("Authenticated user or email is missing");
      return null;
    }

    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("auth_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user from Users table:", error.message);
      return null;
    }

    return data;
  } catch (unexpectedError) {
    console.error("An unexpected error occurred:", unexpectedError);
    return null;
  }
};
