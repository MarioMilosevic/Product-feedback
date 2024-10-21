import supabase from "../config/supabaseClient";

export const fetchFeedbacks = async () => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select(`*, Comments (*)`);
    if (error) {
      console.log(error);
      return;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};
