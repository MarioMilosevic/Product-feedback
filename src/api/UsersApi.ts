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
    console.log(data)
    const { user: { user_metadata: {
      fullName,
      image,
      username
    }}} = data

    const userForTable = {
      fullName: fullName,
      username: username,
      image: image,
    };

    console.log(userForTable);

    const { data: userData, error: userError } = await supabase
      .from("Users")
      .insert(userForTable)
      .select();
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


//  useEffect(() => {
//    const retrieveUserInfo = async () => {
//      try {
//        const user = await retrieveUser();
//        if (user) {
//          setUser(user);
//        }
//      } catch (error) {
//        console.error("Unexpected error occurred", error);
//      }
//    };
//    retrieveUserInfo();
//  }, [setUser]);

export const retrieveUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error retrieving user", error);
      return
    }
    return user;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};