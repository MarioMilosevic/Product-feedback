import supabase from "src/config/supabaseClient";
import { CommentType } from "src/utils/types";

export const addComment = async (comment: CommentType) => {
  console.log(comment);
  try {
    const { data, error } = await supabase
      .from("Comments")
      .insert(comment)
      .select()
      .single();
    if (error) {
      console.error("Unable to add new comment", comment);
    }
    return data;
  } catch (error) {
    console.error("Unexpected error occured", error);
  }
};
