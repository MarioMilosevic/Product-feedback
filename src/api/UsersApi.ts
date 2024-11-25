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
    console.log(user);
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          fullName: user.fullName,
          username: user.username,
          image: user.image,
        },
      },
    });
    if (error) {
      showToast("Error occured when signing up", "error");
      console.error("Error occured when signing up", error);
      return;
    }
    console.log(data);
    const {
      user: {
        id,
        user_metadata: { fullName, image, username },
      },
    } = data;

    const userForTable = {
      fullName: fullName,
      username: username,
      image: image,
      auth_id: id,
    };

    console.log(userForTable);

    const { data: userData, error: userError } = await supabase
      .from("Users")
      .insert(userForTable)
      .select()
      .single();
    if (userError) {
      console.error("Unable to add new user", error);
      return;
    }
    return userData;
  } catch (error) {
    showToast("Unexpected error occured, please try again", "error");
    console.error(error);
  }
};

export const signInUser = async (email: string, password: string) => {
  console.log(email);
  console.log(password);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Unable to sign in user', error)
      return
    }
    console.log(data)
    return data

  } catch (error) {
    console.error('Unexpected error occured', error)
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
