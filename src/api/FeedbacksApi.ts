import supabase from "../config/supabaseClient";
import { FeedbackType } from "../types/types";

export const fetchFeedbacks = async (): Promise<FeedbackType[]> => {
  try {
    const { data, error } = await supabase
      .from("Feedbacks")
      .select(`*, Comments (
      feedbackId:id)`)
    
    if (error) {
      console.log(error);
      return [];
    }
    return (data as FeedbackType[]);
  } catch (error) {
    console.log(error);
    return [];
  }
};



