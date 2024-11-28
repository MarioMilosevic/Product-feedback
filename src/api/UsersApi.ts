import supabase from "src/config/supabaseClient";
import { UserType } from "src/types/types";
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

      await createTableUser(userForTable);
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
    console.log("login", user);
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
    console.log(authData);

    const user = authData?.user;
    if (!user.id) {
      console.error("Authenticated user id is missing");
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
    console.log(data)
    const userUI = {...data, is_anonymous:user.is_anonymous}

    return userUI;
  } catch (unexpectedError) {
    console.error("An unexpected error occurred:", unexpectedError);
    return null;
  }
};

export const signInGuest = async () => {
  const guest = {
    fullName: "Guest",
    image:
      "https://res.cloudinary.com/dyogkyl2u/image/upload/v1732794420/n2bl5a1rtgnjhfjoc6ze.svg",
    username: "@guest",
    auth_id: "",
  };

  try {
    const { data, error } = await supabase.auth.signInAnonymously({
      options: {
        data: guest,
      },
    });
    if (error) {
      console.error("Unable to sign in guest", error);
    }
    const { user } = data;
    if (user) {
      guest.auth_id = user.id;
    }
    console.log(guest);
    await createTableUser(guest);

    return user;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};

const createTableUser = async (user: UserType) => {
  console.log(user);
  const { error: userError } = await supabase
    .from("Users")
    .insert(user)
    .select();

  if (userError) {
    console.error("Unable to add new user", userError);
    return;
  }
  showToast("Account created successfully!");
};

export const deleteUser = async (user: UserType) => {
  console.log(user)
try {
  // izbrise iz tabele usera
  const response = await supabase.from("Users").delete().eq('id', user.id)
  console.log(response)

  // izbrise iz autentikacije usera
  if (user.auth_id) {
    const { data, error } = await supabase.auth.admin.deleteUser(
      user.auth_id
    );
    if (error) {
      console.error("Unable to delete user", error)
    } 
    console.log(data)
 }
  // sign outuje usera
} catch (error) {
  console.error("Unexpected error occured", error)
}
}